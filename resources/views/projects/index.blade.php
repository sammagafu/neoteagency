@extends('layouts.site')

@section('title', 'Work — '.($site['site_name'] ?? 'Neotelabs'))

@section('content')
    <x-site.page-hero
        eyebrow="Work"
        lede="We’re not your average agency. Dive into work shaped by dedication, creativity, and measurable results."
        :image="optional($projects->first())->coverUrl() ?? asset('videos/hero-poster.jpg')"
    >
        <x-slot:title>
            Selected work that <span class="hero-word hero-word--a">moves</span> the <span class="hero-word hero-word--b">needle</span>
        </x-slot:title>
        <x-slot:actions>
            <a href="{{ route('contact') }}" class="btn-primary bg-paper text-ink hover:bg-accent hover:text-paper">Start a project</a>
        </x-slot:actions>
    </x-site.page-hero>

    <section class="site-container py-16 lg:py-20">
        @if ($categories->isNotEmpty())
            <div class="wow flex flex-wrap gap-x-8 gap-y-3" data-wow-animation="fadeInUp">
                <a href="{{ route('projects.index') }}" class="text-sm font-medium uppercase tracking-[0.16em] {{ $activeCategory === '' ? 'text-ink underline underline-offset-8' : 'text-mist hover:text-ink' }}">All</a>
                @foreach ($categories as $category)
                    <a href="{{ route('projects.index', ['category' => $category->slug]) }}" class="text-sm font-medium uppercase tracking-[0.16em] {{ $activeCategory === $category->slug ? 'text-ink underline underline-offset-8' : 'text-mist hover:text-ink' }}">
                        {{ $category->name }}
                    </a>
                @endforeach
            </div>
        @endif
    </section>

    <section class="site-container pb-28 lg:pb-40">
        <div class="space-y-24">
            @forelse ($projects as $index => $project)
                @php $metrics = $project->resultMetrics(); @endphp
                <a href="{{ route('projects.show', $project) }}" class="wow group block" data-wow-animation="fadeInUp" data-wow-delay="{{ number_format(0.06 * min($index, 4), 2) }}s">
                    <div class="overflow-hidden bg-ink">
                        <img src="{{ $project->coverUrl() }}" alt="{{ $project->title }}" class="aspect-[16/9] w-full object-cover transition duration-[1.1s] ease-agency group-hover:scale-[1.03]" loading="lazy">
                    </div>
                    <div class="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p class="text-sm uppercase tracking-[0.18em] text-mist">{{ $project->categories->pluck('name')->join(' / ') }}</p>
                            <h2 class="mt-4 font-display text-4xl font-bold tracking-tight transition group-hover:text-accent sm:text-5xl lg:text-6xl" style="line-height: 1.12;">{{ $project->title }}</h2>
                        </div>
                        @if (count($metrics))
                            <div class="flex flex-wrap gap-8 lg:justify-end">
                                @foreach (array_slice($metrics, 0, 2) as $metric)
                                    <div>
                                        <p class="font-display text-3xl font-bold tracking-tight text-ink">{{ $metric['value'] }}</p>
                                        <p class="mt-1 text-sm text-mist">{{ $metric['label'] }}</p>
                                    </div>
                                @endforeach
                            </div>
                        @endif
                    </div>
                </a>
            @empty
                <p class="body-lg text-mist">No projects published yet.</p>
            @endforelse
        </div>
        <div class="mt-16">{{ $projects->withQueryString()->links() }}</div>
    </section>
@endsection
