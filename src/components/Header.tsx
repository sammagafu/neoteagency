"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { navLinks } from "@/lib/site-data";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border/60 bg-background/90 backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <Logo className="relative z-10" />

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-300 ${
                  isActive ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          data-cursor="pointer"
          className="btn-arrow group hidden items-center gap-2 rounded-full border border-accent/30 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-foreground transition-all hover:border-accent hover:bg-accent hover:text-white lg:inline-flex"
        >
          Start Your Project
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </Link>

        <button
          type="button"
          className="relative z-10 flex flex-col gap-1.5 p-2 lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-px w-6 bg-foreground transition-all duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-foreground transition-all duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-background transition-all duration-500 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-2 px-10">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-4xl font-bold text-foreground transition-colors hover:text-accent"
              style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-8 font-mono text-sm uppercase tracking-[0.2em] text-accent"
          >
            Start Your Project →
          </Link>
        </nav>
      </div>
    </header>
  );
}
