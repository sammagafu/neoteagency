import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { createCareer, getAllCareers } from "@/lib/content";
import { revalidatePublicContent } from "@/lib/revalidate";
import type { CareerInput } from "@/lib/db/types";

export async function GET() {
  try {
    await requireSession();
    return NextResponse.json(getAllCareers());
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireSession();
    const body = (await request.json()) as CareerInput;
    const created = createCareer(body);
    revalidatePublicContent();
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error(error);
    return NextResponse.json({ error: "Failed to create career" }, { status: 500 });
  }
}
