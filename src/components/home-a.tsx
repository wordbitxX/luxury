"use client";

import { useState } from "react";
import Image from "@/components/RestaurantImage";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Leaf } from "lucide-react";
import { Btn, DietRow } from "./ui";
import { DishSheet } from "./overlays";
import { MEDIA, SITE, px, formatPrice, WORD_BIT_X } from "@/lib/data/site";
import { CATEGORIES, DISHES, getDish, menuHighlights, type Dish } from "@/lib/data/menu";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative flex min-h-[760px] items-end overflow-hidden bg-ink text-cream lg:min-h-[min(900px,96svh)]">
      <Image src={px(MEDIA.heroRoom.id, 1800, 1200)} alt="Candlelit dining room, crystal glassware and warm evening light" fill priority sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-linear-to-r from-[#141a15]/85 via-[#161b17]/45 to-[#171e19]/15" />
      <div className="absolute inset-0 bg-linear-to-t from-[#161b17]/90 via-transparent to-[#161b17]/25" />
      <div className="lux-container relative z-10 pt-40 pb-8 sm:pb-10">
        <p className="flex items-center gap-4 text-[10px] font-medium uppercase tracking-[.3em] text-champagne"><span className="h-px w-10 bg-champagne/60" /> Lahore · Contemporary fire cuisine</p>
        <p className="display-serif mt-6 text-[clamp(1.7rem,3.6vw,2.6rem)] italic text-champagne">{SITE.name}</p>
        <h1 id="hero-title" className="display-serif mt-2 text-[clamp(3.4rem,9.5vw,7.6rem)] leading-none tracking-[-.035em] text-cream">Good Food. Great Moments.</h1>
        <div className="mt-5 grid gap-9 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="max-w-md text-[15px] leading-[1.85] text-cream/85 sm:text-base">Discover exceptional food, crafted with passion and served in an atmosphere worth remembering.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 pb-1">
            <Btn href="/order" variant="light" className="!px-7 !py-4">Order Online</Btn>
            <Btn href="/reserve" variant="outline" className="!border-cream/55 !text-cream hover:!bg-cream hover:!text-ink !px-7 !py-4">Reserve a Table</Btn>
            <Btn href="/menu" variant="outline" className="!border-transparent !px-4 !py-4 !text-champagne hover:!text-cream">View Menu</Btn>
          </div>
        </div>
        <div className="mt-8 flex max-w-3xl flex-wrap items-center gap-x-8 gap-y-3 text-cream/80">
          <span className="flex items-center gap-2 text-xs">
            <span aria-hidden className="tracking-[0.1em] text-champagne">★★★★★</span>
            <span><strong className="font-semibold text-cream">4.9/5</strong> Guest Rating</span>
          </span>
          <span className="hidden h-4 w-px bg-cream/20 sm:block" aria-hidden />
          <span className="text-xs"><strong className="font-semibold text-cream">10,000+</strong> Happy Guests</span>
          <span className="hidden h-4 w-px bg-cream/20 sm:block" aria-hidden />
          <span className="text-xs">Freshly Prepared</span>
          <span className="hidden h-4 w-px bg-cream/20 sm:block" aria-hidden />
          <span className="flex items-center gap-2 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
            Open Today
          </span>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t border-cream/20 pt-6 lg:mt-20">
          <a href="#story" className="flex items-center gap-3 text-[9px] uppercase tracking-[.2em] text-cream/70 hover:text-cream">Discover the house <ArrowDown size={13} /></a>
          <a href={WORD_BIT_X.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-cream/65 hover:text-white">A hospitality showcase by <span className="font-semibold text-cream">WordbitX</span> <span aria-hidden>↗</span></a>
        </div>
      </div>
    </section>
  );
}

export function Intro() {
  return (
    <section id="story" aria-labelledby="house-title" className="bg-cream py-20 lg:py-28">
      <div className="lux-container grid items-center gap-12 lg:grid-cols-[1fr_.95fr] lg:gap-24">
        <div>
          <p className="eyebrow text-bronze-deep">01 / The house</p>
          <h2 id="house-title" className="display-serif mt-6 text-[clamp(2.7rem,4.7vw,4.6rem)] leading-[1.05]">Rooted in Lahore.<br /><em className="font-light text-umber">Open to the world.</em></h2>
          <p className="mt-7 max-w-lg text-sm leading-[1.95] text-ink/65">European technique, a South Asian soul. Maison Noor brings the market, the open hearth and the dining room into one conversation. Our ingredients are familiar; the way they come together is anything but.</p>
          <p className="mt-4 max-w-lg text-sm leading-[1.95] text-ink/65">Come for a long dinner, a moment worth celebrating, or simply something exceptionally good to eat.</p>
          <div className="mt-8 flex flex-wrap gap-7">
            <Btn href="/story" variant="line">Our story</Btn>
            <Link href="/chef" className="inline-flex items-center gap-3 py-2 text-[10px] font-medium uppercase tracking-[.2em] text-umber hover:text-ink">Meet the chef <ArrowUpRight size={14} /></Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink/10 pt-5 text-[10px] text-ink/60">
            <span>Season-led ingredients</span><span>Open-hearth cooking</span><span>Considered hospitality</span>
          </div>
        </div>
        <figure className="relative pb-7 pl-7">
          <div className="img-frame relative aspect-[5/6] max-h-[500px]">
            <Image src={px(MEDIA.tableFloral.id, 1000, 1200)} alt="Seasonal flowers and fine linen prepared for an intimate dinner" fill sizes="(min-width:1024px) 43vw, 92vw" className="object-cover" />
          </div>
          <figcaption className="absolute bottom-0 left-0 max-w-[250px] bg-ivory px-6 py-5 font-serif text-xl italic leading-snug text-umber">The table is only<br />the beginning.</figcaption>
        </figure>
      </div>
    </section>
  );
}

const SIGNATURES = [
  { id: "m2", title: "Ember-grilled", accent: "lamb rack.", short: "The hearth", course: "From the open fire", elements: "Saffron butter · garden herbs · oak smoke", note: "A patient fire. A proper rest. A finish that lets the lamb speak for itself." },
  { id: "m1", title: "Wild mushroom", accent: "& black truffle.", short: "The woodland", course: "A taste of the woodland", elements: "Carnaroli rice · porcini · aged parmesan", note: "Rich without being heavy. Earthy, generous, and finished at precisely the right moment." },
  { id: "d1", title: "Burnt honey", accent: "pavlova.", short: "The final note", course: "Something to linger over", elements: "Honey meringue · vanilla cream · seasonal fruit", note: "A little crunch, a little softness. The sweetness of a long evening, in its last course." },
] as const;

export function SignatureSection() {
  const [selected, setSelected] = useState(0);
  const [detail, setDetail] = useState<Dish | null>(null);
  const spec = SIGNATURES[selected];
  const dish = getDish(spec.id)!;
  const change = (direction: number) => setSelected((value) => (value + direction + SIGNATURES.length) % SIGNATURES.length);

  return (
    <section id="signature" aria-labelledby="signature-heading" className="signature-section py-20 text-cream lg:py-24">
      <div className="lux-container">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-champagne/75">02 / The house signatures</p>
            <h2 id="signature-heading" className="display-serif mt-5 text-[clamp(3rem,5vw,4.7rem)]">Signature <em className="font-light text-champagne">Plates</em></h2>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-[10px] uppercase tracking-[.2em] text-cream/60">N° 0{selected + 1} <span className="mx-2 text-cream/30">/</span> 03</span>
            <div className="flex gap-2">
              <button type="button" onClick={() => change(-1)} aria-label="Previous signature dish" className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream hover:border-cream hover:bg-cream/10"><ChevronLeft size={16} /></button>
              <button type="button" onClick={() => change(1)} aria-label="Next signature dish" className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream hover:border-cream hover:bg-cream/10"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
        <div className="mt-10 grid overflow-hidden lg:grid-cols-[1.12fr_1fr]">
          <button type="button" onClick={() => setDetail(dish)} className="group relative block aspect-[6/5] w-full overflow-hidden bg-[#38382b] text-left sm:aspect-[6/4] lg:aspect-auto lg:min-h-[610px]" aria-label={`Discover ${dish.name}`}>
            <Image key={dish.id} src={px(dish.img, 1200, 1400, dish.imgExt)} alt={dish.name} fill sizes="(min-width:1024px) 49vw, 100vw" className="signature-enter object-cover transition-transform duration-300 group-hover:scale-[1.025]" />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent px-6 pt-20 pb-6">
              <span className="flex items-center justify-between gap-3 text-[9px] font-medium uppercase tracking-[.22em] text-white/90"><span>{spec.course}</span><ArrowUpRight size={19} strokeWidth={1.2} /></span>
            </div>
          </button>
          <div className="signature-panel flex min-w-0 flex-col justify-center px-7 py-10 sm:px-10 sm:py-12 lg:px-12 xl:px-16">
            <div key={dish.id} className="signature-enter">
              <p className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[.25em] text-bronze-deep"><span className="h-px w-6 bg-bronze/70" /> {spec.course}</p>
              <h3 className="signature-name mt-6"><span className="block">{spec.title}</span><em className="block font-normal text-[#6e7258]">{spec.accent}</em></h3>
              <p className="mt-5 text-[11px] leading-relaxed tracking-[.02em] text-umber">{spec.elements}</p>
              <p className="mt-5 max-w-sm text-sm leading-[1.9] text-ink/65">{spec.note}</p>
              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-y border-ink/10 py-5">
                <p className="font-serif text-[27px] text-ink">{formatPrice(dish.price)}</p>
                <div className="flex items-center gap-2 text-[10px] text-umber">{dish.tags.includes("V") && <Leaf size={13} strokeWidth={1.3} />}<span>{dish.tags.includes("V") ? "Vegetarian" : "From the hearth"}</span></div>
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-6">
                <Btn onClick={() => setDetail(dish)} className="!bg-[#263326] !px-5 hover:!bg-[#3d4b36]">Discover this dish</Btn>
                <Link href="/menu" className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[.2em] text-umber hover:text-ink">The full menu <ArrowUpRight size={13} /></Link>
              </div>
              <p className="mt-5 text-[10px] leading-relaxed text-ink/45">Ingredients, allergens and customisation inside.</p>
            </div>
          </div>
        </div>
        <div role="group" aria-label="Choose a signature plate" className="mt-6 grid grid-cols-3 gap-3 border-t border-cream/15 pt-5 sm:gap-8">
          {SIGNATURES.map((item, i) => (
            <button type="button" key={item.id} aria-pressed={selected === i} onClick={() => setSelected(i)} className={`flex items-start gap-3 border-b py-3 text-left transition-colors duration-150 sm:gap-4 ${selected === i ? "border-champagne text-cream" : "border-transparent text-cream/45 hover:text-cream/80"}`}>
              <span className="pt-1 font-mono text-[9px] text-champagne/60">0{i + 1}</span>
              <span><span className="block font-serif text-lg sm:text-[23px]">{item.short}</span><span className="mt-1 hidden text-[10px] text-current/70 sm:block">{item.id === "m2" ? "Ember-grilled lamb" : item.id === "m1" ? "Mushroom & truffle" : "Burnt honey pavlova"}</span></span>
            </button>
          ))}
        </div>
      </div>
      <DishSheet dish={detail} onClose={() => setDetail(null)} />
    </section>
  );
}

export function MenuPreview() {
  const [cat, setCat] = useState("starters");
  const [detail, setDetail] = useState<Dish | null>(null);
  const categories = CATEGORIES.filter((c) => ["starters", "mains", "grill", "seafood", "desserts"].includes(c.id));
  const list = DISHES.filter((d) => d.cat === cat).slice(0, 4);
  return (
    <section id="menu-preview" aria-labelledby="home-menu-heading" className="bg-cream py-20 lg:py-24">
      <div className="lux-container">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><p className="eyebrow text-bronze-deep">03 / The seasonal menu</p><h2 id="home-menu-heading" className="display-serif mt-5 text-[clamp(2.7rem,4.8vw,4.5rem)]">Forty dishes.<br className="sm:hidden" /> <em className="font-light text-umber">Endless possibilities.</em></h2></div>
          <Link href="/menu" className="inline-flex shrink-0 items-center gap-5 border-b border-ink/30 py-2 text-[10px] font-semibold uppercase tracking-[.16em] text-ink hover:text-bronze-deep">Explore all {menuHighlights.length} dishes <ArrowUpRight size={15} /></Link>
        </div>
        <div role="group" aria-label="Home menu categories" className="no-scrollbar mt-9 flex gap-6 overflow-x-auto border-b border-ink/10 sm:gap-10">
          {categories.map((c) => <button type="button" key={c.id} aria-pressed={cat === c.id} onClick={() => setCat(c.id)} className={`shrink-0 border-b-2 px-0.5 py-4 text-[10px] font-semibold uppercase tracking-[.16em] ${cat === c.id ? "border-bronze-deep text-ink" : "border-transparent text-ink/50 hover:text-ink"}`}>{c.name}</button>)}
        </div>
        <ul className="grid gap-x-12 lg:grid-cols-2">
          {list.map((d) => <li key={d.id} className="border-b border-ink/10"><button type="button" aria-label={`View ${d.name}`} onClick={() => setDetail(d)} className="group flex w-full items-center gap-4 py-6 text-left sm:gap-5"><span className="relative h-[78px] w-[78px] shrink-0 overflow-hidden bg-ivory"><Image src={px(d.img, 240, 240, d.imgExt)} alt={d.name} fill sizes="78px" className="object-cover transition-transform duration-200 group-hover:scale-105" /></span><span className="min-w-0 flex-1"><span className="flex flex-wrap items-baseline justify-between gap-2"><span className="font-serif text-[23px] leading-tight text-ink group-hover:text-bronze-deep">{d.name.split(",")[0]}</span><span className="text-[11px] text-umber">{formatPrice(d.price)}</span></span><span className="mt-2 block text-[11px] leading-relaxed text-ink/60">{d.ingredients.slice(0, 3).join(" · ")}</span><span className="mt-2 block"><DietRow tags={d.tags.filter(t => ["V", "VG", "GF"].includes(t))} /></span></span><ArrowRight size={14} className="hidden text-bronze-deep sm:block" /></button></li>)}
        </ul>
        <p className="mt-5 text-[10px] leading-relaxed text-ink/50">Dietary preferences? Find vegetarian, vegan and gluten-free choices in the full menu. Always review allergens before ordering.</p>
      </div>
      <DishSheet dish={detail} onClose={() => setDetail(null)} />
    </section>
  );
}
