"use client";

import Link from "next/link";
import { useState } from "react";
import { contactInfo } from "@/lib/site-data";
import { stripHtml } from "@/lib/html-utils";
import type { CareerRecord } from "@/lib/db/types";

export function CareerList({
  positions,
}: {
  positions: readonly CareerRecord[];
}) {
  const [active, setActive] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border border-y border-border">
      {positions.map((position, i) => {
        const isOpen = active === i;
        const panelId = `career-panel-${position.id}`;

        return (
          <div
            key={position.id}
            className={isOpen ? "bg-surface-light" : "transition-colors hover:bg-surface/50"}
          >
            <button
              type="button"
              id={`career-trigger-${position.id}`}
              data-cursor="pointer"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setActive(isOpen ? null : i)}
              className={`group flex w-full items-start gap-6 px-5 py-8 text-left sm:px-6 lg:gap-10 lg:px-8 lg:py-10 ${isOpen ? "pb-4 lg:pb-6" : ""}`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                    {position.department}
                  </span>
                  <span className="text-muted">·</span>
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
                    {position.type}
                  </span>
                  <span className="text-muted">·</span>
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
                    {position.location}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold text-foreground transition-colors group-hover:text-accent lg:text-2xl">
                  {position.title}
                </h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted lg:text-base">
                  {stripHtml(position.summary)}
                </p>
              </div>
              <svg
                className={`mt-2 h-5 w-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-accent" : "text-muted group-hover:text-foreground"}`}
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
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={`career-trigger-${position.id}`}
              className={`accordion-panel ${isOpen ? "accordion-panel-open" : ""}`}
            >
              <div className="accordion-panel-inner career-panel-inner">
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                      Responsibilities
                    </p>
                    <ul className="mt-4 space-y-3">
                      {position.responsibilities.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                      Requirements
                    </p>
                    <ul className="mt-4 space-y-3">
                      {position.requirements.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10 border-t border-border pt-8">
                  <Link
                    href={`mailto:${contactInfo.email}?subject=Application: ${encodeURIComponent(position.title)}`}
                    data-cursor="pointer"
                    className="btn-arrow inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-accent transition-colors hover:text-foreground"
                  >
                    Apply for this role
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
            </div>
          </div>
        );
      })}
    </div>
  );
}
