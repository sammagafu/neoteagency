import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "neotelabs_admin_session";
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  const secret =
    process.env.ADMIN_SECRET ?? "dev-admin-secret-change-me-in-production";
  return new TextEncoder().encode(secret);
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "neotelabs-admin";
}

export async function createSession() {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function verifySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;

  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export async function requireSession() {
  const valid = await verifySession();
  if (!valid) {
    throw new Error("Unauthorized");
  }
}
