import Image from "@/components/RestaurantImage";
import Link from "next/link";
import { PageHero } from "./PageHero";
import { Btn } from "./ui";
import { getDish } from "@/lib/data/menu";
import { formatPrice, px, DEMO_BASE, MEDIA } from "@/lib/data/site";
import { whatsappChatLink } from "@/lib/whatsapp";
import { LOCAL_PAGES, type LocalPage } from "@/lib/data/local-seo";

export function LocalLanding({ page }: { page: LocalPage }) {
  const dishes = page.dishes.map((id) => getDish(id)!).filter(Boolean);
  const siblings = LOCAL_PAGES.filter((p) => p.slug !== page.slug).slice(0, 4);
  const url = `${DEMO_BASE}/${page.slug}`;
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const crumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: DEMO_BASE + "/" },
      { "@type": "ListItem", position: 2, name: page.h1a + " " + page.h1b, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd).replace(/</g, "\\u003c") }} />
      <PageHero
        crumb={page.eyebrow}
        eyebrow={page.eyebrow}
        title={`${page.h1a} ${page.h1b}`}
        sub={page.intro[0]}
        img={MEDIA.tableSetting.id}
        alt="Maison Noor dining room set for dinner in Lahore"
      />

      <article className="bg-cream py-16 lg:py-24">
        <div className="lux-container grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
          <div className="min-w-0">
            {page.intro.slice(1).map((p, i) => (
              <p key={i} className="mb-6 max-w-2xl text-[15px] leading-[1.95] text-ink/70">{p}</p>
            ))}
            <p className="max-w-2xl border-l-2 border-bronze-deep bg-ivory p-5 text-sm leading-[1.9] text-ink/70">
              {page.areaNote}
            </p>

            <h2 className="display-serif mt-14 text-3xl sm:text-4xl">Dishes worth the trip</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {dishes.map((d) => (
                <li key={d.id} className="group border border-ink/12 bg-ivory">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={px(d.img, 800, 500, d.imgExt)}
                      alt={d.name}
                      fill
                      sizes="(min-width:1024px) 26vw, (min-width:640px) 44vw, 90vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-serif text-xl leading-tight">{d.name}</p>
                    <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-ink/60">{d.desc}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-serif text-lg text-bronze-deep">{formatPrice(d.price)}</span>
                      <Link href="/order" className="bg-ink px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream hover:bg-bronze-deep">
                        Order Now
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <h2 className="display-serif mt-14 text-3xl sm:text-4xl">Questions, answered</h2>
            <div className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
              {page.faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl marker:hidden">
                    {f.q}
                    <span aria-hidden className="shrink-0 text-2xl text-bronze-deep transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-sm leading-[1.85] text-ink/65">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-ink/12 bg-ivory p-7">
              <p className="eyebrow text-bronze-deep">Hungry now?</p>
              <div className="mt-5 flex flex-col gap-3">
                <Btn href="/order" variant="solid" className="w-full">Order Online</Btn>
                <Btn href="/reserve" variant="outline" className="w-full">Reserve a Table</Btn>
                <a
                  href={whatsappChatLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 border border-[#1d7a3d] bg-[#20913f] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-[#1a7a34]"
                >
                  WhatsApp Us
                </a>
              </div>
              <p className="mt-5 text-[11px] leading-relaxed text-ink/50">
                Demo concept by WordbitX — no real orders are fulfilled.
              </p>
            </div>
            <nav aria-label="More Lahore guides" className="mt-6 border border-ink/12 bg-cream p-7">
              <p className="eyebrow text-bronze-deep">Keep exploring</p>
              <ul className="mt-4 space-y-3">
                {siblings.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/${s.slug}`} className="text-sm text-ink/70 underline decoration-bronze/40 underline-offset-4 hover:text-bronze-deep">
                      {s.title.split("|")[0].split("—")[0].trim()}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </article>
    </>
  );
}
