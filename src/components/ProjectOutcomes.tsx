"use client";

import { CountUp } from "@/components/CountUp";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { ProjectOutcome } from "@/lib/site-data";

type ProjectOutcomesProps = {
  outcomes: readonly ProjectOutcome[];
};

export function ProjectOutcomes({ outcomes }: ProjectOutcomesProps) {
  if (outcomes.length === 0) return null;

  const gridClass =
    outcomes.length === 1
      ? "sm:grid-cols-1"
      : outcomes.length === 2
        ? "sm:grid-cols-2"
        : outcomes.length === 4
          ? "sm:grid-cols-2 lg:grid-cols-4"
          : "sm:grid-cols-3";

  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <ScrollReveal>
          <p className="pt-10 font-mono text-xs uppercase tracking-[0.3em] text-accent lg:pt-12">
            Project Outcomes
          </p>
        </ScrollReveal>

        <div
          className={`mt-8 grid divide-y divide-border border-t border-border ${gridClass} sm:divide-x sm:divide-y-0`}
        >
          {outcomes.map((outcome, i) => (
            <ScrollReveal
              key={outcome.label}
              delay={i * 100}
              className="px-0 py-10 first:pl-0 sm:px-8 sm:py-12 lg:px-10 lg:py-14"
            >
              <p className="font-display text-5xl font-bold text-foreground lg:text-6xl">
                <CountUp value={outcome.value} />
              </p>
              <p className="mt-4 max-w-[14rem] font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-muted">
                {outcome.label}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
