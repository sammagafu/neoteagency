import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { CountUp } from "@/components/CountUp";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TeamGrid } from "@/components/TeamGrid";
import { TeamValuesGrid } from "@/components/TeamValuesGrid";
import { getAllTeamMembers } from "@/lib/content";
import { approachSteps, teamStats } from "@/lib/site-data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "Learn about Neotelabs — our mission, team, and approach to helping brands grow, connect, and lead in Tanzania and East Africa.",
  path: "/about",
});

export default function AboutPage() {
  const teamMembers = getAllTeamMembers();

  return (
    <>
      <PageHero
        label="About"
        title="About Us"
        description="Neotelabs is a forward-thinking digital agency dedicated to helping brands grow, connect, and lead in a competitive landscape. We blend innovation, expertise, and execution to deliver results that go beyond expectations."
        large
      />

      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <ScrollReveal>
            <div className="relative aspect-[21/9] min-h-[240px] overflow-hidden rounded-2xl border border-border">
              <Image
                src="/assets/neote/team.jpg"
                alt="The Neotelabs team"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10">
                <p className="max-w-xl font-display text-2xl font-semibold text-foreground sm:text-3xl">
                  One team. Many disciplines.{" "}
                  <span className="text-accent">One standard of excellence.</span>
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-2">
            <ScrollReveal>
              <div className="bg-surface p-10 lg:p-14">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                  Mission
                </p>
                <p className="mt-6 font-display text-2xl font-semibold leading-snug text-foreground lg:text-3xl">
                  To propel our clients toward exceptional success by delivering
                  innovative, results-driven digital solutions tailored to
                  their goals.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="bg-surface p-10 lg:p-14">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                  Vision
                </p>
                <p className="mt-6 font-display text-2xl font-semibold leading-snug text-foreground lg:text-3xl">
                  To redefine digital marketing by setting new standards of
                  excellence and empowering brands to dominate their industries.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="team" className="scroll-mt-28 border-y border-border bg-surface">
        <div className="mx-auto grid max-w-[1400px] divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {teamStats.map((stat, i) => (
            <ScrollReveal
              key={stat.label}
              delay={i * 100}
              className="px-6 py-14 lg:px-10 lg:py-16"
            >
              <p className="font-display text-5xl font-bold text-foreground lg:text-6xl">
                <CountUp value={stat.value} />
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
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Our Team
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold text-foreground lg:text-5xl">
              Meet the specialists
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              Great brands are built by great people. Filter by department to
              explore the team behind our integrated solutions.
            </p>
          </ScrollReveal>

          <div className="mt-12 lg:mt-16">
            <TeamGrid members={teamMembers} />
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
              The principles that guide how we work — with each other and with
              every client.
            </p>
          </ScrollReveal>

          <TeamValuesGrid />
        </div>
      </section>

      <section className="border-t border-border py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Our Approach
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold text-foreground lg:text-5xl">
              We turn ideas into impact
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted">
              We turn ideas into impact through a structured and collaborative
              process:
            </p>
          </ScrollReveal>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {approachSteps.map((step, index) => (
              <ScrollReveal key={step} delay={index * 80}>
                <div className="flex h-full flex-col bg-surface p-8">
                  <span className="font-mono text-sm text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 font-medium text-foreground">{step}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 text-center lg:px-10">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold text-foreground lg:text-4xl">
              Interested in joining Neotelabs?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted">
              Explore open roles and find out what it&apos;s like to build brands
              that lead their markets.
            </p>
            <div className="mt-10">
              <Button href="/careers" showArrow>
                View Careers
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
