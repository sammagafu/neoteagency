<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Admin') — Neotelabs</title>
    <link rel="icon" type="image/svg+xml" href="{{ asset('images/brand/favicon.svg') }}">
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=manrope:400,500,600,700|syne:600,700" rel="stylesheet" />
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="min-h-screen bg-paper text-ink">
    <div class="min-h-screen lg:grid lg:grid-cols-[16rem_1fr]">
        <aside class="border-b border-ink/10 bg-ink text-paper lg:min-h-screen lg:border-b-0 lg:border-r lg:border-paper/10">
            <div class="flex items-center justify-between px-5 py-5">
                <a href="{{ route('admin.dashboard') }}" class="font-display text-lg font-semibold tracking-tight">Neotelabs Admin</a>
                <a href="{{ route('home') }}" class="text-xs text-paper/50 hover:text-accent lg:hidden">View site</a>
            </div>
            <nav class="space-y-1 px-3 pb-6">
                @php
                    $nav = [
                        ['Dashboard', 'admin.dashboard', 'admin.dashboard'],
                        ['Projects', 'admin.projects.index', 'admin.projects.*'],
                        ['Insights', 'admin.insights.index', 'admin.insights.*'],
                        ['Services', 'admin.services.index', 'admin.services.*'],
                        ['Team', 'admin.team.index', 'admin.team.*'],
                        ['Messages', 'admin.messages.index', 'admin.messages.*'],
                        ['Project categories', 'admin.project-categories.index', 'admin.project-categories.*'],
                        ['Insight categories', 'admin.insight-categories.index', 'admin.insight-categories.*'],
                        ['Settings', 'admin.settings.edit', 'admin.settings.*'],
                    ];
                @endphp
                @foreach ($nav as [$label, $route, $active])
                    <a href="{{ route($route) }}"
                       class="block rounded-xl px-3 py-2.5 text-sm transition {{ request()->routeIs($active) ? 'bg-paper/10 text-paper' : 'text-paper/60 hover:bg-paper/5 hover:text-paper' }}">
                        {{ $label }}
                    </a>
                @endforeach
                <div class="mt-4 border-t border-paper/10 pt-4">
                    <a href="{{ route('home') }}" class="block rounded-xl px-3 py-2.5 text-sm text-paper/60 hover:text-paper">View website</a>
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <button type="submit" class="w-full rounded-xl px-3 py-2.5 text-left text-sm text-paper/60 hover:text-paper">Log out</button>
                    </form>
                </div>
            </nav>
        </aside>

        <div class="min-w-0">
            <header class="flex items-center justify-between border-b border-ink/10 bg-white/70 px-5 py-4 backdrop-blur sm:px-8">
                <div>
                    <h1 class="font-display text-xl font-semibold">@yield('heading', 'Dashboard')</h1>
                    @hasSection('subheading')
                        <p class="text-sm text-mist">@yield('subheading')</p>
                    @endif
                </div>
                <div class="text-sm text-mist">{{ auth()->user()->name }}</div>
            </header>

            <div class="px-5 py-8 sm:px-8">
                @if (session('success'))
                    <div class="mb-6 rounded-2xl border border-accent/30 bg-accent-soft px-4 py-3 text-sm text-ink">
                        {{ session('success') }}
                    </div>
                @endif
                @yield('content')
            </div>
        </div>
    </div>
</body>
</html>
