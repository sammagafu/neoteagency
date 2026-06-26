import { notFound } from "next/navigation";
import { TeamMemberForm } from "@/components/admin/TeamMemberForm";
import { getTeamMemberById } from "@/lib/content";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditTeamMemberPage({ params }: PageProps) {
  const { id } = await params;
  const member = getTeamMemberById(Number(id));

  if (!member) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-foreground">
        Edit: {member.name || member.role}
      </h1>
      <div className="mt-8">
        <TeamMemberForm initial={member} />
      </div>
    </div>
  );
}
