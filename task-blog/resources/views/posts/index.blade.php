@extends('layouts.app')
@section('title')
@endsection
<a href="/posts/create">New Post</a>
    @if ( !$posts->count() )
        There is no post till now. Write a new post now!!!
    @else
        <div class="">

            @foreach( $posts as $post )
                <div class="card" style="width: 18rem;">
                    <h3>
                        @if(!Auth::guest() && ($post->user_id == Auth::user()->id))
                            <button class="btn" style="float: right"><a href="{{ url('posts/'.$post->id.'/edit')}}">Edit Post</a></button>
                        @endif
                    </h3>
                    <div class="card-body">
                        <h5 class="card-title">{{$post->title}}</h5>
                        <article>
                            {!! Str::limit($post->content, $limit = 1500, $end = '....... <a href='.url("/".$post->id).'>Read More</a>') !!}
                        </article>
                        <p>{{ $post->created_at->format('M d,Y \a\t h:i a') }} By <a href="{{ url('/user/'.$post->user_id)}}">{{ $post->user->name }}</a></p>

                    </div>
                </div>
                <div class="list-group">
                    <div class="list-group-item">

                    </div>
                    <div class="list-group-item">

                    </div>
                </div>
            @endforeach
        </div>
    @endif
