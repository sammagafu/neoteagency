import { NextResponse } from "next/server";
import { isEmailConfigured, sendContactEmails, type ContactFormPayload } from "@/lib/email";

const LIMITS = {
  name: 120,
  email: 254,
  company: 120,
  details: 5000,
  budget: 100,
} as const;

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    if (!isEmailConfigured()) {
      return NextResponse.json(
        { error: "Contact form is temporarily unavailable. Please email us directly." },
        { status: 503 },
      );
    }

    const body = (await request.json()) as Record<string, unknown>;

    if (typeof body.website === "string" && body.website.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    const payload: ContactFormPayload = {
      name: clean(body.name, LIMITS.name),
      email: clean(body.email, LIMITS.email),
      company: clean(body.company, LIMITS.company),
      details: clean(body.details, LIMITS.details),
      budget: clean(body.budget, LIMITS.budget),
    };

    if (!payload.name || !payload.email || !payload.details) {
      return NextResponse.json(
        { error: "Name, email, and project details are required." },
        { status: 400 },
      );
    }

    if (!isValidEmail(payload.email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    await sendContactEmails(payload);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again or email us directly." },
      { status: 500 },
    );
  }
}
