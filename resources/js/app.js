import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;
Alpine.start();

const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const initWow = () => {
    const nodes = document.querySelectorAll('.wow');
    if (!nodes.length) return;

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
        nodes.forEach((el) => {
            el.style.visibility = 'visible';
            el.classList.add('animate__animated');
        });
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const animation = el.dataset.wowAnimation || 'fadeInUp';
                const delay = el.dataset.wowDelay || '0s';
                const duration = el.dataset.wowDuration || '0.9s';

                el.style.setProperty('--animate-delay', delay);
                el.style.setProperty('--animate-duration', duration);
                el.style.visibility = 'visible';
                el.classList.add('animate__animated', `animate__${animation}`);
                observer.unobserve(el);
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
    );

    nodes.forEach((el) => {
        el.style.visibility = 'hidden';
        observer.observe(el);
    });
};

const initReveal = () => {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    items.forEach((el) => observer.observe(el));
};

const initParallax = () => {
    const layers = document.querySelectorAll('[data-parallax]');
    if (!layers.length || prefersReducedMotion()) return;

    let ticking = false;

    const update = () => {
        const scrollY = window.scrollY || window.pageYOffset;
        layers.forEach((layer) => {
            const speed = parseFloat(layer.dataset.parallax || '0.25');
            const rect = layer.parentElement?.getBoundingClientRect();
            if (!rect) return;

            // Only animate while the section is near the viewport
            if (rect.bottom < 0 || rect.top > window.innerHeight) return;

            const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed * -1;
            layer.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0) scale(1.12)`;
        });
        ticking = false;
    };

    const onScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
};

const initNav = () => {
    const header = document.querySelector('[data-site-header]');
    const toggle = document.querySelector('[data-nav-toggle]');
    const panel = document.querySelector('[data-nav-panel]');

    if (header) {
        const logo = header.querySelector('img[data-logo-light]');
        const onDarkHome = header.classList.contains('is-on-dark');
        const onScroll = () => {
            const scrolled = window.scrollY > 24;
            header.classList.toggle('is-scrolled', scrolled);
            if (onDarkHome) {
                header.classList.toggle('text-paper', !scrolled);
                header.classList.toggle('text-ink', scrolled);
                if (logo) {
                    logo.src = scrolled ? logo.dataset.logoDark : logo.dataset.logoLight;
                }
            }
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    if (toggle && panel) {
        const setOpen = (open) => {
            panel.classList.toggle('is-open', open);
            panel.classList.toggle('hidden', !open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            document.body.classList.toggle('overflow-hidden', open);
        };

        toggle.addEventListener('click', () => {
            setOpen(!panel.classList.contains('is-open'));
        });

        panel.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => setOpen(false));
        });
    }
};

const initHeroVideo = () => {
    document.querySelectorAll('video.hero-video').forEach((video) => {
        video.muted = true;
        video.playsInline = true;
        const play = () => {
            const attempt = video.play();
            if (attempt && typeof attempt.catch === 'function') {
                attempt.catch(() => {
                    // Retry once on first user gesture if autoplay is blocked
                    const resume = () => {
                        video.play().catch(() => {});
                        window.removeEventListener('pointerdown', resume);
                    };
                    window.addEventListener('pointerdown', resume, { once: true });
                });
            }
        };
        if (video.readyState >= 2) {
            play();
        } else {
            video.addEventListener('loadeddata', play, { once: true });
        }
    });
};

const initLoader = () => {
    const loader = document.getElementById('site-loader');
    if (!loader) return;

    const progress = loader.querySelector('.site-loader__progress');
    const start = performance.now();
    const minMs = 900;
    let value = 0;

    const setProgress = (next) => {
        value = Math.max(value, Math.min(100, next));
        if (progress) progress.style.width = `${value}%`;
    };

    setProgress(12);

    const tick = window.setInterval(() => {
        if (value < 82) setProgress(value + Math.random() * 10);
    }, 180);

    const finish = () => {
        window.clearInterval(tick);
        setProgress(100);
        const elapsed = performance.now() - start;
        const wait = Math.max(0, minMs - elapsed);
        window.setTimeout(() => {
            loader.classList.add('is-done');
            document.body.classList.remove('is-loading');
            loader.setAttribute('aria-busy', 'false');
            window.setTimeout(() => loader.remove(), 750);
        }, wait + 120);
    };

    if (document.readyState === 'complete') {
        finish();
    } else {
        window.addEventListener('load', finish, { once: true });
        // Safety: never trap the user if assets hang
        window.setTimeout(finish, 4000);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initWow();
    initReveal();
    initParallax();
    initNav();
    initHeroVideo();
});
