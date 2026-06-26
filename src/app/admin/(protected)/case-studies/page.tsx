import Link from "next/link";
import { getAllCaseStudies } from "@/lib/content";

export default function AdminCaseStudiesPage() {
  const items = getAllCaseStudies();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Case Studies
          </h1>
          <p className="mt-2 text-muted">{items.length} projects</p>
        </div>
        <Link
          href="/admin/case-studies/new"
          className="rounded-lg bg-accent px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] text-background"
        >
          Add Case Study
        </Link>
      </div>

      <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-surface">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/admin/case-studies/${item.id}`}
            className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-surface-light"
          >
            <div>
              <p className="font-medium text-foreground">{item.client}</p>
              <p className="mt-1 text-sm text-muted">
                {item.category} · {item.year}
                {item.featured ? " · Featured" : ""}
              </p>
            </div>
            <span className="font-mono text-xs text-muted">{item.slug}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
