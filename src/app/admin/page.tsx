import { db } from "@/db";
import { reservations, orders, enquiries } from "@/db/schema";
import { count, desc } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CATEGORIES, DISHES, getDish } from "@/lib/data/menu";
import { formatPrice } from "@/lib/data/site";
import { Btn, Eyebrow } from "@/components/ui";
import { getSession } from "@/lib/admin/auth";
import { TablesBoard, OffersBoard, ExportButtons, SettingsForm, RevenueBars } from "@/components/AdminBoards";
import { whatsappChatLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

const NAV = [
  ["Dashboard", "#dashboard"], ["Orders", "#orders"], ["Reservations", "#reservations"],
  ["Menu", "#menu"], ["Customers", "#customers"], ["Offers", "#offers"], ["Tables", "#tables"],
  ["Staff", "#staff"], ["Reviews", "#reviews"], ["Reports", "#reports"], ["Settings", "#settings"],
];

type OrderItem = { qty?: number; name?: string; unit?: number };

const PIPELINE = ["New", "Confirmed", "Preparing", "Ready", "Out for Delivery", "Completed", "Cancelled"] as const;
const statusToStage = (s: string) => {
  const v = s.toLowerCase().replace(/_/g, " ");
  if (v.includes("cancel")) return "Cancelled";
  if (v.includes("out for")) return "Out for Delivery";
  if (v.includes("complet")) return "Completed";
  if (v.includes("ready")) return "Ready";
  if (v.includes("prepar")) return "Preparing";
  if (v.includes("confirm")) return "Confirmed";
  return "New";
};

const dayKey = (d: Date) => d.toISOString().slice(0, 10);

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [resCount, orderCount, enqCount, resList, orderList, enqList] = await Promise.all([
    db.select({ c: count() }).from(reservations).then((r) => Number(r[0].c)),
    db.select({ c: count() }).from(orders).then((r) => Number(r[0].c)),
    db.select({ c: count() }).from(enquiries).then((r) => Number(r[0].c)),
    db.select().from(reservations).orderBy(desc(reservations.createdAt)).limit(10),
    db.select().from(orders).orderBy(desc(orders.createdAt)).limit(50),
    db.select().from(enquiries).orderBy(desc(enquiries.createdAt)).limit(8),
  ]);

  const today = dayKey(new Date());
  const todayOrders = orderList.filter((o) => dayKey(new Date(o.createdAt)) === today);
  const revenue = orderList.reduce((s, o) => s + Number(o.total), 0);
  const todayRevenue = todayOrders.reduce((s, o) => s + Number(o.total), 0);
  const stageCounts = Object.fromEntries(PIPELINE.map((p) => [p, 0])) as Record<string, number>;
  orderList.forEach((o) => { stageCounts[statusToStage(o.status)] += 1; });
  const pending = stageCounts["New"] + stageCounts["Confirmed"] + stageCounts["Preparing"] + stageCounts["Ready"] + stageCounts["Out for Delivery"];

  /* popular items */
  const itemMap = new Map<string, { name: string; qty: number; revenue: number }>();
  orderList.forEach((o) => {
    const items = Array.isArray(o.items) ? (o.items as OrderItem[]) : [];
    items.forEach((it) => {
      const name = it.name || "Unknown dish";
      const cur = itemMap.get(name) ?? { name, qty: 0, revenue: 0 };
      cur.qty += Number(it.qty) || 1;
      cur.revenue += (Number(it.qty) || 1) * (Number(it.unit) || 0);
      itemMap.set(name, cur);
    });
  });
  const popular = [...itemMap.values()].sort((a, b) => b.qty - a.qty).slice(0, 5);

  /* customers */
  const custMap = new Map<string, { name: string; phone: string; whatsapp: string; orders: number; spent: number; last: string; fav: Map<string, number> }>();
  orderList.forEach((o) => {
    const key = o.phone || o.name;
    const cur = custMap.get(key) ?? { name: o.name, phone: o.phone, whatsapp: o.whatsapp ?? "", orders: 0, spent: 0, last: "", fav: new Map() };
    cur.orders += 1;
    cur.spent += Number(o.total);
    const d = dayKey(new Date(o.createdAt));
    if (!cur.last || d > cur.last) cur.last = d;
    const items = Array.isArray(o.items) ? (o.items as OrderItem[]) : [];
    items.forEach((it) => cur.fav.set(it.name || "—", (cur.fav.get(it.name || "—") ?? 0) + (Number(it.qty) || 1)));
    custMap.set(key, cur);
  });
  const customers = [...custMap.values()].sort((a, b) => b.spent - a.spent).slice(0, 8);
  const repeat = [...custMap.values()].filter((c) => c.orders > 1).length;

  /* revenue last 7 days */
  const days: { label: string; value: number; key: string }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({ label: d.toLocaleDateString("en-GB", { weekday: "short" }), value: 0, key: dayKey(d) });
  }
  orderList.forEach((o) => {
    const d = days.find((x) => x.key === dayKey(new Date(o.createdAt)));
    if (d) d.value += Number(o.total);
  });

  const aov = orderCount ? Math.round(revenue / orderCount) : 0;
  const walkIn = Math.round(orderCount * 0.6);
  const lowStock = [
    { item: "Saffron (grade I)", left: "120 g left", level: 18 },
    { item: "Wagyu rump portions", left: "4 portions left", level: 25 },
    { item: "Black figs", left: "2 kg left", level: 32 },
    { item: "Brioche buns", left: "Bake at 16:00", level: 45 },
  ];
  const staff = [
    { name: "Elena Marchetti", role: "Executive Chef", shift: "Tue–Sun · Evening" },
    { name: "Ahmed Raza", role: "Head of Grill", shift: "Tue–Sun · Evening" },
    { name: "Sana Iqbal", role: "Front of House", shift: "Daily · 17:00–00:00" },
    { name: "Bilal Ahmed", role: "Delivery Lead", shift: "Daily · 12:00–23:00" },
  ];
  const demoReviews = [
    { name: "Ayesha K.", visit: "Family Dinner", text: "Karahi arrived still bubbling; the kids loved the pavlova.", stars: 5 },
    { name: "Daniyal S.", visit: "Birthday", text: "Rooftop table with flowers — the BBQ platter fed twelve.", stars: 5 },
    { name: "Bilal R.", visit: "Business Lunch", text: "Fast, quiet, and the bill matched the online quote.", stars: 4 },
  ];

  const esc = (v: string) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const ordersCsv = ["ref,name,phone,service,total,payment,status,date", ...orderList.map((o) => [o.ref, o.name, o.phone, o.serviceType, o.total, o.payment, o.status, dayKey(new Date(o.createdAt))].map((v) => esc(String(v))).join(","))].join("\n");
  const reservationsCsv = ["ref,name,phone,date,time,guests,seating,status", ...resList.map((r) => [r.ref, r.name, r.phone, r.date, r.time, r.guests, r.seating, r.status].map((v) => esc(String(v))).join(","))].join("\n");

  const kpis = [
    { label: "Today's Orders", value: String(todayOrders.length), href: "#orders" },
    { label: "Today's Revenue", value: formatPrice(todayRevenue), href: "#reports" },
    { label: "Pending Orders", value: String(pending), href: "#orders" },
    { label: "Completed Orders", value: String(stageCounts["Completed"]), href: "#orders" },
    { label: "Reservations", value: String(resCount), href: "#reservations" },
    { label: "Customers", value: String(custMap.size), href: "#customers" },
    { label: "Popular Items", value: popular[0]?.name.split(",")[0] ?? "—", href: "#reports" },
    { label: "Low Stock Alerts", value: String(lowStock.length), href: "#menu" },
  ];

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="sticky top-0 z-30 border-b border-ink/10 bg-cream/95 backdrop-blur">
        <div className="flex items-center justify-between gap-4 px-6 py-4 lg:px-10">
          <Link href="/admin" className="flex shrink-0 items-baseline gap-3">
            <span className="display-serif text-2xl text-ink">Maison Noor</span>
            <span className="eyebrow !text-[9px] text-bronze-deep">Restaurant CRM</span>
          </Link>
          <nav className="no-scrollbar hidden items-center gap-1 overflow-x-auto xl:flex" aria-label="Admin">
            {NAV.map(([l, h]) => (
              <Link key={l} href={h} className="whitespace-nowrap px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/60 transition-colors hover:text-ink">
                {l}
              </Link>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-4">
            <Link href="/" className="hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/55 hover:text-ink sm:block">View site</Link>
            <form action="/admin/logout" method="post">
              <button className="border border-ink/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors hover:border-ink hover:bg-ink hover:text-cream">Sign out</button>
            </form>
          </div>
        </div>
        <nav className="no-scrollbar flex gap-1 overflow-x-auto border-t border-ink/10 px-6 py-2 xl:hidden" aria-label="Admin mobile">
          {NAV.map(([l, h]) => (
            <Link key={l} href={h} className="whitespace-nowrap px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/60">{l}</Link>
          ))}
        </nav>
      </header>

      <main className="px-6 py-10 lg:px-10">
        {/* Dashboard */}
        <section id="dashboard" className="mb-14 scroll-mt-32">
          <Eyebrow>Restaurant CRM · Live demo</Eyebrow>
          <h1 className="display-serif mt-3 text-5xl leading-tight">Good evening, Chef.</h1>
          <p className="mt-3 max-w-xl text-sm text-ink/55">
            Orders, reservations and enquiries from the website land here in real time, persisted to
            PostgreSQL. Tables, offers and settings below demonstrate the management layer WordbitX
            ships with every restaurant build.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((s) => (
              <Link key={s.label} href={s.href} className="border border-ink/12 bg-ivory p-5 transition-colors hover:border-bronze/60">
                <p className="eyebrow !text-[9px] text-bronze-deep">{s.label}</p>
                <p className="display-serif mt-2 truncate text-3xl text-ink" title={s.value}>{s.value}</p>
              </Link>
            ))}
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_320px]">
            <div className="border border-ink/12 bg-ivory p-6">
              <p className="eyebrow !text-[9px] text-bronze-deep">Revenue · last 7 days (PKR thousands)</p>
              <div className="mt-4"><RevenueBars data={days} /></div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="border border-ink/12 bg-ink p-6 text-cream">
                <p className="eyebrow !text-champagne">Total revenue (demo)</p>
                <p className="display-serif mt-2 text-3xl">{formatPrice(revenue)}</p>
                <p className="mt-1 text-xs text-cream/55">Avg order value {formatPrice(aov)} · {repeat} repeat customers</p>
              </div>
              <div className="border border-ink/12 bg-ivory p-6">
                <p className="eyebrow !text-[9px] text-bronze-deep">Online vs walk-in</p>
                <p className="mt-3 font-serif text-2xl">{orderCount} online <span className="text-ink/40">·</span> {walkIn} walk-in</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/10">
                  <div className="h-full bg-bronze-deep" style={{ width: `${orderCount + walkIn ? Math.round((orderCount / (orderCount + walkIn)) * 100) : 0}%` }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Orders */}
        <section id="orders" className="mb-16 scroll-mt-32">
          <SectionTitle eyebrow="Live order pipeline" title="Orders" link="/order" linkLabel="Open public ordering →" />
          <div className="mt-6 flex flex-wrap gap-2" aria-label="Order statuses">
            {PIPELINE.map((p) => (
              <span key={p} className="flex items-center gap-2 rounded-full border border-ink/15 px-3.5 py-1.5 text-[11px] text-ink/65">
                {p} <strong className="text-ink">{stageCounts[p]}</strong>
              </span>
            ))}
          </div>
          <DataTable
            head={["Order", "Customer", "Type", "Items", "Payment", "Total", "Status"]}
            rows={orderList.length ? orderList.slice(0, 10).map((o) => {
              const items = Array.isArray(o.items) ? (o.items as { qty?: number; name?: string }[]) : [];
              const n = items.reduce((s, it) => s + (Number(it.qty) || 1), 0);
              return [
                <span key="r"><span className="block font-medium text-ink">{o.ref}</span><span className="text-xs text-ink/45">{dayKey(new Date(o.createdAt))}</span></span>,
                <span key="g"><span className="block font-medium text-ink">{o.name}</span><span className="text-xs text-ink/45">{o.phone}{o.whatsapp ? ` · WA ${o.whatsapp}` : ""}</span></span>,
                o.serviceType === "delivery" ? `Delivery${o.area ? ` · ${o.area}` : ""}` : o.serviceType === "dinein" ? "Dine-In" : "Pickup",
                `${n} items`,
                o.payment.toUpperCase(),
                formatPrice(Number(o.total)),
                <StatusPill key="s" status={o.status} />,
              ];
            }) : [["—", "No orders yet — place one from the menu.", "", "", "", "", ""]]}
          />
        </section>

        {/* Reservations */}
        <section id="reservations" className="mb-16 scroll-mt-32">
          <SectionTitle eyebrow="Tables this week" title="Reservations" link="/reserve" linkLabel="Open public reservations →" />
          <DataTable
            head={["Ref", "Guest", "Date", "Time", "Guests", "Seating", "Status"]}
            rows={resList.length ? resList.map((r) => [
              r.ref,
              <span key={r.ref}><span className="block font-medium text-ink">{r.name}</span><span className="text-xs text-ink/45">{r.phone}</span></span>,
              r.date, r.time, String(r.guests), r.seating,
              <StatusPill key={`s-${r.ref}`} status={r.status} />,
            ]) : [["—", "No reservations yet.", "", "", "", "", ""]]}
          />
        </section>

        {/* Menu + stock */}
        <section id="menu" className="mb-16 scroll-mt-32">
          <SectionTitle eyebrow="Menu control" title="Menu & stock" link="/menu" linkLabel="View public menu →" />
          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_320px]">
            <div className="grid gap-3 sm:grid-cols-2">
              {CATEGORIES.slice(0, 6).map((c) => {
                const dishes = DISHES.filter((d) => d.cat === c.id);
                return (
                  <div key={c.id} className="flex items-center justify-between border border-ink/12 bg-ivory px-5 py-4">
                    <div><p className="font-serif text-lg text-ink">{c.name}</p><p className="text-xs text-ink/50">{dishes.length} dishes live</p></div>
                    <span className="rounded-full border border-emerald-700/40 bg-emerald-700/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-800">Live</span>
                  </div>
                );
              })}
              <p className="text-xs text-ink/50 sm:col-span-2">+ {CATEGORIES.length - 6} more categories live · {DISHES.length} dishes total across the menu.</p>
            </div>
            <div className="border border-ink/12 bg-ivory p-6">
              <p className="eyebrow !text-[9px] text-bronze-deep">Low stock alerts</p>
              <ul className="mt-4 space-y-4">
                {lowStock.map((s) => (
                  <li key={s.item}>
                    <span className="flex justify-between text-xs"><span className="font-medium text-ink">{s.item}</span><span className="text-ink/55">{s.left}</span></span>
                    <span className="mt-1.5 block h-1.5 rounded-full bg-ink/10"><span className="block h-full rounded-full bg-red-800/70" style={{ width: `${s.level}%` }} /></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Customers */}
        <section id="customers" className="mb-16 scroll-mt-32">
          <SectionTitle eyebrow="Know your regulars" title="Customers" link="/admin#reports" linkLabel="See reports →" />
          <DataTable
            head={["Customer", "Orders", "Total spent", "Last order", "Favourite", "Offer"]}
            rows={customers.length ? customers.map((c) => {
              const fav = [...c.fav.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
              return [
                <span key={c.phone}><span className="block font-medium text-ink">{c.name}</span><span className="text-xs text-ink/45">{c.phone}</span></span>,
                String(c.orders), formatPrice(c.spent), c.last, fav,
                <a key={`wa-${c.phone}`} href={whatsappChatLink(`Assalam-o-Alaikum ${c.name}! Maison Noor has a special offer for you — 15% off your next order with code NOOR20.`)} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#1d7a3d] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1d7a3d] hover:bg-[#20913f] hover:text-white">Send WhatsApp Offer</a>,
              ];
            }) : [["—", "No customers yet.", "", "", "", ""]]}
          />
        </section>

        {/* Offers */}
        <section id="offers" className="mb-16 scroll-mt-32">
          <SectionTitle eyebrow="Promotions" title="Offers" link="/menu" linkLabel="See them live →" />
          <div className="mt-6"><OffersBoard /></div>
        </section>

        {/* Tables */}
        <section id="tables" className="mb-16 scroll-mt-32">
          <SectionTitle eyebrow="Floor right now" title="Tables" link="/reserve" linkLabel="Reservation flow →" />
          <div className="mt-6"><TablesBoard /></div>
        </section>

        {/* Staff */}
        <section id="staff" className="mb-16 scroll-mt-32">
          <SectionTitle eyebrow="The team" title="Staff" link="/chef" linkLabel="Meet the chef →" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {staff.map((s) => (
              <div key={s.name} className="border border-ink/12 bg-ivory p-6">
                <p className="font-serif text-xl text-ink">{s.name}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-bronze-deep">{s.role}</p>
                <p className="mt-2 text-xs text-ink/55">{s.shift}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="mb-16 scroll-mt-32">
          <SectionTitle eyebrow="Guest notes (demo)" title="Reviews" link="/" linkLabel="Public reviews →" />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {demoReviews.map((r) => (
              <div key={r.name} className="border border-ink/12 bg-ivory p-6">
                <p aria-label={`${r.stars} of 5`} className="tracking-[0.15em] text-bronze">{"★".repeat(r.stars)}<span className="text-ink/20">{"★".repeat(5 - r.stars)}</span></p>
                <p className="mt-3 font-serif text-lg italic text-ink/85">“{r.text}”</p>
                <p className="mt-4 text-sm font-semibold">{r.name}</p>
                <p className="text-[10px] uppercase tracking-[0.16em] text-ink/50">{r.visit}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-ink/45">Demo content for the sales walkthrough — never synced from, or presented as, Google reviews.</p>
        </section>

        {/* Reports */}
        <section id="reports" className="mb-16 scroll-mt-32">
          <SectionTitle eyebrow="Numbers that matter" title="Reports" link="/admin#dashboard" linkLabel="Back to top →" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Average order value", formatPrice(aov)],
              ["Repeat customers", `${repeat} guests`],
              ["Online share", `${orderCount + walkIn ? Math.round((orderCount / (orderCount + walkIn)) * 100) : 0}% of covers`],
              ["Top dish", popular[0] ? `${popular[0].name.split(",")[0]} ×${popular[0].qty}` : "—"],
            ].map(([k, v]) => (
              <div key={k} className="border border-ink/12 bg-ivory p-6">
                <p className="eyebrow !text-[9px] text-bronze-deep">{k}</p>
                <p className="display-serif mt-2 text-2xl">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-6"><ExportButtons ordersCsv={ordersCsv} reservationsCsv={reservationsCsv} /></div>
        </section>

        {/* Enquiries */}
        <section id="enquiries" className="mb-16 scroll-mt-32">
          <SectionTitle eyebrow="Private dining enquiries" title="Events inbox" link="/private-dining" linkLabel="Private dining →" />
          <DataTable
            head={["Name", "Event", "Guests", "Date", "Message"]}
            rows={enqList.length ? enqList.map((e) => [
              <span key={e.id}><span className="block font-medium text-ink">{e.name}</span><span className="text-xs text-ink/45">{e.phone}</span></span>,
              e.eventType, String(e.guests), e.date || "—",
              <span key={`m-${e.id}`} className="max-w-xs truncate text-ink/65">{e.message || "—"}</span>,
            ]) : [["", "No enquiries yet.", "", "", ""]]}
          />
        </section>

        {/* Settings */}
        <section id="settings" className="mb-10 scroll-mt-32">
          <SectionTitle eyebrow="House rules" title="Settings" link="/" linkLabel="View site →" />
          <div className="mt-6"><SettingsForm /></div>
          <p className="mt-6 text-xs text-ink/45">Demo dashboard for the WordbitX sales walkthrough. Menu content lives in the shared catalogue ({DISHES.length} dishes, {CATEGORIES.length} categories) with {getDish("pk1") ? "live" : ""} ordering, reservations and enquiries wired end to end.</p>
        </section>
      </main>
    </div>
  );
}

function SectionTitle({ eyebrow, title, link, linkLabel }: { eyebrow: string; title: string; link: string; linkLabel: string }) {
  return (
    <div className="flex items-end justify-between border-b border-ink/10 pb-4">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="display-serif mt-2 text-3xl">{title}</h2>
      </div>
      <Btn href={link} variant="line">{linkLabel}</Btn>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const v = status.toLowerCase();
  const color =
    v.includes("cancel") ? "border-red-800/40 bg-red-800/10 text-red-900"
    : v.includes("complet") ? "border-emerald-700/40 bg-emerald-700/10 text-emerald-800"
    : v.includes("confirm") || v === "received" ? "border-emerald-700/40 bg-emerald-700/10 text-emerald-800"
    : v.includes("prepar") || v.includes("ready") || v.includes("out") ? "border-amber-700/40 bg-amber-700/10 text-amber-800"
    : "border-ink/15 bg-ink/5 text-ink/60";
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${color}`}>
      {status}
    </span>
  );
}

function DataTable({ head, rows }: { head: string[]; rows: (React.ReactNode | string)[][] }) {
  return (
    <div className="mt-6 overflow-x-auto border border-ink/10 bg-ivory">
      <table className="min-w-full text-sm">
        <thead className="border-b border-ink/10 bg-cream text-left">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/55">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/8">
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-cream/60">
              {r.map((cell, j) => (
                <td key={j} className="whitespace-nowrap px-4 py-3.5 align-top">
                  {typeof cell === "string" ? <span className="text-ink/70">{cell}</span> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
