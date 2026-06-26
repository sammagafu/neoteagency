import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import {
  createCaseStudy,
  getAllCaseStudies,
} from "@/lib/content";
import { revalidatePublicContent } from "@/lib/revalidate";
import type { CaseStudyInput } from "@/lib/db/types";

export async function GET() {
  try {
    await requireSession();
    return NextResponse.json(getAllCaseStudies());
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireSession();
    const body = (await request.json()) as CaseStudyInput;
    const created = createCaseStudy(body);
    revalidatePublicContent();
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error(error);
    return NextResponse.json({ error: "Failed to create case study" }, { status: 500 });
  }
}
