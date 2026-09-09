import Link from "next/link";
import { ArrowUpRight, CalendarDays, Utensils, ShoppingBag } from "lucide-react";
import { menuHighlights } from "@/lib/data/menu";

// Useful guest actions replace unverified press quotes.
export function HospitalityStrip() {
  const items = [
    { icon: Utensils, title: `${menuHighlights.length} dishes, thoughtfully composed`, detail: "Explore the seasonal menu", href: "/menu" },
    { icon: CalendarDays, title: "Make an evening of it", detail: "Find your table", href: "/reserve" },
    { icon: ShoppingBag, title: "The house, at your place", detail: "Discover pickup & delivery", href: "/order" },
  ];
  return (
    <nav aria-label="Plan your dining experience" className="border-b border-ink/10 bg-ivory">
      <div className="lux-container grid divide-y divide-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {items.map(({ icon: Icon, ...item }) => <Link key={item.href} href={item.href} className="group flex min-w-0 items-center gap-4 py-5 transition-colors hover:text-bronze-deep sm:justify-center sm:px-4 lg:py-7"><Icon size={19} strokeWidth={1.15} className="shrink-0 text-bronze-deep" /><span className="min-w-0"><span className="block font-serif text-[20px] leading-tight lg:text-[23px]">{item.title}</span><span className="mt-1.5 block text-[9px] tracking-[.04em] text-ink/50">{item.detail}</span></span><ArrowUpRight size={14} className="ml-auto shrink-0 text-bronze-deep sm:ml-1" /></Link>)}
      </div>
    </nav>
  );
}
