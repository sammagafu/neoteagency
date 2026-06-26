import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { createTeamMember, getAllTeamMembers } from "@/lib/content";
import { revalidatePublicContent } from "@/lib/revalidate";
import type { TeamMemberInput } from "@/lib/db/types";

export async function GET() {
  try {
    await requireSession();
    return NextResponse.json(getAllTeamMembers());
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireSession();
    const body = (await request.json()) as TeamMemberInput;
    const created = createTeamMember(body);
    revalidatePublicContent();
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error(error);
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 });
  }
}
