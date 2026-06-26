import { notFound } from "next/navigation";
import { CaseStudyForm } from "@/components/admin/CaseStudyForm";
import { getCaseStudyById } from "@/lib/content";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCaseStudyPage({ params }: PageProps) {
  const { id } = await params;
  const item = getCaseStudyById(Number(id));

  if (!item) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-foreground">
        Edit: {item.client}
      </h1>
      <div className="mt-8">
        <CaseStudyForm initial={item} />
      </div>
    </div>
  );
}
