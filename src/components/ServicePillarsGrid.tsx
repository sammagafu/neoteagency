"use client";

import { useState } from "react";
import { servicePillars } from "@/lib/site-data";

export function ServicePillarsGrid() {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-px sm:overflow-hidden sm:rounded-2xl sm:border sm:border-border sm:bg-border lg:grid-cols-3">
      {servicePillars.map((pillar, index) => {
        const isActive = active === index;
        return (
          <button
            key={pillar.title}
            type="button"
            data-cursor="pointer"
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
            className={`interactive-card group h-full rounded-2xl border p-8 text-left transition-all duration-300 sm:rounded-none sm:border-0 lg:p-10 ${
              isActive
                ? "border-accent/30 bg-surface-light"
                : "border-border bg-surface hover:border-accent/20 hover:bg-surface-light"
            }`}
          >
            <span
              className={`font-mono text-sm transition-colors ${isActive ? "text-accent" : "text-muted group-hover:text-accent/70"}`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
              {pillar.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {pillar.description}
            </p>
            <span
              className={`mt-6 block h-px bg-accent transition-all duration-500 ${isActive ? "w-full" : "w-0 group-hover:w-8"}`}
            />
          </button>
        );
      })}
    </div>
  );
}
