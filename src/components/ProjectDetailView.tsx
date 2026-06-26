import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { ProjectOutcomes } from "@/components/ProjectOutcomes";
import { RichText } from "@/components/RichText";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { CaseStudy } from "@/lib/db/types";
import { getAdjacentCaseStudies } from "@/lib/content";

type ProjectDetailViewProps = {
  project: CaseStudy;
};

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const { prev, next } = getAdjacentCaseStudies(project.slug);
  const primaryOutcome = project.outcomes[0];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 lg:pt-36">
        <div className={`relative aspect-[21/9] min-h-[320px] overflow-hidden ${project.gradient}`}>
          <Image
            src={project.image}
            alt={project.client}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/30" />
          {primaryOutcome && (
            <div className="absolute bottom-8 right-6 text-right sm:right-8 lg:bottom-10 lg:right-10">
              <p className="font-display text-5xl font-bold text-white/25 sm:text-6xl lg:text-7xl">
                {primaryOutcome.value}
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                {primaryOutcome.label}
              </p>
            </div>
          )}
        </div>

        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="-mt-16 relative z-10 pb-12 lg:-mt-24">
            <Link
              href="/portfolio"
              data-cursor="pointer"
              className="btn-arrow mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
            >
              <svg className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
              All Work
            </Link>

            <div className="flex flex-wrap items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {project.category}
              </span>
              <span className="text-muted">·</span>
              <span className="font-mono text-xs text-muted">{project.year}</span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
              {project.client}
            </h1>
            <RichText
              html={project.description}
              className="mt-6 max-w-3xl text-lg text-muted lg:text-xl"
            />
          </div>
        </div>
      </section>

      <ProjectOutcomes outcomes={project.outcomes} />

      {/* Challenge / Approach / Results */}
      <section className="border-t border-border py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            <ScrollReveal>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                Challenge
              </p>
              <RichText
                html={project.challenge}
                className="mt-4 text-lg text-foreground"
              />
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                Approach
              </p>
              <RichText
                html={project.approach}
                className="mt-4 text-lg text-foreground"
              />
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                Results
              </p>
              <ul className="mt-4 space-y-3">
                {project.results.map((result) => (
                  <li key={result} className="flex items-start gap-3 text-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {result}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-border bg-surface py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Services
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.services.map((service) => (
              <span
                key={service}
                className="rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-muted"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Project Gallery
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
              Visual Highlights
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((src, i) => (
              <ScrollReveal key={src} delay={i * 80}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-surface">
                  <Image
                    src={src}
                    alt={`${project.client} project image ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-[1400px] divide-y divide-border lg:grid-cols-2 lg:divide-x lg:divide-y-0">
          {prev ? (
            <Link
              href={`/portfolio/${prev.slug}`}
              data-cursor="pointer"
              className="group flex flex-col justify-center p-8 transition-colors hover:bg-surface lg:p-12"
            >
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
                Previous Project
              </span>
              <span className="mt-2 font-display text-xl font-semibold text-foreground group-hover:text-accent lg:text-2xl">
                {prev.client}
              </span>
            </Link>
          ) : (
            <div className="hidden lg:block" />
          )}
          {next ? (
            <Link
              href={`/portfolio/${next.slug}`}
              data-cursor="pointer"
              className="group flex flex-col items-end justify-center p-8 text-right transition-colors hover:bg-surface lg:p-12"
            >
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
                Next Project
              </span>
              <span className="mt-2 font-display text-xl font-semibold text-foreground group-hover:text-accent lg:text-2xl">
                {next.client}
              </span>
            </Link>
          ) : (
            <div className="hidden lg:block" />
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-24 text-center lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <h2 className="font-display text-3xl font-bold text-foreground lg:text-4xl">
            Ready to take your brand further?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted">
            Let&apos;s build something exceptional together.
          </p>
          <div className="mt-10">
            <Button href="/contact" showArrow>
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
