import type { Metadata } from "next";
import Image from "@/components/RestaurantImage";
import { PageHero } from "@/components/PageHero";
import { Reveal, Parallax } from "@/components/motion";
import { Eyebrow, Btn } from "@/components/ui";
import { STORY_CHAPTERS } from "@/lib/data/content";
import { DEMO_BASE, MEDIA, px, SITE } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Our Story — The Culinary Craft",
  description:
    "The story of Maison Noor — how an ingredient becomes an experience. Ingredient, preparation, fire, plate and experience: the five movements of a hearth kitchen in Lahore.",
  alternates: { canonical: DEMO_BASE + "/story" },
};

export default function StoryPage() {
  return (
    <>
      <PageHero
        crumb="Our Story"
        eyebrow="Est. MMXXII · Lahore"
        title="The story of the house"
        sub="A courtyard, an open hearth and a question: what would a restaurant feel like if every detail was treated with the same care as the plate?"
        img={MEDIA.diningArt.id}
        alt={MEDIA.diningArt.alt}
      />

      {/* manifesto */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="lux-container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>The idea</Eyebrow>
            <Reveal>
              <p className="display-serif mt-6 text-[clamp(1.9rem,3.6vw,3.1rem)] leading-[1.15] text-ink">
                {SITE.story}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-2xl text-[15px] leading-[1.95] text-ink/65">
                The name Noor means light in Arabic and Urdu — the first ingredient of any meal. The
                room is lit to fall on faces, not ceilings. The hearth is the second sun. Everything
                else — the menu, the wine, the pace of service — is arranged around those two lights.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="img-frame relative aspect-[4/5]">
                <Image
                  src={px(MEDIA.womanDining.id, 1100, 1400)}
                  alt={MEDIA.womanDining.alt}
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* five movements */}
      <section className="border-t border-ink/10 bg-ivory py-24 lg:py-32">
        <div className="lux-container">
          <div className="flex items-center gap-4">
            <Eyebrow>The five movements</Eyebrow>
            <span className="h-px w-14 bg-ink/20" />
          </div>
          <h2 className="display-serif mt-6 max-w-3xl text-[clamp(2.2rem,4.6vw,4rem)] text-ink">
            Ingredient to experience
          </h2>
        </div>

        <div className="lux-container mt-16 space-y-20 lg:space-y-28">
          {STORY_CHAPTERS.map((ch, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={ch.step} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <div className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}>
                  <Parallax speed={5}>
                    <div data-cursor="View" className="img-frame relative aspect-[16/11]">
                      <Image src={px(ch.img, 1700, 1200)} alt={ch.alt} fill sizes="50vw" className="object-cover" />
                    </div>
                  </Parallax>
                </div>
                <div className={`lg:col-span-6 ${flip ? "lg:order-1" : ""}`}>
                  <Reveal>
                    <p className="display-serif text-[5.5rem] leading-none text-champagne">{ch.step}</p>
                    <h3 className="display-serif mt-2 text-4xl text-ink sm:text-5xl">{ch.title}</h3>
                    <p className="mt-5 font-serif text-2xl italic leading-relaxed text-ink/70">{ch.lead}</p>
                    <p className="mt-5 max-w-xl text-[15px] leading-[1.95] text-ink/60">{ch.body}</p>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lux-container mt-20 flex flex-col items-start justify-between gap-6 rounded-sm border border-ink/12 bg-cream p-8 sm:flex-row sm:items-center sm:p-10">
          <p className="display-serif text-3xl text-ink">Come and taste the story</p>
          <div className="flex flex-wrap gap-3">
            <Btn href="/reserve" variant="solid">
              Reserve a table
            </Btn>
            <Btn href="/chef" variant="outline">
              Meet the chef
            </Btn>
          </div>
        </div>
      </section>
    </>
  );
}
