import type { MetadataRoute } from "next";
import { DEMO_BASE } from "@/lib/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${DEMO_BASE}/sitemap.xml`,
    host: DEMO_BASE,
  };
}
