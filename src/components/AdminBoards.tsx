"use client";

import { useMemo, useState } from "react";
import { Download, Check } from "lucide-react";

/* ---------------- Tables: tap a table to cycle its status ---------------- */
type TableStatus = "Available" | "Reserved" | "Occupied";
const TABLE_ORDER: TableStatus[] = ["Available", "Reserved", "Occupied"];

const statusStyle: Record<TableStatus, string> = {
  Available: "border-emerald-700/40 bg-emerald-700/10 text-emerald-800",
  Reserved: "border-amber-700/40 bg-amber-700/10 text-amber-800",
  Occupied: "border-red-800/40 bg-red-800/10 text-red-900",
};

export function TablesBoard() {
  const [tables, setTables] = useState<{ id: string; seats: string; status: TableStatus }[]>([
    { id: "Table 01", seats: "2 guests · Window", status: "Occupied" },
    { id: "Table 02", seats: "4 guests · Main hall", status: "Reserved" },
    { id: "Table 03", seats: "4 guests · Main hall", status: "Available" },
    { id: "Table 04", seats: "6 guests · Family corner", status: "Available" },
    { id: "VIP 01", seats: "8 guests · Private salon", status: "Reserved" },
    { id: "Rooftop 01", seats: "4 guests · Open sky", status: "Available" },
  ]);
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tables.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() =>
              setTables((prev) =>
                prev.map((x) =>
                  x.id === t.id
                    ? { ...x, status: TABLE_ORDER[(TABLE_ORDER.indexOf(x.status) + 1) % 3] }
                    : x
                )
              )
            }
            className="border border-ink/12 bg-ivory p-6 text-left transition-colors hover:border-bronze-deep"
            aria-label={`${t.id}, ${t.status}. Activate to change status.`}
          >
            <span className="flex items-center justify-between">
              <span className="font-serif text-2xl text-ink">{t.id}</span>
              <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${statusStyle[t.status]}`}>
                {t.status}
              </span>
            </span>
            <span className="mt-2 block text-xs text-ink/55">{t.seats}</span>
            <span className="mt-3 block text-[10px] uppercase tracking-[0.16em] text-bronze-deep">Tap to change →</span>
          </button>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-ink/45">Demo floor plan — statuses update instantly and sync to the reservation flow in a live build.</p>
    </div>
  );
}

/* ---------------- Offers: create + activate/deactivate ---------------- */
type Offer = { id: number; title: string; detail: string; active: boolean };

export function OffersBoard() {
  const [offers, setOffers] = useState<Offer[]>([
    { id: 1, title: "20% OFF Family Dinner", detail: "Code NOOR20 · dine-in, parties of 4+", active: true },
    { id: 2, title: "Free Drink with BBQ Platter", detail: "Mint cooler with every q4 platter", active: true },
    { id: 3, title: "Weekend Special", detail: "Complimentary dessert on orders above PKR 5,000", active: false },
    { id: 4, title: "Ramadan Iftar Deal", detail: "Scheduled seasonal campaign", active: false },
    { id: 5, title: "Eid Special", detail: "Scheduled seasonal campaign", active: false },
    { id: 6, title: "Birthday Discount", detail: "15% off with a celebration booking", active: true },
  ]);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  return (
    <div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {offers.map((o) => (
          <li key={o.id} className={`border p-6 transition-colors ${o.active ? "border-bronze-deep/50 bg-ivory" : "border-ink/12 bg-cream opacity-75"}`}>
            <span className="flex items-center justify-between gap-3">
              <span className="font-serif text-xl text-ink">{o.title}</span>
              <button
                type="button"
                onClick={() => setOffers((prev) => prev.map((x) => (x.id === o.id ? { ...x, active: !x.active } : x)))}
                aria-pressed={o.active}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                  o.active ? "border-emerald-700/40 bg-emerald-700/10 text-emerald-800" : "border-ink/20 text-ink/50 hover:border-ink"
                }`}
              >
                {o.active ? "Active" : "Paused"}
              </button>
            </span>
            <span className="mt-2 block text-xs text-ink/55">{o.detail}</span>
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim()) return;
          setOffers((prev) => [...prev, { id: Date.now(), title: title.trim(), detail: detail.trim() || "New promotion", active: true }]);
          setTitle("");
          setDetail("");
        }}
        className="mt-6 grid gap-3 border border-ink/12 bg-ivory p-6 sm:grid-cols-[1fr_1fr_auto]"
      >
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Offer title, e.g. Student Discount" aria-label="New offer title" className="border border-ink/20 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-ink/35 focus:border-bronze-deep" />
        <input value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="Short detail" aria-label="New offer detail" className="border border-ink/20 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-ink/35 focus:border-bronze-deep" />
        <button type="submit" className="bg-ink px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream hover:bg-bronze-deep">Create</button>
      </form>
    </div>
  );
}

/* ---------------- CSV export of live data ---------------- */
export function ExportButtons({ ordersCsv, reservationsCsv }: { ordersCsv: string; reservationsCsv: string }) {
  const [done, setDone] = useState("");
  const download = (name: string, csv: string) => {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
    setDone(name);
    window.setTimeout(() => setDone(""), 2500);
  };
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" onClick={() => download("maison-noor-orders.csv", ordersCsv)} className="inline-flex items-center gap-2 border border-ink/25 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] hover:border-ink hover:bg-ink hover:text-cream">
        <Download size={14} /> Orders CSV
      </button>
      <button type="button" onClick={() => download("maison-noor-reservations.csv", reservationsCsv)} className="inline-flex items-center gap-2 border border-ink/25 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] hover:border-ink hover:bg-ink hover:text-cream">
        <Download size={14} /> Reservations CSV
      </button>
      {done && <span className="flex items-center gap-1.5 text-xs text-emerald-800"><Check size={13} /> {done} downloaded</span>}
    </div>
  );
}

/* ---------------- Settings demo form ---------------- */
export function SettingsForm() {
  const [saved, setSaved] = useState(false);
  const [vals, setVals] = useState({ name: "Maison Noor", phone: "+92 325 1888841", hours: "Tue–Sun · 18:00–00:00", delivery: true });
  const set = (k: keyof typeof vals, v: string | boolean) => setVals((p) => ({ ...p, [k]: v }));
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSaved(true); window.setTimeout(() => setSaved(false), 3000); }}
      className="grid max-w-2xl gap-5 border border-ink/12 bg-ivory p-6 sm:p-8"
    >
      <label className="block"><span className="eyebrow text-bronze-deep">Restaurant name</span>
        <input value={vals.name} onChange={(e) => set("name", e.target.value)} className="mt-2 w-full border-b border-ink/25 bg-transparent py-2.5 text-sm outline-none focus:border-bronze-deep" /></label>
      <label className="block"><span className="eyebrow text-bronze-deep">Public phone</span>
        <input value={vals.phone} onChange={(e) => set("phone", e.target.value)} className="mt-2 w-full border-b border-ink/25 bg-transparent py-2.5 text-sm outline-none focus:border-bronze-deep" /></label>
      <label className="block"><span className="eyebrow text-bronze-deep">Opening hours line</span>
        <input value={vals.hours} onChange={(e) => set("hours", e.target.value)} className="mt-2 w-full border-b border-ink/25 bg-transparent py-2.5 text-sm outline-none focus:border-bronze-deep" /></label>
      <label className="flex cursor-pointer items-center justify-between border border-ink/15 px-4 py-3 text-sm">
        <span>Accept online delivery orders</span>
        <input type="checkbox" checked={vals.delivery} onChange={(e) => set("delivery", e.target.checked)} className="h-4 w-4 accent-[#8C7149]" />
      </label>
      <div className="flex items-center gap-4">
        <button type="submit" className="bg-ink px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream hover:bg-bronze-deep">Save settings</button>
        {saved && <span className="flex items-center gap-1.5 text-xs text-emerald-800"><Check size={13} /> Saved (demo)</span>}
      </div>
    </form>
  );
}

/* ---------------- Analytics bars (pure CSS) ---------------- */
export function RevenueBars({ data }: { data: { label: string; value: number }[] }) {
  const max = useMemo(() => Math.max(1, ...data.map((d) => d.value)), [data]);
  return (
    <div className="flex h-40 items-end gap-2 sm:gap-3" role="img" aria-label="Revenue by day bar chart">
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
          <span className="text-[10px] font-medium text-ink/60">{d.value > 0 ? (d.value / 1000).toFixed(1) + "k" : "—"}</span>
          <div className="flex w-full flex-1 items-end rounded-t-sm bg-ink/5">
            <div className="w-full rounded-t-sm bg-bronze-deep transition-all" style={{ height: `${Math.max(4, (d.value / max) * 100)}%` }} />
          </div>
          <span className="text-[9px] uppercase tracking-[0.14em] text-ink/50">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
