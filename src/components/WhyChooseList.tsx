"use client";

import { useState } from "react";
import { whyChooseUs } from "@/lib/site-data";

export function WhyChooseList() {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-0 divide-y divide-border border-y border-border">
      {whyChooseUs.map((item, i) => (
        <button
          key={item}
          type="button"
          data-cursor="pointer"
          onMouseEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
          className={`why-item group flex w-full items-center gap-6 py-6 text-left transition-colors ${active === i ? "bg-surface-light" : ""}`}
        >
          <span
            className={`font-mono text-sm transition-colors ${active === i ? "text-accent" : "text-muted"}`}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <p
            className={`text-lg transition-colors ${active === i ? "text-foreground" : "text-muted group-hover:text-foreground"}`}
          >
            {item}
          </p>
          <span
            className={`ml-auto h-px bg-accent transition-all duration-500 ${active === i ? "w-12" : "w-0"}`}
          />
        </button>
      ))}
    </div>
  );
}
