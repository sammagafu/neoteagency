import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
};

export function Logo({ variant = "light", className = "" }: LogoProps) {
  const src =
    variant === "light"
      ? "/assets/brand/logo-white.svg"
      : "/assets/brand/logo.svg";

  return (
    <Link href="/" className={`inline-flex items-center ${className}`} data-cursor="pointer">
      <Image
        src={src}
        alt="Neotelabs"
        width={160}
        height={40}
        className="h-8 w-auto lg:h-9"
        priority
      />
    </Link>
  );
}
