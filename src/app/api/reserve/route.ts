import { NextResponse } from "next/server";
import { db } from "@/db";
import { reservations } from "@/db/schema";

export const runtime = "nodejs";

const ref = () => "NOOR-" + Date.now().toString(36).toUpperCase().slice(-6);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { date, time, guests, seating, name, email, phone, whatsapp, occasion, request } = body ?? {};

    if (!date || !time || !guests || !seating || !name || !phone) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    const code = ref();
    const row = await db
      .insert(reservations)
      .values({
        ref: code,
        date: String(date),
        time: String(time),
        guests: Number(guests),
        seating: String(seating),
        name: String(name).slice(0, 160),
        email: String(email ?? "").slice(0, 200),
        phone: String(phone).slice(0, 40),
        whatsapp: String(whatsapp ?? "").slice(0, 40),
        occasion: String(occasion ?? "").slice(0, 200),
        request: String(request ?? "").slice(0, 1000),
      })
      .returning({ id: reservations.id, ref: reservations.ref, createdAt: reservations.createdAt });

    return NextResponse.json({ ok: true, ref: row[0].ref });
  } catch (err) {
    console.error("reserve", err);
    return NextResponse.json({ ok: false, error: "Could not complete your reservation." }, { status: 500 });
  }
}
