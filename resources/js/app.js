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
        const onScroll = () => {
            header.classList.toggle('is-scrolled', window.scrollY > 24);
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

document.addEventListener('DOMContentLoaded', () => {
    initWow();
    initReveal();
    initParallax();
    initNav();
});
