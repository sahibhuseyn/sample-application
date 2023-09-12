<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <!-- Scripts -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <!-- Styles -->
</head>
    <main class="container">
        <div class="flex">
            <div  class="w-full">
                <section class="flex flex-col break-words bg-white sm:border-1 sm:rounded-md sm:shadow-sm sm:shadow-lg">

                    <header class="font-semibold bg-gray-200 text-gray-700 py-5 px-6 sm:py-6 sm:px-8 sm:rounded-t-md">
                        Login
                    </header>

                    <form class="" method="POST"
                          action="">
                        @csrf


                        <div class="flex flex-wrap">
                            <label for="email" class="block text-gray-700 text-sm font-bold mb-2 sm:mb-4">
                                Email
                            </label>

                            <input id="email" type="email" style="width: 200px"
                                   class="form-input form-control w-full @error('email') border-red-500 @enderror" name="email"
                                   value="" required autocomplete="email">

                        </div>

                        <div class="flex flex-wrap">
                            <label for="password" class="block text-gray-700 text-sm font-bold mb-2 sm:mb-4">
                                Password
                            </label>

                            <input id="password" type="password" style="width: 200px"
                                   class="form-control w-full @error('password') border-red-500 @enderror" name="password"
                                   required autocomplete="new-password">
                        </div>



                        <div class="flex flex-wrap">
                            <button type="submit"
                                    class=" btn btn-primary">
                                Login
                            </button>

                            <p class="w-full text-xs text-center text-gray-700 my-6 sm:text-sm sm:my-8">
                                {{ __('Already have an account?') }}
                                <a class="text-blue-500 hover:text-blue-700 no-underline hover:underline" href="">
                                    {{ __('Login') }}
                                </a>
                            </p>
                        </div>
                    </form>

                </section>
            </div>
        </div>
    </main>
</html>
