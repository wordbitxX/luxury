import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { MenuExplorer } from "@/components/MenuExplorer";
import { DEMO_BASE, MEDIA, px } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Order Online — Pickup & Delivery",
  description:
    "Order Maison Noor for pickup or delivery across central Lahore. Choose dishes, customise, review your bag and confirm — a complete restaurant online ordering experience.",
  alternates: { canonical: DEMO_BASE + "/order" },
  openGraph: {
      url: DEMO_BASE + "/order",
    title: "Order Online — Maison Noor",
    description:
      "A complete restaurant online ordering system — browse, customise, and order for pickup or delivery.",
    images: [{ url: px(MEDIA.plateColor.id, 1200, 630), width: 1200, height: 630, alt: "Plated dish from the Maison Noor kitchen" }],
  },
};

export default function OrderPage() {
  return (
    <>
      <PageHero
        crumb="Order Online"
        eyebrow="Pickup & delivery · 35–60 minutes"
        title="Order Online"
        sub="The same menu, the same kitchen, the same care — packed to travel. Pickup from the courtyard door, or delivery across central Lahore."
        img={MEDIA.wineBar.id}
        alt={MEDIA.wineBar.alt}
      />
      <MenuExplorer />
      <section className="border-t border-ink/10 bg-ivory py-14 text-center">
        <p className="display-serif mx-auto max-w-2xl px-6 text-3xl leading-snug text-ink">
          “The bread travels badly. Everything else travels beautifully.”
        </p>
        <p className="eyebrow mt-4 !text-bronze-deep">— The kitchen, honestly</p>
      </section>
    </>
  );
}
