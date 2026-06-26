"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { homeServices } from "@/lib/site-data";

export function InteractiveServiceList() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="divide-y divide-border border-y border-border">
      {homeServices.map((service, i) => {
        const isOpen = active === i;
        const panelId = `service-panel-${i}`;

        return (
          <div
            key={service.title}
            className={isOpen ? "bg-surface-light" : "transition-colors hover:bg-surface/50"}
          >
            <button
              type="button"
              id={`service-trigger-${i}`}
              data-cursor="pointer"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setActive(isOpen ? null : i)}
              className="service-panel group flex w-full items-center gap-6 px-6 py-8 text-left lg:gap-12 lg:px-10 lg:py-10"
            >
              <span
                className={`service-number font-mono text-sm transition-colors ${isOpen ? "text-accent" : "text-muted"}`}
              >
                {service.number}
              </span>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                <Image
                  src={service.iconImage}
                  alt=""
                  width={40}
                  height={40}
                  className={`h-10 w-10 object-contain transition-all duration-300 ${isOpen ? "scale-110 opacity-100" : "opacity-70 group-hover:opacity-100"}`}
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-xl font-semibold text-foreground lg:text-2xl">
                  {service.title}
                </h3>
              </div>
              <svg
                className={`h-5 w-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-90 text-accent" : "text-muted group-hover:text-foreground"}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={`service-trigger-${i}`}
              className={`accordion-panel ${isOpen ? "accordion-panel-open" : ""}`}
            >
              <div className="accordion-panel-inner !px-6 !pb-8 lg:!px-10 lg:!pb-10">
                <p className="max-w-3xl text-sm leading-relaxed text-muted lg:text-base">
                  {service.description}
                </p>
                <Link
                  href={`/services#${service.id}`}
                  scroll={false}
                  data-cursor="pointer"
                  className="btn-arrow mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-accent"
                >
                  Learn more
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
