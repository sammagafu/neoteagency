"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: string;
  className?: string;
};

function parseValue(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { target: 0, suffix: value };
  return { target: Number(match[1]), suffix: match[2] };
}

export function CountUp({ value, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { target, suffix } = parseValue(value);
  const isNumeric = /^\d/.test(value);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!isNumeric) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isNumeric]);

  useEffect(() => {
    if (!started || !isNumeric) return;

    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [started, target, isNumeric]);

  if (!isNumeric) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
}
