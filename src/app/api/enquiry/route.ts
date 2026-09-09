import { NextResponse } from "next/server";
import { db } from "@/db";
import { enquiries } from "@/db/schema";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, eventType, guests, date, message } = body ?? {};

    if (!name || !email || !phone || !eventType || !guests) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    const row = await db
      .insert(enquiries)
      .values({
        name: String(name).slice(0, 160),
        email: String(email).slice(0, 200),
        phone: String(phone).slice(0, 40),
        eventType: String(eventType).slice(0, 80),
        guests: Number(guests),
        date: String(date ?? "").slice(0, 16),
        message: String(message ?? "").slice(0, 2000),
      })
      .returning({ id: enquiries.id, createdAt: enquiries.createdAt });

    return NextResponse.json({ ok: true, id: row[0].id });
  } catch (err) {
    console.error("enquiry", err);
    return NextResponse.json({ ok: false, error: "Could not send your enquiry." }, { status: 500 });
  }
}
