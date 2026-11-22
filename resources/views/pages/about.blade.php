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

    <section class="site-container py-28 lg:py-40">
        <div class="grid gap-16 lg:grid-cols-2">
            <div class="wow" data-wow-animation="fadeInUp">
                <p class="eyebrow">Mission</p>
                <h2 class="mt-6 display-md">Propelling brands toward exceptional digital success</h2>
                <p class="mt-8 body-lg text-mist">
                    We are the catalyst that elevates brands by delivering innovative, results-driven digital marketing solutions — with excellence, expertise, and tailored strategy.
                </p>
            </div>
            <div class="wow" data-wow-animation="fadeInUp" data-wow-delay="0.12s">
                <p class="eyebrow">Vision</p>
                <h2 class="mt-6 display-md">Revolutionizing the digital landscape</h2>
                <p class="mt-8 body-lg text-mist">
                    Setting new benchmarks for marketing and advertising excellence. Empowering clients to dominate their industries and achieve sustainable growth.
                </p>
            </div>
        </div>
    </section>
@endsection
