import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { DEMO_BASE, MEDIA } from "@/lib/data/site";
import { GUIDES } from "@/lib/data/guides";

export const metadata: Metadata = {
  title: "Lahore Food Guides — Where to Eat & What to Order",
  description: "Lahore food guides by Maison Noor: best restaurants, rooftop dining, BBQ, desi food, family dinners, DHA, MM Alam Road and birthday dinners.",
  alternates: { canonical: DEMO_BASE + "/guides" },
};

export default function GuidesPage() {
  return (
    <>
      <PageHero
        crumb="Food Guides"
        eyebrow="Eat Lahore well"
        title="Lahore food guides."
        sub="Where to eat, what to order and how to book it — written for Lahoris, newcomers and the perpetually hungry."
        img={MEDIA.banquet.id}
        alt={MEDIA.banquet.alt}
      />
      <section className="bg-cream py-16 lg:py-24">
        <div className="lux-container grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((g, i) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="group flex flex-col border border-ink/12 bg-ivory p-7 transition-colors hover:border-bronze-deep"
            >
              <p className="eyebrow !text-[9px] text-bronze-deep">{String(i + 1).padStart(2, "0")} · Guide</p>
              <h2 className="mt-3 font-serif text-2xl leading-snug text-ink group-hover:text-bronze-deep">
                {g.title}
              </h2>
              <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-ink/60">{g.description}</p>
              <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-ink/45">{g.read} →</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
