"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Image from "@/components/RestaurantImage";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X, Minus, Plus } from "lucide-react";
import { catName, DIET_META, type Dish } from "@/lib/data/menu";
import { formatPrice, px } from "@/lib/data/site";
import { useCart } from "./cart";
import { useModal } from "./useModal";

export function OverlayShell({ open, onClose, children, label }: {
  open: boolean; onClose: () => void; children: ReactNode; label: string;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useModal(open, onClose, panel);
  if (typeof document === "undefined") return null;
  return createPortal(
    <AnimatePresence>
      {open && <div className="fixed inset-0 z-[95] flex justify-end" role="dialog" aria-modal="true" aria-label={label}>
        <motion.button tabIndex={-1} aria-label="Close dish details" onClick={onClose} className="absolute inset-0 bg-ink/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : .16 }} />
        <motion.div ref={panel} tabIndex={-1} initial={{ x: reduce ? 0 : "100%" }} animate={{ x: 0 }} exit={{ x: reduce ? 0 : "100%" }} transition={{ duration: reduce ? 0 : .23, ease: [.16, 1, .3, 1] }} className="relative flex h-dvh w-full max-w-[560px] flex-col bg-cream text-ink outline-none">
          {children}
        </motion.div>
      </div>}
    </AnimatePresence>, document.body
  );
}

export function DishSheet({ dish, onClose }: { dish: Dish | null; onClose: () => void }) {
  const { addDish } = useCart();
  const [qty, setQty] = useState(1);
  const [opts, setOpts] = useState<string[]>([]);
  const [note, setNote] = useState("");
  useEffect(() => { setQty(1); setOpts([]); setNote(""); }, [dish?.id]);
  const extras = (dish?.options ?? []).filter(o => opts.includes(o.id)).reduce((sum, o) => sum + o.delta, 0);
  return (
    <OverlayShell open={!!dish} onClose={onClose} label={dish ? `${dish.name} details` : "Dish details"}>
      {dish && <>
        <div className="relative h-[25vh] min-h-[170px] max-h-[280px] shrink-0 overflow-hidden bg-ivory">
          <Image src={px(dish.img, 1000, 700, dish.imgExt)} alt={dish.name} fill sizes="(min-width:640px) 560px, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
          <button onClick={onClose} type="button" aria-label="Close dish details" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream text-ink"><X size={19} strokeWidth={1.4} /></button>
          <p className="absolute bottom-4 left-6 text-[9px] uppercase tracking-[.23em] text-cream">{catName(dish.cat)}</p>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-3"><h2 className="display-serif max-w-[360px] text-[34px] leading-[1.07]">{dish.name}</h2><span className="pt-1 font-serif text-2xl text-bronze-deep">{formatPrice(dish.price)}</span></div>
          <p className="mt-4 text-[13px] leading-[1.85] text-ink/65">{dish.desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">{dish.tags.filter(t => ["V", "VG", "GF"].includes(t)).map(t => <span key={t} className="border border-ink/15 px-2 py-1 text-[10px] text-umber">{DIET_META[t].label}</span>)}{dish.spicy && <span className="border border-ink/15 px-2 py-1 text-[10px] text-umber">{dish.spicy === 2 ? "Spicy" : "Mild heat"}</span>}</div>
          <dl className="mt-6 space-y-5 border-t border-ink/10 pt-5">
            <div><dt className="text-[9px] font-semibold uppercase tracking-[.2em] text-bronze-deep">From the chef</dt><dd className="mt-2 font-serif text-[19px] italic leading-snug text-umber">“{dish.chefNote}”</dd></div>
            <div><dt className="text-[9px] font-semibold uppercase tracking-[.2em] text-bronze-deep">Ingredients</dt><dd className="mt-2 text-xs leading-relaxed text-ink/65">{dish.ingredients.join(" · ")}</dd></div>
            <div><dt className="text-[9px] font-semibold uppercase tracking-[.2em] text-bronze-deep">Allergens</dt><dd className="mt-2 text-xs leading-relaxed text-ink/65">{dish.allergens.length ? dish.allergens.join(", ") : "Please ask the kitchen about your specific requirements."} Shared preparation areas may lead to cross-contact.</dd></div>
            {dish.pairing !== "—" && <div><dt className="text-[9px] font-semibold uppercase tracking-[.2em] text-bronze-deep">A suggested pairing</dt><dd className="mt-2 text-xs text-ink/65">{dish.pairing}</dd></div>}
          </dl>
          {dish.options?.length ? <fieldset className="mt-6 border-t border-ink/10 pt-5"><legend className="text-[9px] font-semibold uppercase tracking-[.2em] text-bronze-deep">Make it yours</legend><div className="space-y-2">{dish.options.map(o => <label key={o.id} className="flex items-center justify-between gap-3 border border-ink/15 p-3 text-xs"><span className="flex items-center gap-2"><input type="checkbox" checked={opts.includes(o.id)} onChange={() => setOpts(current => current.includes(o.id) ? current.filter(v => v !== o.id) : [...current, o.id])} className="h-4 w-4 accent-[#364232]" />{o.label}</span><span className="shrink-0 text-bronze-deep">+{formatPrice(o.delta)}</span></label>)}</div></fieldset> : null}
          <label className="mt-6 block"><span className="text-[9px] font-semibold uppercase tracking-[.2em] text-bronze-deep">Special instructions</span><textarea value={note} onChange={e => setNote(e.target.value)} maxLength={500} rows={2} placeholder="Preferences or dietary requirements" className="mt-2 w-full resize-none border border-ink/15 bg-transparent p-3 text-xs placeholder:text-ink/40" /></label>
        </div>
        <div className="shrink-0 border-t border-ink/10 px-6 py-4 sm:px-8" style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}>
          <div className="mb-4 flex items-center justify-between"><div className="flex items-center border border-ink/20"><button type="button" disabled={qty <= 1} onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease quantity" className="flex h-10 w-10 items-center justify-center disabled:opacity-35"><Minus size={14} /></button><span aria-live="polite" className="w-7 text-center text-sm">{qty}</span><button type="button" disabled={qty >= 20} onClick={() => setQty(q => Math.min(20, q + 1))} aria-label="Increase quantity" className="flex h-10 w-10 items-center justify-center disabled:opacity-35"><Plus size={14} /></button></div><p className="font-serif text-2xl text-umber">{formatPrice((dish.price + extras) * qty)}</p></div>
          <button type="button" onClick={() => { onClose(); addDish(dish, qty, opts, note); }} className="flex w-full items-center justify-between bg-[#263326] px-5 py-4 text-[10px] font-semibold uppercase tracking-[.18em] text-cream hover:bg-umber"><span>Add to order</span><span aria-hidden>→</span></button>
        </div>
      </>}
    </OverlayShell>
  );
}
