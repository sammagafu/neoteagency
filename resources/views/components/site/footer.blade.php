<footer class="relative mt-24 overflow-hidden border-t border-ink/10 bg-ink text-paper">
    <div class="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl"></div>
    <div class="site-container relative py-16 lg:py-20">
        <div class="grid gap-12 lg:grid-cols-12">
            <div class="lg:col-span-6">
                <p class="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                    {{ $site['site_name'] ?? 'Neotelabs' }}
                </p>
                <p class="mt-4 max-w-md text-base text-paper/70">
                    {{ $site['hero_subheadline'] ?? 'A digital studio crafting strategy, brand, and technology that moves markets.' }}
                </p>
                <a href="{{ route('contact') }}" class="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-paper">
                    Let’s build something lasting
                    <span aria-hidden="true">→</span>
                </a>
            </div>
            <div class="grid gap-8 sm:grid-cols-2 lg:col-span-6 lg:grid-cols-3">
                <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-paper/40">Visit</p>
                    <p class="mt-3 text-sm leading-relaxed text-paper/80">{{ $site['address'] ?? '' }}</p>
                </div>
                <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-paper/40">Contact</p>
                    <a href="mailto:{{ $site['email'] ?? 'info@neotelabs.com' }}" class="mt-3 block text-sm text-paper/80 hover:text-accent">{{ $site['email'] ?? 'info@neotelabs.com' }}</a>
                    <a href="tel:{{ preg_replace('/\s+/', '', $site['phone'] ?? '') }}" class="mt-1 block text-sm text-paper/80 hover:text-accent">{{ $site['phone'] ?? '' }}</a>
                </div>
                <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-paper/40">Follow</p>
                    <div class="mt-3 flex flex-col gap-1 text-sm">
                        @foreach (['twitter' => 'Twitter', 'instagram' => 'Instagram', 'linkedin' => 'LinkedIn', 'facebook' => 'Facebook'] as $key => $label)
                            @if (!empty($site[$key]))
                                <a href="{{ $site[$key] }}" target="_blank" rel="noopener" class="text-paper/80 hover:text-accent">{{ $label }}</a>
                            @endif
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-14 flex flex-col gap-3 border-t border-paper/10 pt-6 text-sm text-paper/45 sm:flex-row sm:items-center sm:justify-between">
            <p>© {{ date('Y') }} {{ $site['site_name'] ?? 'Neotelabs' }}. All rights reserved.</p>
            <p>Dar es Salaam · Digital Agency</p>
        </div>
    </div>
</footer>
