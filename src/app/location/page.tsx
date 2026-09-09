import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Btn, Eyebrow } from "@/components/ui";
import { DEMO_BASE, MEDIA, SITE, WHATSAPP_DISPLAY } from "@/lib/data/site";
import { whatsappChatLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Location, Hours & Getting Here",
  description:
    "Find Maison Noor at 7-C, The Boulevard, Gulberg III, Lahore. Opening hours, valet and parking information, and directions for dinner Tuesday to Sunday.",
  alternates: { canonical: DEMO_BASE + "/location" },
};

export default function LocationPage() {
  return (
    <>
      <PageHero
        crumb="Location"
        eyebrow="Gulberg III · Lahore"
        title="Find the courtyard"
        sub="A restored house behind a garden wall — look for the warm light and the open door."
        img={MEDIA.diningVault.id}
        alt={MEDIA.diningVault.alt}
      />

      <section className="bg-cream py-20 lg:py-28">
        <div className="lux-container grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>Address</Eyebrow>
            <address className="mt-5 font-serif text-3xl not-italic leading-snug text-ink">
              {SITE.addressLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>

            <div className="mt-12 space-y-10">
              <div>
                <Eyebrow>Hours</Eyebrow>
                <ul className="mt-5 space-y-4">
                  {SITE.hours.map((h) => (
                    <li key={h.days} className="flex items-baseline justify-between gap-6 border-b border-ink/10 pb-3 text-sm">
                      <span className="font-medium text-ink">{h.days}</span>
                      <span className="text-right text-ink/60">
                        {h.label} · {h.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Eyebrow>Contact</Eyebrow>
                <div className="mt-5 space-y-2 text-sm">
                  <p>
                    <a href={`tel:${SITE.phoneRaw}`} className="text-ink/70 hover:text-bronze-deep">
                      Call: {SITE.phoneDisplay}
                    </a>
                  </p>
                  <p>
                    <a
                      href={whatsappChatLink("Assalam-o-Alaikum! I have a question about Maison Noor.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink/70 hover:text-bronze-deep"
                    >
                      WhatsApp: {WHATSAPP_DISPLAY}
                    </a>
                  </p>
                  <p>
                    <a href={`mailto:${SITE.email}`} className="text-ink/70 hover:text-bronze-deep">
                      {SITE.email}
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <Eyebrow>Getting here & parking</Eyebrow>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink/65">
                  {SITE.notes.map((n) => (
                    <li key={n} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-bronze-deep" /> {n}
                    </li>
                  ))}
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-bronze-deep" />{" "}
                    Fifteen minutes by car from Allama Iqbal International Airport
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="img-frame relative aspect-[4/5] overflow-hidden">
              <iframe
                title="Map of Maison Noor — Gulberg III, Lahore"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&z=14&output=embed`}
                className="absolute inset-0 h-full w-full border-0 grayscale-[35%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Btn
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapQuery)}`}
                variant="solid"
              >
                Open in Google Maps
              </Btn>
              <Btn href="/reserve" variant="outline">
                Reserve a table
              </Btn>
            </div>
            <p className="mt-6 border border-ink/12 bg-ivory p-5 text-sm leading-relaxed text-ink/60">
              The courtyard door is on the Boulevard side. Your name will be expected at the door from
              17:45 — the maître d' knows who is coming before you arrive.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
