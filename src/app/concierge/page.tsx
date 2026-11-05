import type { Metadata } from "next";
import { metadata as siteMetadata } from "@/app/layout";
import { PageHero } from "@/components/PageHero";
import { ConciergeChat } from "@/components/flows";
import { Eyebrow } from "@/components/ui";
import { DEMO_BASE, MEDIA } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "The AI Concierge",
  description:
    "Ask the Maison Noor AI concierge for dish recommendations, ingredient and allergen answers, wine pairings, hours or reservation guidance — a restaurant AI experience designed by WordbitX.",
  alternates: { canonical: DEMO_BASE + "/concierge" },
  openGraph: { ...siteMetadata.openGraph, url: DEMO_BASE + "/concierge" },
};

export default function ConciergePage() {
  return (
    <>
      <PageHero
        crumb="Concierge"
        eyebrow="AI dining assistant · API-ready"
        title="The Concierge"
        sub="Part maître d', part sommelier, part menu — it knows every dish on the menu and can send one straight to your order."
        img={MEDIA.wineGlasses.id}
        alt={MEDIA.wineGlasses.alt}
      />

      <section className="bg-ivory py-16 lg:py-24">
        <div className="lux-container">
          <ConciergeChat />
          <div className="mx-auto mt-8 max-w-3xl">
            <Eyebrow>It can help with</Eyebrow>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-ink/65 sm:grid-cols-3">
              {[
                "Dish recommendations",
                "Ingredient questions",
                "Dietary preferences",
                "Allergen questions",
                "Food & wine pairing",
                "Restaurant information",
                "Reservation guidance",
                "Menu navigation",
                "Ordering",
              ].map((c) => (
                <li key={c} className="flex items-center gap-2.5">
                  <span className="h-1 w-1 rounded-full bg-bronze-deep" /> {c}
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-ink/10 pt-6 text-xs leading-relaxed text-ink/50">
              The Concierge demo runs on a structured recommendation engine, architected so a live AI
              model can be connected without redesigning the experience. Every dish it recommends is
              the real menu — and every “Add” places a genuine order.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
