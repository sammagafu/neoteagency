@extends('layouts.site')

@section('title', 'Insights — '.($site['site_name'] ?? 'Neotelabs'))

@section('content')
    <x-site.page-hero
        eyebrow="Insights"
        lede="Notes on growth, design, and the craft of building digital products that earn attention."
        :image="optional($insights->first())->coverUrl() ?? asset('videos/hero-poster.jpg')"
    >
        <x-slot:title>
            Ideas that <span class="hero-word hero-word--a">ship</span> — and <span class="hero-word hero-word--b">scale</span>
        </x-slot:title>
    </x-site.page-hero>

    <section class="site-container py-16 lg:py-20">
        @if ($categories->isNotEmpty())
            <div class="wow flex flex-wrap gap-x-8 gap-y-3" data-wow-animation="fadeInUp">
                <a href="{{ route('insights.index') }}" class="text-sm font-medium uppercase tracking-[0.16em] {{ $activeCategory === '' ? 'text-ink underline underline-offset-8' : 'text-mist hover:text-ink' }}">All</a>
                @foreach ($categories as $category)
                    <a href="{{ route('insights.index', ['category' => $category->slug]) }}" class="text-sm font-medium uppercase tracking-[0.16em] {{ $activeCategory === $category->slug ? 'text-ink underline underline-offset-8' : 'text-mist hover:text-ink' }}">
                        {{ $category->name }}
                    </a>
                @endforeach
            </div>
        @endif
    </section>

    <section class="site-container pb-28 lg:pb-40">
        <div class="grid gap-14 lg:grid-cols-3">
            @forelse ($insights as $index => $insight)
                <a href="{{ route('insights.show', $insight) }}" class="wow group block" data-wow-animation="fadeInUp" data-wow-delay="{{ number_format(0.06 * ($index % 3), 2) }}s">
                    <img src="{{ $insight->coverUrl() }}" alt="" class="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.02]" loading="lazy">
                    <p class="mt-6 text-sm uppercase tracking-[0.18em] text-mist">{{ optional($insight->published_at)->format('M j, Y') }}</p>
                    <h2 class="mt-3 font-display text-2xl font-bold tracking-tight text-ink transition group-hover:text-accent sm:text-3xl" style="line-height: 1.15;">{{ $insight->title }}</h2>
                    <p class="mt-4 text-base font-light leading-relaxed text-mist">{{ $insight->excerpt }}</p>
                </a>
            @empty
                <p class="body-lg text-mist">No insights published yet.</p>
            @endforelse
        </div>
        <div class="mt-16">{{ $insights->withQueryString()->links() }}</div>
    </section>
@endsection
