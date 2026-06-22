type PageHeroProps = {
  label?: string;
  title: string;
  description?: string;
};

export function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          {label && (
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-accent">
              {label}
            </span>
          )}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
