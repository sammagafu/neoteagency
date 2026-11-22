@extends('layouts.site')

@section('title', 'Work — '.($site['site_name'] ?? 'Neotelabs'))

@section('content')
    <section class="site-container pb-16 pt-36 lg:pt-44">
        <p class="wow eyebrow" data-wow-animation="fadeInDown">Work</p>
        <h1 class="wow mt-8 display-xl" data-wow-animation="fadeInUp" data-wow-delay="0.1s">Selected work</h1>
        <p class="wow mt-8 max-w-xl text-lg font-light text-mist" data-wow-animation="fadeInUp" data-wow-delay="0.2s">
            We’re not your average agency. Dive into work shaped by dedication, creativity, and results.
        </p>

        @if ($categories->isNotEmpty())
            <div class="wow mt-12 flex flex-wrap gap-x-6 gap-y-3" data-wow-animation="fadeInUp" data-wow-delay="0.28s">
                <a href="{{ route('projects.index') }}" class="text-xs font-medium uppercase tracking-[0.18em] {{ $activeCategory === '' ? 'text-ink underline underline-offset-8' : 'text-mist hover:text-ink' }}">All</a>
                @foreach ($categories as $category)
                    <a href="{{ route('projects.index', ['category' => $category->slug]) }}" class="text-xs font-medium uppercase tracking-[0.18em] {{ $activeCategory === $category->slug ? 'text-ink underline underline-offset-8' : 'text-mist hover:text-ink' }}">
                        {{ $category->name }}
                    </a>
                @endforeach
            </div>
        @endif
    </section>

    <section class="site-container pb-28 lg:pb-40">
        <div class="space-y-20">
            @forelse ($projects as $index => $project)
                <a href="{{ route('projects.show', $project) }}" class="wow group block" data-wow-animation="fadeInUp" data-wow-delay="{{ number_format(0.06 * min($index, 4), 2) }}s">
                    <div class="overflow-hidden bg-ink">
                        <img src="{{ $project->coverUrl() }}" alt="{{ $project->title }}" class="aspect-[16/9] w-full object-cover transition duration-[1.1s] ease-agency group-hover:scale-[1.03]" loading="lazy">
                    </div>
                    <p class="mt-6 text-xs uppercase tracking-[0.2em] text-mist">{{ $project->categories->pluck('name')->join(' / ') }}</p>
                    <h2 class="mt-3 font-display text-3xl font-bold tracking-tight transition group-hover:text-accent sm:text-5xl">{{ $project->title }}</h2>
                </a>
            @empty
                <p class="text-mist">No projects published yet.</p>
            @endforelse
        </div>
        <div class="mt-16">{{ $projects->withQueryString()->links() }}</div>
    </section>
@endsection
