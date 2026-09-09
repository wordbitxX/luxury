import type { Metadata } from "next";
import Image from "@/components/RestaurantImage";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion";
import { Eyebrow, Btn } from "@/components/ui";
import { CHEF_CONTENT } from "@/lib/data/content";
import { CHEF, DEMO_BASE, MEDIA, px } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Chef Elena Marchetti — Executive Chef",
  description:
    "Meet Chef Elena Marchetti, founder and executive chef of Maison Noor — her biography, cooking philosophy and the milestones behind Lahore's hearth kitchen.",
  alternates: { canonical: DEMO_BASE + "/chef" },
};

export default function ChefPage() {
  return (
    <>
      <PageHero
        crumb="The Chef"
        eyebrow="Founder & Executive Chef"
        title="Elena Marchetti"
        sub="An archaeologist who learned to cook — and built a hearth kitchen around everything the dig taught her about patience."
        img={MEDIA.chefFocus.id}
        alt={MEDIA.chefFocus.alt}
      />

      <section className="bg-cream py-24 lg:py-32">
        <div className="lux-container grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -left-5 -top-5 h-full w-full border border-bronze/40" aria-hidden />
              <div data-cursor="View" className="img-frame relative aspect-[3/4]">
                <Image src={px(CHEF.portraitMain, 1200, 1600)} alt={MEDIA.chefPortrait.alt} fill sizes="40vw" className="object-cover" />
              </div>
            </div>
            <div className="mt-8 flex items-center gap-6">
              <span className="h-px flex-1 bg-ink/10" />
              <span className="font-serif text-xl italic text-ink/60">The pass, most evenings</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Eyebrow>Biography</Eyebrow>
            <div className="mt-7 space-y-6">
              {CHEF_CONTENT.bio.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p className="max-w-2xl text-[15.5px] leading-[1.95] text-ink/70">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <blockquote className="mt-12 border-l-2 border-bronze pl-7">
                <p className="display-serif text-3xl leading-snug text-ink sm:text-4xl">
                  “{CHEF_CONTENT.quote}”
                </p>
                <cite className="eyebrow mt-4 block not-italic !text-bronze-deep">
                  — {CHEF.name}
                </cite>
              </blockquote>
            </Reveal>

            <div className="mt-12">
              <Eyebrow>Philosophy</Eyebrow>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {CHEF_CONTENT.philosophy.map((ph) => (
                  <div key={ph.title} className="border border-ink/12 bg-ivory p-6">
                    <p className="font-serif text-2xl text-ink">{ph.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink/60">{ph.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* milestones */}
      <section className="bg-ivory py-24">
        <div className="lux-container">
          <Eyebrow>Milestones</Eyebrow>
          <h2 className="display-serif mt-5 text-4xl text-ink sm:text-5xl">The road to the hearth</h2>
          <ol className="mt-12 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {CHEF_CONTENT.milestones.map((m) => (
              <li key={m.year} className="group bg-cream p-7 transition-colors duration-500 hover:bg-ivory">
                <p className="display-serif text-4xl text-bronze-deep">{m.year}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{m.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-16 grid items-center gap-8 rounded-sm bg-ink p-8 text-cream sm:p-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow !text-champagne">Dine at the pass</p>
              <h3 className="display-serif mt-4 text-4xl leading-tight">The Chef's Counter</h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/70">
                Ten seats, twelve courses, one table. On weekends, Elena cooks the counter herself —
                and she will almost certainly ask what you thought of the sauce.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Btn href="/reserve" variant="light">
                Reserve the counter
              </Btn>
              <Btn href="/private-dining" variant="outline" className="!border-cream/40 !text-cream hover:!bg-cream hover:!text-ink">
                The Chef's Table
              </Btn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
