import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { CareerList } from "@/components/CareerList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TeamValuesGrid } from "@/components/TeamValuesGrid";
import { getAllCareers } from "@/lib/content";
import { careerBenefits, contactInfo } from "@/lib/site-data";
import { createMetadata, jobPostingJsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Careers",
  description:
    "Join Neotelabs — explore open roles in design, strategy, content, and technology in Dar es Salaam, Tanzania.",
  path: "/careers",
  keywords: [
    "Neotelabs careers",
    "digital agency jobs Tanzania",
    "design jobs Dar es Salaam",
    "marketing careers Tanzania",
  ],
});

export default function CareersPage() {
  const careerPositions = getAllCareers(true);

  return (
    <>
      <JsonLd data={careerPositions.map(jobPostingJsonLd)} />
      <PageHero
        label="Careers"
        title="Build Brands That Lead"
        description="Join a multidisciplinary team where strategy, creativity, and technology come together to deliver work that moves markets."
        large
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <ScrollReveal>
            <p className="max-w-4xl font-display text-3xl font-semibold leading-snug text-foreground sm:text-4xl lg:leading-tight">
              We&apos;re always looking for talented people who care about craft,
              collaboration, and{" "}
              <span className="text-accent">measurable impact</span>.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Why Neotelabs
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold text-foreground lg:text-4xl">
              More than a job — a place to grow
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-px sm:overflow-hidden sm:rounded-2xl sm:border sm:border-border sm:bg-border lg:grid-cols-4">
            {careerBenefits.map((benefit, index) => (
              <ScrollReveal key={benefit.title} delay={index * 80}>
                <div className="h-full rounded-2xl border border-border bg-surface p-8 sm:rounded-none sm:border-0">
                  <span className="font-mono text-sm text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {benefit.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Open Roles
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold text-foreground lg:text-5xl">
              Current opportunities
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {careerPositions.length} open{" "}
              {careerPositions.length === 1 ? "position" : "positions"}. Expand
              a role to view details and apply.
            </p>
          </ScrollReveal>

          <div className="mt-12 lg:mt-16">
            <CareerList positions={careerPositions} />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Culture
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold text-foreground lg:text-4xl">
              What we stand for
            </h2>
            <p className="mt-5 max-w-xl text-base text-muted">
              The values that shape how we work — and what you can expect as
              part of the team.
            </p>
          </ScrollReveal>

          <TeamValuesGrid />
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <ScrollReveal>
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:p-12">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                General applications
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground lg:text-4xl">
                Don&apos;t see your role?
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
                Send your CV and portfolio to{" "}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-foreground underline decoration-accent/50 underline-offset-4 transition-colors hover:text-accent"
                >
                  {contactInfo.email}
                </a>
                . We&apos;re always interested in meeting talented people.
              </p>
              <div className="mt-10 flex flex-wrap gap-4 border-t border-border pt-8">
                <Button
                  href={`mailto:${contactInfo.email}?subject=General%20Application%20-%20Neotelabs`}
                  external
                  showArrow
                >
                  Send Your CV
                </Button>
                <Link
                  href="/about#team"
                  data-cursor="pointer"
                  className="btn-arrow inline-flex items-center gap-2 self-center font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
                >
                  Meet the team
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
    </>
  );
}
