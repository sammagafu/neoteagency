import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl font-bold text-foreground">
        Project not found
      </h1>
      <p className="mt-4 max-w-md text-muted">
        This case study doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/portfolio"
        className="btn-arrow mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-accent"
      >
        Back to Portfolio
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
      </Link>
    </section>
  );
}
