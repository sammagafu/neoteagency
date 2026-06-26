"use client";

import Link from "next/link";
import { useRef, type ReactNode, type MouseEvent } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-foreground text-background hover:bg-foreground/90",
  secondary:
    "bg-surface-light text-foreground hover:bg-surface-lighter border border-border",
  outline:
    "border border-foreground/20 text-foreground hover:border-accent hover:text-accent",
  ghost:
    "text-foreground hover:text-accent",
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
  showArrow?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
  showArrow = false,
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const baseStyles =
    "magnetic-btn btn-arrow group relative inline-flex items-center justify-center gap-3 overflow-hidden font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-300";

  const sizeStyles =
    variant === "ghost"
      ? "px-0 py-2"
      : "px-8 py-4";

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const content = (
    <>
      {children}
      {showArrow && (
        <svg
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
      )}
    </>
  );

  const sharedProps = {
    ref,
    "data-cursor": "pointer" as const,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    className: `${baseStyles} ${sizeStyles} ${variantStyles[variant]} ${className}`,
  };

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...sharedProps}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} {...sharedProps}>
      {content}
    </Link>
  );
}
