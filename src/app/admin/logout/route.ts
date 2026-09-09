import { NextResponse, type NextRequest } from "next/server";
import { destroySession } from "@/lib/admin/auth";

export async function POST(req: NextRequest) {
  await destroySession();
  return NextResponse.redirect(new URL("/admin/login", req.url), 303);
}

export async function GET(req: NextRequest) {
  await destroySession();
  return NextResponse.redirect(new URL("/admin/login", req.url), 303);
}
