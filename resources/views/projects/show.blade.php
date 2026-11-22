@extends('layouts.site')

@section('title', $project->title.' — '.($site['site_name'] ?? 'Neotelabs'))
@section('meta_description', $project->excerpt ?? $project->title)

@section('content')
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

        <section class="site-container grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
            <div class="wow prose-site lg:col-span-8" data-wow-animation="fadeInUp">
                {!! $project->content !!}
            </div>
            <aside class="wow lg:col-span-4" data-wow-animation="fadeInUp" data-wow-delay="0.12s">
                <p class="eyebrow">Overview</p>
                <p class="mt-4 body-lg text-ink">{{ $project->excerpt }}</p>
            </aside>
        </section>

        @if ($related->isNotEmpty())
            <section class="border-t border-ink/10 bg-white py-20 lg:py-28">
                <div class="site-container">
                    <h2 class="display-md">More work</h2>
                    <div class="mt-12 grid gap-10 md:grid-cols-3">
                        @foreach ($related as $item)
                            <a href="{{ route('projects.show', $item) }}" class="group block">
                                <img src="{{ $item->coverUrl() }}" alt="" class="aspect-[4/3] w-full object-cover" loading="lazy">
                                <h3 class="mt-5 font-display text-2xl font-bold tracking-tight transition group-hover:text-accent" style="line-height: 1.15;">{{ $item->title }}</h3>
                            </a>
                        @endforeach
                    </div>
                </div>
            </section>
        @endif
    </article>
@endsection
