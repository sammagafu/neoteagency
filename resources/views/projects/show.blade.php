@extends('layouts.site')

@section('title', $project->title.' — '.($site['site_name'] ?? 'Neotelabs'))
@section('meta_description', $project->excerpt ?? $project->title)

@section('content')
    @php $metrics = $project->resultMetrics(); @endphp

    <article>
        <x-site.page-hero
            :eyebrow="$project->categories->pluck('name')->join(' · ') ?: 'Case study'"
            :lede="$project->excerpt ?? ''"
            :image="$project->coverUrl()"
        >
            <x-slot:title>{{ $project->title }}</x-slot:title>
            <x-slot:actions>
                @if ($project->client)
                    <span class="text-base text-paper/70">Client · {{ $project->client }}</span>
                @endif
                @if ($project->skills)
                    <span class="text-base text-paper/70">Skills · {{ $project->skills }}</span>
                @endif
            </x-slot:actions>
        </x-site.page-hero>

        @if (count($metrics))
            <section class="border-b border-ink/10 bg-white">
                <div class="site-container py-12 lg:py-16">
                    <p class="wow eyebrow" data-wow-animation="fadeInDown">Results</p>
                    <div class="wow project-results mt-8" data-wow-animation="fadeInUp" data-wow-delay="0.08s">
                        @foreach ($metrics as $metric)
                            <div>
                                <p class="project-result__value text-ink">{{ $metric['value'] }}</p>
                                <p class="project-result__label">{{ $metric['label'] }}</p>
                            </div>
                        @endforeach
                    </div>
                </div>
            </section>
        @endif

        <section class="site-container grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
            <div class="wow prose-site lg:col-span-8" data-wow-animation="fadeInUp">
                {!! $project->content !!}
            </div>
            <aside class="wow lg:col-span-4" data-wow-animation="fadeInUp" data-wow-delay="0.12s">
                <p class="eyebrow">Overview</p>
                <p class="mt-4 body-lg text-ink">{{ $project->excerpt }}</p>
                @if ($project->client)
                    <p class="mt-8 text-sm uppercase tracking-[0.16em] text-mist">Client</p>
                    <p class="mt-2 text-lg text-ink">{{ $project->client }}</p>
                @endif
                @if ($project->skills)
                    <p class="mt-6 text-sm uppercase tracking-[0.16em] text-mist">Skills</p>
                    <p class="mt-2 text-lg text-ink">{{ $project->skills }}</p>
                @endif
            </aside>
        </section>

        @if ($related->isNotEmpty())
            <section class="border-t border-ink/10 bg-white py-16 lg:py-24">
                <div class="site-container">
                    <h2 class="display-md">More work</h2>
                    <div class="mt-10 grid gap-10 md:grid-cols-3">
                        @foreach ($related as $item)
                            @php $relatedMetrics = $item->resultMetrics(); @endphp
                            <a href="{{ route('projects.show', $item) }}" class="group block">
                                <img src="{{ $item->coverUrl() }}" alt="" class="aspect-[4/3] w-full object-cover" loading="lazy">
                                <h3 class="mt-5 font-display text-2xl font-bold tracking-tight transition group-hover:text-accent" style="line-height: 1.15;">{{ $item->title }}</h3>
                                @if (isset($relatedMetrics[0]))
                                    <p class="mt-3 text-sm text-mist">
                                        <span class="font-medium text-ink">{{ $relatedMetrics[0]['value'] }}</span>
                                        {{ $relatedMetrics[0]['label'] }}
                                    </p>
                                @endif
                            </a>
                        @endforeach
                    </div>
                </div>
            </section>
        @endif
    </article>
@endsection
