import Link from "next/link";
import { getAllCareers } from "@/lib/content";

export default function AdminCareersPage() {
  const positions = getAllCareers();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Careers
          </h1>
          <p className="mt-2 text-muted">{positions.length} listings</p>
        </div>
        <Link
          href="/admin/careers/new"
          className="rounded-lg bg-accent px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] text-background"
        >
          Add Position
        </Link>
      </div>

      <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-surface">
        {positions.map((position) => (
          <Link
            key={position.id}
            href={`/admin/careers/${position.id}`}
            className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-surface-light"
          >
            <div>
              <p className="font-medium text-foreground">{position.title}</p>
              <p className="mt-1 text-sm text-muted">
                {position.department} · {position.type} · {position.location}
                {!position.published ? " · Draft" : ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
