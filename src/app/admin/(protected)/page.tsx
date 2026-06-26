import Link from "next/link";
import { getContentCounts } from "@/lib/content";

export default function AdminDashboardPage() {
  const counts = getContentCounts();

  const cards = [
    {
      title: "Case Studies",
      count: counts.caseStudies,
      href: "/admin/case-studies",
      description: "Portfolio projects and outcomes",
    },
    {
      title: "Team",
      count: counts.team,
      href: "/admin/team",
      description: "Team members on About page",
    },
    {
      title: "Careers",
      count: counts.careers,
      href: "/admin/careers",
      description: "Open job listings",
    },
    {
      title: "Client Logos",
      count: counts.clients,
      href: "/admin/clients",
      description: "Logos shown in the homepage marquee",
    },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-foreground">
        Dashboard
      </h1>
      <p className="mt-2 text-muted">
        Manage content that appears on the public website.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/30"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {card.title}
            </p>
            <p className="mt-3 font-display text-4xl font-bold text-foreground">
              {card.count}
            </p>
            <p className="mt-2 text-sm text-muted">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
