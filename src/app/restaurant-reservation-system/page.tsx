import { notFound } from "next/navigation";
import { getServicePage } from "@/lib/data/seo";
import { serviceMetadata, WordbitXServicePage } from "@/components/WordbitXServicePage";

const page = getServicePage("restaurant-reservation-system");
export const metadata = page ? serviceMetadata(page) : {};
export default function RestaurantReservationSystemPage() {
  if (!page) notFound();
  return <WordbitXServicePage page={page} />;
}
