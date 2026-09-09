import type { Metadata } from "next";
import { Hero, Intro, SignatureSection, MenuPreview } from "@/components/home-a";
import { EveningSection, PrivateSection } from "@/components/home-b";
import { ConciergeTeaser, LocationSection } from "@/components/home-c";
import { HospitalityStrip } from "@/components/home-d";
import { FoodGallery } from "@/components/FoodGallery";
import { Reviews, ChefRecommendations } from "@/components/Showcase";
import { WordbitXShowcase } from "@/components/WordbitXShowcase";
import { DEMO_BASE, metaImage, SITE, WORD_BIT_X } from "@/lib/data/site";

const title = "Maison Noor — A Restaurant Digital Experience by WordbitX";
const description = "Explore Maison Noor, a fictional fine-dining showcase by WordbitX. Discover 40 curated dishes, direct ordering, table reservations and a connected hospitality experience.";

export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: DEMO_BASE + "/" },
  openGraph: { title, description, url: DEMO_BASE + "/", images: [{ url: metaImage, width: 1200, height: 630, alt: "Maison Noor restaurant website showcase by WordbitX" }] },
  twitter: { card: "summary_large_image", title, description, images: [metaImage] },
};

const showcaseData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": WORD_BIT_X.url + "#organization",
      name: WORD_BIT_X.name,
      url: WORD_BIT_X.url,
      contactPoint: [
        { "@type": "ContactPoint", telephone: WORD_BIT_X.phones.pk.tel, contactType: "sales", areaServed: "PK", availableLanguage: ["en", "ur"] },
        { "@type": "ContactPoint", telephone: WORD_BIT_X.phones.us.tel, contactType: "sales", areaServed: "US", availableLanguage: "en" },
      ],
    },
    { "@type": "WebSite", "@id": DEMO_BASE + "/#website", name: "Maison Noor · WordbitX Showcase", url: DEMO_BASE + "/", publisher: { "@id": WORD_BIT_X.url + "#organization" } },
    {
      "@type": ["Restaurant", "LocalBusiness"],
      "@id": DEMO_BASE + "/#restaurant",
      name: SITE.legalName,
      description: "Fictional BBQ, desi, continental and dessert restaurant concept in Lahore, created for a WordbitX software demonstration. Not an operating business.",
      image: new URL(metaImage, DEMO_BASE).toString(),
      url: DEMO_BASE + "/",
      telephone: SITE.phoneDisplay,
      email: SITE.email,
      priceRange: "PKR 550 - PKR 6,950",
      servesCuisine: ["Pakistani", "BBQ", "Chinese", "Continental", "Fast food", "Desserts"],
      acceptsReservations: DEMO_BASE + "/reserve",
      hasMenu: DEMO_BASE + "/menu",
      address: { "@type": "PostalAddress", streetAddress: SITE.addressLines[0], addressLocality: "Gulberg III, Lahore", postalCode: "54660", addressCountry: "PK" },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "18:00", closes: "00:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday", "Saturday", "Sunday"], opens: "12:00", closes: "15:00" },
      ],
    },
    {
      "@type": "Service",
      name: "Restaurant online ordering demo",
      serviceType: "Online food ordering",
      provider: { "@id": WORD_BIT_X.url + "#organization" },
      areaServed: "Lahore, Pakistan",
      url: DEMO_BASE + "/order",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: DEMO_BASE + "/" },
        { "@type": "ListItem", position: 2, name: "Menu", item: DEMO_BASE + "/menu" },
        { "@type": "ListItem", position: 3, name: "Reserve", item: DEMO_BASE + "/reserve" },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(showcaseData).replace(/</g, "\\u003c") }} />
      <Hero />
      <HospitalityStrip />
      <Intro />
      <ChefRecommendations />
      <SignatureSection />
      <MenuPreview />
      <FoodGallery />
      <Reviews />
      <EveningSection />
      <PrivateSection />
      <ConciergeTeaser />
      <LocationSection />
      <WordbitXShowcase />
    </>
  );
}
