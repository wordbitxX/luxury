import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE = "mn_admin";
const ALG = "HS256";

function key() {
  const secret = process.env.ADMIN_SECRET ?? "maison-noor-admin-secret-change-me";
  return new TextEncoder().encode(secret);
}

export function adminPassword() {
  return process.env.ADMIN_PASSWORD ?? "admin";
}

export type AdminSession = { sub: "admin"; name: string };

export async function createSession() {
  const token = await new SignJWT({ sub: "admin", name: "Maison Noor Admin" })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key());
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

export async function getSession(): Promise<AdminSession | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const v = await jwtVerify(token, key());
    const p = v.payload as unknown as AdminSession;
    if (p.sub !== "admin") return null;
    return p;
  } catch {
    return null;
  }
}
