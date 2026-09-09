import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES, getGuide } from "@/lib/data/guides";
import { Btn } from "@/components/ui";
import { DEMO_BASE, metaImage } from "@/lib/data/site";
import { whatsappChatLink } from "@/lib/whatsapp";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  const url = `${DEMO_BASE}/guides/${g.slug}`;
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: url },
    openGraph: { title: g.title, description: g.description, url, type: "article", images: [{ url: metaImage, width: 1200, height: 630, alt: g.title }] },
    twitter: { card: "summary_large_image", title: g.title, description: g.description, images: [metaImage] },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const url = `${DEMO_BASE}/guides/${guide.slug}`;
  const related = GUIDES.filter((g) => g.slug !== slug).slice(0, 3);
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    image: metaImage,
    inLanguage: "en",
    publisher: { "@type": "Organization", name: "Maison Noor (demo) · WordbitX", url: DEMO_BASE },
    mainEntityOfPage: url,
  };
  const crumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: DEMO_BASE + "/" },
      { "@type": "ListItem", position: 2, name: "Food Guides", item: DEMO_BASE + "/guides" },
      { "@type": "ListItem", position: 3, name: guide.title, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd).replace(/</g, "\\u003c") }} />
      <header className="bg-cream pb-10 pt-40">
        <div className="lux-container mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-ink/50">
            <Link href="/" className="hover:text-bronze-deep">Home</Link>
            <span aria-hidden>—</span>
            <Link href="/guides" className="hover:text-bronze-deep">Food Guides</Link>
          </nav>
          <p className="eyebrow !text-bronze-deep">Lahore food guide</p>
          <h1 className="display-serif mt-5 text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[1.04] text-ink">{guide.title}</h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-[1.9] text-ink/70">{guide.intro}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-ink/45">{guide.read}</p>
        </div>
      </header>
      <article className="bg-cream pb-16">
        <div className="lux-container mx-auto max-w-3xl">
          {guide.sections.map((s) => (
            <section key={s.h} className="mt-12">
              <h2 className="display-serif text-3xl text-ink sm:text-4xl">{s.h}</h2>
              {s.p.map((p, i) => (
                <p key={i} className="mt-5 text-[16px] leading-[2] text-ink/70">{p}</p>
              ))}
            </section>
          ))}
          <aside className="mt-12 border-l-2 border-bronze-deep bg-ivory p-6">
            <p className="eyebrow !text-[9px] text-bronze-deep">Good to know</p>
            <p className="mt-2 font-serif text-xl text-ink">{guide.faq.q}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">{guide.faq.a}</p>
          </aside>
          <div className="mt-12 flex flex-wrap gap-3 border-t border-ink/10 pt-8">
            <Btn href="/order" variant="solid">Order Online</Btn>
            <Btn href="/reserve" variant="outline">Reserve a Table</Btn>
            <a
              href={whatsappChatLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 border border-[#1d7a3d] bg-[#20913f] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-[#1a7a34]"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </article>
      <section className="border-t border-ink/10 bg-ivory py-16">
        <div className="lux-container">
          <h2 className="display-serif text-3xl text-ink">Keep reading</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/guides/${r.slug}`} className="group border border-ink/12 bg-cream p-6 hover:border-bronze-deep">
                <p className="eyebrow !text-[9px] !text-bronze-deep">Guide</p>
                <h3 className="mt-2 font-serif text-xl leading-snug group-hover:text-bronze-deep">{r.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
