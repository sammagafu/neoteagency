"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SiteChrome } from "@/components/SiteChrome";

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteChrome />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
