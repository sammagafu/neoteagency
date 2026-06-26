import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { contactInfo } from "@/lib/site-data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Get in touch with Neotelabs in Dar es Salaam. Start your next branding, marketing, or digital project with our team.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Contact Us"
        description="Tell us about your project — we respond within one business day."
        large
      />

      <section className="pb-24 lg:pb-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <ScrollReveal>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                Get in Touch
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Ready to start your next project? Reach out and we&apos;ll get
                back to you within one business day.
              </p>

              <div className="mt-12 space-y-8">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
                    Email
                  </p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="mt-2 block font-display text-xl text-foreground transition-colors hover:text-accent"
                  >
                    {contactInfo.email}
                  </a>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
                    Phone
                  </p>
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                    className="mt-2 block font-display text-xl text-foreground transition-colors hover:text-accent"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
                    Location
                  </p>
                  <p className="mt-2 font-display text-xl text-foreground">
                    {contactInfo.location}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="border border-border bg-surface p-8 lg:p-10">
                <h2 className="font-display text-xl font-bold text-foreground">
                  Contact Form
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Share your project details and we&apos;ll be in touch.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
