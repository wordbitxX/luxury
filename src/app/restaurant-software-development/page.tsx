import { notFound } from "next/navigation";
import { getServicePage } from "@/lib/data/seo";
import { serviceMetadata, WordbitXServicePage } from "@/components/WordbitXServicePage";

const page = getServicePage("restaurant-software-development");
export const metadata = page ? serviceMetadata(page) : {};
export default function RestaurantSoftwareDevelopmentPage() {
  if (!page) notFound();
  return <WordbitXServicePage page={page} />;
}
