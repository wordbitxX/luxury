import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";

export const runtime = "nodejs";

const ref = () => "ORD-" + Date.now().toString(36).toUpperCase().slice(-6);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, whatsapp, email, serviceType, area, address, items, total, discount, payment, note } = body ?? {};

    if (!name || !phone || !serviceType || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    const code = ref();
    const row = await db
      .insert(orders)
      .values({
        ref: code,
        name: String(name).slice(0, 160),
        phone: String(phone).slice(0, 40),
        whatsapp: String(whatsapp ?? "").slice(0, 40),
        email: String(email ?? "").slice(0, 200),
        serviceType: String(serviceType),
        area: String(area ?? "").slice(0, 80),
        address: String(address ?? "").slice(0, 600),
        items: items as never,
        total: Number(total || 0),
        discount: Number(discount || 0),
        payment: String(payment ?? "cod").slice(0, 24),
        note: String(note ?? "").slice(0, 1000),
      })
      .returning({ id: orders.id, ref: orders.ref, createdAt: orders.createdAt });

    return NextResponse.json({ ok: true, ref: row[0].ref });
  } catch (err) {
    console.error("order", err);
    return NextResponse.json({ ok: false, error: "Could not place your order." }, { status: 500 });
  }
}
