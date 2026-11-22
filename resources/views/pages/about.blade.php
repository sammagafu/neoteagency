@extends('layouts.site')

@section('title', 'About — '.($site['site_name'] ?? 'Neotelabs'))

@section('content')
    <section class="site-container pb-20 pt-36 lg:pb-28 lg:pt-44">
        <p class="wow eyebrow" data-wow-animation="fadeInDown">About</p>
        <h1 class="wow mt-8 max-w-5xl display-xl" data-wow-animation="fadeInUp" data-wow-delay="0.1s">
            Together, we lead the digital part of your business into success
        </h1>
        <p class="wow mt-10 max-w-2xl text-lg font-light leading-relaxed text-mist" data-wow-animation="fadeInUp" data-wow-delay="0.22s">
            {{ $site['about_blurb'] ?? 'We are a young and creative team dedicated to raise the bar of your product just a bit higher to the top position in the market.' }}
        </p>
    </section>

    <section class="relative min-h-[60vh] overflow-hidden bg-ink">
        <div class="parallax-frame">
            <div class="parallax-layer" data-parallax="0.22">
                <img src="{{ asset('images/neote/team.jpg') }}" alt="">
            </div>
            <div class="absolute inset-0 bg-ink/35"></div>
        </div>
    </section>

    <section class="site-container py-28 lg:py-40">
        <div class="grid gap-16 lg:grid-cols-2">
            <div class="wow" data-wow-animation="fadeInUp">
                <p class="eyebrow">Mission</p>
                <h2 class="mt-6 display-md">Propelling brands toward exceptional digital success</h2>
                <p class="mt-6 text-base font-light leading-relaxed text-mist">
                    We are the catalyst that elevates brands by delivering innovative, results-driven digital marketing solutions — with excellence, expertise, and tailored strategy.
                </p>
            </div>
            <div class="wow" data-wow-animation="fadeInUp" data-wow-delay="0.12s">
                <p class="eyebrow">Vision</p>
                <h2 class="mt-6 display-md">Revolutionizing the digital landscape</h2>
                <p class="mt-6 text-base font-light leading-relaxed text-mist">
                    Setting new benchmarks for marketing and advertising excellence. Empowering clients to dominate their industries and achieve sustainable growth.
                </p>
            </div>
        </div>
    </section>

    <section class="border-y border-ink/10 bg-white py-28 lg:py-40">
        <div class="site-container">
            <div class="wow max-w-3xl" data-wow-animation="fadeInUp">
                <p class="eyebrow">People</p>
                <h2 class="mt-6 display-lg">The face of Neotelabs</h2>
                <p class="mt-6 text-lg font-light text-mist">A young, creative team of professionals who love what we do.</p>
            </div>

            <div class="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                @foreach ($team as $index => $member)
                    <article class="wow group" data-wow-animation="fadeInUp" data-wow-delay="{{ number_format(0.08 * ($index % 4), 2) }}s">
                        <div class="overflow-hidden bg-paper-deep">
                            <img
                                src="{{ $member->photoUrl() }}"
                                alt="{{ $member->name }}"
                                class="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                                loading="lazy"
                            >
                        </div>
                        <h3 class="mt-5 font-display text-xl font-bold tracking-tight">{{ $member->name }}</h3>
                        <p class="mt-1 text-sm font-light text-mist">{{ $member->role }}</p>
                    </article>
                @endforeach
            </div>
        </div>
    </section>
@endsection
