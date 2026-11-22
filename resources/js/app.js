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
        const onDark = header.classList.contains('is-on-dark');
        const onScroll = () => {
            const scrolled = window.scrollY > 24;
            header.classList.toggle('is-scrolled', scrolled);
            if (onDark) {
                // Keep brand logo red; only swap nav text contrast when the bar goes paper.
                header.classList.toggle('text-paper', !scrolled);
                header.classList.toggle('text-ink', scrolled);
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

    const counter = loader.querySelector('[data-loader-count]');
    const start = performance.now();
    const minMs = 1100;
    let value = 0;
    let finished = false;

    const setProgress = (next) => {
        value = Math.max(value, Math.min(100, next));
        if (counter) counter.textContent = String(Math.round(value));
    };

    setProgress(8);

    const tick = window.setInterval(() => {
        if (value < 88) setProgress(value + 4 + Math.random() * 9);
    }, 90);

    const finish = () => {
        if (finished) return;
        finished = true;
        window.clearInterval(tick);

        const ramp = () => {
            if (value < 100) {
                setProgress(value + 6);
                window.requestAnimationFrame(ramp);
                return;
            }
            const elapsed = performance.now() - start;
            const wait = Math.max(0, minMs - elapsed);
            window.setTimeout(() => {
                loader.classList.add('is-done');
                document.body.classList.remove('is-loading');
                loader.setAttribute('aria-busy', 'false');
                window.setTimeout(() => loader.remove(), 600);
            }, wait + 80);
        };
        ramp();
    };

    if (document.readyState === 'complete') {
        finish();
    } else {
        window.addEventListener('load', finish, { once: true });
        window.setTimeout(finish, 3500);
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
