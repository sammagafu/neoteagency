@extends('layouts.site')

@section('content')
    {{-- Hero: brand-first, full-bleed, parallax --}}
    <section class="relative min-h-[100svh] overflow-hidden">
        <div class="parallax-frame">
            <div class="parallax-layer" data-parallax="0.28">
                <img
                    src="{{ asset('images/neote/team.jpg') }}"
                    alt="Neotelabs studio atmosphere"
                >
            </div>
            <div class="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/25"></div>
            <div class="grain absolute inset-0"></div>
        </div>

        <div class="site-container relative flex min-h-[100svh] flex-col justify-end pb-16 pt-32 lg:pb-24 lg:pt-40">
            <p class="wow font-display text-sm font-semibold uppercase tracking-[0.35em] text-accent" data-wow-animation="fadeInDown" data-wow-delay="0.05s">
                {{ $site['site_name'] ?? 'Neotelabs' }}
            </p>
            <h1 class="wow mt-5 max-w-5xl font-display text-5xl font-bold leading-[0.95] tracking-tight text-paper text-balance sm:text-6xl lg:text-8xl" data-wow-animation="fadeInUp" data-wow-delay="0.15s">
                {{ $site['hero_headline'] ?? 'We narrow the gap between Products & Customers' }}
            </h1>
            <p class="wow mt-6 max-w-xl text-base leading-relaxed text-paper/75 sm:text-lg" data-wow-animation="fadeInUp" data-wow-delay="0.28s">
                {{ $site['hero_subheadline'] ?? 'A digital studio in Dar es Salaam crafting strategy, brand, and technology that moves markets.' }}
            </p>
            <div class="wow mt-10 flex flex-wrap gap-3" data-wow-animation="fadeInUp" data-wow-delay="0.4s">
                <a href="{{ route('contact') }}" class="btn-primary bg-paper text-ink hover:bg-accent hover:text-paper">Start a project</a>
                <a href="{{ route('projects.index') }}" class="btn-secondary border-paper/25 bg-transparent text-paper hover:border-accent hover:text-accent">View case studies</a>
            </div>
        </div>
    </section>

    {{-- What we do --}}
    <section class="site-container py-24 lg:py-32">
        <div class="wow max-w-3xl" data-wow-animation="fadeInUp">
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Capabilities</p>
            <h2 class="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">What we do</h2>
            <p class="mt-4 text-lg text-mist">Four disciplines. One outcome — products and brands that feel inevitable.</p>
        </div>

        <div class="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            @foreach ($services as $index => $service)
                <div class="wow border-t border-ink/15 pt-6" data-wow-animation="fadeInUp" data-wow-delay="{{ number_format(0.08 * $index, 2) }}s">
                    <p class="font-display text-sm text-accent">0{{ $index + 1 }}</p>
                    <h3 class="mt-3 font-display text-2xl font-semibold text-ink">{{ $service->title }}</h3>
                    <p class="mt-3 text-sm leading-relaxed text-mist">{{ $service->description }}</p>
                    @if ($service->items)
                        <ul class="mt-6 space-y-2">
                            @foreach ($service->items as $item)
                                <li class="text-sm text-ink/80">{{ $item }}</li>
                            @endforeach
                        </ul>
                    @endif
                </div>
            @endforeach
        </div>
    </section>

    {{-- Latest projects --}}
    <section class="relative overflow-hidden bg-ink py-24 text-paper lg:py-32">
        <div class="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl" data-parallax="0.12"></div>
        <div class="site-container relative">
            <div class="wow flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between" data-wow-animation="fadeInUp">
                <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Selected work</p>
                    <h2 class="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Latest projects</h2>
                    <p class="mt-4 max-w-sm text-paper/65">Creativity is at the heart of all our projects.</p>
                </div>
                <a href="{{ route('projects.index') }}" class="text-sm font-semibold text-accent transition hover:text-paper">All case studies →</a>
            </div>

            <div class="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                @foreach ($projects as $index => $project)
                    <a href="{{ route('projects.show', $project) }}" class="wow group block" data-wow-animation="fadeInUp" data-wow-delay="{{ number_format(0.1 * ($index % 3), 2) }}s">
                        <div class="overflow-hidden bg-ink-soft">
                            <img
                                src="{{ $project->coverUrl() }}"
                                alt="{{ $project->title }}"
                                class="aspect-[4/3] w-full object-cover transition duration-700 ease-agency group-hover:scale-[1.04]"
                                loading="lazy"
                            >
                        </div>
                        <div class="mt-4">
                            <p class="text-xs uppercase tracking-[0.2em] text-paper/45">
                                {{ $project->categories->pluck('name')->join(', ') ?: 'Project' }}
                            </p>
                            <h3 class="mt-2 font-display text-2xl font-semibold transition group-hover:text-accent">{{ $project->title }}</h3>
                        </div>
                    </a>
                @endforeach
            </div>
        </div>
    </section>

    {{-- Approach --}}
    <section class="site-container py-24 lg:py-32">
        <div class="wow max-w-3xl" data-wow-animation="fadeInUp">
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Process</p>
            <h2 class="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Our approach</h2>
        </div>

        @php
            $steps = [
                ['Research', 'We research to understand the vision, audience, product, and goals — then ask again until the brief is sharp.'],
                ['Concept', 'Working with you, our designers craft experiences that are beautiful and unmistakably usable.'],
                ['Development', 'Backend and frontend built for performance and maintainability, with best practices as the default.'],
                ['Quality Assurance', 'We test continuously so every detail ships bug-free and top-notch.'],
                ['Launch & Grow', 'We ship with care, then stay close — measuring, iterating, and compounding results.'],
            ];
        @endphp

        <div class="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            @foreach ($steps as $index => $step)
                <div class="wow rounded-[1.75rem] bg-white/70 p-8 shadow-[0_1px_0_rgba(16,20,26,0.06)] ring-1 ring-ink/5 backdrop-blur" data-wow-animation="zoomIn" data-wow-delay="{{ number_format(0.08 * $index, 2) }}s">
                    <p class="font-display text-sm text-accent">{{ ['One','Two','Three','Four','Five'][$index] }}</p>
                    <h3 class="mt-4 font-display text-3xl font-semibold text-ink">{{ $step[0] }}</h3>
                    <p class="mt-4 text-sm leading-relaxed text-mist">{{ $step[1] }}</p>
                </div>
            @endforeach
        </div>
    </section>

    {{-- Insights --}}
    @if ($insights->isNotEmpty())
        <section class="border-y border-ink/10 bg-white/40 py-24 lg:py-32">
            <div class="site-container">
                <div class="wow flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between" data-wow-animation="fadeInUp">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Thinking</p>
                        <h2 class="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Insights</h2>
                    </div>
                    <a href="{{ route('insights.index') }}" class="text-sm font-semibold text-ink transition hover:text-accent">Browse insights →</a>
                </div>

                <div class="mt-12 grid gap-8 lg:grid-cols-3">
                    @foreach ($insights as $index => $insight)
                        <a href="{{ route('insights.show', $insight) }}" class="wow group block" data-wow-animation="fadeInUp" data-wow-delay="{{ number_format(0.12 * $index, 2) }}s">
                            <div class="overflow-hidden">
                                <img src="{{ $insight->coverUrl() }}" alt="" class="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.03]" loading="lazy">
                            </div>
                            <p class="mt-4 text-xs uppercase tracking-[0.2em] text-mist">
                                {{ optional($insight->published_at)->format('M j, Y') }}
                            </p>
                            <h3 class="mt-2 font-display text-2xl font-semibold text-ink transition group-hover:text-accent">{{ $insight->title }}</h3>
                            <p class="mt-2 text-sm text-mist">{{ $insight->excerpt }}</p>
                        </a>
                    @endforeach
                </div>
            </div>
        </section>
    @endif

    {{-- CTA --}}
    <section class="site-container py-24 lg:py-32">
        <div class="wow relative overflow-hidden rounded-[2rem] bg-accent px-8 py-16 text-ink sm:px-12 lg:px-16" data-wow-animation="fadeInUp">
            <div class="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/25 blur-2xl" data-parallax="0.18"></div>
            <p class="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Ready to raise the bar?
            </p>
            <p class="mt-4 max-w-xl text-base text-ink/75">
                Tell us about your product, audience, and ambition. We’ll reply with a clear next step.
            </p>
            <a href="{{ route('contact') }}" class="btn-primary mt-8 bg-ink text-paper hover:bg-ink-soft">Say hello</a>
        </div>
    </section>
@endsection
