import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart";
import { Navbar, Footer, MobileDock, FloatingWhatsApp } from "@/components/chrome";
import { metaImage, DEMO_BASE, SITE } from "@/lib/data/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans-luxury",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(DEMO_BASE),
  title: {
    default: "Maison Noor — Contemporary Fire Cuisine, Lahore",
    template: "%s · Maison Noor",
  },
  description:
    "Maison Noor is a contemporary fire-cuisine restaurant in Lahore — an evening shaped by ingredients, fire and time. Explore the menu, reserve a table or order online. Digital experience by WordbitX.",
  keywords: [
    "restaurant in Lahore",
    "best restaurants in Lahore",
    "family restaurant Lahore",
    "fine dining Lahore",
    "rooftop restaurant Lahore",
    "Pakistani restaurant Lahore",
    "BBQ restaurant Lahore",
    "restaurant in DHA Lahore",
    "restaurant in Gulberg Lahore",
    "restaurant website development",
    "restaurant online ordering system",
    "restaurant reservation website",
    "restaurant management software",
    "WordbitX",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "Maison Noor — Contemporary Fire Cuisine, Lahore",
    description:
      "An evening shaped by ingredients, fire and time. A premium restaurant digital experience designed and developed by WordbitX.",
    url: DEMO_BASE + "/",
    images: [{ url: metaImage, width: 1200, height: 630, alt: "Maison Noor — candlelit dining room" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maison Noor — Contemporary Fire Cuisine, Lahore",
    description:
      "An evening shaped by ingredients, fire and time. A premium restaurant digital experience designed and developed by WordbitX.",
    images: [metaImage],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: DEMO_BASE + "/" },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="bg-cream font-sans text-ink selection:bg-bronze-deep selection:text-cream">
        <CartProvider>
          <a
            href="#main"
            className="fixed left-4 top-4 z-[130] -translate-y-24 bg-ink px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream transition-transform focus:translate-y-0"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <MobileDock />
          <FloatingWhatsApp />
        </CartProvider>
      </body>
    </html>
  );
}
