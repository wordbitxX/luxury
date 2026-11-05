import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/components/RestaurantImage";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion";
import { Btn, Eyebrow } from "@/components/ui";
import { CASE_STUDY } from "@/lib/data/content";
import { DEMO_BASE, MEDIA, px, WORD_BIT_X } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Case Study — Premium Restaurant Website & Digital Ordering Experience",
  description:
    "A WordbitX case study: designing and developing Maison Noor — a premium restaurant digital experience combining storytelling, interactive menus, online ordering, reservations and an AI concierge.",
  alternates: { canonical: DEMO_BASE + "/case-study" },
  openGraph: {
      url: DEMO_BASE + "/case-study",
    title: "WordbitX Case Study — Luxury Restaurant Digital Experience",
    description:
      "How WordbitX designed and developed a complete premium restaurant platform: editorial design, interactive menu, ordering, reservations and AI concierge.",
    images: [{ url: px(MEDIA.heroRoom.id, 1200, 630), width: 1200, height: 630, alt: "Maison Noor dining room at night" }],
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: DEMO_BASE + "/" },
    { "@type": "ListItem", position: 2, name: "Case Study", item: DEMO_BASE + "/case-study" },
  ],
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: WORD_BIT_X.name,
  url: WORD_BIT_X.url,
  description:
    "WordbitX designs and develops custom restaurant websites, online ordering experiences, reservation systems and AI-powered hospitality software.",
  sameAs: [WORD_BIT_X.url],
  areaServed: ["PK", "US", "GB", "AE", "CA", "AU"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: WORD_BIT_X.phones.pk.tel,
      contactType: "sales",
      areaServed: "PK",
      availableLanguage: ["en", "ur"],
    },
    {
      "@type": "ContactPoint",
      telephone: WORD_BIT_X.phones.us.tel,
      contactType: "sales",
      areaServed: "US",
      availableLanguage: "en",
    },
  ],
};

export default function CaseStudyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />

      <PageHero
        crumb="Case Study"
        eyebrow="WordbitX · Restaurant technology showcase"
        title="A restaurant, reimagined as software"
        sub={CASE_STUDY.summary}
        img={MEDIA.diningArt.id}
        alt={MEDIA.diningArt.alt}
      />

      <section className="bg-cream py-20 lg:py-28">
        <div className="lux-container">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>The project</Eyebrow>
              <ul className="mt-6 space-y-4 text-sm">
                {[
                  ["Brand", "Maison Noor — fictional premium restaurant"],
                  ["Scope", "Full digital dining platform"],
                  ["Studio", WORD_BIT_X.name],
                  ["Markets", "Pakistan, USA, UK, UAE, Canada, Australia"],
                  ["Status", "Demo — architecture-ready for production"],
                ].map(([k, v]) => (
                  <li key={k} className="flex gap-4 border-b border-ink/10 pb-3">
                    <span className="w-20 shrink-0 font-medium text-ink">{k}</span>
                    <span className="text-ink/60">{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-8">
              <Eyebrow>What was built</Eyebrow>
              <div className="mt-7 grid gap-6 sm:grid-cols-2">
                {[
                  ["Editorial homepage", "A light-luxury storytelling experience — hero, signature dishes, culinary craft, chef, the evening, private dining, gallery and journal."],
                  ["Interactive menu & ordering", "Twelve categories, dietary filters, search, dish detail sheets and a complete pickup/delivery ordering flow in a side-drawer cart."],
                  ["Six-step reservations", "Date, guests, time, seating, details and confirmation — with a beautiful success state and booking-ready API."],
                  ["AI concierge", "A conversational assistant for recommendations, allergens, pairings and reservations — architected to accept a live AI model later."],
                  ["Private dining enquiries", "Salon, Chef's Table, celebrations and corporate evenings, each with a structured enquiry flow."],
                  ["Admin-ready data", "PostgreSQL schema for reservations, orders and enquiries; structured menu and journal data ready for a management dashboard."],
                ].map(([t, d]) => (
                  <div key={t} className="border border-ink/12 bg-ivory p-6">
                    <p className="font-serif text-xl text-ink">{t}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink/60">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* chapters */}
      <section className="bg-ivory py-20 lg:py-28">
        <div className="lux-container">
          <Eyebrow>From challenge to outcome</Eyebrow>
          <div className="mt-10 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {CASE_STUDY.chapters.map((c) => (
              <article key={c.n} className="group bg-cream p-8 transition-colors duration-500 hover:bg-ivory">
                <p className="display-serif text-5xl text-champagne">{c.n}</p>
                <h3 className="display-serif mt-4 text-3xl text-ink">{c.title}</h3>
                <p className="mt-4 text-sm leading-[1.9] text-ink/65">{c.body}</p>
              </article>
            ))}
          </div>

          {/* technology strip */}
          <div className="mt-16 border border-ink/12 bg-cream p-8 sm:p-10">
            <Eyebrow>Technology</Eyebrow>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Next.js (App Router)", "React 19", "TypeScript", "PostgreSQL", "Drizzle ORM", "Motion", "Tailwind CSS v4", "Structured data (JSON-LD)", "Sitemap & robots", "WCAG-minded", "Core Web Vitals aware"].map((t) => (
                <span key={t} className="rounded-full border border-ink/15 px-4 py-1.5 text-xs text-ink/70">
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-ink/55">
              The demo is engineered for production handover: menu, reservations, orders and enquiries
              run on structured models and API endpoints, so a live booking engine, payment gateway,
              admin dashboard and AI provider can be connected without redesign.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="lux-container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Common questions</Eyebrow>
            <h2 className="display-serif mt-5 text-4xl text-ink">Straight answers</h2>
          </div>
          <div className="lg:col-span-8">
            <div className="divide-y divide-ink/10 border-y border-ink/10">
              {CASE_STUDY.faqs.map((f) => (
                <details key={f.q} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-2xl text-ink marker:hidden">
                    {f.q}
                    <span aria-hidden className="shrink-0 transition-transform duration-500 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-[15px] leading-[1.9] text-ink/65">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink py-24 text-cream lg:py-32">
        <div className="absolute inset-0 opacity-25">
          <Image src={px(MEDIA.heroRoom.id, 2200, 1000)} alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 to-ink/90" />
        <div className="lux-container relative z-10 text-center">
          <Reveal>
            <p className="eyebrow !text-champagne">WordbitX</p>
            <h2 className="display-serif mx-auto mt-6 max-w-3xl text-[clamp(2.3rem,5.4vw,4.6rem)] leading-[1.05]">
              Need a digital experience like this?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-[1.9] text-cream/75">
              WordbitX designs and develops custom websites, software, mobile apps and AI-powered
              digital products for restaurants and businesses in Pakistan and worldwide.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Btn href={WORD_BIT_X.url} variant="light">
                Start a project
              </Btn>
              <Btn
                href={WORD_BIT_X.url}
                variant="outline"
                className="!border-cream/40 !text-cream hover:!bg-cream hover:!text-ink"
              >
                Explore WordbitX
              </Btn>
            </div>
            <p className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-cream/75">
              <span>
                Prefer to talk?{" "}
                <a href={`tel:${WORD_BIT_X.phones.pk.tel}`} className="font-semibold text-cream hover:underline">
                  {WORD_BIT_X.phones.pk.display}
                </a>{" "}
                <span className="text-cream/50">(Main)</span>
              </span>
              <span>
                <a href={`tel:${WORD_BIT_X.phones.us.tel}`} className="font-semibold text-cream hover:underline">
                  {WORD_BIT_X.phones.us.display}
                </a>{" "}
                <span className="text-cream/50">(USA)</span>
              </span>
            </p>
            <p className="mt-10 text-xs uppercase tracking-[0.24em] text-cream/50">
              Maison Noor is a fictional showcase brand · Built as a portfolio demo by{" "}
              <Link href={WORD_BIT_X.url} className="text-champagne">
                WordbitX
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
