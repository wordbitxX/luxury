import type { Metadata } from "next";
import Image from "@/components/RestaurantImage";
import Link from "next/link";
import { PageHero } from "./PageHero";
import { Btn, Eyebrow } from "./ui";
import { WORD_BIT_X, DEMO_BASE, px } from "@/lib/data/site";
import { WORD_BIT_X_SERVICES, type ServicePage } from "@/lib/data/seo";

export function serviceMetadata(page: ServicePage): Metadata {
  return {
    title: page.title,
    description: page.description,
    keywords: [page.primaryTopic, ...page.keywords, "WordbitX", "wordbitx.com"],
    alternates: { canonical: `${DEMO_BASE}/${page.slug}` },
    openGraph: {
      url: `${DEMO_BASE}/${page.slug}`,
      title: `${page.title} · WordbitX`,
      description: page.description,
      images: [{ url: px(page.image, 1200, 630), width: 1200, height: 630, alt: page.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: `${page.title} · WordbitX`, description: page.description, images: [px(page.image, 1200, 630)] },
    robots: { index: true, follow: true },
  };
}

export function WordbitXServicePage({ page }: { page: ServicePage }) {
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    serviceType: page.primaryTopic,
    description: page.description,
    provider: { "@type": "Organization", name: WORD_BIT_X.name, url: WORD_BIT_X.url },
    areaServed: ["Pakistan", "United States", "United Kingdom", "United Arab Emirates", "Canada", "Australia"],
    url: `${DEMO_BASE}/${page.slug}`,
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
  };
  const related = WORD_BIT_X_SERVICES.filter((p) => p.slug !== page.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <PageHero crumb={page.title} eyebrow={page.eyebrow} title={page.heroTitle} sub={page.heroSub} img={page.image} alt={page.imageAlt} />

      <section className="bg-cream py-20 lg:py-28">
        <div className="lux-container grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Eyebrow>Why it matters</Eyebrow>
            <h2 className="display-serif mt-5 text-4xl leading-tight text-ink sm:text-5xl">Technology should carry the hospitality.</h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-[17px] leading-[1.9] text-ink/75">{page.intro}</p>
            <p className="mt-6 text-sm leading-[1.9] text-ink/60">WordbitX brings product strategy, UI/UX design, full-stack development, integrations and technical SEO into one team. The Maison Noor demo shows that approach in practice: a brand-led restaurant experience with real booking, ordering and data foundations.</p>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 lg:py-28">
        <div className="lux-container">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>What WordbitX builds</Eyebrow>
              <h2 className="display-serif mt-4 text-4xl text-ink sm:text-5xl">A platform, not a patchwork.</h2>
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-bronze-deep">{page.primaryTopic}</span>
          </div>
          <div className="mt-12 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2">
            {page.features.map((feature, i) => (
              <article key={feature.title} className="bg-cream p-7 sm:p-9">
                <span className="font-mono text-xs text-bronze-deep">0{i + 1}</span>
                <h3 className="display-serif mt-5 text-2xl text-ink">{feature.title}</h3>
                <p className="mt-3 text-sm leading-[1.85] text-ink/65">{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 lg:py-28">
        <div className="lux-container grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="img-frame relative aspect-[4/5] border border-ink/10">
              <Image src={px(page.image, 1200, 1500)} alt={page.imageAlt} fill sizes="40vw" className="object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <Eyebrow>Built for</Eyebrow>
            <h2 className="display-serif mt-4 text-4xl text-ink sm:text-5xl">The right fit for a serious food business.</h2>
            <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
              {page.audience.map((item, i) => (
                <li key={item} className="flex items-center gap-5 py-4">
                  <span className="font-mono text-xs text-bronze-deep">0{i + 1}</span>
                  <span className="font-serif text-xl text-ink">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Btn href={WORD_BIT_X.url} variant="solid">Start a project</Btn>
              <Btn href="/case-study" variant="outline">See the Maison Noor case study</Btn>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 lg:py-24">
        <div className="lux-container grid gap-10 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="display-serif mt-4 text-4xl text-ink">Straight answers.</h2>
          </div>
          <div className="lg:col-span-8">
            <div className="divide-y divide-ink/10 border-y border-ink/10">
              {page.faqs.map((faq) => (
                <details key={faq.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl text-ink marker:hidden">
                    {faq.q}<span className="text-2xl text-bronze-deep transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-sm leading-[1.85] text-ink/65">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-cream py-14">
        <div className="lux-container">
          <div className="flex items-end justify-between gap-5">
            <div>
              <Eyebrow>Explore WordbitX capabilities</Eyebrow>
              <h2 className="display-serif mt-3 text-3xl text-ink">Related services</h2>
            </div>
            <a href={WORD_BIT_X.url} target="_blank" rel="noopener noreferrer" className="hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-bronze-deep hover:text-ink sm:block">wordbitx.com ↗</a>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/${item.slug}`} className="group border border-ink/12 bg-ivory p-5 transition-colors hover:border-bronze-deep">
                <p className="eyebrow !text-[9px] text-bronze-deep">WordbitX service</p>
                <p className="mt-3 font-serif text-xl text-ink group-hover:text-bronze-deep">{item.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink/55">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
