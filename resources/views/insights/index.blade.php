@extends('layouts.site')

@section('title', 'Insights — '.($site['site_name'] ?? 'Neotelabs'))

@section('content')
    <section class="site-container pb-16 pt-32 lg:pt-40">
        <div class="reveal max-w-4xl">
            <p class="font-display text-sm font-semibold uppercase tracking-[0.35em] text-accent">
                {{ $site['site_name'] ?? 'Neotelabs' }}
            </p>
            <h1 class="mt-5 font-display text-5xl font-bold tracking-tight text-ink sm:text-6xl">Insights</h1>
            <p class="mt-4 max-w-xl text-lg text-mist">Notes on growth, design, and the craft of shipping digital products.</p>
        </div>

        @if ($categories->isNotEmpty())
            <div class="reveal reveal-delay-1 mt-10 flex flex-wrap gap-2">
                <a href="{{ route('insights.index') }}" class="rounded-full px-4 py-2 text-sm font-medium {{ $activeCategory === '' ? 'bg-ink text-paper' : 'bg-white/70 text-mist ring-1 ring-ink/10 hover:text-ink' }}">All</a>
                @foreach ($categories as $category)
                    <a href="{{ route('insights.index', ['category' => $category->slug]) }}" class="rounded-full px-4 py-2 text-sm font-medium {{ $activeCategory === $category->slug ? 'bg-ink text-paper' : 'bg-white/70 text-mist ring-1 ring-ink/10 hover:text-ink' }}">
                        {{ $category->name }}
                    </a>
                @endforeach
            </div>
        @endif
    </section>

    <section class="site-container pb-24 lg:pb-32">
        <div class="grid gap-10 lg:grid-cols-3">
            @forelse ($insights as $index => $insight)
                <a href="{{ route('insights.show', $insight) }}" class="reveal reveal-delay-{{ min($index % 3, 3) }} group block">
                    <img src="{{ $insight->coverUrl() }}" alt="" class="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.02]" loading="lazy">
                    <p class="mt-4 text-xs uppercase tracking-[0.2em] text-mist">{{ optional($insight->published_at)->format('M j, Y') }}</p>
                    <h2 class="mt-2 font-display text-2xl font-semibold text-ink transition group-hover:text-accent">{{ $insight->title }}</h2>
                    <p class="mt-2 text-sm text-mist">{{ $insight->excerpt }}</p>
                </a>
            @empty
                <p class="text-mist">No insights published yet.</p>
            @endforelse
        </div>
        <div class="mt-12">{{ $insights->withQueryString()->links() }}</div>
    </section>
@endsection
