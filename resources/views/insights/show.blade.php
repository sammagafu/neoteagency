@extends('layouts.site')

@section('title', $insight->title.' — '.($site['site_name'] ?? 'Neotelabs'))
@section('meta_description', $insight->excerpt ?? $insight->title)

@section('content')
    <article>
        <x-site.page-hero
            :eyebrow="trim(($insight->categories->pluck('name')->join(' · ') ?: 'Insight').($insight->published_at ? ' · '.$insight->published_at->format('M j, Y') : ''))"
            :lede="$insight->excerpt ?? ''"
            :image="$insight->coverUrl()"
        >
            <x-slot:title>{{ $insight->title }}</x-slot:title>
        </x-site.page-hero>

        <section class="site-container max-w-4xl py-20 lg:py-28">
            <div class="wow prose-site text-lg" data-wow-animation="fadeInUp">
                {!! $insight->content !!}
            </div>
        </section>
    </article>
@endsection
