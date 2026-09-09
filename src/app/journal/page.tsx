import type { Metadata } from "next";
import Image from "@/components/RestaurantImage";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Eyebrow } from "@/components/ui";
import { JOURNAL } from "@/lib/data/content";
import { DEMO_BASE, MEDIA, px } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "The Journal — Notes from the House",
  description:
    "The Maison Noor journal — seasonal ingredients, behind the kitchen, chef stories, dining guides, food pairings and restaurant events from Lahore's hearth kitchen.",
  alternates: { canonical: DEMO_BASE + "/journal" },
};

export default function JournalPage() {
  const [featured, ...rest] = JOURNAL;
  return (
    <>
      <PageHero
        crumb="Journal"
        eyebrow="Notes from the house"
        title="The Journal"
        sub="Seasonal ingredients, the life of the kitchen, chef stories and pairing notes — written by the people who cook and pour."
        img={MEDIA.chefSeason.id}
        alt={MEDIA.chefSeason.alt}
      />

      <section className="bg-cream py-16 lg:py-24">
        <div className="lux-container">
          {/* featured */}
          <Link href={`/journal/${featured.slug}`} className="group grid gap-10 lg:grid-cols-2 lg:gap-16" data-cursor="Read">
            <div className="img-frame relative aspect-[16/10] overflow-hidden">
              <Image src={px(featured.cover, 1800, 1100)} alt={featured.coverAlt} fill sizes="50vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="eyebrow !text-bronze-deep">{featured.kicker} — featured</p>
              <h1 className="display-serif mt-4 text-4xl leading-tight text-ink transition-colors duration-500 group-hover:text-bronze-deep sm:text-5xl">
                {featured.title}
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink/60">{featured.excerpt}</p>
              <p className="mt-6 text-xs uppercase tracking-[0.2em] text-ink/45">
                {featured.date} · {featured.read}
              </p>
            </div>
          </Link>

          {/* grid */}
          <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a, i) => (
              <Link key={a.slug} href={`/journal/${a.slug}`} className="group" data-cursor="Read">
                <div className="img-frame relative aspect-[16/11] overflow-hidden">
                  <Image src={px(a.cover, 1200, 850)} alt={a.coverAlt} fill sizes="(min-width:1024px) 30vw, 50vw" className="object-cover" />
                </div>
                <p className="eyebrow mt-6 !text-[9px] !text-bronze-deep">
                  {String(i + 2).padStart(2, "0")} — {a.kicker}
                </p>
                <h2 className="mt-2 font-serif text-2xl leading-snug text-ink transition-colors duration-400 group-hover:text-bronze-deep">
                  {a.title}
                </h2>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-ink/40">
                  {a.date} · {a.read}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-ivory py-14">
        <div className="lux-container flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Eyebrow>Hungry after all that reading?</Eyebrow>
          <Link href="/menu" className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink underline decoration-bronze underline-offset-8 hover:text-bronze-deep">
            Open the menu →
          </Link>
        </div>
      </section>
    </>
  );
}
