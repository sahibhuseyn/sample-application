## App scaffolding
Before start to develop backend application in PHP (Laravel) we have to our roadmap and we have to have
well-organized application folder structure with taking into account maintainability, scalability and
reusability.
- Firstly, if our app has the same structure for admin dashboard, frontend (with blade templates), and APIs, we have to define controllers folder structure like below `.
  └── Controllers/
  ├── Client
  ├── Admin
  └── Api`. All related controllers must be located in these folders.
- We have to take into account that all business logic must be separate from controllers and we can create new directories to keep code base. For example: in Services folder we can create our business logic code base for different models and different requests, but we must ensure that our services work with SOLID principles.
- Models folder also can be separated into subdirectories (like we can locate related models into single directory in Models folders), but it is not necessary.
- It is obvious we are not developing simple CRUD application everytime, therefore we have to have some business logic, authentication logic for our users. In this case we have to keep our logic into separate and global classes. For example, we can secure our authenticated routes with a single middleware instead of everytime define authentication for method in controller. Also we can use policy to do this. It depends on how we will design our backend architecture.
- Also we have to have Helpers directory to keep our helper function into separate files.

Suggestion above can be extended, but for this sample application I think is quite enough sections to keep in mind.

## Code review
1. Validation must have length field to check if requested field exited length range of related database column or not
2. Lack of using named routes to redirect or render new view.
3. Different methods use the same logic. For example: login and loginAttempt methods are doing the same things, but first must return view and another one must handle login request, therefore when you want to got login view application redirects you back.
4. It is obvious to use resources in router gives developers extra time to avoid writing new routes, but when we keep in mind maintainability and reusability it is not recommended to do. Instead of this we have to use named routes.
5. Redundant redirection: some methods of PostController use redirection if user not authenticated. Instead of this approach and to avoid DRY we have to use Laravel's middleware for authentication and redirection. After registering our middleware in Kernel, we can use it in router file. For example: `public function handle($request, Closure $next)
   {
   if (Auth::guest()) {
   return redirect()->route('login');
   }
   return $next($request);
   }`
6. Error handling: there is no any error handling methods or user-friendly error messages logic. For example: while we try to create new post, we meet with database error which happens due to lack of fields while post request. `slug` field defined in Post model for mass storing, but it is not proved while posting in PostController store method. There are some approaches to show user friendly errors, for example: we can define global method in Handler directory, to render same view for all errors, but showing specific error message, or we can use Laravel's `session::flash()` method to show custom message, and another way using error bag to show validation and other errors.
7. Don't use `$request->all()` to store or update model, it will cause SQL injection, also data lack. Anybody can provide sample code to get data from our database
8. Instead of using `$product = Post::find($id);` you can provide model in method parameter to find and get data specific model. Almost all frameworks of PHP supports this approach: `public function update(Request $request, Post $post)` instead of `public function update(Request $request, $id)`
9. You have to sanitize strings provided to search specific model, to avoid SQL injection. For example: ` public function search($name)
   {
   return Post::where('name', 'like', '%'.$name.'%')->get();
   }` can be changed to `public function search($name)
   {
   $searchTerm = '%' . str_sanitize($name) . '%';
   return Post::where('name', 'like', $searchTerm)->get();
   }`
10. In resources, we have to create global layout file to use in other pages. There exists `app.blade.php` file for layout but it is not well-designed, due to lack of `@yield` section we couldn't use it as layout in other view files. Also there must exist `@stack` sections to provide specific assets file for views, or specific frontend fixes with several lines of code.
11. Form error messages are not provided for user, which are important for users to be aware of what is the problem, and with which field.
12. Also, it is recommended to use `@old()` method as form fields value, to provide last user input while any errors occur.
13. While running application user meets with 404 page which is not recommended. We have to redirect user or show more logical view to find their path to do.
14. Routes folder keeps default routes files of Laravel. Imagine that our application will scale to many lines of code which for example 10 developers work simultaneously in the same application. In this case developers couldn't find specific route or view to fix. Therefore it is recommended to separate routes into different files and subdirectories like controllers.
