"use client";

import { useEffect, useRef, useState } from "react";
import Image from "@/components/RestaurantImage";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Check, Minus, Plus, Send, Sparkles } from "lucide-react";
import { Btn, Eyebrow } from "./ui";
import { formatPrice, px } from "@/lib/data/site";
import { getDish, DIET_META } from "@/lib/data/menu";
import { MOODS, type ConciergeDish, type ConciergeReply, type MoodId } from "@/lib/ai";
import { useCart } from "./cart";

/* ================================================================== */
/*  RESERVATION — six-step flow                                       */
/* ================================================================== */

const SEATINGS = [
  { id: "indoor", name: "Indoor", note: "The dining hall beside the hearth", hint: "For every occasion" },
  { id: "outdoor", name: "Outdoor", note: "Terrace tables beneath the trees", hint: "Evenings, Oct — Mar" },
  { id: "rooftop", name: "Rooftop", note: "Open sky, city lights, gentle breeze", hint: "Sunset onwards" },
  { id: "private", name: "Private Dining", note: "Your own room, 8 — 12 guests", hint: "By arrangement" },
  { id: "counter", name: "Chef's Counter", note: "Ten seats at the pass", hint: "Twelve courses · 3 hrs" },
];

const TIME_SLOTS = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"];

const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

const slotFree = (date: string, time: string) => hash(date + time) % 5 !== 0;

const daysAhead = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
};

const iso = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const prettyDate = (isoDate: string) =>
  new Date(isoDate + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

const STEP_LABELS = ["Date", "Guests", "Time", "Seating", "Details", "Confirm"];

export function ReservationFlow() {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState(iso(daysAhead(2)));
  const [guests, setGuests] = useState(2);
  const [time, setTime] = useState("");
  const [seating, setSeating] = useState("main");
  const [form, setForm] = useState({ name: "", email: "", phone: "", whatsapp: "", occasion: "", request: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [refCode, setRefCode] = useState("");

  const input =
    "w-full border-b border-ink/25 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-bronze-deep";

  const canContinue =
    step === 0
      ? !!date
      : step === 1
        ? guests > 0
        : step === 2
          ? !!time
          : step === 3
            ? !!seating
            : step === 4
              ? form.name.trim().length > 1 && form.phone.trim().length > 5
              : true;

  const confirm = async () => {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          time,
          guests,
          seating,
          name: form.name,
          email: form.email,
          phone: form.phone,
          occasion: form.occasion,
          request: form.request,
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      setRefCode(data.ref);
      setStep(6);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not confirm your reservation.");
    } finally {
      setBusy(false);
    }
  };

  if (step === 6) {
    return (
      <div className="mx-auto max-w-2xl py-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink text-cream">
            <Check size={24} strokeWidth={1.5} />
          </span>
          <h2 className="display-serif mt-8 text-4xl sm:text-5xl">Your table is waiting.</h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ink/60">
            Reservation reference <span className="font-semibold text-ink">{refCode}</span> — for{" "}
            {guests} {guests === 1 ? "guest" : "guests"} on {prettyDate(date)} at {time}.
            Your demo booking is saved in the house dashboard. Maison Noor is a fictional venue;
            no real table is held and no confirmation call will be made.
          </p>

          <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 gap-px border border-ink/15 bg-ink/10 text-left sm:grid-cols-4">
            {[
              ["Date", prettyDate(date)],
              ["Time", time],
              ["Guests", String(guests)],
              ["Seating", SEATINGS.find((s) => s.id === seating)?.name ?? ""],
            ].map(([k, v]) => (
              <div key={k} className="bg-cream p-4">
                <p className="eyebrow text-bronze-deep">{k}</p>
                <p className="mt-1.5 text-sm font-medium leading-snug">{v}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Btn href="/menu">Explore the menu</Btn>
            <Btn variant="outline" href="/private-dining">
              Private dining
            </Btn>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* progress */}
      <div className="flex items-center justify-between border-b border-ink/10 pb-5">
        <p className="eyebrow text-bronze-deep">
          Step {String(step + 1).padStart(2, "0")} — {STEP_LABELS[step]}
        </p>
        <p className="text-xs text-ink/50">
          {Math.round(((step + 1) / 6) * 100)}% of your evening
        </p>
      </div>
      <div className="mt-2 flex gap-1.5" aria-hidden>
        {STEP_LABELS.map((s, i) => (
          <span
            key={s}
            className={`h-[3px] flex-1 transition-colors duration-500 ${i <= step ? "bg-bronze-deep" : "bg-ink/10"}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="py-10"
        >
          {/* 01 — date */}
          {step === 0 && (
            <div>
              <h2 className="display-serif text-3xl sm:text-4xl">Choose your evening</h2>
              <p className="mt-2 text-sm text-ink/55">We hold tables for a fortnight ahead.</p>
              <div className="no-scrollbar mt-8 flex gap-3 overflow-x-auto pb-2">
                {Array.from({ length: 16 }, (_, i) => daysAhead(i + 1)).map((d) => {
                  const key = iso(d);
                  const active = key === date;
                  const full = !slotFree(key, "20:00") && !slotFree(key, "21:00");
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setDate(key);
                        setTime("");
                      }}
                      disabled={full}
                      aria-pressed={active}
                      className={`flex w-[86px] shrink-0 flex-col items-center border px-2 py-4 transition-all duration-300 disabled:opacity-35 ${
                        active ? "border-ink bg-ink text-cream" : "border-ink/15 hover:border-ink/50"
                      }`}
                    >
                      <span className="eyebrow !text-[9px]">{d.toLocaleDateString("en-GB", { weekday: "short" })}</span>
                      <span className="display-serif mt-2 text-3xl">{d.getDate()}</span>
                      <span className="mt-1 text-[11px] opacity-70">{d.toLocaleDateString("en-GB", { month: "short" })}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 02 — guests */}
          {step === 1 && (
            <div>
              <h2 className="display-serif text-3xl sm:text-4xl">How many at your table?</h2>
              <p className="mt-2 text-sm text-ink/55">Parties above eight belong in the Salon.</p>
              <div className="mt-10 flex items-center justify-center gap-10">
                <button
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  aria-label="Fewer guests"
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-ink/25 hover:border-ink"
                >
                  <Minus size={18} />
                </button>
                <div className="text-center">
                  <span className="display-serif block text-7xl">{guests}</span>
                  <span className="eyebrow mt-2 text-bronze-deep">{guests === 1 ? "guest" : "guests"}</span>
                </div>
                <button
                  onClick={() => setGuests((g) => Math.min(12, g + 1))}
                  aria-label="More guests"
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-ink/25 hover:border-ink"
                >
                  <Plus size={18} />
                </button>
              </div>
              {guests >= 9 && (
                <p className="mt-8 text-center text-sm text-ink/60">
                  For {guests} guests we recommend{" "}
                  <button onClick={() => setSeating("private")} className="underline decoration-bronze underline-offset-4">
                    Private Dining
                  </button>{" "}
                  — select it on the next step.
                </p>
              )}
            </div>
          )}

          {/* 03 — time */}
          {step === 2 && (
            <div>
              <h2 className="display-serif text-3xl sm:text-4xl">
                An hour for {prettyDate(date).split(",")[0]}
              </h2>
              <p className="mt-2 text-sm text-ink/55">Service runs until midnight. Slots marked quiet are greyed.</p>
              <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-5">
                {TIME_SLOTS.map((t) => {
                  const free = slotFree(date, t);
                  return (
                    <button
                      key={t}
                      disabled={!free}
                      onClick={() => setTime(t)}
                      aria-pressed={time === t}
                      className={`border py-4 text-sm font-medium transition-all duration-300 disabled:opacity-25 ${
                        time === t ? "border-ink bg-ink text-cream" : "border-ink/15 hover:border-ink/50"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 04 — seating */}
          {step === 3 && (
            <div>
              <h2 className="display-serif text-3xl sm:text-4xl">Where shall we seat you?</h2>
              <div className="mt-8 space-y-3">
                {SEATINGS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSeating(s.id)}
                    aria-pressed={seating === s.id}
                    className={`flex w-full items-center justify-between gap-4 border p-5 text-left transition-all duration-300 ${
                      seating === s.id ? "border-ink bg-ivory" : "border-ink/12 hover:border-ink/40"
                    }`}
                  >
                    <span>
                      <span className="block font-serif text-xl">{s.name}</span>
                      <span className="mt-0.5 block text-xs text-ink/55">{s.note}</span>
                    </span>
                    <span className="hidden text-right text-[11px] uppercase tracking-[0.16em] text-bronze-deep sm:block">
                      {s.hint}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 05 — details */}
          {step === 4 && (
            <div>
              <h2 className="display-serif text-3xl sm:text-4xl">May we know who is coming?</h2>
              <p className="mt-2 text-sm text-ink/55">We use your number only to confirm the table.</p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="eyebrow text-bronze-deep">Full name</span>
                  <input className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" autoComplete="name" />
                </label>
                <label className="block">
                  <span className="eyebrow text-bronze-deep">Phone *</span>
                  <input className={input} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="03xx xxxxxxx" autoComplete="tel" inputMode="tel" />
                </label>
                <label className="block">
                  <span className="eyebrow text-bronze-deep">WhatsApp</span>
                  <input className={input} value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="03xx xxxxxxx" inputMode="tel" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="eyebrow text-bronze-deep">Email (optional)</span>
                  <input className={input} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" autoComplete="email" />
                </label>
                <label className="block">
                  <span className="eyebrow text-bronze-deep">Occasion (optional)</span>
                  <input className={input} value={form.occasion} onChange={(e) => setForm({ ...form, occasion: e.target.value })} placeholder="Anniversary, birthday…" />
                </label>
                <label className="block">
                  <span className="eyebrow text-bronze-deep">Special request</span>
                  <input className={input} value={form.request} onChange={(e) => setForm({ ...form, request: e.target.value })} placeholder="Allergies, high chair, window…" />
                </label>
              </div>
            </div>
          )}

          {/* 06 — confirm */}
          {step === 5 && (
            <div>
              <h2 className="display-serif text-3xl sm:text-4xl">Your Evening</h2>
              <div className="mt-8 grid grid-cols-2 gap-px border border-ink/15 bg-ink/10 sm:grid-cols-4">
                {[
                  ["Date", prettyDate(date)],
                  ["Time", time],
                  ["Guests", `${guests} ${guests === 1 ? "guest" : "guests"}`],
                  ["Seating", SEATINGS.find((s) => s.id === seating)?.name ?? ""],
                ].map(([k, v]) => (
                  <div key={k} className="bg-cream p-5">
                    <p className="eyebrow text-bronze-deep">{k}</p>
                    <p className="mt-1.5 text-sm font-medium leading-snug">{v}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 border border-ink/15 bg-ivory p-5 text-sm leading-relaxed text-ink/70">
                {form.occasion && (
                  <p>
                    <span className="font-medium text-ink">Occasion:</span> {form.occasion}
                  </p>
                )}
                {form.request && (
                  <p className="mt-1">
                    <span className="font-medium text-ink">Request:</span> {form.request}
                  </p>
                )}
                <p className="mt-3 text-ink/55">
                  {form.name} · {form.phone} · {form.email}
                </p>
              </div>
              {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* nav */}
      <div className="flex items-center justify-between border-t border-ink/10 pt-6">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/50 transition-colors hover:text-ink disabled:opacity-0"
        >
          <ArrowLeft size={14} /> Back
        </button>
        {step < 5 ? (
          <Btn variant="solid" onClick={() => canContinue && setStep((s) => s + 1)} className={canContinue ? "" : "pointer-events-none opacity-40"}>
            Continue
          </Btn>
        ) : (
          <Btn variant="solid" onClick={confirm} className={canContinue ? "" : "pointer-events-none opacity-40"}>
            {busy ? "Confirming…" : "Confirm reservation"}
          </Btn>
        )}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  PRIVATE DINING ENQUIRY FORM                                       */
/* ================================================================== */

export function EnquiryForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", eventType: "Private Dining", guests: "10", date: "", message: "" });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const input =
    "w-full border-b border-ink/25 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-bronze-deep";
  const sel =
    "w-full border-b border-ink/25 bg-transparent py-3 text-sm outline-none focus:border-bronze-deep";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send your enquiry.");
    } finally {
      setBusy(false);
    }
  };

  if (done)
    return (
      <div className="border border-ink/15 bg-ivory p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ink text-cream">
          <Check size={20} />
        </span>
        <h3 className="display-serif mt-5 text-3xl">Enquiry received.</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm text-ink/60">
          Your demo enquiry is saved in the house dashboard. No real event has been scheduled and no follow-up email will be sent.
        </p>
      </div>
    );

  return (
    <form onSubmit={submit} className="border border-ink/15 bg-cream p-6 sm:p-9">
      <Eyebrow>Plan your evening</Eyebrow>
      <h3 className="display-serif mt-3 text-3xl">Tell us about the occasion</h3>
      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow text-bronze-deep">Name</span>
          <input required className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />
        </label>
        <label className="block">
          <span className="eyebrow text-bronze-deep">Email</span>
          <input required type="email" className={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" />
        </label>
        <label className="block">
          <span className="eyebrow text-bronze-deep">Phone</span>
          <input required className={input} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} autoComplete="tel" />
        </label>
        <label className="block">
          <span className="eyebrow text-bronze-deep">Event type</span>
          <select className={sel} value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })}>
            {["Private Dining", "Chef's Table", "Celebration", "Corporate Evening", "Full Buyout", "Other"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="eyebrow text-bronze-deep">Guests</span>
          <select className={sel} value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })}>
            {["2", "4", "6", "8", "10", "12", "16", "20", "30", "40", "60"].map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="eyebrow text-bronze-deep">Preferred date</span>
          <input type="date" className={sel} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        </label>
        <label className="block sm:col-span-2">
          <span className="eyebrow text-bronze-deep">The occasion</span>
          <textarea
            className={`${input} min-h-24 resize-none`}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="A proposal, a board dinner, a birthday with twelve of your favourite people…"
          />
        </label>
      </div>
      {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
      <div className="mt-8">
        <Btn type="submit" variant="solid" className="w-full sm:w-auto">
          {busy ? "Sending…" : "Send enquiry"}
        </Btn>
      </div>
    </form>
  );
}

/* ================================================================== */
/*  AI CONCIERGE — conversational experience                          */
/* ================================================================== */

type Msg = { role: "user" | "bot"; text: string; dishes?: ConciergeDish[] };

const moodOf = (chip: string): MoodId | null => {
  const m = MOODS.find((x) => x.label.toLowerCase() === chip.toLowerCase());
  return m ? m.id : null;
};

export function ConciergeChat() {
  const [messages, setMessages] = useState<Msg[]>([{ role: "bot", text: "" }]);
  const [chips, setChips] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const { addDish } = useCart();
  const endRef = useRef<HTMLDivElement>(null);
  const booted = useRef(false);

  const pushBot = (reply: ConciergeReply) => {
    setMessages((m) => [...m, { role: "bot", text: reply.text, dishes: reply.dishes }]);
    setChips(reply.chips ?? []);
  };

  const ask = async (message: string, mood: MoodId | null = null) => {
    setMessages((m) => [...m, { role: "user", text: message }]);
    setChips([]);
    setInput("");
    setTyping(true);
    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, mood, first: false }),
      });
      const data = await res.json();
      if (data.ok) pushBot(data.reply);
      else pushBot({ text: "The Concierge is momentarily unavailable — do try again in a moment.", chips: ["Book a table"] });
    } catch {
      pushBot({ text: "The Concierge is momentarily unavailable — do try again in a moment.", chips: ["Book a table"] });
    } finally {
      setTyping(false);
    }
  };

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    const t = setTimeout(() => {
      setMessages([{ role: "bot", text: "Good evening — I am the Concierge at Maison Noor. What are you in the mood for tonight?" }]);
      setChips(MOODS.map((m) => m.label));
    }, 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing, chips]);

  return (
    <div className="mx-auto flex h-[68vh] min-h-[540px] max-w-3xl flex-col overflow-hidden border border-ink/15 bg-cream">
      {/* header */}
      <div className="flex items-center gap-3 border-b border-ink/10 bg-ivory px-6 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-champagne">
          <Sparkles size={15} />
        </span>
        <div className="flex-1">
          <p className="eyebrow !text-[10px]">Maison Noor</p>
          <p className="text-sm font-semibold">The Concierge</p>
        </div>
        <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-bronze-deep">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" /> At your service
        </span>
      </div>

      {/* messages */}
      <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
        {messages.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="flex justify-end">
              <p className="max-w-[78%] bg-ink px-5 py-3 text-sm leading-relaxed text-cream">{m.text}</p>
            </div>
          ) : (
            <div key={i} className="flex flex-col items-start gap-2">
              <p className="max-w-[85%] text-[15px] leading-relaxed text-ink/85">{m.text}</p>
              {m.dishes && m.dishes.length > 0 && (
                <div className="mt-1 w-full space-y-2">
                  {m.dishes.map((d) => {
                    const dish = getDish(d.id);
                    return (
                      <div key={d.id} className="flex items-center gap-4 border border-ink/12 bg-ivory/60 p-3">
                        <Image src={px(d.img, 160, 160)} alt={d.name} width={56} height={56} sizes="56px" className="h-14 w-14 shrink-0 object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-serif text-[1.05rem] leading-tight">{d.name}</p>
                          <p className="mt-0.5 text-xs text-ink/55">
                            {formatPrice(d.price)} · {d.tags.length ? d.tags.map((t) => DIET_META[t].label.split(" ")[0]).join(", ") : "Omnivore"}
                          </p>
                        </div>
                        <button
                          onClick={() => dish && addDish(dish)}
                          className="shrink-0 border border-ink/25 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors hover:border-ink hover:bg-ink hover:text-cream"
                        >
                          Add
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )
        )}
        {typing && (
          <div className="flex items-center gap-2 text-ink/40">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink/40" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink/40 [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink/40 [animation-delay:300ms]" />
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* chips */}
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2 border-t border-ink/10 px-6 py-3">
          {chips.map((c) => (
            <button
              key={c}
              onClick={() => ask(c, moodOf(c))}
              className="rounded-full border border-bronze/50 bg-bronze/10 px-4 py-2 text-[12px] font-medium text-bronze-deep transition-colors hover:bg-bronze hover:text-cream"
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {/* composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) ask(input.trim());
        }}
        className="flex items-center gap-3 border-t border-ink/10 px-6 py-4"
      >
        <label htmlFor="concierge-input" className="sr-only">
          Message the concierge
        </label>
        <input
          id="concierge-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about dishes, allergies, pairings, hours…"
          className="flex-1 border-b border-ink/20 bg-transparent py-2 text-sm outline-none placeholder:text-ink/35 focus:border-bronze-deep"
        />
        <button
          type="submit"
          aria-label="Send message"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-cream transition-colors hover:bg-bronze-deep disabled:opacity-40"
          disabled={!input.trim() || typing}
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
