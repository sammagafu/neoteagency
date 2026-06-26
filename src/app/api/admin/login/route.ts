import { NextResponse } from "next/server";
import { createSession, getAdminPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { password } = (await request.json()) as { password?: string };

    if (!password || password !== getAdminPassword()) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    await createSession();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Login failed. Check ADMIN_SECRET is set." },
      { status: 500 },
    );
  }
}
