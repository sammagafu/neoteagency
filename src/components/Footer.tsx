import Link from "next/link";
import { Logo } from "@/components/Logo";
import { COMPANY_PROFILE_URL, contactInfo, navLinks } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 px-6 py-16 lg:flex-row lg:items-center lg:px-10 lg:py-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Contact Us
            </p>
            <p className="mt-3 font-display text-3xl font-bold text-foreground lg:text-4xl">
              Let&apos;s start a conversation.
            </p>
          </div>
          <a
            href={`mailto:${contactInfo.email}`}
            className="font-display text-2xl text-muted transition-colors hover:text-accent lg:text-3xl"
          >
            {contactInfo.email}
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              A Dar es Salaam brand and marketing agency — turning brands into
              market leaders through strategy, creativity, and data-driven
              execution.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Navigation
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-foreground/70">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="transition-colors hover:text-foreground"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-foreground"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li>{contactInfo.location}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Resources
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={COMPANY_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                >
                  Company Profile (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-muted">
            &copy; {new Date().getFullYear()} Neotelabs. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted">
            {contactInfo.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
