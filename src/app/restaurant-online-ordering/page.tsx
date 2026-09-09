import { notFound } from "next/navigation";
import { getServicePage } from "@/lib/data/seo";
import { serviceMetadata, WordbitXServicePage } from "@/components/WordbitXServicePage";

const page = getServicePage("restaurant-online-ordering");
export const metadata = page ? serviceMetadata(page) : {};
export default function RestaurantOnlineOrderingPage() {
  if (!page) notFound();
  return <WordbitXServicePage page={page} />;
}
