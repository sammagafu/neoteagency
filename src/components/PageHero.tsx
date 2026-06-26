type PageHeroProps = {
  label?: string;
  title: string;
  description?: string;
  large?: boolean;
};

export function PageHero({ label, title, description, large }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 lg:pb-24 lg:pt-44">
      <div className="hero-glow absolute inset-0" />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {label && (
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {label}
          </p>
        )}
        <h1
          className={`mt-4 font-display font-bold tracking-tight text-foreground ${
            large
              ? "text-5xl sm:text-6xl lg:text-8xl"
              : "text-4xl sm:text-5xl lg:text-7xl"
          }`}
        >
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted lg:text-xl">
            {description}
          </p>
        )}
        <div className="mt-12 h-px w-full max-w-xs bg-border" />
      </div>
    </section>
  );
}
