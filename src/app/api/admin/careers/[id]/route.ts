import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import {
  deleteCareer,
  getCareerById,
  updateCareer,
} from "@/lib/content";
import { revalidatePublicContent } from "@/lib/revalidate";
import type { CareerInput } from "@/lib/db/types";

type RouteProps = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteProps) {
  try {
    await requireSession();
    const { id } = await params;
    const item = getCareerById(Number(id));
    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PATCH(request: Request, { params }: RouteProps) {
  try {
    await requireSession();
    const { id } = await params;
    const body = (await request.json()) as Partial<CareerInput>;
    const updated = updateCareer(Number(id), body);
    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    revalidatePublicContent();
    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error(error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteProps) {
  try {
    await requireSession();
    const { id } = await params;
    const deleted = deleteCareer(Number(id));
    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    revalidatePublicContent();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
