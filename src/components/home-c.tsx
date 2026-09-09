import Image from "@/components/RestaurantImage";
import Link from "next/link";
import { ArrowUpRight, Sparkles, MapPin } from "lucide-react";
import { Btn } from "./ui";
import { MEDIA, SITE, px, DELIVERY_AREAS } from "@/lib/data/site";
import { whatsappChatLink } from "@/lib/whatsapp";

export function ConciergeTeaser() {
  return (
    <section id="concierge" aria-labelledby="concierge-heading" className="border-y border-ink/10 bg-[#edeade] py-16 lg:py-20">
      <div className="lux-container grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div><p className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[.22em] text-umber"><Sparkles size={14} strokeWidth={1.3} /> Your dining concierge</p><h2 id="concierge-heading" className="display-serif mt-5 text-[clamp(2.7rem,4.5vw,4.2rem)]">A little guidance.<br /><em className="font-light text-umber">Just your taste.</em></h2></div>
        <div><p className="max-w-md text-[14px] leading-[1.9] text-ink/65">Something light? A little indulgence? Our dining concierge can help you discover a dish, explore ingredients and plan your evening. A thoughtful recommendation is a very good place to begin.</p><div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[10px] text-umber"><span>Personal recommendations</span><span>Dietary guidance</span><span>Table planning</span></div><div className="mt-8"><Btn href="/concierge" variant="line">Ask the concierge</Btn></div><p className="mt-4 text-[10px] text-ink/45">Interactive recommendation demo by WordbitX. Always confirm allergies with the kitchen.</p></div>
      </div>
    </section>
  );
}

export function LocationSection() {
  return (
    <section id="location" aria-labelledby="visit-heading" className="bg-cream py-20 lg:py-24">
      <div className="lux-container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div><p className="eyebrow text-bronze-deep">06 / At your table</p><h2 id="visit-heading" className="display-serif mt-5 text-[clamp(2.7rem,4.5vw,4.2rem)]">Your next evening,<br /><em className="font-light text-umber">beautifully planned.</em></h2><address className="mt-6 flex items-start gap-3 text-sm not-italic leading-relaxed text-ink/65"><MapPin size={16} className="mt-1 shrink-0 text-bronze-deep" /><span>{SITE.addressLines[0]}<br />{SITE.addressLines[1]}</span></address><dl className="mt-7 max-w-md space-y-3 border-y border-ink/10 py-5 text-[12px]"><div className="flex justify-between gap-4"><dt className="text-umber">Dinner</dt><dd className="text-ink/60">Tue–Sun · 18:00–00:00</dd></div><div className="flex justify-between gap-4"><dt className="text-umber">Lunch</dt><dd className="text-ink/60">Fri–Sun · 12:00–15:00</dd></div><div className="flex justify-between gap-4"><dt className="text-umber">A little ease</dt><dd className="text-ink/60">Valet from 17:30</dd></div></dl><div className="mt-7 flex flex-wrap items-center gap-6"><Btn href="/reserve">Reserve a table</Btn><a href={whatsappChatLink("Assalam-o-Alaikum! I would like to book a table.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[.17em] text-[#1d7a3d]">WhatsApp us <ArrowUpRight size={14} /></a><Link href="/location" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[.17em] text-bronze-deep">Directions & details <ArrowUpRight size={14} /></Link></div>
        <div className="mt-7 border-t border-ink/10 pt-5"><p className="eyebrow !text-[9px] text-bronze-deep">Delivery areas</p><ul className="mt-3 flex flex-wrap gap-1.5">{DELIVERY_AREAS.map((a) => <li key={a.id} className="rounded-full border border-ink/15 px-3 py-1 text-[11px] text-ink/65">{a.name} · PKR {a.fee}</li>)}</ul></div>
        <p className="mt-5 text-[10px] text-ink/40">Fictional venue details for the Maison Noor showcase.</p></div>
        <figure className="relative aspect-[5/4] overflow-hidden bg-ivory"><Image src={px(MEDIA.diningVault.id, 1200, 960)} alt="Elegant dining room with linen-dressed tables and warm natural light" fill sizes="(min-width:1024px) 45vw, 95vw" className="object-cover" /><figcaption className="absolute bottom-5 left-5 bg-cream/95 px-5 py-3 font-serif text-xl italic text-umber">An evening worth making time for.</figcaption></figure>
      </div>
    </section>
  );
}
