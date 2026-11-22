@extends('layouts.site')

@section('title', 'Contact — '.($site['site_name'] ?? 'Neotelabs'))

@section('content')
    <x-site.page-hero
        eyebrow="Contact"
        lede="Tell us about the brand, the ambition, and the outcome you want. We’ll bring the strategy, craft, and momentum."
    >
        <x-slot:title>
            Don’t be shy,<br><span class="hero-word hero-word--b">say hi!</span>
        </x-slot:title>
        <x-slot:actions>
            <a href="#brief" class="btn-primary bg-paper text-ink hover:bg-accent hover:text-paper">Start a brief</a>
            <a href="mailto:{{ $site['email'] ?? 'info@neotelabs.co.tz' }}" class="btn-ghost-light">{{ $site['email'] ?? 'info@neotelabs.co.tz' }}</a>
        </x-slot:actions>
    </x-site.page-hero>

    <section id="brief" class="site-container scroll-mt-28 py-16 lg:py-24">
        <div class="grid gap-14 lg:grid-cols-12">
            <div class="wow space-y-10 lg:col-span-4" data-wow-animation="fadeInUp">
                <div>
                    <p class="eyebrow">Address</p>
                    <p class="mt-3 body-lg text-ink">{{ $site['address'] ?? '' }}</p>
                </div>
                <div>
                    <p class="eyebrow">Email</p>
                    <a href="mailto:{{ $site['email'] ?? '' }}" class="mt-3 block text-xl text-ink underline underline-offset-4 hover:text-accent">{{ $site['email'] ?? '' }}</a>
                </div>
                <div>
                    <p class="eyebrow">Phone</p>
                    <a href="tel:{{ preg_replace('/\s+/', '', $site['phone'] ?? '') }}" class="mt-3 block text-xl text-ink underline underline-offset-4 hover:text-accent">{{ $site['phone'] ?? '' }}</a>
                </div>
            </div>

            <div class="wow lg:col-span-8" data-wow-animation="fadeInUp" data-wow-delay="0.12s">
                @if (session('success'))
                    <div class="mb-8 border border-ink/10 bg-white px-5 py-4 text-base text-ink">
                        {{ session('success') }}
                    </div>
                @endif

                <p class="eyebrow">Project brief</p>
                <h2 class="mt-4 display-md">Tell us about your project and goals</h2>

                <form method="POST" action="{{ route('contact.store') }}" class="mt-12 space-y-10">
                    @csrf
                    <div>
                        <label class="admin-label text-base" for="name">01 · What’s your name?</label>
                        <input id="name" name="name" type="text" value="{{ old('name') }}" required class="admin-input rounded-none border-0 border-b border-ink/20 bg-transparent px-0 text-lg shadow-none focus:border-ink focus:ring-0">
                        @error('name') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
                    </div>
                    <div>
                        <label class="admin-label text-base" for="organization">02 · What’s the name of your organization?</label>
                        <input id="organization" name="organization" type="text" value="{{ old('organization') }}" class="admin-input rounded-none border-0 border-b border-ink/20 bg-transparent px-0 text-lg shadow-none focus:border-ink focus:ring-0">
                    </div>
                    <div>
                        <label class="admin-label text-base" for="email">03 · What’s your email?</label>
                        <input id="email" name="email" type="email" value="{{ old('email') }}" required class="admin-input rounded-none border-0 border-b border-ink/20 bg-transparent px-0 text-lg shadow-none focus:border-ink focus:ring-0">
                        @error('email') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
                    </div>
                    <div>
                        <label class="admin-label text-base" for="phone">04 · Phone (optional)</label>
                        <input id="phone" name="phone" type="text" value="{{ old('phone') }}" class="admin-input rounded-none border-0 border-b border-ink/20 bg-transparent px-0 text-lg shadow-none focus:border-ink focus:ring-0">
                    </div>
                    <div>
                        <label class="admin-label text-base" for="message">05 · Tell us about the project</label>
                        <textarea id="message" name="message" rows="5" required class="admin-input rounded-none border-0 border-b border-ink/20 bg-transparent px-0 text-lg shadow-none focus:border-ink focus:ring-0">{{ old('message') }}</textarea>
                        @error('message') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
                    </div>
                    <button type="submit" class="btn-primary">Send message</button>
                </form>
            </div>
        </div>
    </section>
@endsection
