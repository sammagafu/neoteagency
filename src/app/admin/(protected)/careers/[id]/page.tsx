import { notFound } from "next/navigation";
import { CareerForm } from "@/components/admin/CareerForm";
import { getCareerById } from "@/lib/content";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCareerPage({ params }: PageProps) {
  const { id } = await params;
  const position = getCareerById(Number(id));

  if (!position) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-foreground">
        Edit: {position.title}
      </h1>
      <div className="mt-8">
        <CareerForm initial={position} />
      </div>
    </div>
  );
}
