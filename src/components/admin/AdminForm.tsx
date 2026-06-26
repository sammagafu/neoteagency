export const adminInputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none";

export const adminLabelClass =
  "mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted";

export const adminTextareaClass = `${adminInputClass} min-h-[120px] resize-y`;

export function AdminField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={adminLabelClass}>{label}</label>
      {children}
    </div>
  );
}

export function AdminSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-surface p-6">
      <h2 className="font-display text-lg font-semibold text-foreground">
        {title}
      </h2>
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}
