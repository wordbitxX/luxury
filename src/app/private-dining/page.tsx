import type { Metadata } from "next";
import { metadata as siteMetadata } from "@/app/layout";
import Image from "@/components/RestaurantImage";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion";
import { Eyebrow, Btn } from "@/components/ui";
import { EnquiryForm } from "@/components/flows";
import { PRIVATE_DINING } from "@/lib/data/content";
import { DEMO_BASE, MEDIA, px, SITE } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Private Dining, Chef's Table & Events",
  description:
    "Private dining at Maison Noor — the Salon for 8–12 guests, the Chef's Table inside the kitchen, celebrations and corporate evenings up to a full buyout of 60.",
  alternates: { canonical: DEMO_BASE + "/private-dining" },
  openGraph: { ...siteMetadata.openGraph, url: DEMO_BASE + "/private-dining" },
};

export default function PrivateDiningPage() {
  return (
    <>
      <PageHero
        crumb="Private Dining"
        eyebrow="Salon · Chef's Table · Celebrations · Corporate"
        title="Rooms for occasions"
        sub="A proposal, a board dinner, a birthday with twelve of your favourite people — tell us the story and we will set the table for it."
        img={MEDIA.banquet.id}
        alt={MEDIA.banquet.alt}
      />

      <section className="bg-cream py-20 lg:py-28">
        <div className="lux-container space-y-24">
          {PRIVATE_DINING.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={p.id} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
                  <div data-cursor="View" className="img-frame relative aspect-[16/10]">
                    <Image src={px(p.img, 1900, 1200)} alt={p.alt} fill sizes="58vw" className="object-cover" />
                  </div>
                </div>
                <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                  <Reveal>
                    <p className="eyebrow text-bronze-deep">{p.tag}</p>
                    <h2 className="display-serif mt-4 text-4xl text-ink sm:text-5xl">{p.name}</h2>
                    <p className="mt-5 max-w-lg text-[15px] leading-[1.9] text-ink/65">{p.desc}</p>
                    <ul className="mt-6 space-y-2 border-t border-ink/10 pt-6">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm text-ink/70">
                          <span className="h-1 w-1 rounded-full bg-bronze" /> {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Btn href="/reserve" variant="outline">
                        Reserve a table
                      </Btn>
                    </div>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="plan-your-evening" className="border-t border-ink/10 bg-ivory py-20 lg:py-28">
        <div className="lux-container grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>Plan your evening</Eyebrow>
            <h2 className="display-serif mt-5 text-4xl text-ink sm:text-5xl">Begin the conversation</h2>
            <p className="mt-6 max-w-md text-[15px] leading-[1.9] text-ink/65">
              Our events team replies within one working day. Prefer to talk?{" "}
              <a href={`tel:${SITE.phoneRaw}`} className="underline decoration-bronze underline-offset-4">
                {SITE.phoneDisplay}
              </a>
            </p>
            <div className="mt-10 space-y-5 border-t border-ink/10 pt-8">
              {[
                ["Lead time", "Salon & Chef's Table: two weeks. Buyouts: one month."],
                ["Menus", "Fixed, tasting or bespoke — written with the kitchen after we know your table."],
                ["Wine", "A sommelier is assigned to every private evening."],
                ["Dietary", "The kitchen adapts each course to allergies and preferences."],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[130px_1fr] gap-4 text-sm">
                  <p className="font-medium text-ink">{k}</p>
                  <p className="text-ink/60">{v}</p>
                </div>
              ))}
            </div>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
