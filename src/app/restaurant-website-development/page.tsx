import { notFound } from "next/navigation";
import { getServicePage } from "@/lib/data/seo";
import { serviceMetadata, WordbitXServicePage } from "@/components/WordbitXServicePage";

const page = getServicePage("restaurant-website-development");
export const metadata = page ? serviceMetadata(page) : {};
export default function RestaurantWebsiteDevelopmentPage() {
  if (!page) notFound();
  return <WordbitXServicePage page={page} />;
}
