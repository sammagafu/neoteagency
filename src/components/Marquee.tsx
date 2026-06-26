"use client";

type MarqueeProps = {
  items: readonly string[];
  speed?: "normal" | "slow";
  separator?: string;
  className?: string;
};

export function Marquee({
  items,
  speed = "normal",
  separator = "✦",
  className = "",
}: MarqueeProps) {
  const content = items.flatMap((item, i) => [
    item,
    ...(i < items.length - 1 ? [separator] : []),
  ]);

  const doubled = [...content, ...content];

  return (
    <div className={`marquee-wrap group overflow-hidden ${className}`}>
      <div
        className={`flex w-max whitespace-nowrap ${speed === "slow" ? "animate-marquee-slow marquee-track" : "animate-marquee marquee-track"}`}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`mx-6 inline-block transition-colors ${
              item === separator
                ? "text-accent/40"
                : "font-display text-sm font-semibold uppercase tracking-[0.2em] text-muted group-hover:text-foreground/70"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
