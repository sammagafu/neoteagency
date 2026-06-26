"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminInputClass } from "@/components/admin/AdminForm";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") ?? "");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Invalid password");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Neotelabs CMS
        </p>
        <h1 className="mt-3 font-display text-2xl font-bold text-foreground">
          Admin Login
        </h1>
        <p className="mt-2 text-sm text-muted">
          Sign in to manage case studies, team, and careers.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className={adminInputClass}
            />
          </div>

          {error && (
            <p className="text-sm text-accent">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-accent py-3 font-mono text-xs uppercase tracking-[0.15em] text-background transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
