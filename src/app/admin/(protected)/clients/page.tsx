import Image from "next/image";
import Link from "next/link";
import { getAllClientLogos } from "@/lib/content";

export default function AdminClientsPage() {
  const clients = getAllClientLogos();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Client Logos
          </h1>
          <p className="mt-2 text-muted">{clients.length} logos</p>
        </div>
        <Link
          href="/admin/clients/new"
          className="rounded-lg bg-accent px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] text-background"
        >
          Add Logo
        </Link>
      </div>

      <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-surface">
        {clients.map((client) => (
          <Link
            key={client.id}
            href={`/admin/clients/${client.id}`}
            className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-surface-light"
          >
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-12 w-24 shrink-0 items-center justify-center rounded-lg border border-border bg-background px-2">
                <Image
                  src={client.logo}
                  alt=""
                  width={80}
                  height={32}
                  className="max-h-8 w-auto object-contain"
                />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-foreground">{client.name}</p>
                <p className="mt-1 text-sm text-muted">
                  Order {client.sortOrder}
                  {!client.published && " · Hidden"}
                </p>
              </div>
            </div>
          </Link>
        ))}
        {clients.length === 0 && (
          <p className="px-5 py-8 text-sm text-muted">No client logos yet.</p>
        )}
      </div>
    </div>
  );
}
