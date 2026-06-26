import { notFound } from "next/navigation";
import { ClientLogoForm } from "@/components/admin/ClientLogoForm";
import { getClientLogoById } from "@/lib/content";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditClientLogoPage({ params }: PageProps) {
  const { id } = await params;
  const client = getClientLogoById(Number(id));

  if (!client) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-foreground">
        Edit: {client.name}
      </h1>
      <div className="mt-8">
        <ClientLogoForm initial={client} />
      </div>
    </div>
  );
}
