<footer class="border-t border-ink/10 bg-ink text-paper">
    <div class="site-container py-20 lg:py-28">
        <div class="grid gap-16 lg:grid-cols-12">
            <div class="lg:col-span-7">
                <p class="display-md max-w-3xl text-balance">
                    We collaborate with ambitious brands and people.
                </p>
                <a href="{{ route('contact') }}" class="mt-10 inline-block text-sm font-medium uppercase tracking-[0.18em] text-paper/70 underline underline-offset-8 transition hover:text-paper">
                    Let’s build
                </a>
            </div>
            <div class="grid gap-10 sm:grid-cols-2 lg:col-span-5">
                <div>
                    <p class="eyebrow text-paper/40">Visit</p>
                    <p class="mt-4 text-sm leading-relaxed text-paper/75">{{ $site['address'] ?? '4th floor, Tiger Tower, Kinondoni Manyanya, Dar es Salaam' }}</p>
                </div>
                <div>
                    <p class="eyebrow text-paper/40">Contact</p>
                    <a href="mailto:{{ $site['email'] ?? 'info@neotelabs.co.tz' }}" class="mt-4 block text-sm text-paper/75 hover:text-paper">{{ $site['email'] ?? 'info@neotelabs.co.tz' }}</a>
                    <a href="tel:{{ preg_replace('/\s+/', '', $site['phone'] ?? '+255788419991') }}" class="mt-2 block text-sm text-paper/75 hover:text-paper">{{ $site['phone'] ?? '+255 788 419 991' }}</a>
                </div>
            </div>
        </div>
        <div class="mt-20 flex flex-col gap-3 border-t border-paper/10 pt-6 text-xs uppercase tracking-[0.18em] text-paper/40 sm:flex-row sm:items-center sm:justify-between">
            <p>© {{ date('Y') }} {{ $site['site_name'] ?? 'Neotelabs' }}</p>
            <p>Dar es Salaam · Digital Agency</p>
        </div>
    </div>
</footer>
