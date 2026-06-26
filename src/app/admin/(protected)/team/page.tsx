import Link from "next/link";
import { getAllTeamMembers } from "@/lib/content";

export default function AdminTeamPage() {
  const members = getAllTeamMembers();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Team
          </h1>
          <p className="mt-2 text-muted">{members.length} members</p>
        </div>
        <Link
          href="/admin/team/new"
          className="rounded-lg bg-accent px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] text-background"
        >
          Add Member
        </Link>
      </div>

      <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-surface">
        {members.map((member) => (
          <Link
            key={member.id}
            href={`/admin/team/${member.id}`}
            className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-surface-light"
          >
            <div>
              <p className="font-medium text-foreground">
                {member.name || member.role}
              </p>
              <p className="mt-1 text-sm text-muted">
                {member.role} · {member.department}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
