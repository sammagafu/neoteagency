"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AdminField } from "@/components/admin/AdminForm";

type ImageGalleryFieldProps = {
  label: string;
  value: string[];
  onChange: (urls: string[]) => void;
};

export function ImageGalleryField({
  label,
  value,
  onChange,
}: ImageGalleryFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setUploading(true);
    setError("");

    const uploaded: string[] = [];

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "gallery");

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        const data = (await res.json()) as { url?: string; error?: string };

        if (!res.ok || !data.url) {
          setError(data.error ?? "One or more uploads failed");
          break;
        }

        uploaded.push(data.url);
      }

      if (uploaded.length > 0) {
        onChange([...value, ...uploaded]);
      }
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  function removeAt(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <AdminField label={label}>
      {value.length > 0 ? (
        <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {value.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-background"
            >
              <Image
                src={url}
                alt=""
                fill
                className="object-cover"
                sizes="300px"
                unoptimized
              />
              <button
                type="button"
                onClick={() => removeAt(index)}
                className="absolute right-2 top-2 rounded bg-background/90 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-accent opacity-0 transition-opacity group-hover:opacity-100"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-4 rounded-lg border border-dashed border-border bg-background px-4 py-8 text-center text-sm text-muted">
          No gallery images yet
        </div>
      )}

      <label className="inline-flex cursor-pointer rounded-lg border border-border px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-foreground transition-colors hover:border-accent hover:text-accent">
        {uploading ? "Uploading..." : "Add images"}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          multiple
          className="sr-only"
          disabled={uploading}
          onChange={handleFiles}
        />
      </label>

      <p className="mt-2 text-xs text-muted">
        Upload multiple project images — JPEG, PNG, WebP, GIF, or SVG, max 5 MB each
      </p>

      {error && (
        <p className="mt-2 text-sm text-accent">{error}</p>
      )}
    </AdminField>
  );
}
