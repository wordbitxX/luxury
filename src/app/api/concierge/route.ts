import { NextResponse } from "next/server";
import { intro, respond, type MoodId } from "@/lib/ai";

export const runtime = "nodejs";

/* ------------------------------------------------------------------ */
/*  Concierge endpoint                                                 */
/*  Currently answers from the rule engine in /lib/ai.ts. To connect   */
/*  a live model later, replace the `respond` call with an LLM         */
/*  invocation that returns the same ConciergeReply shape.             */
/* ------------------------------------------------------------------ */

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message: string = String(body?.message ?? "").slice(0, 400);
    const mood: MoodId | null = body?.mood ?? null;
    const first: boolean = Boolean(body?.first);

    if (first || !message) {
      return NextResponse.json({ ok: true, reply: intro() });
    }

    const reply = respond(message, mood);
    return NextResponse.json({ ok: true, reply });
  } catch (err) {
    console.error("concierge", err);
    return NextResponse.json(
      { ok: false, error: "The Concierge is momentarily unavailable." },
      { status: 500 }
    );
  }
}
