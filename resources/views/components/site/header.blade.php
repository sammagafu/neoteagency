@php
    $links = [
        ['label' => 'Work', 'route' => 'projects.index', 'active' => 'projects.*'],
        ['label' => 'About', 'route' => 'about', 'active' => 'about'],
        ['label' => 'Insights', 'route' => 'insights.index', 'active' => 'insights.*'],
        ['label' => 'Contact', 'route' => 'contact', 'active' => 'contact'],
    ];
@endphp

<header
    data-site-header
    class="fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300 {{ request()->routeIs('home', 'about', 'projects.*', 'insights.*', 'contact') ? 'is-on-dark text-paper' : 'text-ink' }}"
>
    <div class="site-container flex h-16 items-center justify-between lg:h-20">
        <a href="{{ route('home') }}" class="relative z-20" aria-current="{{ request()->routeIs('home') ? 'page' : 'false' }}">
            <img
                src="{{ asset('images/brand/logo.svg') }}"
                alt="{{ $site['site_name'] ?? 'Neotelabs' }}"
                class="h-7 w-auto sm:h-8"
            >
        </a>

        <nav class="hidden items-center gap-10 lg:flex" aria-label="Primary">
            @foreach ($links as $link)
                @php $isActive = request()->routeIs($link['active']); @endphp
                <a
                    href="{{ route($link['route']) }}"
                    @if ($isActive) aria-current="page" @endif
                    class="nav-link font-medium uppercase transition {{ $isActive ? 'is-active' : '' }}"
                >
                    {{ $link['label'] }}
                </a>
            @endforeach
        </nav>

        <button
            type="button"
            data-nav-toggle
            aria-expanded="false"
            aria-label="Open menu"
            class="relative z-20 flex h-11 w-11 items-center justify-center border border-current/20 lg:hidden"
        >
            <span class="sr-only">Menu</span>
            <span class="flex flex-col gap-1.5">
                <span class="block h-px w-5 bg-current"></span>
                <span class="block h-px w-5 bg-current"></span>
            </span>
        </button>
    </div>

    <div data-nav-panel class="fixed inset-0 z-10 hidden flex-col bg-paper px-6 pb-10 pt-28 text-ink lg:hidden">
        <nav class="flex flex-1 flex-col gap-1" aria-label="Mobile">
            <a href="{{ route('home') }}" class="border-b border-ink/10 py-5 font-display text-4xl font-bold tracking-tight {{ request()->routeIs('home') ? 'text-accent' : '' }}" @if(request()->routeIs('home')) aria-current="page" @endif>Home</a>
            @foreach ($links as $link)
                @php $isActive = request()->routeIs($link['active']); @endphp
                <a
                    href="{{ route($link['route']) }}"
                    @if ($isActive) aria-current="page" @endif
                    class="border-b border-ink/10 py-5 font-display text-4xl font-bold tracking-tight {{ $isActive ? 'text-accent' : '' }}"
                >
                    {{ $link['label'] }}
                </a>
            @endforeach
        </nav>
    </div>
</header>
