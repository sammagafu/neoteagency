"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { getProjectBySlug, services, type Service } from "@/lib/site-data";

export function ServiceDetailList() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      document.getElementById(hash)?.scrollIntoView({ block: "start" });
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return (
    <div className="space-y-8 lg:space-y-10">
      {services.map((service) => (
        <ServiceBlock key={service.id} service={service} />
      ))}
    </div>
  );
}

function ServiceBlock({ service }: { service: Service }) {
  const related = service.relatedProjects
    .map((slug) => getProjectBySlug(slug))
    .filter(Boolean);

  return (
    <article
      id={service.id}
      className="scroll-mt-28 overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <div className="border-b border-border px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <div className="flex items-center gap-5">
            <span className="font-mono text-sm text-accent">{service.number}</span>
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border bg-background">
              <Image
                src={service.iconImage}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-2xl font-bold text-foreground lg:text-3xl">
              {service.title}
            </h3>
            <p className="mt-2 text-base leading-relaxed text-muted lg:text-lg">
              {service.tagline}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8 px-6 py-8 sm:px-8 lg:space-y-10 lg:px-10 lg:py-10">
        <p className="max-w-3xl text-base leading-relaxed text-muted lg:text-lg">
          {service.intro}
        </p>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-px sm:overflow-hidden sm:rounded-xl sm:border sm:border-border sm:bg-border">
          {service.deliverables.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-background p-5 sm:rounded-none sm:border-0 sm:p-6 lg:p-7"
            >
              <h4 className="font-medium text-foreground">{item.title}</h4>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-accent/20 bg-accent/[0.04] p-6 lg:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Outcome
          </p>
          <p className="mt-3 text-base leading-relaxed text-foreground lg:text-lg">
            {service.outcome}
          </p>
        </div>

        {related.length > 0 && (
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Related work
            </p>
            <ul className="mt-4 divide-y divide-border rounded-xl border border-border">
              {related.map((project) =>
                project ? (
                  <li key={project.slug}>
                    <Link
                      href={`/portfolio/${project.slug}`}
                      data-cursor="pointer"
                      className="btn-arrow group flex items-center gap-3 px-4 py-4 text-foreground transition-colors hover:bg-surface-light sm:px-5"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span className="font-medium">{project.client}</span>
                      <span className="hidden text-sm text-muted sm:inline">
                        — {project.category}
                      </span>
                      <svg
                        className="ml-auto h-4 w-4 text-muted transition-all group-hover:translate-x-1 group-hover:text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </Link>
                  </li>
                ) : null,
              )}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
