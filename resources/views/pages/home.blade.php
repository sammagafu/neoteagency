@extends('layouts.site')

@section('content')
    {{-- Hero: brand + one headline + one line + CTA + full-bleed video --}}
    <section class="relative min-h-[100svh] overflow-hidden bg-ink text-paper">
        <div class="absolute inset-0">
            <video
                class="hero-video"
                autoplay
                muted
                loop
                playsinline
                preload="metadata"
                poster="{{ asset('videos/hero-poster.jpg') }}"
            >
                <source src="{{ asset('videos/hero-loop.mp4') }}" type="video/mp4">
            </video>
            <div class="absolute inset-0 bg-ink/35"></div>
            <div class="grain absolute inset-0"></div>
        </div>

        <div class="site-container relative flex min-h-[100svh] flex-col justify-end pb-16 pt-32 lg:pb-24 lg:pt-40">
            <p class="wow eyebrow text-paper/70" data-wow-animation="fadeInDown" data-wow-delay="0.05s">
                {{ $site['site_name'] ?? 'Neotelabs' }}
            </p>
            <h1 class="wow mt-8 display-xl hero-title text-paper" data-wow-animation="fadeInUp" data-wow-delay="0.12s">
                We bridge the gap between
                <span class="hero-word hero-word--a">Products</span>
                &amp;
                <span class="hero-word hero-word--b">Customers</span>
            </h1>
            <p class="wow mt-10 hero-lede text-paper/75" data-wow-animation="fadeInUp" data-wow-delay="0.28s">
                {{ $site['hero_subheadline'] ?? 'A digital growth partner turning brand ambition into experiences that convert.' }}
            </p>
            <div class="wow mt-12 flex flex-wrap gap-4" data-wow-animation="fadeInUp" data-wow-delay="0.4s">
                <a href="{{ route('contact') }}" class="btn-primary bg-paper text-ink hover:bg-accent hover:text-paper">Start a project</a>
                <a href="{{ route('projects.index') }}" class="btn-ghost-light">View work</a>
            </div>
        </div>
    </section>

    {{-- Intro --}}
    <section class="site-container py-28 lg:py-40">
        <div class="wow max-w-5xl" data-wow-animation="fadeInUp">
            <p class="eyebrow">Digital growth partner</p>
            <h2 class="mt-8 display-lg text-balance">
                Great products deserve exceptional experiences — online, offline, and everywhere between.
            </h2>
            <p class="mt-10 body-lg text-mist">
                We blend strategic innovation with proven expertise to drive results that extend beyond the digital realm. Setting standards — not just meeting them.
            </p>
        </div>
    </section>

    {{-- What we love to do --}}
    <section class="border-y border-ink/10 bg-white py-28 lg:py-40">
        <div class="site-container">
            <div class="wow flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between" data-wow-animation="fadeInUp">
                <div class="max-w-3xl">
                    <p class="eyebrow">Capabilities</p>
                    <h2 class="mt-6 display-lg">What we love to do</h2>
                </div>
            </div>

            <div class="mt-20 divide-y divide-ink/10">
                @foreach ($services as $index => $service)
                    <div class="wow grid gap-6 py-12 lg:grid-cols-12 lg:gap-10" data-wow-animation="fadeInUp" data-wow-delay="{{ number_format(0.05 * $index, 2) }}s">
                        <div class="lg:col-span-1">
                            <p class="text-sm font-medium text-mist">0{{ $index + 1 }}</p>
                        </div>
                        <div class="lg:col-span-4">
                            <h3 class="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{{ $service->title }}</h3>
                            @if ($service->description)
                                <p class="mt-4 max-w-sm text-sm font-light leading-relaxed text-mist">{{ $service->description }}</p>
                            @endif
                        </div>
                        <div class="lg:col-span-7">
                            @if ($service->items)
                                <ul class="grid gap-x-10 gap-y-3 sm:grid-cols-2">
                                    @foreach ($service->items as $item)
                                        <li class="border-t border-ink/10 pt-3 text-sm text-ink/80">{{ $item }}</li>
                                    @endforeach
                                </ul>
                            @endif
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- Selected work --}}
    <section class="site-container py-28 lg:py-40">
        <div class="wow flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between" data-wow-animation="fadeInUp">
            <div>
                <p class="eyebrow">Selected work</p>
                <h2 class="mt-6 display-lg">Recent engagements</h2>
            </div>
            <a href="{{ route('projects.index') }}" class="text-sm font-medium uppercase tracking-[0.16em] text-ink underline underline-offset-8">All work</a>
        </div>

        <div class="mt-20 space-y-24">
            @foreach ($projects->take(3) as $index => $project)
                <a href="{{ route('projects.show', $project) }}" class="wow group block" data-wow-animation="fadeInUp" data-wow-delay="{{ number_format(0.08 * $index, 2) }}s">
                    <div class="overflow-hidden bg-ink">
                        <img
                            src="{{ $project->coverUrl() }}"
                            alt="{{ $project->title }}"
                            class="aspect-[16/9] w-full object-cover transition duration-[1.1s] ease-agency group-hover:scale-[1.03]"
                            loading="lazy"
                        >
                    </div>
                    <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p class="text-xs uppercase tracking-[0.2em] text-mist">
                                {{ $project->categories->pluck('name')->join(' / ') ?: 'Project' }}
                            </p>
                            <h3 class="mt-3 font-display text-3xl font-bold tracking-tight transition group-hover:text-accent sm:text-5xl">{{ $project->title }}</h3>
                        </div>
                        <span class="text-sm uppercase tracking-[0.16em] text-mist">View case</span>
                    </div>
                </a>
            @endforeach
        </div>
    </section>

    {{-- Approach --}}
    <section class="bg-ink py-28 text-paper lg:py-40">
        <div class="site-container">
            <div class="wow max-w-4xl" data-wow-animation="fadeInUp">
                <p class="eyebrow text-paper/45">Process</p>
                <h2 class="mt-6 display-lg">We turn vision into action with precision and purpose</h2>
            </div>

            @php
                $steps = [
                    ['Research & Discovery', 'Understanding is everything. We immerse in your vision, audience, and goals to uncover insights that drive impact.'],
                    ['Collaborative Planning', 'Great ideas are born together. We challenge assumptions, refine concepts, and align on a bold plan of action.'],
                    ['Innovative Execution', 'Execution is where mastery meets creativity — solutions that stand out and set the pace.'],
                    ['Data-Driven Solutions', 'Every move is powered by analytics. We measure, refine, and adapt until success is engineered.'],
                    ['Tangible Results', 'From campaigns to conversions, we deliver outcomes that elevate the business in every digital aspect.'],
                    ['Relentless Improvement', 'The best is never finished. We evaluate, innovate, and evolve so growth keeps accelerating.'],
                ];
            @endphp

            <div class="mt-20 grid gap-x-12 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
                @foreach ($steps as $index => $step)
                    <div class="wow" data-wow-animation="fadeInUp" data-wow-delay="{{ number_format(0.06 * $index, 2) }}s">
                        <p class="text-xs uppercase tracking-[0.22em] text-paper/40">0{{ $index + 1 }}</p>
                        <h3 class="mt-5 font-display text-2xl font-bold tracking-tight sm:text-3xl">{{ $step[0] }}</h3>
                        <p class="mt-4 max-w-sm text-sm font-light leading-relaxed text-paper/60">{{ $step[1] }}</p>
                    </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- Insights --}}
    @if ($insights->isNotEmpty())
        <section class="site-container py-28 lg:py-40">
            <div class="wow flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between" data-wow-animation="fadeInUp">
                <div>
                    <p class="eyebrow">Thinking</p>
                    <h2 class="mt-6 display-lg">Insights</h2>
                </div>
                <a href="{{ route('insights.index') }}" class="text-sm font-medium uppercase tracking-[0.16em] text-ink underline underline-offset-8">Browse</a>
            </div>

            <div class="mt-16 grid gap-12 lg:grid-cols-3">
                @foreach ($insights as $index => $insight)
                    <a href="{{ route('insights.show', $insight) }}" class="wow group block" data-wow-animation="fadeInUp" data-wow-delay="{{ number_format(0.1 * $index, 2) }}s">
                        <div class="overflow-hidden bg-paper-deep">
                            <img src="{{ $insight->coverUrl() }}" alt="" class="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.03]" loading="lazy">
                        </div>
                        <p class="mt-5 text-xs uppercase tracking-[0.2em] text-mist">{{ optional($insight->published_at)->format('M j, Y') }}</p>
                        <h3 class="mt-3 font-display text-2xl font-bold tracking-tight transition group-hover:text-accent">{{ $insight->title }}</h3>
                    </a>
                @endforeach
            </div>
        </section>
    @endif

    {{-- CTA --}}
    <section class="border-t border-ink/10">
        <div class="site-container py-28 lg:py-40">
            <div class="wow max-w-5xl" data-wow-animation="fadeInUp">
                <h2 class="display-lg text-balance">Ready to elevate your brand and drive real results?</h2>
                <p class="mt-8 max-w-xl text-lg font-light text-mist">Let’s connect and start creating the future together.</p>
                <a href="{{ route('contact') }}" class="btn-primary mt-12">Say hello</a>
            </div>
        </div>
    </section>
@endsection
