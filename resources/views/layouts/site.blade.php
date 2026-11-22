<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', ($site['site_name'] ?? 'Neotelabs').' — '.($site['tagline'] ?? 'We innovate'))</title>
    <meta name="description" content="@yield('meta_description', $site['hero_subheadline'] ?? 'Digital studio crafting strategy, brand, and technology.')">
    <link rel="icon" type="image/svg+xml" href="{{ asset('images/brand/favicon.svg') }}">
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=manrope:400,500,600,700|syne:500,600,700,800" rel="stylesheet" />
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="min-h-screen">
    @include('components.site.header')

    <main>
        @yield('content')
    </main>

    @include('components.site.footer')
</body>
</html>
