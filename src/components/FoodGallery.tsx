"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "@/components/RestaurantImage";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { px } from "@/lib/data/site";

type Filter = "All" | "BBQ" | "Desi" | "Continental" | "Desserts" | "Drinks" | "Interior";

const FILTERS: Filter[] = ["All", "BBQ", "Desi", "Continental", "Desserts", "Drinks", "Interior"];

type Shot = { img: number; alt: string; cat: Exclude<Filter, "All">; ext?: string };

const SHOTS: Shot[] = [
  { img: 7243877, alt: "Skewers grilling over live coals", cat: "BBQ" },
  { img: 32793290, alt: "Crisp prawns with green chilli aioli", cat: "BBQ" },
  { img: 6297198, alt: "Slow-roasted salmon over couscous", cat: "BBQ" },
  { img: 11795618, alt: "Ember-grilled lamb rack, rested and carved", cat: "BBQ" },
  { img: 8629083, alt: "Fresh vegetables prepped for the karahi", cat: "Desi" },
  { img: 8629120, alt: "Final garnish on a desi classic", cat: "Desi" },
  { img: 15671324, alt: "Dum biryani layered with saffron rice", cat: "Desi" },
  { img: 19409040, alt: "Palak paneer in a hand-finished bowl", cat: "Desi" },
  { img: 24186303, alt: "Refined fire-cooked course on dark ceramic", cat: "Continental" },
  { img: 24289213, alt: "Seafood course with foam and microgreens", cat: "Continental" },
  { img: 34342499, alt: "Hand-rolled pasta in a delicate sauce", cat: "Continental" },
  { img: 19748948, alt: "Minimalist continental main course", cat: "Continental" },
  { img: 35708376, alt: "Honeycomb and cream dessert", cat: "Desserts" },
  { img: 35546720, alt: "Dark chocolate dessert, minimalist plating", cat: "Desserts" },
  { img: 17035085, alt: "Saffron kulfi with pistachio and rose", cat: "Desserts" },
  { img: 35622247, alt: "Red velvet dessert with artistic garnish", cat: "Desserts" },
  { img: 3937673, alt: "Red wine beside an elegant table setting", cat: "Drinks" },
  { img: 31631249, alt: "Coupe glasses lined at the bar", cat: "Drinks" },
  { img: 3092967, alt: "Citrus cocktail at the lounge bar", cat: "Drinks" },
  { img: 32395820, alt: "Drinks on marble under a warm lamp", cat: "Drinks" },
  { img: 37968303, alt: "Candlelit dining room in the evening", cat: "Interior" },
  { img: 12919407, alt: "Light-filled dining hall with tall windows", cat: "Interior" },
  { img: 17294737, alt: "Long table in ivory linen and flowers", cat: "Interior" },
  { img: 17001748, alt: "Private table set by candlelight", cat: "Interior" },
];

export function FoodGallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [index, setIndex] = useState<number | null>(null);

  const list = useMemo(
    () => (filter === "All" ? SHOTS : SHOTS.filter((s) => s.cat === filter)),
    [filter]
  );

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + list.length) % list.length)),
    [list.length]
  );

  useEffect(() => {
    if (index === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, step]);

  const current = index !== null ? list[index] : null;

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="bg-ivory py-20 lg:py-24">
      <div className="lux-container">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-bronze-deep">The food, up close</p>
            <h2 id="gallery-heading" className="display-serif mt-5 text-[clamp(2.7rem,4.8vw,4.5rem)]">
              From the Fire, <em className="font-light text-umber">to the Table.</em>
            </h2>
          </div>
          <p className="max-w-xs text-xs leading-[1.85] text-ink/60">
            BBQ, desi classics, continental plates, desserts and the room itself — tap any
            photograph to view it at length.
          </p>
        </div>

        <div className="no-scrollbar mt-9 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Gallery categories">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => { setFilter(f); setIndex(null); }}
              aria-pressed={filter === f}
              className={`shrink-0 border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors duration-150 ${
                filter === f ? "border-ink bg-ink text-cream" : "border-ink/20 text-ink/65 hover:border-ink/50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" aria-live="polite">
          {list.map((s, i) => (
            <button
              key={`${s.img}-${i}`}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`View larger: ${s.alt}`}
              className={`group relative overflow-hidden bg-linen text-left ${
                i % 7 === 0 ? "col-span-2 aspect-[16/10]" : "aspect-[4/5]"
              }`}
            >
              <Image
                src={px(s.img, i % 7 === 0 ? 1200 : 700, i % 7 === 0 ? 750 : 875, s.ext)}
                alt={s.alt}
                fill
                sizes={i % 7 === 0 ? "(min-width:1024px) 46vw, 92vw" : "(min-width:1024px) 22vw, 46vw"}
                loading="lazy"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute bottom-3 left-3 bg-ink/70 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-cream opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {s.cat}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {current && (
          <div className="fixed inset-0 z-[96] flex flex-col bg-ink/[0.96] text-cream" role="dialog" aria-modal="true" aria-label={`Photograph: ${current.alt}`}>
            <div className="flex items-center justify-between px-5 py-4 sm:px-8">
              <p className="eyebrow !text-cream/60">
                {String((index ?? 0) + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")} · {current.cat}
              </p>
              <button onClick={close} aria-label="Close viewer" className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 hover:border-cream">
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center overflow-hidden px-4">
              <motion.figure
                key={current.img}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="flex max-h-full flex-col items-center"
              >
                <Image src={px(current.img, 1600, 1100, current.ext)} alt={current.alt} width={1600} height={1100} sizes="95vw" className="h-auto max-h-[72vh] w-auto max-w-full object-contain" />
                <figcaption className="mt-4 max-w-xl text-center text-sm text-cream/70">{current.alt}</figcaption>
              </motion.figure>
            </div>
            <div className="flex items-center justify-center gap-4 pb-6 pt-2">
              <button aria-label="Previous photograph" onClick={() => step(-1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 hover:border-cream">
                <ChevronLeft size={18} />
              </button>
              <button aria-label="Next photograph" onClick={() => step(1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 hover:border-cream">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
