"use client";

import { useEffect, useState } from "react";

export function CursorFollower() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    document.body.classList.add("cursor-custom");

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest("a, button, [data-cursor='pointer'], input, textarea, select, label")
      );
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      document.body.classList.remove("cursor-custom");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[10000] mix-blend-difference"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      />
      <div
        className={`cursor-ring pointer-events-none fixed left-0 top-0 z-[10000] ${hovering ? "cursor-ring-hover" : ""}`}
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      />
    </>
  );
}
