"use client";

import { useEffect, useRef } from "react";

const HERO_VIDEO_SOURCES = [
  { src: "/video/tech.mp4", type: "video/mp4" },
  { src: "/video/tech.mov", type: "video/quicktime" },
] as const;

export function HeroTechEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<SVGSVGElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const startPlayback = () => {
      if (reducedMotion.matches) {
        video.pause();
        video.currentTime = 0;
        return;
      }

      video.loop = true;
      void video.play().catch(() => {});
    };

    const onEnded = () => {
      video.currentTime = 0;
      void video.play().catch(() => {});
    };

    video.addEventListener("canplay", startPlayback);
    video.addEventListener("ended", onEnded);

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      startPlayback();
    } else {
      video.load();
    }

    const onMotionChange = () => startPlayback();
    reducedMotion.addEventListener("change", onMotionChange);

    return () => {
      video.removeEventListener("canplay", startPlayback);
      video.removeEventListener("ended", onEnded);
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const rings = ringsRef.current;
    if (!container || !rings) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      rings.style.transform = `translate(-50%, -50%) translate(${x * 24}px, ${y * 16}px)`;

      const orbs = container.querySelectorAll<HTMLElement>(".hero-orb");
      orbs.forEach((orb, i) => {
        const factor = i === 0 ? 18 : 12;
        orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const streams = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: `${8 + i * 12}%`,
    delay: `${i * 1.4}s`,
    duration: `${9 + (i % 3) * 2}s`,
    accent: i === 2 || i === 6,
  }));

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="hero-video-wrap absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="hero-video absolute inset-0 h-full w-full object-cover"
        >
          {HERO_VIDEO_SOURCES.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>
      </div>

      <div className="hero-orb hero-orb-red absolute -right-24 top-16 h-80 w-80 rounded-full transition-transform duration-300 ease-out" />
      <div className="hero-orb hero-orb-white absolute -left-20 bottom-32 h-64 w-64 rounded-full transition-transform duration-300 ease-out" />

      <svg
        ref={ringsRef}
        className="hero-rings absolute left-1/2 top-[38%] h-[min(90vw,720px)] w-[min(90vw,720px)] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out"
        viewBox="0 0 600 600"
        fill="none"
      >
        <ellipse
          cx="300"
          cy="300"
          rx="280"
          ry="120"
          className="hero-ring hero-ring-1"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
        <ellipse
          cx="300"
          cy="300"
          rx="220"
          ry="200"
          className="hero-ring hero-ring-2"
          stroke="rgba(225,29,46,0.18)"
          strokeWidth="1"
        />
        <ellipse
          cx="300"
          cy="300"
          rx="160"
          ry="280"
          className="hero-ring hero-ring-3"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
        <circle
          cx="300"
          cy="300"
          r="3"
          fill="rgba(225,29,46,0.6)"
          className="hero-ring-core"
        />
      </svg>

      <div className="hero-streams absolute inset-0">
        {streams.map((stream) => (
          <span
            key={stream.id}
            className={`hero-stream ${stream.accent ? "hero-stream-accent" : ""}`}
            style={{
              left: stream.left,
              animationDelay: stream.delay,
              animationDuration: stream.duration,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-black/22 to-background" />
    </div>
  );
}
