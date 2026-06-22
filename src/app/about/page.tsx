import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { approachSteps } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Neotelabs — a forward-thinking digital agency dedicated to helping brands grow, connect, and lead.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title="About Us"
        description="Neotelabs is a forward-thinking digital agency dedicated to helping brands grow, connect, and lead in a competitive landscape. We blend innovation, expertise, and execution to deliver results that go beyond expectations."
      />

      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-8 lg:p-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Mission
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                To propel our clients toward exceptional success by delivering
                innovative, results-driven digital solutions tailored to their
                goals.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-8 lg:p-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Vision
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                To redefine digital marketing by setting new standards of
                excellence and empowering brands to dominate their industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Our Approach
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
              We Turn Ideas Into Impact
            </h2>
            <p className="mt-4 text-lg text-muted">
              We turn ideas into impact through a structured and collaborative
              process:
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {approachSteps.map((step, index) => (
              <div
                key={step}
                className="relative rounded-2xl border border-border bg-surface-light p-6"
              >
                <span className="text-3xl font-bold text-accent/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 font-medium text-foreground">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
