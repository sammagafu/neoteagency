@php
    $links = [
        ['label' => 'Home', 'route' => 'home'],
        ['label' => 'About', 'route' => 'about'],
        ['label' => 'Case Study', 'route' => 'projects.index'],
        ['label' => 'Insights', 'route' => 'insights.index'],
        ['label' => 'Contact', 'route' => 'contact'],
    ];
@endphp

<header
    data-site-header
    class="fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300"
>
    <div class="site-container flex h-20 items-center justify-between lg:h-24">
        <a href="{{ route('home') }}" class="group relative z-20 flex items-center gap-3">
            <img src="{{ asset('images/brand/logo.svg') }}" alt="{{ $site['site_name'] ?? 'Neotelabs' }}" class="h-8 w-auto transition duration-300 group-hover:opacity-80 sm:h-9">
        </a>

        <nav class="hidden items-center gap-8 lg:flex">
            @foreach ($links as $link)
                @php
                    $isActive = request()->routeIs($link['route'])
                        || (str_starts_with($link['route'], 'projects') && request()->routeIs('projects.*'))
                        || (str_starts_with($link['route'], 'insights') && request()->routeIs('insights.*'));
                @endphp
                <a
                    href="{{ route($link['route']) }}"
                    class="relative text-sm font-medium tracking-wide transition {{ $isActive ? 'text-ink' : 'text-mist hover:text-ink' }}"
                >
                    {{ $link['label'] }}
                    @if ($isActive)
                        <span class="absolute -bottom-1 left-0 h-px w-full bg-accent"></span>
                    @endif
                </a>
            @endforeach
            <a href="{{ route('contact') }}" class="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-accent">
                Start a project
            </a>
        </nav>

        <button
            type="button"
            data-nav-toggle
            aria-expanded="false"
            aria-label="Open menu"
            class="relative z-20 flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white/70 lg:hidden"
        >
            <span class="sr-only">Menu</span>
            <span class="flex flex-col gap-1.5">
                <span class="block h-0.5 w-5 bg-ink"></span>
                <span class="block h-0.5 w-5 bg-ink"></span>
            </span>
        </button>
    </div>

    <div
        data-nav-panel
        class="fixed inset-0 z-10 hidden flex-col bg-paper px-6 pb-10 pt-28 lg:hidden"
    >
        <nav class="flex flex-1 flex-col gap-2">
            @foreach ($links as $link)
                <a href="{{ route($link['route']) }}" class="border-b border-ink/10 py-4 font-display text-3xl font-semibold tracking-tight text-ink">
                    {{ $link['label'] }}
                </a>
            @endforeach
        </nav>
        <a href="{{ route('contact') }}" class="mt-8 inline-flex items-center justify-center rounded-full bg-ink px-6 py-4 text-base font-semibold text-paper">
            Start a project
        </a>
    </div>
</header>
