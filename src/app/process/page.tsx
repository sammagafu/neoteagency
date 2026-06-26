import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { ProcessExplorer } from "@/components/ProcessExplorer";
import { ProcessOnboardingList } from "@/components/ProcessOnboardingList";
import { ProcessPrinciplesGrid } from "@/components/ProcessPrinciplesGrid";
import { ScrollReveal } from "@/components/ScrollReveal";
import { processSteps } from "@/lib/site-data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Process",
  description:
    "A clear, collaborative five-phase process — from discovery through strategy, execution, optimisation, and growth.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <PageHero
        label="Process"
        title="How We Work"
        description="A structured, transparent path from first conversation to measurable growth — with your team involved at every stage."
        large
      />

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-[1400px] divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { value: "5", label: "Phases from brief to growth" },
            { value: "1", label: "Dedicated project team" },
            { value: "∞", label: "Ongoing optimisation & support" },
          ].map((stat, i) => (
            <ScrollReveal
              key={stat.label}
              delay={i * 100}
              className="px-6 py-14 lg:px-10 lg:py-16"
            >
              <p className="font-display text-5xl font-bold text-foreground lg:text-6xl">
                {stat.value}
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-muted">
                {stat.label}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <ScrollReveal>
            <p className="max-w-4xl font-display text-3xl font-semibold leading-snug text-foreground sm:text-4xl lg:leading-tight">
              Great work doesn&apos;t happen by accident. Our process gives
              structure to creativity — so every decision is intentional and
              every deliverable moves you closer to your goals.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-border py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              The journey
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold text-foreground lg:text-5xl">
              Five phases. One direction.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              Select a phase to see what happens, what we deliver, and how long
              it typically takes. Use arrow keys or the controls below to move
              between phases.
            </p>
          </ScrollReveal>

          <div className="mt-12 lg:mt-16">
            <ProcessExplorer />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Our principles
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold text-foreground lg:text-4xl">
              How we show up for every client
            </h2>
            <p className="mt-5 max-w-xl text-base text-muted">
              Hover or tap a principle to explore how we work with you.
            </p>
          </ScrollReveal>

          <ProcessPrinciplesGrid />
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <ScrollReveal>
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:p-12">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                What happens next
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground lg:text-4xl">
                From first contact to kickoff
              </h2>
              <p className="mt-5 max-w-xl text-base text-muted">
                Tap each step to see what to expect before we begin Phase 01.
              </p>

              <ProcessOnboardingList />

              <div className="mt-10 flex flex-wrap gap-4 border-t border-border pt-8">
                <Button href="/contact" showArrow>
                  Contact Us
                </Button>
                <Link
                  href="/services"
                  data-cursor="pointer"
                  className="btn-arrow inline-flex items-center gap-2 self-center font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
                >
                  Explore our services
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
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border py-28 lg:py-36">
        <div className="absolute inset-0 bg-gradient-to-t from-accent/[0.04] via-transparent to-transparent" />
        <div className="relative mx-auto max-w-[1400px] px-6 text-center lg:px-10">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {processSteps.length} phases
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl">
              Ready to begin?
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Every successful project starts with a conversation. Let&apos;s
              talk about where you are and where you want to go.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact" showArrow>
                Start Your Project
              </Button>
              <Button href="/portfolio" variant="outline" showArrow>
                View Our Work
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
