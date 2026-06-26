import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { saveUploadedImage } from "@/lib/upload";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    await requireSession();

    const formData = await request.formData();
    const file = formData.get("file");
    const folder = String(formData.get("folder") ?? "");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const url = await saveUploadedImage(file, folder);
    return NextResponse.json({ url });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const message =
      error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
