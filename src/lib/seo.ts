import type { Metadata } from "next";
import { stripHtml } from "@/lib/html-utils";
import type { CareerRecord, CaseStudy } from "@/lib/db/types";
import { contactInfo } from "@/lib/site-data";

export const siteConfig = {
  name: "Neotelabs",
  legalName: "Neotelabs",
  tagline: "Brand & Marketing Agency",
  url: "https://neotelabs.com",
  description:
    "Neotelabs is a strategy-led brand and marketing agency in Dar es Salaam — helping brands grow, connect, and lead across Tanzania and East Africa.",
  locale: "en_GB",
  defaultOgImage: "/assets/portfolio/work-1.png",
  twitterHandle: "@neotelabs",
  keywords: [
    "brand agency",
    "marketing agency",
    "digital marketing",
    "web design",
    "content production",
    "Tanzania",
    "Dar es Salaam",
    "East Africa",
    "Neotelabs",
  ],
} as const;

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  if (process.env.NODE_ENV === "production") {
    return siteConfig.url;
  }

  return "http://localhost:3000";
}

export function absoluteUrl(path = ""): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath === "/" ? "" : normalizedPath}`;
}

type CreateMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  keywords?: string[];
};

export function createMetadata({
  title,
  description,
  path = "",
  image,
  type = "website",
  noIndex = false,
  keywords,
}: CreateMetadataOptions): Metadata {
  const canonicalPath = path || "/";
  const url = absoluteUrl(canonicalPath);
  const ogImage = absoluteUrl(image ?? siteConfig.defaultOgImage);
  const isHome = title === "Home";
  const ogTitle = isHome
    ? `${siteConfig.name} | ${siteConfig.tagline}`
    : `${title} | ${siteConfig.name}`;

  return {
    title: isHome
      ? { absolute: ogTitle }
      : title,
    description,
    keywords: keywords ?? [...siteConfig.keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage],
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {}),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: getSiteUrl(),
    logo: absoluteUrl("/assets/brand/logo.svg"),
    description: siteConfig.description,
    email: contactInfo.email,
    telephone: contactInfo.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dar es Salaam",
      addressCountry: "TZ",
    },
    sameAs: [] as string[],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: getSiteUrl(),
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/assets/brand/logo.svg"),
      },
    },
  };
}

export function caseStudyJsonLd(project: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.client} Case Study`,
    headline: project.client,
    description: stripHtml(project.description),
    image: absoluteUrl(project.image),
    datePublished: project.year,
    genre: project.category,
    url: absoluteUrl(`/portfolio/${project.slug}`),
    creator: {
      "@type": "Organization",
      name: siteConfig.name,
      url: getSiteUrl(),
    },
  };
}

function employmentType(type: string): string {
  const normalized = type.toLowerCase();
  if (normalized.includes("part")) return "PART_TIME";
  if (normalized.includes("contract") || normalized.includes("freelance")) {
    return "CONTRACTOR";
  }
  if (normalized.includes("intern")) return "INTERN";
  return "FULL_TIME";
}

export function jobPostingJsonLd(job: CareerRecord) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: stripHtml(job.summary),
    identifier: {
      "@type": "PropertyValue",
      name: siteConfig.name,
      value: job.slug,
    },
    datePosted: new Date().toISOString().split("T")[0],
    employmentType: employmentType(job.type),
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: getSiteUrl(),
      logo: absoluteUrl("/assets/brand/logo.svg"),
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location.split(",")[0]?.trim() || "Dar es Salaam",
        addressCountry: "TZ",
      },
    },
    url: absoluteUrl("/careers"),
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Tanzania",
    },
  };
}

export function breadcrumbJsonLd(
  items: readonly { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const adminMetadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};
