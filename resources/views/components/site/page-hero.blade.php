@props([
    'eyebrow' => '',
    'lede' => '',
    'image' => null,
    'dark' => true,
])

@php
    $bg = $image ?: asset('videos/hero-poster.jpg');
@endphp

<section {{ $attributes->merge(['class' => 'page-hero relative overflow-hidden '.($dark ? 'bg-ink text-paper' : 'bg-paper text-ink')]) }}>
    @if ($dark)
        <div class="absolute inset-0">
            <img src="{{ $bg }}" alt="" class="h-full w-full object-cover opacity-55" loading="eager">
            <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/30"></div>
            <div class="grain absolute inset-0"></div>
        </div>
    @endif

    <div class="site-container relative flex min-h-[72svh] flex-col justify-end pb-16 pt-36 lg:min-h-[78svh] lg:pb-24 lg:pt-44">
        @if ($eyebrow !== '')
            <p class="wow eyebrow {{ $dark ? 'text-paper/70' : '' }}" data-wow-animation="fadeInDown">{{ $eyebrow }}</p>
        @endif

        <h1 class="wow mt-8 max-w-5xl display-xl hero-title {{ $dark ? 'text-paper' : 'text-ink' }}" data-wow-animation="fadeInUp" data-wow-delay="0.1s">
            {{ $title }}
        </h1>

        @if ($lede !== '')
            <p class="wow mt-10 hero-lede font-light {{ $dark ? 'text-paper/75' : 'text-mist' }}" data-wow-animation="fadeInUp" data-wow-delay="0.22s">
                {{ $lede }}
            </p>
        @endif

        @isset($actions)
            <div class="wow mt-12 flex flex-wrap gap-4" data-wow-animation="fadeInUp" data-wow-delay="0.34s">
                {{ $actions }}
            </div>
        @endisset
    </div>
</section>
