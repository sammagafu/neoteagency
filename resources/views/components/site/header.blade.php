@php
    $links = [
        ['label' => 'Work', 'route' => 'projects.index'],
        ['label' => 'About', 'route' => 'about'],
        ['label' => 'Insights', 'route' => 'insights.index'],
        ['label' => 'Contact', 'route' => 'contact'],
    ];
@endphp

<header
    data-site-header
    class="fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300 {{ request()->routeIs('home') ? 'is-on-dark text-paper' : 'text-ink' }}"
>
    <div class="site-container flex h-20 items-center justify-between lg:h-24">
        <a href="{{ route('home') }}" class="relative z-20">
            <img
                src="{{ asset(request()->routeIs('home') ? 'images/brand/logo-white.svg' : 'images/brand/logo.svg') }}"
                alt="{{ $site['site_name'] ?? 'Neotelabs' }}"
                class="h-7 w-auto sm:h-8"
                data-logo-light="{{ asset('images/brand/logo-white.svg') }}"
                data-logo-dark="{{ asset('images/brand/logo.svg') }}"
            >
        </a>

        <nav class="hidden items-center gap-10 lg:flex">
            @foreach ($links as $link)
                @php
                    $isActive = request()->routeIs($link['route'])
                        || (str_starts_with($link['route'], 'projects') && request()->routeIs('projects.*'))
                        || (str_starts_with($link['route'], 'insights') && request()->routeIs('insights.*'));
                @endphp
                <a
                    href="{{ route($link['route']) }}"
                    class="text-[13px] font-medium tracking-[0.08em] uppercase transition opacity-80 hover:opacity-100 {{ $isActive ? 'opacity-100' : '' }}"
                >
                    {{ $link['label'] }}
                </a>
            @endforeach
            <a href="{{ route('contact') }}" class="text-[13px] font-medium tracking-[0.08em] uppercase underline underline-offset-8 decoration-1 opacity-90 hover:opacity-100">
                Let’s build
            </a>
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
        <nav class="flex flex-1 flex-col gap-1">
            <a href="{{ route('home') }}" class="border-b border-ink/10 py-5 font-display text-4xl font-bold tracking-tight">Home</a>
            @foreach ($links as $link)
                <a href="{{ route($link['route']) }}" class="border-b border-ink/10 py-5 font-display text-4xl font-bold tracking-tight">
                    {{ $link['label'] }}
                </a>
            @endforeach
        </nav>
        <a href="{{ route('contact') }}" class="btn-primary mt-8">Let’s build</a>
    </div>
</header>
