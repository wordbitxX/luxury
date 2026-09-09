import Link from "next/link";
import { ArrowRight, ArrowUpRight, Globe2, Phone } from "lucide-react";
import { WORD_BIT_X } from "@/lib/data/site";
import { wordbitxWhatsAppLink } from "@/lib/whatsapp";
import { TECHNOLOGY_NAV } from "@/lib/data/navigation";

const capabilities = [
  { n: "01", title: "Discover. Choose. Order.", copy: "A digital menu with 40 curated dishes, customisation and a complete ordering journey.", href: "/menu", action: "Explore the menu" },
  { n: "02", title: "A table in a few moments.", copy: "A six-step reservation flow, guest preferences and bookings saved to the house dashboard.", href: "/reserve", action: "Try a reservation" },
  { n: "03", title: "One connected experience.", copy: "Dining recommendations, private event enquiries and a responsive interface for every guest.", href: "/case-study", action: "Read the case study" },
];

export function WordbitXShowcase() {
  return (
    <section id="built-by-wordbitx" aria-labelledby="studio-heading" className="studio-section relative overflow-hidden">
      <div aria-hidden className="absolute -right-36 top-12 h-[500px] w-[500px] rounded-full border border-white/[.06]" />
      <div aria-hidden className="absolute -right-20 top-28 h-[370px] w-[370px] rounded-full border border-white/[.05]" />
      <div className="lux-container relative py-20 lg:py-28">
        <div className="studio-rule mb-12 flex flex-wrap items-center justify-between gap-4 border-b pb-5 text-[10px] font-medium uppercase tracking-[.22em] text-[#b9c6df]">
          <span className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-[#bbc8f5]" /> The studio behind the experience</span>
          <span>Restaurant concept / Digital product showcase</span>
        </div>
        <div className="grid items-start gap-14 lg:grid-cols-[1.15fr_.85fr] lg:gap-24">
          <div>
            <h2 id="studio-heading" className="studio-title max-w-2xl">
              This experience was<br className="hidden sm:block" /> designed & developed by<br />
              <a href={WORD_BIT_X.url} target="_blank" rel="noopener noreferrer" className="studio-name mt-3 transition-colors hover:text-white">WordbitX</a>
            </h2>
            <p className="mt-7 max-w-[480px] text-sm leading-[1.95] text-[#bdc8dd]">
              Your restaurant deserves more than a website. WordbitX brings brand design, direct ordering,
              reservations and custom software together in one considered digital experience.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-5">
              <a href={WORD_BIT_X.contactUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-7 bg-[#d1daf7] px-6 py-4 text-[10px] font-semibold uppercase tracking-[.2em] text-[#142136] transition-colors hover:bg-white">
                Build yours with WordbitX <ArrowUpRight size={15} strokeWidth={1.5} />
              </a>
              <a href={WORD_BIT_X.url} target="_blank" rel="noopener noreferrer" className="studio-link inline-flex items-center gap-2 border-b border-[#d3deff]/35 pb-1 text-xs text-[#d3dcf1]">
                {WORD_BIT_X.displayDomain} <ArrowUpRight size={13} />
              </a>
            </div>
            <div className="mt-9 flex items-center gap-2.5 text-[11px] text-[#9eafca]">
              <Globe2 size={15} strokeWidth={1.3} /> Based in Pakistan. Building for businesses worldwide.
            </div>
            <address className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] not-italic text-[#bdc9e1]">
              <span className="inline-flex items-center gap-2">
                <Phone size={14} strokeWidth={1.4} className="text-[#c3cff9]" />
                <a href={`tel:${WORD_BIT_X.phones.pk.tel}`} className="font-medium text-[#eef1fb] hover:underline">{WORD_BIT_X.phones.pk.display}</a>
                <span className="text-[10px] text-[#8b9cbb]">(Main)</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <a href={`tel:${WORD_BIT_X.phones.us.tel}`} className="font-medium text-[#eef1fb] hover:underline">{WORD_BIT_X.phones.us.display}</a>
                <span className="text-[10px] text-[#8b9cbb]">(USA)</span>
              </span>
              <a href={wordbitxWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="studio-link border-b border-[#d3deff]/35 pb-0.5 text-[#d3dcf1]">
                WhatsApp WordbitX <ArrowUpRight size={12} className="inline" />
              </a>
            </address>
          </div>
          <div className="lg:pt-4">
            <p className="mb-3 text-[9px] font-semibold uppercase tracking-[.25em] text-[#aab8d4]">Not just a concept. Explore the experience.</p>
            {capabilities.map((c) => (
              <Link key={c.n} href={c.href} className="group studio-rule grid grid-cols-[24px_1fr] gap-5 border-b py-6">
                <span className="pt-1 font-mono text-[10px] text-[#8b9cbb]">{c.n}</span>
                <div>
                  <h3 className="font-serif text-[27px] leading-tight text-[#eef1fb]">{c.title}</h3>
                  <p className="mt-2 max-w-sm text-[12px] leading-[1.85] text-[#aebcd3]">{c.copy}</p>
                  <span className="mt-3 inline-flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[.18em] text-[#c3cff9]">{c.action} <ArrowRight size={13} className="transition-transform duration-150 group-hover:translate-x-1" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="studio-rule mt-14 grid gap-7 border-t pt-7 sm:grid-cols-[1fr_1.2fr] lg:mt-20">
          <p className="max-w-md text-[11px] leading-[1.85] text-[#91a3c1]">
            Maison Noor is a fictional restaurant created for this WordbitX demo. No real tables, meals
            or payments are fulfilled. Design, development and technology: WordbitX.
          </p>
          <nav aria-label="Restaurant technology services" className="flex flex-wrap content-start justify-start gap-x-6 gap-y-3 sm:justify-end">
            {TECHNOLOGY_NAV.map((item) => <Link key={item.href} href={item.href} className="studio-link text-[10px] text-[#bdc9e1]">{item.label} ↗</Link>)}
          </nav>
        </div>
      </div>
    </section>
  );
}
