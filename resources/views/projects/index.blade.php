@extends('layouts.site')

@section('title', 'Case Study — '.($site['site_name'] ?? 'Neotelabs'))

@section('content')
    <section class="site-container pb-16 pt-32 lg:pt-40">
        <div class="reveal max-w-4xl">
            <p class="font-display text-sm font-semibold uppercase tracking-[0.35em] text-accent">
                {{ $site['site_name'] ?? 'Neotelabs' }}
            </p>
            <h1 class="mt-5 font-display text-5xl font-bold tracking-tight text-ink sm:text-6xl">Case studies</h1>
            <p class="mt-4 max-w-xl text-lg text-mist">Selected work across strategy, brand, product, and technology.</p>
        </div>

        @if ($categories->isNotEmpty())
            <div class="reveal reveal-delay-1 mt-10 flex flex-wrap gap-2">
                <a href="{{ route('projects.index') }}" class="rounded-full px-4 py-2 text-sm font-medium {{ $activeCategory === '' ? 'bg-ink text-paper' : 'bg-white/70 text-mist ring-1 ring-ink/10 hover:text-ink' }}">All</a>
                @foreach ($categories as $category)
                    <a href="{{ route('projects.index', ['category' => $category->slug]) }}" class="rounded-full px-4 py-2 text-sm font-medium {{ $activeCategory === $category->slug ? 'bg-ink text-paper' : 'bg-white/70 text-mist ring-1 ring-ink/10 hover:text-ink' }}">
                        {{ $category->name }}
                    </a>
                @endforeach
            </div>
        @endif
    </section>

    <section class="site-container pb-24 lg:pb-32">
        <div class="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
            @forelse ($projects as $index => $project)
                <a href="{{ route('projects.show', $project) }}" class="reveal reveal-delay-{{ min($index % 3, 3) }} group block">
                    <div class="overflow-hidden bg-ink">
                        <img src="{{ $project->coverUrl() }}" alt="{{ $project->title }}" class="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy">
                    </div>
                    <p class="mt-4 text-xs uppercase tracking-[0.2em] text-mist">{{ $project->categories->pluck('name')->join(', ') }}</p>
                    <h2 class="mt-2 font-display text-2xl font-semibold text-ink transition group-hover:text-accent">{{ $project->title }}</h2>
                </a>
            @empty
                <p class="text-mist">No projects published yet.</p>
            @endforelse
        </div>

        <div class="mt-12">{{ $projects->withQueryString()->links() }}</div>
    </section>
@endsection
