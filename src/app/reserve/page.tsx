import type { Metadata } from "next";
import { metadata as siteMetadata } from "@/app/layout";
import { PageHero } from "@/components/PageHero";
import { ReservationFlow } from "@/components/flows";
import { Eyebrow, Btn } from "@/components/ui";
import { DEMO_BASE, MEDIA, SITE } from "@/lib/data/site";
import { whatsappChatLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Reserve a Table — Restaurant Reservation",
  description:
    "Reserve your table at Maison Noor in six simple steps — date, guests, time, seating, details and confirmation. A premium restaurant reservation experience with the Chef's Counter and Salon.",
  alternates: { canonical: DEMO_BASE + "/reserve" },
  openGraph: { ...siteMetadata.openGraph, url: DEMO_BASE + "/reserve" },
};

export default function ReservePage() {
  return (
    <>
      <PageHero
        crumb="Reservations"
        eyebrow="Dinner from 18:00 · Tuesday — Sunday"
        title="Reserve your table"
        sub="Six small decisions, one confirmed evening. Choose your date, your hour and where you would like to sit — the room will be ready."
        img={MEDIA.tableNight.id}
        alt={MEDIA.tableNight.alt}
      />

      <section className="bg-cream py-16 lg:py-24">
        <div className="lux-container grid gap-16 lg:grid-cols-[1fr_320px]">
          <ReservationFlow />

          <aside className="lg:border-l lg:border-ink/10 lg:pl-10">
            <Eyebrow>Good to know</Eyebrow>
            <ul className="mt-6 space-y-6 text-sm leading-relaxed text-ink/65">
              <li>
                <p className="font-medium text-ink">Dress</p>
                <p className="mt-1">Smart but comfortable. The room is elegant, never stiff.</p>
              </li>
              <li>
                <p className="font-medium text-ink">The Chef's Counter</p>
                <p className="mt-1">Twelve courses, roughly three hours, ten seats. Book ahead.</p>
              </li>
              <li>
                <p className="font-medium text-ink">Allergies</p>
                <p className="mt-1">Tell us when you book — the kitchen adapts gladly.</p>
              </li>
              <li>
                <p className="font-medium text-ink">Parties above eight</p>
                <p className="mt-1">
                  Belong in the Salon.{" "}
                  <a href="/private-dining" className="underline decoration-bronze underline-offset-4 hover:text-bronze-deep">
                    Plan a private evening
                  </a>
                </p>
              </li>
              <li>
                <p className="font-medium text-ink">Contact</p>
                <p className="mt-1">
                  <a href={`tel:${SITE.phoneRaw}`} className="hover:text-bronze-deep">
                    {SITE.phoneDisplay}
                  </a>
                  <br />
                  <a
                    href={whatsappChatLink("Assalam-o-Alaikum! I would like to book a table.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-bronze-deep"
                  >
                    WhatsApp us to book
                  </a>
                  <br />
                  <a href={`mailto:${SITE.email}`} className="hover:text-bronze-deep">
                    {SITE.email}
                  </a>
                </p>
              </li>
            </ul>
            <div className="mt-8 flex gap-3">
              <Btn href="/menu" variant="line">
                Browse the menu first
              </Btn>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
