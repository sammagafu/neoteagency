"use client";

import { useState } from "react";

const steps = [
  {
    title: "Reach out",
    description:
      "Send us a message through the contact form or email us directly at info@neotelabs.com.",
  },
  {
    title: "Discovery call",
    description:
      "We schedule a call to understand your brand, goals, timeline, and budget.",
  },
  {
    title: "Tailored proposal",
    description:
      "You receive a clear scope, timeline, and investment breakdown for your project.",
  },
  {
    title: "Kickoff",
    description:
      "On approval, we begin Phase 01 — Discovery — with your dedicated project team.",
  },
] as const;

export function ProcessOnboardingList() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <ol className="mt-10 space-y-3">
      {steps.map((step, i) => {
        const isOpen = active === i;
        return (
          <li key={step.title}>
            <button
              type="button"
              data-cursor="pointer"
              aria-expanded={isOpen}
              onClick={() => setActive(isOpen ? null : i)}
              className={`flex w-full items-start gap-5 rounded-xl border p-5 text-left transition-all duration-300 lg:gap-6 lg:p-6 ${
                isOpen
                  ? "border-accent/30 bg-surface-light"
                  : "border-border bg-background hover:border-accent/20 hover:bg-surface/50"
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-mono text-xs transition-colors lg:h-11 lg:w-11 ${
                  isOpen
                    ? "border-accent bg-accent text-background"
                    : "border-border text-muted"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-display text-lg font-semibold text-foreground">
                    {step.title}
                  </p>
                  <svg
                    className={`h-4 w-4 shrink-0 text-muted transition-transform duration-300 ${isOpen ? "rotate-180 text-accent" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
                <div
                  className={`accordion-panel ${isOpen ? "accordion-panel-open" : ""}`}
                >
                  <div className="accordion-panel-inner onboarding-panel-inner">
                    <p className="text-sm leading-relaxed text-muted lg:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
