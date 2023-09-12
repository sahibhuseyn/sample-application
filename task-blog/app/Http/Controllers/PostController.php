<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{

    public function index()
    {
        if(Auth::guest()){
            return redirect('/login');
        }

        $user_id = auth()->user()->id;
        $posts = Post::where('user_id', $user_id)->get();
        return view('posts.index')->with(['posts'=> $posts]);
    }

    public function create()
    {
        return view('posts.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);
         $re = Post::create($request->all());

        return redirect('/posts');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = Post::find($id);

        if(Auth::guest()){
            return redirect('/login');
        }
        else if(auth()->user()->id != $post->user_id){
            return redirect('/posts');
        }

        return view('post.show')->with('post', $post);
    }

    public function edit($id)
    {
        $post = Post::where('id', $id)->first();

        if(Auth::guest()){
            return redirect('/login');
        }
        else if(auth()->user()->id != $post->user_id){
            return redirect('/posts');
        }
        return view('posts.edit')->with(['post' =>$post]);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $product = Post::find($id);
        $product->update($request->all());
        return redirect('/posts');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Post::destroy($id);
    }

    /**
     * Search for a name
     *
     * @param  str  $name
     * @return \Illuminate\Http\Response
     */
    public function search($name)
    {
        return Post::where('name', 'like', '%'.$name.'%')->get();
    }
}
