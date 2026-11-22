@extends('layouts.site')

@section('title', 'About — '.($site['site_name'] ?? 'Neotelabs'))

@section('content')
    <x-site.page-hero
        eyebrow="About"
        lede="{{ $site['about_blurb'] ?? 'A young, creative team raising the bar of your product just a bit higher — toward the top of the market.' }}"
        :image="asset('images/neote/team.jpg')"
    >
        <x-slot:title>
            We lead the <span class="hero-word hero-word--a">digital</span> part of your business into <span class="hero-word hero-word--b">success</span>
        </x-slot:title>
        <x-slot:actions>
            <a href="{{ route('contact') }}" class="btn-primary bg-paper text-ink hover:bg-accent hover:text-paper">Work with us</a>
            <a href="{{ route('projects.index') }}" class="btn-ghost-light">See the work</a>
        </x-slot:actions>
    </x-site.page-hero>

    <section class="site-container py-16 lg:py-24">
        <div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div class="wow" data-wow-animation="fadeInUp">
                <p class="eyebrow">Mission</p>
                <h2 class="mt-5 display-md">Propelling brands toward exceptional digital success</h2>
                <p class="mt-6 body-lg text-mist">
                    We are the catalyst that elevates brands by delivering innovative, results-driven digital marketing solutions — with excellence, expertise, and tailored strategy.
                </p>
            </div>
            <div class="wow" data-wow-animation="fadeInUp" data-wow-delay="0.12s">
                <p class="eyebrow">Vision</p>
                <h2 class="mt-5 display-md">Revolutionizing the digital landscape</h2>
                <p class="mt-6 body-lg text-mist">
                    Setting new benchmarks for marketing and advertising excellence. Empowering clients to dominate their industries and achieve sustainable growth.
                </p>
            </div>
        </div>
    </section>

    @php
        $principles = [
            ['Clarity', 'We start with audience truth and a sharp brief — so every move has a reason.'],
            ['Craft', 'Design, technology, and story are built to the same standard: precise, distinctive, usable.'],
            ['Outcomes', 'We measure what matters. Beautiful work that doesn’t move the business isn’t finished.'],
            ['Partnership', 'We challenge assumptions, share ownership, and stay accountable from kickoff to launch.'],
        ];
    @endphp

    <section class="border-y border-ink/10 bg-white py-16 lg:py-24">
        <div class="site-container">
            <div class="wow max-w-3xl" data-wow-animation="fadeInUp">
                <p class="eyebrow">Principles</p>
                <h2 class="mt-5 display-lg">How we work</h2>
                <p class="mt-6 body-lg text-mist">
                    Four commitments that shape every engagement — before the first pixel, and after the last launch.
                </p>
            </div>

            <div class="mt-12 divide-y divide-ink/10">
                @foreach ($principles as $index => $principle)
                    <div class="wow grid gap-3 py-8 lg:grid-cols-12 lg:gap-10 lg:py-10" data-wow-animation="fadeInUp" data-wow-delay="{{ number_format(0.06 * $index, 2) }}s">
                        <p class="text-sm font-medium text-mist lg:col-span-1">0{{ $index + 1 }}</p>
                        <h3 class="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:col-span-4" style="line-height: 1.15;">
                            {{ $principle[0] }}
                        </h3>
                        <p class="body-lg text-mist lg:col-span-7">{{ $principle[1] }}</p>
                    </div>
                @endforeach
            </div>
        </div>
    </section>

    <section class="site-container py-16 lg:py-24">
        <div class="wow max-w-5xl" data-wow-animation="fadeInUp">
            <p class="eyebrow">Next step</p>
            <h2 class="mt-5 display-lg text-balance">
                Ready to <span class="hero-word hero-word--b" style="color: #e23b1c;">raise the bar</span>?
            </h2>
            <p class="mt-6 body-lg text-mist">
                Tell us about the brand, the ambition, and the outcome you want. We’ll bring the strategy, craft, and momentum.
            </p>
            <div class="mt-8 flex flex-wrap gap-4">
                <a href="{{ route('contact') }}" class="btn-primary">Start a project</a>
                <a href="{{ route('projects.index') }}" class="btn-secondary">View work</a>
            </div>
        </div>
    </section>
@endsection
