"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent/5 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-foreground">Thank you!</h3>
        <p className="mt-2 text-muted">
          We&apos;ve received your message and will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="mb-2 block text-sm font-medium text-foreground">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          className="w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          placeholder="Your company"
        />
      </div>

      <div>
        <label htmlFor="details" className="mb-2 block text-sm font-medium text-foreground">
          Project Details
        </label>
        <textarea
          id="details"
          name="details"
          rows={5}
          required
          className="w-full resize-none rounded-xl border border-border bg-surface-light px-4 py-3 text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          placeholder="Tell us about your project..."
        />
      </div>

      <div>
        <label htmlFor="budget" className="mb-2 block text-sm font-medium text-foreground">
          Budget <span className="text-muted">(optional)</span>
        </label>
        <input
          type="text"
          id="budget"
          name="budget"
          className="w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          placeholder="e.g. $5,000 – $10,000"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-accent-light sm:w-auto"
      >
        Send Message
      </button>
    </form>
  );
}
