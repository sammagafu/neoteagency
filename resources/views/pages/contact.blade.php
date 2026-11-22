@extends('layouts.site')

@section('title', 'Contact — '.($site['site_name'] ?? 'Neotelabs'))

@section('content')
    <section class="site-container pb-24 pt-32 lg:pb-32 lg:pt-40">
        <div class="reveal max-w-4xl">
            <p class="font-display text-sm font-semibold uppercase tracking-[0.35em] text-accent">
                {{ $site['site_name'] ?? 'Neotelabs' }}
            </p>
            <h1 class="mt-5 font-display text-5xl font-bold tracking-tight text-ink text-balance sm:text-6xl lg:text-7xl">
                Don’t be shy,<br>say hi!
            </h1>
        </div>

        <div class="mt-16 grid gap-14 lg:grid-cols-12">
            <div class="reveal space-y-8 lg:col-span-4">
                <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-mist">Address</p>
                    <p class="mt-2 text-lg text-ink">{{ $site['address'] ?? '' }}</p>
                </div>
                <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-mist">Email</p>
                    <a href="mailto:{{ $site['email'] ?? '' }}" class="mt-2 block text-lg text-ink hover:text-accent">{{ $site['email'] ?? '' }}</a>
                </div>
                <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-mist">Phone</p>
                    <a href="tel:{{ preg_replace('/\s+/', '', $site['phone'] ?? '') }}" class="mt-2 block text-lg text-ink hover:text-accent">{{ $site['phone'] ?? '' }}</a>
                </div>
            </div>

            <div class="reveal reveal-delay-1 lg:col-span-8">
                @if (session('success'))
                    <div class="mb-8 rounded-2xl border border-accent/30 bg-accent-soft px-5 py-4 text-sm text-ink">
                        {{ session('success') }}
                    </div>
                @endif

                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-mist">Tell us about your project and goals</p>

                <form method="POST" action="{{ route('contact.store') }}" class="mt-8 space-y-8">
                    @csrf
                    <div>
                        <label class="admin-label" for="name">01 · What’s your name?</label>
                        <input id="name" name="name" type="text" value="{{ old('name') }}" required class="admin-input border-0 border-b border-ink/20 bg-transparent px-0 shadow-none focus:border-accent focus:ring-0">
                        @error('name') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
                    </div>
                    <div>
                        <label class="admin-label" for="organization">02 · What’s the name of your organization?</label>
                        <input id="organization" name="organization" type="text" value="{{ old('organization') }}" class="admin-input border-0 border-b border-ink/20 bg-transparent px-0 shadow-none focus:border-accent focus:ring-0">
                    </div>
                    <div>
                        <label class="admin-label" for="email">03 · What’s your email?</label>
                        <input id="email" name="email" type="email" value="{{ old('email') }}" required class="admin-input border-0 border-b border-ink/20 bg-transparent px-0 shadow-none focus:border-accent focus:ring-0">
                        @error('email') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
                    </div>
                    <div>
                        <label class="admin-label" for="phone">04 · Phone (optional)</label>
                        <input id="phone" name="phone" type="text" value="{{ old('phone') }}" class="admin-input border-0 border-b border-ink/20 bg-transparent px-0 shadow-none focus:border-accent focus:ring-0">
                    </div>
                    <div>
                        <label class="admin-label" for="message">05 · Tell us about the project</label>
                        <textarea id="message" name="message" rows="5" required class="admin-input border-0 border-b border-ink/20 bg-transparent px-0 shadow-none focus:border-accent focus:ring-0">{{ old('message') }}</textarea>
                        @error('message') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
                    </div>
                    <button type="submit" class="btn-primary">Send message</button>
                </form>
            </div>
        </div>
    </section>
@endsection
