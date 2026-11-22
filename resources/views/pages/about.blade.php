@extends('layouts.site')

@section('title', 'About — '.($site['site_name'] ?? 'Neotelabs'))

@section('content')
    <section class="relative min-h-[70vh] overflow-hidden pt-28">
        <div class="absolute inset-0">
            <img src="{{ asset('images/neote/team.jpg') }}" alt="" class="h-full w-full object-cover">
            <div class="absolute inset-0 bg-ink/70"></div>
            <div class="grain absolute inset-0"></div>
        </div>
        <div class="site-container relative flex min-h-[70vh] flex-col justify-end pb-16">
            <p class="reveal font-display text-sm font-semibold uppercase tracking-[0.35em] text-accent">
                {{ $site['site_name'] ?? 'Neotelabs' }}
            </p>
            <h1 class="reveal reveal-delay-1 mt-5 max-w-5xl font-display text-4xl font-bold tracking-tight text-paper text-balance sm:text-6xl lg:text-7xl">
                Together, we lead the digital part of your business into success
            </h1>
            <p class="reveal reveal-delay-2 mt-6 max-w-2xl text-lg text-paper/75">
                {{ $site['about_blurb'] ?? '' }}
            </p>
        </div>
    </section>

    <section class="site-container py-24 lg:py-32">
        <div class="grid gap-10 lg:grid-cols-12">
            <h2 class="reveal font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:col-span-6">
                Neotelabs is the company if you want to grow online.
            </h2>
            <p class="reveal reveal-delay-1 text-base leading-relaxed text-mist lg:col-span-6 lg:pt-2">
                We have a go-getter mentality and take the customer with us. With clear communication, without lengthy meetings or other unnecessary fuss, we embark on the adventure together. No empty promises — immediately demonstrable results.
            </p>
        </div>
    </section>

    <section class="border-y border-ink/10 bg-white/50 py-24 lg:py-32">
        <div class="site-container">
            <div class="reveal max-w-3xl">
                <p class="text-xs font-semibold uppercase tracking-[0.28em] text-accent">People</p>
                <h2 class="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">The face of Neotelabs</h2>
                <p class="mt-4 text-lg text-mist">Meet our team of creatives, fun-lovers, and magic makers.</p>
            </div>

            <div class="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                @foreach ($team as $index => $member)
                    <article class="reveal reveal-delay-{{ min($index % 4, 3) }} group">
                        <div class="overflow-hidden bg-paper-deep">
                            <img
                                src="{{ $member->photoUrl() }}"
                                alt="{{ $member->name }}"
                                class="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                                loading="lazy"
                            >
                        </div>
                        <h3 class="mt-4 font-display text-xl font-semibold text-ink">{{ $member->name }}</h3>
                        <p class="mt-1 text-sm text-mist">{{ $member->role }}</p>
                    </article>
                @endforeach
            </div>
        </div>
    </section>
@endsection
