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
import { ImageGalleryField } from "@/components/admin/ImageGalleryField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import {
  arrayToLines,
  linesToArray,
  linesToOutcomes,
  outcomesToLines,
  slugify,
} from "@/lib/admin-utils";
import { isEmptyHtml, toEditorHtml } from "@/lib/html-utils";
import type { CaseStudy } from "@/lib/db/types";

type CaseStudyFormProps = {
  initial?: CaseStudy;
};

export function CaseStudyForm({ initial }: CaseStudyFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(
    toEditorHtml(initial?.description ?? ""),
  );
  const [challenge, setChallenge] = useState(
    toEditorHtml(initial?.challenge ?? ""),
  );
  const [approach, setApproach] = useState(toEditorHtml(initial?.approach ?? ""));
  const [coverImage, setCoverImage] = useState(initial?.image ?? "");
  const [gallery, setGallery] = useState<string[]>(initial?.gallery ?? []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (
      isEmptyHtml(description) ||
      isEmptyHtml(challenge) ||
      isEmptyHtml(approach) ||
      !coverImage
    ) {
      setError("Description, challenge, approach, and cover image are required.");
      setLoading(false);
      return;
    }

    const form = new FormData(e.currentTarget);
    const client = String(form.get("client") ?? "");
    const slug =
      String(form.get("slug") ?? "").trim() || slugify(client);

    const payload = {
      slug,
      client,
      description,
      category: String(form.get("category") ?? ""),
      image: coverImage,
      gradient: String(form.get("gradient") ?? "from-black to-zinc-900"),
      year: String(form.get("year") ?? ""),
      challenge,
      approach,
      results: linesToArray(String(form.get("results") ?? "")),
      outcomes: linesToOutcomes(String(form.get("outcomes") ?? "")),
      services: linesToArray(String(form.get("services") ?? "")),
      gallery,
      featured: form.get("featured") === "on",
      sortOrder: Number(form.get("sortOrder") ?? 0),
    };

    const url = initial
      ? `/api/admin/case-studies/${initial.id}`
      : "/api/admin/case-studies";
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

    router.push("/admin/case-studies");
    router.refresh();
  }

  async function handleDelete() {
    if (!initial || !confirm("Delete this case study?")) return;
    setLoading(true);
    await fetch(`/api/admin/case-studies/${initial.id}`, { method: "DELETE" });
    router.push("/admin/case-studies");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AdminSection title="Basic info">
        <div className="grid gap-5 sm:grid-cols-2">
          <AdminField label="Client name">
            <input
              name="client"
              required
              defaultValue={initial?.client}
              className={adminInputClass}
            />
          </AdminField>
          <AdminField label="Slug">
            <input
              name="slug"
              defaultValue={initial?.slug}
              placeholder="auto-generated from client"
              className={adminInputClass}
            />
          </AdminField>
          <AdminField label="Category">
            <input
              name="category"
              required
              defaultValue={initial?.category}
              className={adminInputClass}
            />
          </AdminField>
          <AdminField label="Year">
            <input
              name="year"
              required
              defaultValue={initial?.year}
              className={adminInputClass}
            />
          </AdminField>
        </div>
        <QuillEditor
          name="description"
          label="Short description"
          value={description}
          onChange={setDescription}
          placeholder="Brief summary for portfolio cards and hero..."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <ImageUploadField
            label="Cover image"
            value={coverImage}
            onChange={setCoverImage}
            folder="case-studies"
            required
          />
          <AdminField label="Gradient classes">
            <input
              name="gradient"
              defaultValue={initial?.gradient ?? "from-black to-zinc-900"}
              className={adminInputClass}
            />
          </AdminField>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <AdminField label="Sort order">
            <input
              name="sortOrder"
              type="number"
              defaultValue={initial?.sortOrder ?? 0}
              className={adminInputClass}
            />
          </AdminField>
          <AdminField label="Featured on homepage">
            <label className="flex items-center gap-3 pt-2">
              <input
                name="featured"
                type="checkbox"
                defaultChecked={initial?.featured}
                className="h-4 w-4 accent-accent"
              />
              <span className="text-sm text-muted">Set as featured project</span>
            </label>
          </AdminField>
        </div>
      </AdminSection>

      <AdminSection title="Case study content">
        <QuillEditor
          name="challenge"
          label="Challenge"
          value={challenge}
          onChange={setChallenge}
          placeholder="What problem did the client face?"
        />
        <QuillEditor
          name="approach"
          label="Approach"
          value={approach}
          onChange={setApproach}
          placeholder="How did Neotelabs solve it?"
        />
        <AdminField label="Results (one per line)">
          <textarea
            name="results"
            defaultValue={arrayToLines(initial?.results ?? [])}
            className={adminTextareaClass}
          />
        </AdminField>
        <AdminField label="Outcomes (value|label per line)">
          <textarea
            name="outcomes"
            defaultValue={outcomesToLines(initial?.outcomes ?? [])}
            placeholder={"200K+|Cartons sold\n1M+|People reached"}
            className={adminTextareaClass}
          />
        </AdminField>
        <AdminField label="Services (one per line)">
          <textarea
            name="services"
            defaultValue={arrayToLines(initial?.services ?? [])}
            className={adminTextareaClass}
          />
        </AdminField>
        <ImageGalleryField
          label="Project gallery"
          value={gallery}
          onChange={setGallery}
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
