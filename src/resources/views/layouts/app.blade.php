<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/manifest.js') }}"></script>
    <script src="{{ asset('js/vendor.js') }}"></script>
    <script src="{{ asset('js/plugins.js') }}"></script>

    <!-- Styles -->
    <link href="{{ asset('css/bootstrap.css') }}" rel="stylesheet">
    <link href="{{ asset('css/fontawesome.css') }}" rel="stylesheet">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body class="container-fluid wrapper">
    <div class="row h-100">
        <nav class="d-flex flex-column flex-shrink-0 bg-dark" style="width: 3.5em;">
            <ul class="nav nav-pills text-center">
                @guest
                <li class="nav-item">
                    <a class="nav-link" href="{{ route('login') }}" data-toggle="tooltip" data-placement="right" title="Login">
                        <i class="fas fa-sign-in-alt"></i>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ route('register') }}" data-toggle="tooltip" data-placement="right" title="Register">
                        <i class="fas fa-user-plus"></i>
                    </a>
                </li>
                @else
                <li class="nav-item">
                    <a class="nav-link" href="{{ route('home') }}" data-toggle="tooltip" data-placement="right" title="My Books">
                        <i class="fas fa-book"></i>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ route('home') }}/new" data-toggle="tooltip" data-placement="right" title="Add a Book">
                        <i class="fas fa-plus"></i>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" onclick="$('#logout-form').submit()" data-toggle="tooltip" data-placement="right" title="Logout">
                        <i class="fas fa-sign-out-alt"></i>
                    </a>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                        @csrf
                    </form>
                </li>
                @endguest
                <!-- Initialize all navbar tooltips -->'
                <script type="text/javascript">
                    $('nav [data-toggle="tooltip"]').tooltip();
                </script>
            </ul>
        </nav>
        <div class="col">
            <div class="text-center p-5">
                <a class="h2" href="{{ route('home') }}">
                    {{ config('app.name') }}
                </a>
            </div>
            <main>
                @yield('content')
            </main>
        </div>
    </div>
    @yield('script')
</body>

</html>