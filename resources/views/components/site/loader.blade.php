<div
    id="site-loader"
    class="site-loader"
    aria-live="polite"
    aria-busy="true"
>
    <div class="site-loader__inner">
        <img src="{{ asset('images/brand/logo-white.svg') }}" alt="{{ $site['site_name'] ?? 'Neotelabs' }}" class="site-loader__logo">
        <div class="site-loader__bar" aria-hidden="true">
            <span class="site-loader__progress"></span>
        </div>
    </div>
</div>
