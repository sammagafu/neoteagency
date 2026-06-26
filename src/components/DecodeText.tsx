"use client";

import { useEffect, useState } from "react";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
const SETTLE_EVERY = 2;

type DecodeTextProps = {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  loopEvery?: number;
};

export function DecodeText({
  text,
  className = "",
  delay = 900,
  speed = 45,
  loopEvery = 60_000,
}: DecodeTextProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setDisplay(text);
      return;
    }

    const letters = text.split("");
    let cancelled = false;
    let decodeIntervalId: ReturnType<typeof setInterval> | undefined;
    let loopTimeoutId: ReturnType<typeof setTimeout> | undefined;
    let initialTimeoutId: ReturnType<typeof setTimeout> | undefined;

    const scramble = () =>
      letters
        .map((letter) =>
          letter === " " ? " " : CHARSET[Math.floor(Math.random() * CHARSET.length)]
        )
        .join("");

    const runCycle = (onComplete: () => void) => {
      setDisplay(scramble());
      let frame = 0;

      decodeIntervalId = setInterval(() => {
        if (cancelled) return;

        frame += 1;

        const next = letters
          .map((letter, index) => {
            if (letter === " ") return " ";
            if (index * SETTLE_EVERY < frame) return letter;
            return CHARSET[Math.floor(Math.random() * CHARSET.length)];
          })
          .join("");

        setDisplay(next);

        if (frame > letters.length * SETTLE_EVERY + 4) {
          setDisplay(text);
          if (decodeIntervalId) clearInterval(decodeIntervalId);
          decodeIntervalId = undefined;
          onComplete();
        }
      }, speed);
    };

    const scheduleNext = () => {
      loopTimeoutId = setTimeout(() => {
        if (cancelled) return;
        runCycle(scheduleNext);
      }, loopEvery);
    };

    initialTimeoutId = setTimeout(() => {
      if (cancelled) return;
      runCycle(scheduleNext);
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(initialTimeoutId);
      clearTimeout(loopTimeoutId);
      if (decodeIntervalId) clearInterval(decodeIntervalId);
    };
  }, [text, delay, speed, loopEvery]);

  return (
    <span aria-label={text} className={className}>
      {display}
    </span>
  );
}
