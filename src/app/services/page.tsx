import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Marquee } from "@/components/Marquee";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ServiceDetailList } from "@/components/ServiceDetailList";
import { ServicePillarsGrid } from "@/components/ServicePillarsGrid";
import { services } from "@/lib/site-data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Services",
  description:
    "Five integrated capabilities — strategy, branding, technology, content, and events — designed to move your brand forward.",
  path: "/services",
  keywords: [
    "brand strategy",
    "digital marketing",
    "web development",
    "content production",
    "event marketing Tanzania",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="What We Do"
        description="Five integrated capabilities that work together — from market insight to brand launch, digital build, content production, and public presence."
        large
      />

      <div className="border-y border-border bg-surface py-5">
        <Marquee items={services.map((service) => service.title)} />
      </div>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <ScrollReveal>
            <p className="max-w-4xl font-display text-3xl font-semibold leading-snug text-foreground sm:text-4xl lg:text-5xl lg:leading-tight">
              We don&apos;t offer isolated deliverables. We build{" "}
              <span className="text-accent">connected systems</span> — where
              strategy informs design, design fuels content, and every channel
              works toward the same goal.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              How we deliver
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold text-foreground lg:text-4xl">
              One team. One direction. Real results.
            </h2>
            <p className="mt-5 max-w-xl text-base text-muted">
              Hover or tap a pillar to see how we approach every engagement.
            </p>
          </ScrollReveal>

          <ServicePillarsGrid />
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Capabilities
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold text-foreground lg:text-5xl">
              Integrated Solutions
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              Five integrated capabilities — each with clear deliverables,
              outcomes, and examples from our work.
            </p>
          </ScrollReveal>

          <div className="mt-12 lg:mt-16">
            <ServiceDetailList />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border py-28 lg:py-36">
        <div className="absolute inset-0 bg-gradient-to-t from-accent/[0.04] via-transparent to-transparent" />
        <div className="relative mx-auto max-w-[1400px] px-6 text-center lg:px-10">
          <ScrollReveal>
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
              Not sure where to start?
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Tell us about your goals. We&apos;ll recommend the right mix of
              services for your project.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact" showArrow>
                Start Your Project
              </Button>
              <Button href="/process" variant="outline" showArrow>
                See Our Process
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
