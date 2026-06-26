"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AdminField,
  AdminSection,
  adminInputClass,
} from "@/components/admin/AdminForm";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { ClientLogoRecord } from "@/lib/db/types";

type ClientLogoFormProps = {
  initial?: ClientLogoRecord;
};

export function ClientLogoForm({ initial }: ClientLogoFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState(initial?.logo ?? "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!logo) {
      setError("Logo image is required.");
      setLoading(false);
      return;
    }

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      logo,
      published: form.get("published") === "on",
      sortOrder: Number(form.get("sortOrder") ?? 0),
    };

    const url = initial ? `/api/admin/clients/${initial.id}` : "/api/admin/clients";
    const method = initial ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? "Save failed");
      return;
    }

    router.push("/admin/clients");
    router.refresh();
  }

  async function handleDelete() {
    if (!initial || !confirm("Delete this client logo?")) return;
    setLoading(true);
    await fetch(`/api/admin/clients/${initial.id}`, { method: "DELETE" });
    router.push("/admin/clients");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AdminSection title="Client logo">
        <div className="grid gap-5 sm:grid-cols-2">
          <AdminField label="Client name">
            <input
              name="name"
              required
              defaultValue={initial?.name}
              placeholder="e.g. Safaya Gin"
              className={adminInputClass}
            />
          </AdminField>
          <AdminField label="Sort order">
            <input
              name="sortOrder"
              type="number"
              defaultValue={initial?.sortOrder ?? 0}
              className={adminInputClass}
            />
          </AdminField>
          <div className="sm:col-span-2">
            <ImageUploadField
              label="Logo image"
              value={logo}
              onChange={setLogo}
              folder="clients"
            />
          </div>
          <label className="flex items-center gap-3 sm:col-span-2">
            <input
              name="published"
              type="checkbox"
              defaultChecked={initial?.published ?? true}
              className="h-4 w-4 accent-accent"
            />
            <span className="text-sm text-foreground">Show on homepage</span>
          </label>
        </div>
      </AdminSection>

      {error && (
        <p className="rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-background transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Saving..." : initial ? "Update" : "Create"}
        </button>
        {initial && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="rounded-lg border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:border-accent hover:text-accent"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
