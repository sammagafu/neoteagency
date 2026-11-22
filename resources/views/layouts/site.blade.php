<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', ($site['site_name'] ?? 'Neotelabs').' — '.($site['tagline'] ?? 'We innovate'))</title>
    <meta name="description" content="@yield('meta_description', $site['hero_subheadline'] ?? 'Digital growth partner bridging products and customers.')">
    <link rel="icon" type="image/svg+xml" href="{{ asset('images/brand/favicon.svg') }}">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="min-h-screen bg-paper text-ink is-loading">
    @include('components.site.loader')
    @include('components.site.header')

    <main>
        @yield('content')
    </main>

    @include('components.site.footer')
</body>
</html>
