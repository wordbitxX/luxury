import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { MenuExplorer } from "@/components/MenuExplorer";
import { Btn } from "@/components/ui";
import { DEMO_BASE, MEDIA, px } from "@/lib/data/site";
import { CATEGORIES, menuHighlights } from "@/lib/data/menu";

const title = "The Seasonal Forty — Maison Noor Menu | WordbitX Demo";
const description = "Discover 40 curated dishes from breakfast to dessert, plus coffee and drinks. Search ingredients, filter dietary preferences and try direct ordering in the WordbitX restaurant showcase.";
export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: DEMO_BASE + "/menu" },
  openGraph: { title, description, url: DEMO_BASE + "/menu", images: [{ url: px(MEDIA.seafoodPlate.id, 1200, 630), width: 1200, height: 630, alt: "A seasonal dish from the Maison Noor menu concept" }] },
  twitter: { card: "summary_large_image", title, description, images: [px(MEDIA.seafoodPlate.id, 1200, 630)] },
};
const menuData = {
  "@context": "https://schema.org", "@type": "Menu", name: "Maison Noor — The seasonal forty (fictional demo)", description,
  url: DEMO_BASE + "/menu",
  hasMenuSection: CATEGORIES.filter(c => menuHighlights.some(d => d.cat === c.id)).map(c => ({
    "@type": "MenuSection", name: c.name,
    hasMenuItem: menuHighlights.filter(d => d.cat === c.id).map(d => ({ "@type": "MenuItem", name: d.name, description: d.desc })),
  })),
};

export default function MenuPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(menuData).replace(/</g, "\\u003c") }} />
      <PageHero crumb="The menu" eyebrow="Scan. Explore. Order." title="A menu to linger over." sub="From smoky BBQ to dum biryani — starters, Pakistani classics, Chinese, burgers, pizza and more. Find your favourites, order online, or reserve a table." img={MEDIA.tableSetting.id} alt={MEDIA.tableSetting.alt} />
      <MenuExplorer />
      <section aria-label="QR menu" className="border-t border-ink/10 bg-ink py-16 text-cream lg:py-20">
        <div className="lux-container grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div>
            <p className="eyebrow !text-champagne">QR menu for your tables</p>
            <h2 className="display-serif mt-4 text-3xl sm:text-4xl">Scan QR to View Menu</h2>
            <p className="mt-4 max-w-xl text-sm leading-[1.9] text-cream/70">
              Guests scan a code at the table and land on this exact page — mobile-first, with
              sticky categories, live prices and one-tap ordering. WordbitX sets up a branded QR
              menu for any restaurant, in days not months.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Btn href="/order" variant="light">Try ordering</Btn>
              <Btn href="https://wordbitx.com/contact" variant="outline" className="!border-cream/40 !text-cream hover:!bg-cream hover:!text-ink">Get a QR menu</Btn>
            </div>
          </div>
          <div className="mx-auto w-fit border border-cream/20 bg-cream/[0.04] p-6 text-center">
            <div aria-hidden className="grid grid-cols-7 gap-[3px] bg-cream p-4">
              {Array.from({ length: 49 }, (_, i) => (
                <span key={i} className={`h-3.5 w-3.5 ${(i * 7 + (i % 5)) % 3 !== 0 ? "bg-ink" : "bg-transparent"}`} />
              ))}
            </div>
            <p className="mt-4 font-serif text-lg italic text-champagne">Your Restaurant QR Menu</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-cream/50">Scan · Explore · Order</p>
          </div>
        </div>
      </section>
      <section className="border-t border-ink/10 bg-ivory py-14"><div className="lux-container flex flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><p className="eyebrow text-bronze-deep">A little guidance</p><h2 className="display-serif mt-4 text-3xl">Let the concierge find your next favourite.</h2></div><Btn href="/concierge">Start a conversation</Btn></div></section>
    </>
  );
}
