@extends('layouts.site')

@section('title', 'Contact — '.($site['site_name'] ?? 'Neotelabs'))

@section('content')
    <section class="site-container pb-24 pt-36 lg:pb-32 lg:pt-44">
        <p class="wow eyebrow" data-wow-animation="fadeInDown">Contact</p>
        <h1 class="wow mt-8 display-xl" data-wow-animation="fadeInUp" data-wow-delay="0.1s">
            Don’t be shy,<br>say hi!
        </h1>

        <div class="mt-20 grid gap-16 lg:grid-cols-12">
            <div class="wow space-y-10 lg:col-span-4" data-wow-animation="fadeInUp">
                <div>
                    <p class="eyebrow">Address</p>
                    <p class="mt-3 text-base font-light leading-relaxed text-ink">{{ $site['address'] ?? '' }}</p>
                </div>
                <div>
                    <p class="eyebrow">Email</p>
                    <a href="mailto:{{ $site['email'] ?? '' }}" class="mt-3 block text-base text-ink underline underline-offset-4 hover:text-accent">{{ $site['email'] ?? '' }}</a>
                </div>
                <div>
                    <p class="eyebrow">Phone</p>
                    <a href="tel:{{ preg_replace('/\s+/', '', $site['phone'] ?? '') }}" class="mt-3 block text-base text-ink underline underline-offset-4 hover:text-accent">{{ $site['phone'] ?? '' }}</a>
                </div>
            </div>

            <div class="wow lg:col-span-8" data-wow-animation="fadeInUp" data-wow-delay="0.12s">
                @if (session('success'))
                    <div class="mb-8 border border-ink/10 bg-white px-5 py-4 text-sm text-ink">
                        {{ session('success') }}
                    </div>
                @endif

                <p class="eyebrow">Tell us about your project and goals</p>

                <form method="POST" action="{{ route('contact.store') }}" class="mt-10 space-y-10">
                    @csrf
                    <div>
                        <label class="admin-label" for="name">01 · What’s your name?</label>
                        <input id="name" name="name" type="text" value="{{ old('name') }}" required class="admin-input rounded-none border-0 border-b border-ink/20 bg-transparent px-0 shadow-none focus:border-ink focus:ring-0">
                        @error('name') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
                    </div>
                    <div>
                        <label class="admin-label" for="organization">02 · What’s the name of your organization?</label>
                        <input id="organization" name="organization" type="text" value="{{ old('organization') }}" class="admin-input rounded-none border-0 border-b border-ink/20 bg-transparent px-0 shadow-none focus:border-ink focus:ring-0">
                    </div>
                    <div>
                        <label class="admin-label" for="email">03 · What’s your email?</label>
                        <input id="email" name="email" type="email" value="{{ old('email') }}" required class="admin-input rounded-none border-0 border-b border-ink/20 bg-transparent px-0 shadow-none focus:border-ink focus:ring-0">
                        @error('email') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
                    </div>
                    <div>
                        <label class="admin-label" for="phone">04 · Phone (optional)</label>
                        <input id="phone" name="phone" type="text" value="{{ old('phone') }}" class="admin-input rounded-none border-0 border-b border-ink/20 bg-transparent px-0 shadow-none focus:border-ink focus:ring-0">
                    </div>
                    <div>
                        <label class="admin-label" for="message">05 · Tell us about the project</label>
                        <textarea id="message" name="message" rows="5" required class="admin-input rounded-none border-0 border-b border-ink/20 bg-transparent px-0 shadow-none focus:border-ink focus:ring-0">{{ old('message') }}</textarea>
                        @error('message') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
                    </div>
                    <button type="submit" class="btn-primary">Send message</button>
                </form>
            </div>
        </div>
    </section>
@endsection
