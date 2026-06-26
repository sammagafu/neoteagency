"use client";

import { useCallback, useEffect, useState } from "react";
import { processSteps, type ProcessStep } from "@/lib/site-data";

export function ProcessExplorer() {
  const [active, setActive] = useState(0);
  const step = processSteps[active];

  const goTo = useCallback((index: number) => {
    setActive(Math.max(0, Math.min(processSteps.length - 1, index)));
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goTo(active + 1);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goTo(active - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, goTo]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface px-5 py-4 lg:px-6">
        <div className="flex flex-1 gap-1.5">
          {processSteps.map((item, i) => (
            <button
              key={item.step}
              type="button"
              data-cursor="pointer"
              aria-label={`Go to ${item.title}`}
              onClick={() => goTo(i)}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                i <= active ? "bg-accent" : "bg-border"
              } ${i === active ? "ring-2 ring-accent/30 ring-offset-2 ring-offset-surface" : ""}`}
            />
          ))}
        </div>
        <span className="shrink-0 font-mono text-xs uppercase tracking-[0.15em] text-muted">
          {step.step} / {processSteps.length}
        </span>
      </div>

      <nav
        className="sticky top-24 z-20 -mx-6 border-b border-border bg-background/90 px-6 py-4 backdrop-blur-md lg:hidden"
        aria-label="Process phases"
      >
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {processSteps.map((item, i) => (
            <button
              key={item.step}
              type="button"
              data-cursor="pointer"
              onClick={() => goTo(i)}
              className={`shrink-0 rounded-full border px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] transition-all duration-300 ${
                active === i
                  ? "border-accent bg-accent text-background"
                  : "border-border text-muted hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {item.step} {item.title}
            </button>
          ))}
        </div>
      </nav>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
        <div className="hidden lg:col-span-5 lg:block">
          <div className="relative">
            <div
              className="process-timeline-line absolute bottom-6 left-7 top-6 w-px bg-border"
              aria-hidden
            />
            <div
              className="process-timeline-progress absolute bottom-6 left-7 top-6 w-px origin-top bg-accent transition-transform duration-500 ease-out"
              style={{
                transform: `scaleY(${active / (processSteps.length - 1) || 0})`,
              }}
              aria-hidden
            />
            <ol className="space-y-3">
              {processSteps.map((item, i) => {
                const isActive = active === i;
                const isPast = i < active;
                return (
                  <li key={item.step}>
                    <button
                      type="button"
                      data-cursor="pointer"
                      onClick={() => goTo(i)}
                      onMouseEnter={() => goTo(i)}
                      className={`process-step-btn group flex w-full items-start gap-5 rounded-xl border p-5 text-left transition-all duration-300 xl:gap-6 xl:p-6 ${
                        isActive
                          ? "border-accent/30 bg-surface-light shadow-[inset_3px_0_0_var(--accent)]"
                          : isPast
                            ? "border-border/60 bg-surface/30 hover:border-accent/20 hover:bg-surface/50"
                            : "border-transparent hover:border-border hover:bg-surface/50"
                      }`}
                    >
                      <span
                        className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border font-mono text-lg transition-all duration-300 ${
                          isActive
                            ? "scale-105 border-accent bg-accent text-background"
                            : isPast
                              ? "border-accent/40 bg-surface text-accent"
                              : "border-border bg-surface text-muted group-hover:border-accent/40 group-hover:text-foreground"
                        }`}
                      >
                        {item.step}
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <h3
                          className={`font-display text-xl font-semibold transition-colors xl:text-2xl ${
                            isActive ? "text-foreground" : "text-foreground/80"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={`mt-1.5 text-sm leading-relaxed transition-colors ${
                            isActive ? "text-muted" : "text-muted/70"
                          }`}
                        >
                          {item.tagline}
                        </p>
                        <span className="mt-3 inline-block font-mono text-[0.65rem] uppercase tracking-[0.15em] text-accent/70">
                          {item.duration}
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ProcessDetail
            key={step.step}
            step={step}
            active={active}
            onPrev={() => goTo(active - 1)}
            onNext={() => goTo(active + 1)}
          />
        </div>
      </div>
    </div>
  );
}

function ProcessDetail({
  step,
  active,
  onPrev,
  onNext,
}: {
  step: ProcessStep;
  active: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const isFirst = active === 0;
  const isLast = active === processSteps.length - 1;

  return (
    <div className="process-detail-panel lg:sticky lg:top-32">
      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4 gap-y-3">
          <div>
            <span className="font-mono text-sm text-accent">{step.step}</span>
            <h3 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              {step.title}
            </h3>
          </div>
          <span className="rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-muted">
            {step.duration}
          </span>
        </div>

        <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
          {step.description}
        </p>

        <div className="mt-8 grid gap-8 sm:mt-10 sm:grid-cols-2 sm:gap-10">
          <div className="rounded-xl border border-border bg-background/50 p-5 sm:p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              What we do
            </p>
            <ul className="mt-4 space-y-3.5">
              {step.activities.map((activity) => (
                <li
                  key={activity}
                  className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {activity}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-background/50 p-5 sm:p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              What you get
            </p>
            <ul className="mt-4 space-y-3.5">
              {step.deliverables.map((deliverable) => (
                <li
                  key={deliverable}
                  className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                  {deliverable}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-6 sm:mt-10">
          <button
            type="button"
            data-cursor="pointer"
            onClick={onPrev}
            disabled={isFirst}
            className="btn-arrow group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors enabled:hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
          >
            <svg
              className="h-4 w-4 transition-transform group-enabled:group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Previous
          </button>
          <p className="hidden text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted sm:block">
            Use arrow keys to navigate
          </p>
          <button
            type="button"
            data-cursor="pointer"
            onClick={onNext}
            disabled={isLast}
            className="btn-arrow group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors enabled:hover:text-accent disabled:cursor-not-allowed disabled:opacity-30"
          >
            Next
            <svg
              className="h-4 w-4 transition-transform group-enabled:group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
