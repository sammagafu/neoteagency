"use client";

import { useState, type FormEvent } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          company: formData.get("company"),
          details: formData.get("details"),
          budget: formData.get("budget"),
          website: formData.get("website"),
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Unable to send your message.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unable to send your message.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-accent/30 bg-accent/5 p-10 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Received
        </p>
        <h3 className="mt-4 font-display text-2xl font-bold text-foreground">
          Thank you!
        </h3>
        <p className="mt-2 text-muted">
          We&apos;ve received your message and sent a copy to your email. We&apos;ll
          get back to you within 24 hours.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full border border-border bg-background px-4 py-4 text-foreground placeholder:text-muted/40 transition-colors focus:border-accent focus:outline-none disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={status === "submitting"}
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={status === "submitting"}
            className={inputClass}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          disabled={status === "submitting"}
          className={inputClass}
          placeholder="Your company"
        />
      </div>

      <div>
        <label htmlFor="details" className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted">
          Project Details
        </label>
        <textarea
          id="details"
          name="details"
          rows={5}
          required
          disabled={status === "submitting"}
          className={`${inputClass} resize-none`}
          placeholder="Tell us about your project..."
        />
      </div>

      <div>
        <label htmlFor="budget" className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted">
          Budget <span className="normal-case">(optional)</span>
        </label>
        <input
          type="text"
          id="budget"
          name="budget"
          disabled={status === "submitting"}
          className={inputClass}
          placeholder="e.g. $5,000 – $10,000"
        />
      </div>

      {status === "error" && error && (
        <p className="border border-accent/30 bg-accent/5 px-4 py-3 text-sm text-foreground" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-arrow group inline-flex w-full items-center justify-center gap-3 bg-foreground px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-background transition-colors hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
      </button>
    </form>
  );
}
