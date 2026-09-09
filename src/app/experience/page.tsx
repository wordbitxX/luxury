import type { Metadata } from "next";
import Image from "@/components/RestaurantImage";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Btn } from "@/components/ui";
import { EVENING_JOURNEY } from "@/lib/data/content";
import { DEMO_BASE, MEDIA, px } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "The Evening — The Guest Experience",
  description: "Arrival, the table, the kitchen and the final course. Discover the Maison Noor guest journey, a fictional fine-dining experience created by WordbitX.",
  alternates: { canonical: DEMO_BASE + "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <PageHero crumb="Experience" eyebrow="The evening" title="A night designed like a menu" sub="Six moments, from the courtyard door to the final coffee. Considered hospitality, without a trace of hurry." img={MEDIA.banquet.id} alt={MEDIA.banquet.alt} />
      <section className="bg-cream py-20 lg:py-28">
        <div className="lux-container space-y-16 lg:space-y-24">
          {EVENING_JOURNEY.map((e, i) => <article key={e.step} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16"><div className={`lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}><div className="img-frame relative aspect-[16/10]"><Image src={px(e.img, 1500, 950, e.imgExt)} alt={e.alt} fill sizes="(min-width:1024px) 55vw, 95vw" className="object-cover" /></div></div><div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : ""}`}><p className="font-mono text-xs tracking-[.16em] text-bronze-deep">{e.step} / THE EVENING</p><h2 className="display-serif mt-4 text-4xl sm:text-5xl">{e.title}</h2><p className="mt-5 max-w-md font-serif text-xl leading-relaxed text-umber">{e.copy}</p>{i === 3 && <Link href="/chef" className="mt-6 inline-flex border-b border-bronze-deep pb-2 text-[10px] uppercase tracking-[.2em] text-bronze-deep">Meet the chef →</Link>}</div></article>)}
        </div>
      </section>
      <section className="border-y border-ink/10 bg-ivory py-16"><div className="lux-container flex flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><p className="eyebrow text-bronze-deep">Make it your evening</p><h2 className="display-serif mt-3 text-3xl sm:text-4xl">The room is lit from 18:00.</h2></div><Btn href="/reserve">Reserve your table</Btn></div></section>
    </>
  );
}
