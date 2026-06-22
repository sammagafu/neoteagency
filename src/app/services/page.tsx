import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { servicesDetail } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "From strategy to execution, Neotelabs delivers integrated solutions designed to move your business forward.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="What We Do"
        description="From strategy to execution, we deliver integrated solutions designed to move your business forward."
      />

      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-16">
            {servicesDetail.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid gap-8 lg:grid-cols-2 lg:items-center ${
                  index % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <span className="text-sm font-semibold uppercase tracking-widest text-accent">
                    0{index + 1}
                  </span>
                  <h2 className="mt-2 font-display text-3xl font-bold text-foreground">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-lg text-muted">{service.intro}</p>
                  <ul className="mt-6 space-y-3">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-foreground">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20">
                          <svg
                            className="h-3 w-3 text-accent"
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
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent/10 via-surface-light to-violet-900/20 ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-7xl font-bold text-accent/10">
                      {service.title.split(" ")[0]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
