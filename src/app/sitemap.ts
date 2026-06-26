import type { MetadataRoute } from "next";
import { getAllCaseStudies } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/process",
    "/careers",
    "/contact",
  ] as const;

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/portfolio" ? 0.9 : 0.8,
  }));

  const caseStudies = getAllCaseStudies().map((project) => ({
    url: absoluteUrl(`/portfolio/${project.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: project.featured ? 0.85 : 0.7,
  }));

  return [...staticEntries, ...caseStudies];
}
