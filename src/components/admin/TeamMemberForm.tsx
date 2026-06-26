"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AdminField,
  AdminSection,
  adminInputClass,
} from "@/components/admin/AdminForm";
import { QuillEditor } from "@/components/admin/QuillEditor";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { slugify } from "@/lib/admin-utils";
import { isEmptyHtml, toEditorHtml } from "@/lib/html-utils";
import type { TeamMemberRecord } from "@/lib/db/types";

type TeamMemberFormProps = {
  initial?: TeamMemberRecord;
};

const departments = [
  "Leadership",
  "Creative",
  "Strategy",
  "Technology",
  "Content",
];

export function TeamMemberForm({ initial }: TeamMemberFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState(toEditorHtml(initial?.bio ?? ""));
  const [photo, setPhoto] = useState(initial?.image ?? "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isEmptyHtml(bio)) {
      setError("Bio is required.");
      setLoading(false);
      return;
    }

    const form = new FormData(e.currentTarget);
    const role = String(form.get("role") ?? "");
    const slug =
      String(form.get("slug") ?? "").trim() || slugify(role);

    const payload = {
      slug,
      name: String(form.get("name") ?? ""),
      role,
      department: String(form.get("department") ?? ""),
      bio,
      image: photo || null,
      sortOrder: Number(form.get("sortOrder") ?? 0),
    };

    const url = initial ? `/api/admin/team/${initial.id}` : "/api/admin/team";
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

    router.push("/admin/team");
    router.refresh();
  }

  async function handleDelete() {
    if (!initial || !confirm("Delete this team member?")) return;
    setLoading(true);
    await fetch(`/api/admin/team/${initial.id}`, { method: "DELETE" });
    router.push("/admin/team");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AdminSection title="Team member">
        <div className="grid gap-5 sm:grid-cols-2">
          <AdminField label="Name">
            <input
              name="name"
              defaultValue={initial?.name}
              placeholder="Leave empty to show role only"
              className={adminInputClass}
            />
          </AdminField>
          <AdminField label="Role">
            <input
              name="role"
              required
              defaultValue={initial?.role}
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
            <select
              name="department"
              required
              defaultValue={initial?.department}
              className={adminInputClass}
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </AdminField>
          <ImageUploadField
            label="Photo (optional)"
            value={photo}
            onChange={setPhoto}
            folder="team"
          />
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
          name="bio"
          label="Bio"
          value={bio}
          onChange={setBio}
          placeholder="Write a short bio for this team member..."
        />
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
