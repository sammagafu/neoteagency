import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceIcon } from "@/components/ServiceIcon";
import {
  COMPANY_PROFILE_URL,
  homeServices,
  whyChooseUs,
} from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="hero-glow absolute inset-0" />
        <div className="grid-pattern absolute inset-0 opacity-50" />
        <div className="absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Turning Brands Into{" "}
              <span className="gradient-text">Market Leaders</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              We bridge the gap between exceptional products and the customers
              who need them — through strategy, creativity, and data-driven
              execution.{" "}
              <a
                href={COMPANY_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-4 hover:underline"
              >
                Company Profile
              </a>
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/contact">Start Your Project</Button>
              <Button href="/portfolio" variant="outline">
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="border-y border-border bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xl leading-relaxed text-muted sm:text-2xl">
              At Neotelabs, we are more than a digital agency — we are your{" "}
              <span className="font-semibold text-foreground">
                growth partner
              </span>
              . We combine strategic thinking, creative excellence, and
              technical expertise to deliver solutions that drive real business
              impact.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            label="Services"
            title="Integrated Solutions"
            description="Integrated solutions designed to elevate your brand at every touchpoint."
          />

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homeServices.map((service) => (
              <div
                key={service.title}
                className="card-hover group rounded-2xl border border-border bg-surface p-8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <ServiceIcon icon={service.icon} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button href="/services" variant="outline">
              Explore All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 via-surface-light to-violet-900/30">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-6xl font-bold text-accent/30">200K+</span>
                  <p className="mt-2 text-sm font-medium uppercase tracking-widest text-muted">
                    Cartons Sold
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-8">
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                  Featured Project
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
                  Safaya Gin
                </h3>
              </div>
            </div>

            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-accent">
                Case Study
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
                From Unknown to Market Success
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                We executed a strategic campaign that introduced Safaya Gin to
                urban consumers — delivering over{" "}
                <span className="font-semibold text-foreground">
                  200,000 cartons sold
                </span>{" "}
                within one month.
              </p>
              <div className="mt-8">
                <Button href="/portfolio" variant="secondary">
                  View More Work
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <SectionHeading
              label="Why Choose Us"
              title="We Create Transformation"
              description="We don't just deliver services — we create transformation."
              align="left"
            />

            <ul className="space-y-4">
              {whyChooseUs.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </span>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-violet-500/5 to-accent/10" />
        <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Ready to take your brand further?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            Let&apos;s build something exceptional together.
          </p>
          <div className="mt-10">
            <Button href="/contact">Contact Us</Button>
          </div>
        </div>
      </section>
    </>
  );
}
