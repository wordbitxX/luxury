import type { MetadataRoute } from "next";
import { DEMO_BASE } from "@/lib/data/site";
import { JOURNAL } from "@/lib/data/content";
import { LOCAL_PAGES } from "@/lib/data/local-seo";
import { GUIDES } from "@/lib/data/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const statics = [
    "",
    "/menu",
    "/order",
    "/reserve",
    "/story",
    "/chef",
    "/experience",
    "/private-dining",
    "/concierge",
    "/journal",
    "/guides",
    "/location",
    "/case-study",
    "/restaurant-website-development",
    "/restaurant-online-ordering",
    "/restaurant-reservation-system",
    "/restaurant-software-development",
    ...LOCAL_PAGES.map((p) => `/${p.slug}`),
  ].map((p) => ({
    url: DEMO_BASE + p,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  const articles = JOURNAL.map((j) => ({
    url: `${DEMO_BASE}/journal/${j.slug}`,
    lastModified: new Date(j.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const guides = GUIDES.map((g) => ({
    url: `${DEMO_BASE}/guides/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...statics, ...articles, ...guides];
}
