import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { processSteps } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Our process is designed to deliver clarity, creativity, and results at every stage.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        label="Process"
        title="How We Work"
        description="Our process is designed to deliver clarity, creativity, and results at every stage."
      />

      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative">
            <div className="absolute left-8 top-0 hidden h-full w-px bg-border lg:left-1/2 lg:block" />

            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <div
                  key={step.title}
                  className={`relative grid gap-8 lg:grid-cols-2 lg:gap-16 ${
                    index % 2 === 1 ? "" : ""
                  }`}
                >
                  <div
                    className={`${
                      index % 2 === 1 ? "lg:order-2 lg:text-left" : "lg:text-right"
                    }`}
                  >
                    <div
                      className={`rounded-2xl border border-border bg-surface p-8 ${
                        index % 2 === 1 ? "" : "lg:ml-auto"
                      } max-w-lg`}
                    >
                      <span className="text-4xl font-bold text-accent/30">
                        {step.step}
                      </span>
                      <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-muted">{step.description}</p>
                    </div>
                  </div>

                  <div
                    className={`hidden lg:block ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  />

                  <div className="absolute left-8 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-accent bg-background lg:left-1/2 lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
