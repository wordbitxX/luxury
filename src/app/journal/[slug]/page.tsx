import type { Metadata } from "next";
import Image from "@/components/RestaurantImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JOURNAL, getArticle } from "@/lib/data/content";
import { DEMO_BASE, px } from "@/lib/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return JOURNAL.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: `${DEMO_BASE}/journal/${a.slug}` },
    openGraph: {
      title: `${a.title} — Maison Noor Journal`,
      description: a.excerpt,
      type: "article",
      images: [{ url: px(a.cover, 1200, 630), width: 1200, height: 630, alt: a.coverAlt }],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = JOURNAL.filter((j) => j.slug !== slug).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: px(article.cover, 1200, 630),
    datePublished: article.date,
    inLanguage: "en",
    publisher: { "@type": "Organization", name: "Maison Noor (demo) · WordbitX", url: DEMO_BASE },
    mainEntityOfPage: `${DEMO_BASE}/journal/${article.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="bg-cream pb-10 pt-40">
        <div className="lux-container mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-ink/50">
            <Link href="/" className="hover:text-bronze-deep">Home</Link>
            <span aria-hidden>—</span>
            <Link href="/journal" className="hover:text-bronze-deep">Journal</Link>
            <span aria-hidden>—</span>
            <span className="text-bronze-deep">{article.kicker}</span>
          </nav>
          <p className="eyebrow !text-bronze-deep">{article.kicker}</p>
          <h1 className="display-serif mt-5 text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[1.04] text-ink">
            {article.title}
          </h1>
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-ink/45">
            {article.date} · {article.read}
          </p>
        </div>
      </header>

      <figure className="relative mx-auto aspect-[21/10] max-w-5xl overflow-hidden">
        <Image src={px(article.cover, 2200, 1100)} alt={article.coverAlt} fill priority sizes="100vw" className="object-cover" />
      </figure>

      <article className="bg-cream py-16 lg:py-24">
        <div className="lux-container mx-auto max-w-3xl">
          {article.body.map((b, i) => {
            if (b.type === "h2")
              return (
                <h2 key={i} className="display-serif mt-14 text-3xl leading-tight text-ink sm:text-4xl">
                  {b.text}
                </h2>
              );
            if (b.type === "quote")
              return (
                <blockquote key={i} className="my-10 border-l-2 border-bronze pl-7">
                  <p className="display-serif text-2xl italic leading-snug text-ink sm:text-3xl">
                    “{b.text}”
                  </p>
                </blockquote>
              );
            return (
              <p key={i} className="mt-7 text-[16px] leading-[2] text-ink/70">
                {b.text}
              </p>
            );
          })}

          <div className="mt-16 flex items-center gap-6 border-t border-ink/10 pt-8 text-sm text-ink/60">
            <span>Share —</span>
            {["Journal", "Menu", "Reserve"].map((l) => (
              <Link
                key={l}
                href={l === "Journal" ? "/journal" : l === "Menu" ? "/menu" : "/reserve"}
                className="text-[11px] font-semibold uppercase tracking-[0.2em] hover:text-bronze-deep"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </article>

      <section className="border-t border-ink/10 bg-ivory py-16">
        <div className="lux-container">
          <h2 className="display-serif text-3xl text-ink">Continue reading</h2>
          <div className="mt-8 grid gap-10 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/journal/${r.slug}`} className="group" data-cursor="Read">
                <div className="img-frame relative aspect-[16/11] overflow-hidden">
                  <Image src={px(r.cover, 1000, 700)} alt={r.coverAlt} fill sizes="30vw" className="object-cover" />
                </div>
                <p className="eyebrow mt-4 !text-[9px] !text-bronze-deep">{r.kicker}</p>
                <h3 className="mt-1.5 font-serif text-xl leading-snug text-ink group-hover:text-bronze-deep">
                  {r.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
