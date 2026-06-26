import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { ClientLogoMarquee } from "@/components/ClientLogoMarquee";
import { CountUp } from "@/components/CountUp";
import { DecodeText } from "@/components/DecodeText";
import { HeroTechEffect } from "@/components/HeroTechEffect";
import { InteractiveServiceList } from "@/components/InteractiveServiceList";
import { Marquee } from "@/components/Marquee";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TiltCard } from "@/components/TiltCard";
import { WhyChooseList } from "@/components/WhyChooseList";
import {
  COMPANY_PROFILE_URL,
  stats,
} from "@/lib/site-data";
import { getAllClientLogos, getFeaturedCaseStudy } from "@/lib/content";
import { stripHtml } from "@/lib/html-utils";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Home",
  description:
    "Neotelabs is a forward-thinking digital agency helping brands grow, connect, and lead through strategy, creativity, and data-driven execution in Tanzania and East Africa.",
  path: "/",
});

export default function HomePage() {
  const featuredProject = getFeaturedCaseStudy();
  const clientLogos = getAllClientLogos(true);
  const primaryOutcome = featuredProject?.outcomes[0];
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-screen flex-col justify-end overflow-hidden pb-16 pt-32 lg:pb-24">
        <HeroTechEffect />
        <div className="hero-glow pointer-events-none absolute inset-0" />
        <div className="hero-scrim pointer-events-none absolute inset-0" />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-10">
          <h1 className="hero-headline font-display text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-tight">
            <span className="animate-fade-up block">TURNING BRANDS</span>
            <span className="animate-fade-up-delay-1 hero-headline-outline block">
              INTO MARKET
            </span>
            <span className="animate-fade-up-delay-2 block">
              <DecodeText
                text="LEADERS"
                className="hero-headline-accent hero-decode"
                delay={900}
                loopEvery={60_000}
              />
            </span>
          </h1>

          <div className="animate-fade-up-delay-3 mt-10 flex max-w-2xl flex-col gap-8">
            <p className="text-base leading-relaxed text-muted lg:text-lg">
              We bridge the gap between exceptional products and the customers
              who need them — through strategy, creativity, and data-driven
              execution.{" "}
              <a
                href={COMPANY_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-accent/50 underline-offset-4 transition-colors hover:text-accent"
              >
                Company Profile ↗
              </a>
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/contact" showArrow>
                Start Your Project
              </Button>
              <Button href="/portfolio" variant="outline" showArrow>
                View Our Work
              </Button>
            </div>
          </div>

          <div className="animate-line-grow mt-16 h-px w-full max-w-xs bg-border" />
        </div>
      </section>

      {/* Services marquee */}
      <div className="border-y border-border bg-surface py-5">
        <Marquee
          items={[
            "Strategy & Research",
            "Branding & Design",
            "Technology & Development",
            "Content Creation",
            "Events & Public Relations",
          ]}
        />
      </div>

      {/* Introduction */}
      <section className="py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <ScrollReveal>
            <p className="max-w-5xl font-display text-3xl font-semibold leading-snug text-foreground sm:text-4xl lg:text-5xl lg:leading-tight">
              At Neotelabs, we are more than a digital agency — we are your{" "}
              <span className="text-accent">growth partner</span>. We combine
              strategic thinking, creative excellence, and technical expertise
              to deliver solutions that drive real business impact.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-[1400px] divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 100} className="px-6 py-12 lg:px-10 lg:py-16">
              <p className="font-display text-5xl font-bold text-foreground lg:text-6xl">
                <CountUp value={stat.value} />
              </p>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.15em] text-muted">
                {stat.label}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <ScrollReveal>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                  Services
                </p>
                <h2 className="mt-4 font-display text-4xl font-bold text-foreground lg:text-5xl">
                  Integrated Solutions
                </h2>
                <p className="mt-4 max-w-xl text-lg text-muted">
                  Integrated solutions designed to elevate your brand at every
                  touchpoint.
                </p>
              </div>
              <Link
                href="/services"
                data-cursor="pointer"
                className="btn-arrow group inline-flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
              >
                Explore All Services
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          <div className="mt-12">
            <InteractiveServiceList />
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="border-y border-border bg-surface py-4">
        <ClientLogoMarquee logos={clientLogos} />
      </section>

      {/* Featured Project */}
      {featuredProject && (
      <section className="py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {featuredProject.category}
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold text-foreground lg:text-5xl">
              {featuredProject.client}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <TiltCard className="relative mt-12 overflow-hidden rounded-2xl border border-border bg-surface">
              <Link
                href={`/portfolio/${featuredProject.slug}`}
                data-cursor="pointer"
                className="card-hover group grid lg:grid-cols-2"
              >
                <div
                  className={`relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[360px] ${featuredProject.gradient}`}
                >
                  <Image
                    src={featuredProject.image}
                    alt={featuredProject.client}
                    fill
                    className="img-zoom object-cover"
                  />
                <div className="absolute inset-0 bg-black/40" />
                {primaryOutcome && (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-7xl font-bold text-white/10 lg:text-8xl">
                        {primaryOutcome.value}
                      </span>
                    </div>
                    <div className="absolute bottom-6 left-6">
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">
                        {primaryOutcome.label}
                      </span>
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  Case Study
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold text-foreground lg:text-3xl">
                  {featuredProject.client}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted lg:text-lg">
                  {stripHtml(featuredProject.description)}
                </p>
                <span className="btn-arrow mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-foreground">
                  View Case Study
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>
            </TiltCard>
          </ScrollReveal>
        </div>
      </section>
      )}

      {/* Why Choose Us */}
      <section className="border-t border-border bg-surface py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            <ScrollReveal>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                Why Choose Us
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold text-foreground lg:text-5xl">
                We don&apos;t just deliver services — we create transformation.
              </h2>
            </ScrollReveal>

            <WhyChooseList />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-32 lg:py-44">
        <div className="absolute inset-0 bg-gradient-to-t from-accent/[0.04] via-transparent to-transparent" />
        <div className="relative mx-auto max-w-[1400px] px-6 text-center lg:px-10">
          <ScrollReveal>
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
              Ready to take your brand further?
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg text-muted">
              Let&apos;s build something exceptional together.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Button href="/contact" showArrow>
                Contact Us
              </Button>
              <Button href={COMPANY_PROFILE_URL} variant="outline" external>
                Company Profile
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
