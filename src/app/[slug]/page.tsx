import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCAL_PAGES, getLocalPage } from "@/lib/data/local-seo";
import { LocalLanding } from "@/components/LocalLanding";
import { DEMO_BASE, metaImage } from "@/lib/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCAL_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getLocalPage(slug);
  if (!page) return {};
  const url = `${DEMO_BASE}/${page.slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      images: [{ url: metaImage, width: 1200, height: 630, alt: page.eyebrow }],
    },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: [metaImage] },
  };
}

export default async function LocalSeoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getLocalPage(slug);
  if (!page) notFound();
  return <LocalLanding page={page} />;
}
