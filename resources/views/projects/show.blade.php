@extends('layouts.site')

@section('title', $project->title.' — '.($site['site_name'] ?? 'Neotelabs'))
@section('meta_description', $project->excerpt ?? $project->title)

@section('content')
    <article>
        <section class="relative min-h-[65vh] overflow-hidden pt-28">
            <div class="parallax-frame">
                <div class="parallax-layer" data-parallax="0.26">
                    <img src="{{ $project->coverUrl() }}" alt="">
                </div>
                <div class="absolute inset-0 bg-ink/65"></div>
            </div>
            <div class="site-container relative flex min-h-[65vh] flex-col justify-end pb-14">
                <p class="wow text-xs uppercase tracking-[0.25em] text-accent" data-wow-animation="fadeInDown">
                    {{ $project->categories->pluck('name')->join(' · ') }}
                </p>
                <h1 class="wow mt-4 max-w-4xl font-display text-4xl font-bold tracking-tight text-paper sm:text-6xl" data-wow-animation="fadeInUp" data-wow-delay="0.12s">
                    {{ $project->title }}
                </h1>
                <div class="wow mt-6 flex flex-wrap gap-6 text-sm text-paper/70" data-wow-animation="fadeInUp" data-wow-delay="0.24s">
                    @if ($project->client)<span>Client · {{ $project->client }}</span>@endif
                    @if ($project->skills)<span>Skills · {{ $project->skills }}</span>@endif
                </div>
            </div>
        </section>

        <section class="site-container grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
            <div class="reveal prose-site lg:col-span-8">
                {!! $project->content !!}
            </div>
            <aside class="reveal reveal-delay-1 lg:col-span-4">
                <div class="rounded-3xl bg-white/70 p-6 ring-1 ring-ink/10">
                    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-mist">Overview</p>
                    <p class="mt-3 text-sm leading-relaxed text-ink/80">{{ $project->excerpt }}</p>
                </div>
            </aside>
        </section>

        @if ($related->isNotEmpty())
            <section class="border-t border-ink/10 bg-white/40 py-20">
                <div class="site-container">
                    <h2 class="font-display text-3xl font-semibold text-ink">More work</h2>
                    <div class="mt-10 grid gap-8 md:grid-cols-3">
                        @foreach ($related as $item)
                            <a href="{{ route('projects.show', $item) }}" class="group block">
                                <img src="{{ $item->coverUrl() }}" alt="" class="aspect-[4/3] w-full object-cover" loading="lazy">
                                <h3 class="mt-3 font-display text-xl font-semibold transition group-hover:text-accent">{{ $item->title }}</h3>
                            </a>
                        @endforeach
                    </div>
                </div>
            </section>
        @endif
    </article>
@endsection
