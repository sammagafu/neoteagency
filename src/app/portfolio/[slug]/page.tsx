import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ProjectDetailView } from "@/components/ProjectDetailView";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/content";
import { stripHtml } from "@/lib/html-utils";
import {
  breadcrumbJsonLd,
  caseStudyJsonLd,
  createMetadata,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllCaseStudies().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudyBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return createMetadata({
    title: `${project.client} Case Study`,
    description: stripHtml(project.description),
    path: `/portfolio/${project.slug}`,
    image: project.image,
    type: "article",
    keywords: [
      project.client,
      project.category,
      "case study",
      "Neotelabs portfolio",
    ],
  });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getCaseStudyBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          caseStudyJsonLd(project),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Portfolio", path: "/portfolio" },
            { name: project.client, path: `/portfolio/${project.slug}` },
          ]),
        ]}
      />
      <ProjectDetailView project={project} />
    </>
  );
}
