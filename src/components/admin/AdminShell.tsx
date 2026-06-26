"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/case-studies", label: "Case Studies" },
  { href: "/admin/team", label: "Team" },
  { href: "/admin/careers", label: "Careers" },
  { href: "/admin/clients", label: "Clients" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-black text-foreground">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Neotelabs CMS
            </p>
            <h1 className="font-display text-lg font-bold">Content Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="font-mono text-xs uppercase tracking-[0.15em] text-muted hover:text-foreground"
            >
              View Site
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:border-accent hover:text-foreground"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8 lg:grid-cols-[220px_1fr]">
        <nav className="space-y-1">
          {links.map((link) => {
            const active =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-lg px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
                  active
                    ? "bg-accent text-background"
                    : "text-muted hover:bg-surface hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <main>{children}</main>
      </div>
    </div>
  );
}
