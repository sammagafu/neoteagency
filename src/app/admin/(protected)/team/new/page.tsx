import { TeamMemberForm } from "@/components/admin/TeamMemberForm";

export default function NewTeamMemberPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-foreground">
        New Team Member
      </h1>
      <div className="mt-8">
        <TeamMemberForm />
      </div>
    </div>
  );
}
