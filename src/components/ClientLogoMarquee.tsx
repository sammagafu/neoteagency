"use client";

import Image from "next/image";
import type { ClientLogoRecord } from "@/lib/db/types";

type ClientLogoMarqueeProps = {
  logos: ClientLogoRecord[];
};

export function ClientLogoMarquee({ logos }: ClientLogoMarqueeProps) {
  if (logos.length === 0) return null;

  const doubled = [...logos, ...logos];

  return (
    <div className="marquee-wrap group overflow-hidden py-4">
      <div className="animate-marquee-slow marquee-track flex w-max items-center gap-16">
        {doubled.map((client, i) => (
          <div
            key={`${client.id}-${i}`}
            className="flex h-12 w-32 shrink-0 items-center justify-center opacity-50 grayscale transition-all duration-300 group-hover:opacity-80 hover:grayscale-0 hover:opacity-100"
          >
            <Image
              src={client.logo}
              alt={client.name}
              width={120}
              height={48}
              className="max-h-10 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
