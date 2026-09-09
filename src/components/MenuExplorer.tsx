"use client";

import { useMemo, useState } from "react";
import Image from "@/components/RestaurantImage";
import Link from "next/link";
import { ArrowUpRight, Search, X, Leaf, Flame } from "lucide-react";
import { CATEGORIES, DISHES, menuHighlights, type Dish } from "@/lib/data/menu";
import { formatPrice, px } from "@/lib/data/site";
import { DishSheet } from "./overlays";

type Filter = "all" | "veg" | "vegan" | "gf" | "chef" | "spicy";
const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All preferences" }, { id: "veg", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" }, { id: "gf", label: "Gluten-free" },
  { id: "chef", label: "Chef's selection" }, { id: "spicy", label: "A little heat" },
];
function matches(d: Dish, filter: Filter) {
  if (filter === "veg") return d.tags.includes("V") || d.tags.includes("VG");
  if (filter === "vegan") return d.tags.includes("VG");
  if (filter === "gf") return d.tags.includes("GF");
  if (filter === "chef") return !!d.chef || !!d.signature;
  if (filter === "spicy") return !!d.spicy;
  return true;
}

export function MenuExplorer() {
  const [cat, setCat] = useState("collection");
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState<Dish | null>(null);
  const selectedCategory = CATEGORIES.find(c => c.id === cat);
  const isSearching = !!query.trim();
  const list = useMemo(() => {
    const source = query.trim() || cat !== "collection" ? DISHES : menuHighlights;
    return source.filter(d => {
      const categoryMatch = query.trim() || cat === "collection" || cat === "all" || d.cat === cat;
      const haystack = [d.name, d.desc, ...d.ingredients].join(" ").toLowerCase();
      return categoryMatch && matches(d, filter) && haystack.includes(query.trim().toLowerCase());
    });
  }, [cat, filter, query]);
  const navigation = [
    { id: "collection", name: "The seasonal forty", count: menuHighlights.length },
    { id: "all", name: "Complete menu", count: DISHES.length },
    ...CATEGORIES.map(c => ({ id: c.id, name: c.name, count: DISHES.filter(d => d.cat === c.id).length })),
  ];
  const reset = () => { setCat("collection"); setQuery(""); setFilter("all"); };

  return (
    <section id="menu-list" aria-labelledby="menu-list-heading" className="bg-cream py-14 lg:py-20">
      <div className="lux-container grid gap-9 lg:grid-cols-[225px_1fr] lg:gap-16">
        <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <div className="mb-7 hidden border-b border-ink/15 pb-6 lg:block">
            <span className="font-serif text-6xl text-umber">{menuHighlights.length}</span>
            <p className="mt-2 text-[10px] uppercase tracking-[.2em] text-bronze-deep">Dishes. One point of view.</p>
          </div>
          <nav aria-label="Menu categories" className="no-scrollbar sticky top-[86px] z-30 -mx-4 flex gap-2 overflow-x-auto bg-cream/95 px-4 py-2 backdrop-blur-md lg:static lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:bg-transparent lg:p-0">
            {navigation.map(item => <button key={item.id} type="button" aria-pressed={!isSearching && cat === item.id} onClick={() => {setCat(item.id); setQuery("");}} className={`flex shrink-0 items-center justify-between gap-4 whitespace-nowrap border px-4 py-3 text-left text-[11px] transition-colors duration-150 lg:border-0 lg:border-l-2 ${!isSearching && cat === item.id ? "border-bronze-deep bg-ivory font-semibold text-bronze-deep" : "border-ink/10 text-ink/60 hover:bg-ivory/70 hover:text-ink lg:border-transparent"}`}><span>{item.name}</span><span className="font-mono text-[9px] opacity-60">{String(item.count).padStart(2, "0")}</span></button>)}
          </nav>
          <p className="mt-6 hidden max-w-[180px] text-[11px] leading-[1.8] text-ink/50 lg:block">Our forty includes breakfast through dessert. Coffee, drinks and tasting experiences are also available in the complete menu.</p>
          <Link href="/concierge" className="mt-5 hidden items-center gap-3 text-[10px] font-medium text-bronze-deep lg:inline-flex">Need a recommendation? <ArrowUpRight size={13} /></Link>
        </aside>
        <div className="min-w-0">
          <div className="flex flex-col justify-between gap-5 border-b border-ink/10 pb-7 sm:flex-row sm:items-end">
            <div><p className="eyebrow text-bronze-deep">The kitchen's notebook</p><h2 id="menu-list-heading" className="display-serif mt-3 text-4xl sm:text-5xl">{isSearching ? "Your search." : cat === "collection" ? "The seasonal forty." : cat === "all" ? "The complete menu." : selectedCategory?.name}</h2><p className="mt-3 text-[12px] text-ink/55">{isSearching ? "Searching dishes and ingredients across the whole menu." : selectedCategory?.note ?? "Breakfast, the first course, the last bite. Make it your own."}</p></div>
            <label className="flex w-full items-center gap-2 border-b border-ink/25 py-2 sm:w-56 sm:shrink-0"><Search size={14} className="shrink-0 text-bronze-deep" /><span className="sr-only">Search the menu</span><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Find a dish or ingredient" className="min-w-0 flex-1 bg-transparent text-[12px] outline-none placeholder:text-ink/45" />{query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")} className="p-1"><X size={13} /></button>}</label>
          </div>
          <div className="my-5 flex flex-wrap items-center gap-2" role="group" aria-label="Dietary preferences">
            {FILTERS.map(f => <button type="button" key={f.id} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)} className={`min-h-9 rounded-full border px-3.5 py-2 text-[10px] transition-colors duration-150 ${filter === f.id ? "border-[#364232] bg-[#364232] text-cream" : "border-ink/15 text-ink/65 hover:border-ink/40"}`}>{f.label}</button>)}
          </div>
          <p aria-live="polite" className="flex justify-between gap-3 border-b border-ink/10 pb-3 text-[10px] text-ink/50"><span>{list.length} {list.length === 1 ? "dish" : "dishes"} to explore</span><span>Prices in PKR</span></p>
          <ul aria-label="Available dishes" className="divide-y divide-ink/10">
            {list.map((d, index) => <li key={d.id} data-dish-id={d.id}>
              <button type="button" onClick={() => setDetail(d)} aria-label={`View ${d.name}`} className="group grid w-full grid-cols-[72px_minmax(0,1fr)] items-center gap-4 py-6 text-left transition-colors hover:bg-ivory/60 sm:grid-cols-[86px_minmax(0,1fr)_100px] sm:gap-6">
                <span className="relative h-[86px] overflow-hidden bg-ivory sm:h-[94px]"><Image src={px(d.img, 260, 300, d.imgExt)} alt={d.name} fill sizes="86px" className="object-cover transition-transform duration-200 group-hover:scale-105" /></span>
                <span className="min-w-0">
                  <span className="mb-1 flex items-center gap-3 text-[8px] uppercase tracking-[.16em] text-bronze-deep"><span className="font-mono">{String(index + 1).padStart(2, "0")}</span>{d.chef || d.signature ? "Chef's recommendation" : CATEGORIES.find(c => c.id === d.cat)?.kicker}</span>
                  <span className="block font-serif text-[24px] leading-[1.15] text-ink group-hover:text-bronze-deep">{d.name}</span>
                  <span className="mt-2 block max-w-xl text-[11px] leading-[1.8] text-ink/60 sm:text-xs">{d.desc}</span>
                  <span className="mt-2 flex flex-wrap items-center gap-3 text-[9px] text-umber">{(d.tags.includes("V") || d.tags.includes("VG")) && <span className="inline-flex items-center gap-1"><Leaf size={11} />{d.tags.includes("VG") ? "Vegan" : "Vegetarian"}</span>}{d.tags.includes("GF") && <span>Gluten-free</span>}{d.spicy && <span className="inline-flex items-center gap-1"><Flame size={11} />{d.spicy === 2 ? "Spicy" : "Mild heat"}</span>}</span>
                  <span className="mt-3 flex items-center justify-between text-[11px] text-bronze-deep sm:hidden">{formatPrice(d.price)}<ArrowUpRight size={15} /></span>
                </span>
                <span className="hidden text-right sm:block"><span className="block font-serif text-xl text-umber">{formatPrice(d.price)}</span><span className="mt-3 inline-flex items-center gap-2 text-[9px] text-bronze-deep">Discover <ArrowUpRight size={13} /></span></span>
              </button>
            </li>)}
          </ul>
          {list.length === 0 && <div className="border-b border-ink/10 py-16 text-center"><p className="display-serif text-3xl">A different course, perhaps?</p><p className="mt-3 text-sm text-ink/60">No dishes match these preferences.</p><button type="button" onClick={reset} className="mt-5 border-b border-bronze-deep py-2 text-[10px] uppercase tracking-[.18em] text-bronze-deep">Reset filters</button></div>}
          <p className="mt-7 max-w-2xl text-[11px] leading-[1.85] text-ink/55">Please open a dish for its ingredients, allergens and customisation options. Dietary labels describe the base recipe; add-ons may change them. Shared preparation areas mean we cannot guarantee the absence of cross-contact. This is a fictional dining demo.</p>
        </div>
      </div>
      <DishSheet dish={detail} onClose={() => setDetail(null)} />
    </section>
  );
}
