<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ config('app.name', 'Neotelabs') }} Admin</title>
        <link rel="icon" type="image/svg+xml" href="{{ asset('images/brand/favicon.svg') }}">
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=manrope:400,500,600,700|syne:600,700" rel="stylesheet" />
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="font-sans text-ink antialiased">
        <div class="flex min-h-screen flex-col items-center bg-paper pt-6 sm:justify-center sm:pt-0">
            <div>
                <a href="{{ route('home') }}">
                    <img src="{{ asset('images/brand/logo.svg') }}" alt="Neotelabs" class="h-10 w-auto">
                </a>
            </div>
            <div class="mt-6 w-full overflow-hidden rounded-2xl border border-ink/10 bg-white px-6 py-6 shadow-sm sm:max-w-md">
                <p class="mb-4 font-display text-lg font-semibold text-ink">Admin login</p>
                {{ $slot }}
            </div>
        </div>
    </body>
</html>
