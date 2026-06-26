import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TiltCard } from "@/components/TiltCard";
import { getAllCaseStudies } from "@/lib/content";
import { stripHtml } from "@/lib/html-utils";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Portfolio",
  description:
    "Real challenges. Smart strategies. Measurable results. Explore Neotelabs case studies and client work.",
  path: "/portfolio",
  keywords: [
    "case studies",
    "portfolio",
    "brand campaigns Tanzania",
    "digital agency work",
  ],
});

export default function PortfolioPage() {
  const portfolioItems = getAllCaseStudies();

  return (
    <>
      <PageHero
        label="Portfolio"
        title="Our Work"
        description="Real challenges. Smart strategies. Measurable results."
        large
      />

      <section className="pb-24 lg:pb-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="space-y-8">
            {portfolioItems.map((item, i) => (
              <ScrollReveal key={item.slug} delay={i * 80}>
                <TiltCard className="relative overflow-hidden border border-border bg-surface">
                  <Link
                    href={`/portfolio/${item.slug}`}
                    data-cursor="pointer"
                    className="card-hover group grid lg:grid-cols-5"
                  >
                    <div
                      className={`relative aspect-[16/9] overflow-hidden lg:col-span-2 lg:aspect-auto lg:min-h-[320px] ${item.gradient}`}
                    >
                      <Image
                        src={item.image}
                        alt={item.client}
                        fill
                        className="img-zoom object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30" />
                      <div className="absolute left-6 top-6">
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
                          Case Study
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center p-8 lg:col-span-3 lg:p-12">
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                        {item.category}
                      </span>
                      <h2 className="mt-3 font-display text-2xl font-bold text-foreground transition-colors group-hover:text-accent lg:text-4xl">
                        {item.client}
                      </h2>
                      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted lg:text-lg">
                        {stripHtml(item.description)}
                      </p>
                      <span className="btn-arrow mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-foreground">
                        View Case Study
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-20 border-t border-border pt-16 text-center">
            <p className="font-display text-2xl font-semibold text-foreground">
              Ready to take your brand further?
            </p>
            <p className="mx-auto mt-4 max-w-md text-muted">
              Let&apos;s build something exceptional together.
            </p>
            <div className="mt-8">
              <Button href="/contact" showArrow>
                Contact Us
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
