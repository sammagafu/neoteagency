import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { portfolioItems } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Real challenges. Smart strategies. Measurable results. Explore Neotelabs case studies.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        label="Portfolio"
        title="Our Work"
        description="Real challenges. Smart strategies. Measurable results."
      />

      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {portfolioItems.map((item) => (
              <article
                key={item.client}
                className="card-hover group overflow-hidden rounded-2xl border border-border bg-surface"
              >
                <div
                  className={`relative aspect-[16/10] bg-gradient-to-br ${item.gradient}`}
                >
                  <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                    Case Study
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold text-foreground">
                    {item.client}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
