"use client";

import { useState } from "react";
import Image from "@/components/RestaurantImage";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { Btn } from "./ui";
import { EVENING_JOURNEY, PRIVATE_DINING } from "@/lib/data/content";
import { px } from "@/lib/data/site";

export function EveningSection() {
  const [active, setActive] = useState(0);
  const moment = EVENING_JOURNEY[active];
  return (
    <section id="evening" aria-labelledby="evening-heading" className="bg-ivory py-20 lg:py-24">
      <div className="lux-container grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <figure className="order-2 relative aspect-[5/6] overflow-hidden lg:order-1 lg:max-h-[620px]">
          <Image key={moment.img} src={px(moment.img, 1100, 1300, moment.imgExt)} alt={moment.alt} fill sizes="(min-width:1024px) 45vw, 95vw" className="signature-enter object-cover" />
          <figcaption className="absolute inset-x-0 bottom-0 flex justify-between bg-linear-to-t from-ink/70 to-transparent px-6 pt-16 pb-6 text-[9px] uppercase tracking-[.2em] text-cream"><span>{moment.step} / {moment.title}</span><span>Maison Noor</span></figcaption>
        </figure>
        <div className="order-1 min-w-0 lg:order-2">
          <p className="eyebrow text-bronze-deep">04 / More than a meal</p>
          <h2 id="evening-heading" className="display-serif mt-5 text-[clamp(2.7rem,4.5vw,4.2rem)]">Every detail.<br /><em className="font-light text-umber">Every moment.</em></h2>
          <p className="mt-5 max-w-md text-[13px] leading-[1.9] text-ink/60">Good hospitality is felt before it is noticed. From your first step inside to the last taste of dessert, we leave nothing to chance.</p>
          <div className="mt-7 border-t border-ink/15">
            {EVENING_JOURNEY.map((item, i) => <div key={item.step} className="border-b border-ink/10"><button type="button" onClick={() => setActive(i)} aria-expanded={i === active} aria-controls={`evening-moment-${i}`} className="flex w-full items-center gap-5 py-4 text-left"><span className="font-mono text-[9px] text-bronze-deep">{item.step}</span><span className={`flex-1 font-serif text-[25px] ${i === active ? "italic text-bronze-deep" : "text-ink"}`}>{item.title}</span>{i === active ? <Minus size={14} className="text-bronze-deep" /> : <Plus size={14} className="text-ink/40" />}</button><p id={`evening-moment-${i}`} hidden={i !== active} className="max-w-md pb-5 pl-9 text-xs leading-[1.8] text-ink/65">{item.copy}</p></div>)}
          </div>
          <div className="mt-6"><Btn href="/experience" variant="line">Explore the experience</Btn></div>
        </div>
      </div>
    </section>
  );
}

export function PrivateSection() {
  const [active, setActive] = useState(0);
  const room = PRIVATE_DINING[active];
  return (
    <section id="private" aria-labelledby="private-heading" className="bg-cream py-20 lg:py-24">
      <div className="lux-container">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow text-bronze-deep">05 / Events & private dining</p><h2 id="private-heading" className="display-serif mt-5 text-[clamp(2.7rem,4.8vw,4.5rem)]">Make Your Next Event <em className="font-light text-umber">Special.</em></h2></div><p className="max-w-xs text-xs leading-[1.85] text-ink/60">Birthdays, corporate evenings and family gatherings — a setting and a menu shaped around your occasion.</p></div>
        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Event services">
          {["Birthday Dinners", "Corporate Events", "Family Gatherings", "Engagements", "Private Dining", "Corporate Lunches", "Wedding Events"].map((s) => (
            <li key={s} className="rounded-full border border-ink/15 bg-ivory px-4 py-2 text-[11px] font-medium text-ink/70">{s}</li>
          ))}
        </ul>
        <div role="group" aria-label="Private dining options" className="no-scrollbar mt-9 flex gap-6 overflow-x-auto border-b border-ink/15 sm:gap-10">{PRIVATE_DINING.map((item, i) => <button type="button" key={item.id} aria-pressed={i === active} onClick={() => setActive(i)} className={`shrink-0 border-b-2 py-4 text-[10px] uppercase tracking-[.15em] ${i === active ? "border-bronze-deep font-semibold text-ink" : "border-transparent text-ink/50 hover:text-ink"}`}>{item.name}</button>)}</div>
        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1.2fr_.8fr] lg:gap-16">
          <div className="relative aspect-[16/10] overflow-hidden bg-ivory"><Image key={room.img} src={px(room.img, 1300, 820)} alt={room.alt} fill sizes="(min-width:1024px) 54vw, 95vw" className="signature-enter object-cover" /></div>
          <div key={room.id} className="signature-enter"><p className="text-[9px] font-medium uppercase tracking-[.2em] text-bronze-deep">{room.tag}</p><h3 className="display-serif mt-4 text-4xl">{room.name}</h3><p className="mt-5 max-w-md text-[13px] leading-[1.9] text-ink/65">{room.desc}</p><ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-ink/10 py-5">{room.features.map(f => <li key={f} className="text-[10px] leading-relaxed text-umber">{f}</li>)}</ul><a href="/private-dining#plan-your-evening" className="mt-7 inline-flex min-h-12 items-center gap-8 bg-ink px-6 py-4 text-[10px] font-semibold uppercase tracking-[.18em] text-cream hover:bg-umber">Plan Your Event <ArrowUpRight size={15} /></a></div>
        </div>
      </div>
    </section>
  );
}
