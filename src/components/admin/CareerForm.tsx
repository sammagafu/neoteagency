"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AdminField,
  AdminSection,
  adminInputClass,
  adminTextareaClass,
} from "@/components/admin/AdminForm";
import { QuillEditor } from "@/components/admin/QuillEditor";
import { arrayToLines, linesToArray, slugify } from "@/lib/admin-utils";
import { isEmptyHtml, toEditorHtml } from "@/lib/html-utils";
import type { CareerRecord } from "@/lib/db/types";

type CareerFormProps = {
  initial?: CareerRecord;
};

export function CareerForm({ initial }: CareerFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(toEditorHtml(initial?.summary ?? ""));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isEmptyHtml(summary)) {
      setError("Summary is required.");
      setLoading(false);
      return;
    }

    const form = new FormData(e.currentTarget);
    const title = String(form.get("title") ?? "");
    const slug =
      String(form.get("slug") ?? "").trim() || slugify(title);

    const payload = {
      slug,
      title,
      department: String(form.get("department") ?? ""),
      type: String(form.get("type") ?? ""),
      location: String(form.get("location") ?? ""),
      summary,
      responsibilities: linesToArray(String(form.get("responsibilities") ?? "")),
      requirements: linesToArray(String(form.get("requirements") ?? "")),
      published: form.get("published") === "on",
      sortOrder: Number(form.get("sortOrder") ?? 0),
    };

    const url = initial
      ? `/api/admin/careers/${initial.id}`
      : "/api/admin/careers";
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

    router.push("/admin/careers");
    router.refresh();
  }

  async function handleDelete() {
    if (!initial || !confirm("Delete this career listing?")) return;
    setLoading(true);
    await fetch(`/api/admin/careers/${initial.id}`, { method: "DELETE" });
    router.push("/admin/careers");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AdminSection title="Job listing">
        <div className="grid gap-5 sm:grid-cols-2">
          <AdminField label="Job title">
            <input
              name="title"
              required
              defaultValue={initial?.title}
              className={adminInputClass}
            />
          </AdminField>
          <AdminField label="Slug">
            <input
              name="slug"
              defaultValue={initial?.slug}
              className={adminInputClass}
            />
          </AdminField>
          <AdminField label="Department">
            <input
              name="department"
              required
              defaultValue={initial?.department}
              className={adminInputClass}
            />
          </AdminField>
          <AdminField label="Employment type">
            <input
              name="type"
              required
              defaultValue={initial?.type ?? "Full-time"}
              className={adminInputClass}
            />
          </AdminField>
          <AdminField label="Location">
            <input
              name="location"
              required
              defaultValue={initial?.location ?? "Dar es Salaam"}
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
        </div>
        <QuillEditor
          name="summary"
          label="Summary"
          value={summary}
          onChange={setSummary}
          placeholder="Describe the role and what the candidate will do..."
        />
        <AdminField label="Responsibilities (one per line)">
          <textarea
            name="responsibilities"
            defaultValue={arrayToLines(initial?.responsibilities ?? [])}
            className={adminTextareaClass}
          />
        </AdminField>
        <AdminField label="Requirements (one per line)">
          <textarea
            name="requirements"
            defaultValue={arrayToLines(initial?.requirements ?? [])}
            className={adminTextareaClass}
          />
        </AdminField>
        <AdminField label="Published">
          <label className="flex items-center gap-3 pt-2">
            <input
              name="published"
              type="checkbox"
              defaultChecked={initial?.published ?? true}
              className="h-4 w-4 accent-accent"
            />
            <span className="text-sm text-muted">Show on careers page</span>
          </label>
        </AdminField>
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
