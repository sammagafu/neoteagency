@extends('layouts.site')

@section('title', $insight->title.' — '.($site['site_name'] ?? 'Neotelabs'))
@section('meta_description', $insight->excerpt ?? $insight->title)

@section('content')
    <article class="site-container max-w-4xl pb-24 pt-32 lg:pb-32 lg:pt-40">
        <p class="reveal text-xs uppercase tracking-[0.25em] text-accent">
            {{ $insight->categories->pluck('name')->join(' · ') }}
            @if ($insight->published_at)
                · {{ $insight->published_at->format('M j, Y') }}
            @endif
        </p>
        <h1 class="reveal reveal-delay-1 mt-5 font-display text-4xl font-bold tracking-tight text-ink text-balance sm:text-6xl">
            {{ $insight->title }}
        </h1>
        @if ($insight->excerpt)
            <p class="reveal reveal-delay-2 mt-6 text-xl text-mist">{{ $insight->excerpt }}</p>
        @endif
        <div class="reveal reveal-delay-3 mt-10 overflow-hidden">
            <img src="{{ $insight->coverUrl() }}" alt="" class="aspect-[16/9] w-full object-cover">
        </div>
        <div class="reveal prose-site mt-12 text-lg">
            {!! $insight->content !!}
        </div>
    </article>
@endsection
