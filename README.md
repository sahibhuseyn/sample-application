### To read code review for Part 1 ([backend](task-blog/README.md)) and Part 2 ([frontend](task-filter/README.md)) sample applications follow provided links

## Part 4 Architecture
To design architecture adding review part to application we have to consider check points below
1. [ ] Make migration for related model (creating new table to store reviews)
2. [ ] Make Api controller to store, update, destroy reviews
3. [ ] Make a Policy to check user can edit, delete or update specific review
3. [ ] Api request validation
4. [ ] User authentication to make requests

Migration file for `Review` model:
```
Schema::create('reviews', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('user_id');
    $table->unsignedBigInteger('product_id');
    $table->integer('rating');
    $table->text('comment');
    $table->boolean('is_edited')->default(false);
    $table->softDeletes();
    $table->timestamps();
    
    $table->foreign('user_id')->references('id')->on('users');
    $table->foreign('product_id')->references('id')->on('products');
});
```
`is_edited` column is for catching review edited or not. Additionally we can keep review variations in other table, to show edited version. But in this case it is not necessary.
`$table->sofDeletes()` method adds `deleted_at` column to ur table to keep if review is deleted or not. It is Laravel's helper method, and we need to implement `SoftDeletes` trait to our `Review` model.
If review deleted accidentally then we can restore it with updating `deleted_at` column.

Then it is time to create ReviewController. In Part 1 (backend code review) section, I mentioned we need to centralize our routes with middleware to catch if user authenticated or not.
By creating and adding Review routes into our group with related middleware, we don't need to check authentication in every method of ReviewController.
Then we have to create `ReviewPolicy` class with several methods like:
```
public function update(User $user, Review $review)
{
    return $user->id === $review->user_id;
}
```
and then we have to provide it to our `AuthServiceProvider` or we can use it direct in `ReviewController`.
In api validation part we have to check `rating` field and must ensure it falls within valid range (e.g.,1 to 5), and `comment` field adheres to length constraints.
To show reviews of related product, we have to create relation between `Product` and `Review` models, then we have to add `with` method to our product fetching method to eager load and avoid N+1 problem while fetching data from database.
`with` method adds `join` in background while creating query. Also to avoid N+1 problem we can make 2 query first one to fetch products and the second is to fetch reviews. Also we have to take into account pagination or limit while fetching reviews and products, to avoid
drain our resources, especially database resource.


For frontend section, we have to prepare new UI to show products' reviews and making review for specific product.
In this section, we can use components prepared beforehand in our application or prepare new one.
Firstly we have to check if user is authenticated or not in frontend. It is obvious, this part is checking in our backend side, but
unauthorized users can't see review form.
When a user submits a review, make an HTTP POST request to the backend API endpoint to create a new review. 
We can use a library like Axios for making API requests. 
Implement form validation on the client-side. This validation is just to check required fields are empty or not, or typed string is integer or not.
Then when API request called if there are any validation error from backend side then we have to show it to user. Also take into account error handling. Errors may consist on
validation errors mentioned before, network error or server errors.
We have to show alert messages which are as important as error handling. When user creates, updates or deletes review, then he/she must be shown action result message.


## Part 5 (Team management)
### Scenario 1: One of the developers in your team consistently writes code that lacks proper comments and often neglects best practices. How would you
handle this situation? <br>
There are several approaches to investigate the problem and solve it.
- One-on-one meeting with the developer to discuss and investigate what is the reason behind him/her behavior. Related tasks or resources can be shared with the developer. An individual approach may solve the problem.
- Organizing training sessions or pair programming opportunities to help developers improve their coding skills and share knowledge between team members.
- Sharing coding guidelines and best practices within the team.
- Assigning code review to other developers, especially senior developers
- Highlight specific examples in their code where comments would help explain logic or complex sections.
- Escalate to engineering leadership for coaching and mentoring. Establish improvement goals and timelines.

### Scenario 2: The frontend team and the backend team have a disagreement on how an API endpoint should work. How would you mediate and ensure the best outcome for the project?
- Have both teams clarify their perspective on what functionality and data the endpoint needs to provide.
- Review what data needs to be accepted, returned, and handled by the endpoint
- Draft endpoint specs together that document expectations for request/response format, status codes, error handling, etc
- Encourage ongoing collaboration between frontend and backend teams to address any potential issues promptly and ensure the best outcome for the project.
- If no agreement reached, you have to find out best practices and make final decision. After that share final documentation with teams.

### Scenario 3: There is a product which is almost ready for production, while its code architecture is quite messy and hard to understand, which makes it very time consuming to edit every time there is a need for a change. Additionally, it is highly likely that we will see lots of bugs after the production, even though it was tested by the testers. You are assigned as a tech lead to a team which also developed this product. So far, the team spent almost 1 year developing the product. Please describe what your solutions and actions would be in this case both from the technical and business point of view? Please create a roadmap of your actions.

**Technical Approach**

- Code Review & Refactoring Roadmap
    - Review existing architecture and create a high-level modularization plan
    - Prioritize refactoring complex/problematic areas first
    - Begin incrementally refactoring modules one by one
    - Create self-documenting code through good abstractions, naming, and comments

- Testing Strategy
    - Expand test coverage for existing code
    - Mandate tests for all new code
    - Focus on unit, integration, and regression testing
    - Mock dependencies for better isolation

- Technical Debt Management
    - Freeze non-critical feature development
    - Perform code health analysis (linting, tech debt quantification)
    - Prioritize addressing issues and tech debt-causing bugs
    - Implement code quality practices and standards

**Business Approach**

- Communicate scope of issues and time needed for refactoring
- Provide roadmap showing phased refactoring schedule
- Explain long term benefits of having cleaner, more maintainable code
- Highlight reduction of bugs and technical debt
- Look for opportunities to incrementally refactor without stopping new development
- Commit to predictable pacing of releases through technical planning

### Scenario 4: The server hosting your application experiences sudden downtime. Outline the steps you would take to troubleshoot and restore the service as quickly as possible.

- Investigate the root cause of the downtime by checking server logs, monitoring tools, and error messages
- Notify relevant team members and stakeholders about the downtime
- Check for hardware or OS issues like CPU, memory, disk
- Check application logs for errors
- Tail logs from when issue began to identify root cause
- Attempt Restarts if necessary
- Deploy previous known working version of app
- Monitor dashboards to ensure metrics have recovered
- Test endpoints, important sections of app to ensure everything is working
- Review preventative measures to avoid reoccurrence