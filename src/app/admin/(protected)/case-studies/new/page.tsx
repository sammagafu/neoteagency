import { CaseStudyForm } from "@/components/admin/CaseStudyForm";

export default function NewCaseStudyPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-foreground">
        New Case Study
      </h1>
      <div className="mt-8">
        <CaseStudyForm />
      </div>
    </div>
  );
}
