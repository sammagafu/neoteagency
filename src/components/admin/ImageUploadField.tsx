"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AdminField } from "@/components/admin/AdminForm";

type UploadFolder = "case-studies" | "team" | "gallery" | "clients";

type ImageUploadFieldProps = {
  label: string;
  name?: string;
  value: string;
  onChange: (url: string) => void;
  folder: UploadFolder;
  required?: boolean;
};

export function ImageUploadField({
  label,
  name,
  value,
  onChange,
  folder,
  required = false,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok) {
        setError(data.error ?? "Upload failed");
        return;
      }

      if (data.url) {
        onChange(data.url);
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

  return (
    <AdminField label={label}>
      {name && (
        <input type="hidden" name={name} value={value} required={required} />
      )}

      {value ? (
        <div className="relative mb-4 aspect-[16/10] max-w-md overflow-hidden rounded-lg border border-border bg-background">
          <Image
            src={value}
            alt=""
            fill
            className="object-cover"
            sizes="400px"
            unoptimized
          />
        </div>
      ) : (
        <div className="mb-4 flex aspect-[16/10] max-w-md items-center justify-center rounded-lg border border-dashed border-border bg-background text-sm text-muted">
          No image selected
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <label className="cursor-pointer rounded-lg border border-border px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-foreground transition-colors hover:border-accent hover:text-accent">
          {uploading ? "Uploading..." : value ? "Replace image" : "Upload image"}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            className="sr-only"
            disabled={uploading}
            onChange={handleFileChange}
          />
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            disabled={uploading}
            className="rounded-lg border border-border px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:border-accent hover:text-accent"
          >
            Remove
          </button>
        )}
      </div>

      <p className="mt-2 text-xs text-muted">
        JPEG, PNG, WebP, GIF, or SVG — max 5 MB
      </p>

      {error && (
        <p className="mt-2 text-sm text-accent">{error}</p>
      )}
    </AdminField>
  );
}
