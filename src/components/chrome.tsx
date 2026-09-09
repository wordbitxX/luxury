"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, ArrowUpRight, ArrowRight, Phone, MessageCircle } from "lucide-react";
import { Logo, Btn } from "./ui";
import { useCart } from "./cart";
import { useModal } from "./useModal";
import { SITE, WORD_BIT_X, WHATSAPP_DISPLAY } from "@/lib/data/site";
import { whatsappChatLink } from "@/lib/whatsapp";
import { PRIMARY_NAV, DISCOVER_NAV } from "@/lib/data/navigation";

function useScrolled(threshold = 48) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold);
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [threshold]);
  return scrolled;
}

export function Navbar() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useModal(open, close, panelRef);
  useEffect(() => { setOpen(false); }, [pathname]);
  if (pathname.startsWith("/admin")) return null;
  const isLightPage = pathname.startsWith("/journal/");
  const dark = !scrolled && !isLightPage;

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${dark ? "border-white/15 bg-transparent" : "border-ink/10 bg-cream/95 backdrop-blur-md"}`}>
        <div className="lux-container flex h-[86px] items-center justify-between gap-5 lg:h-[94px]">
          <Logo dark={dark} compact />
          <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex xl:gap-9">
            {PRIMARY_NAV.map(n => <Link key={n.href} href={n.href} aria-current={pathname === n.href ? "page" : undefined} className={`border-b py-2 text-[10px] font-medium uppercase tracking-[.16em] transition-colors duration-150 ${pathname === n.href ? "border-current" : "border-transparent hover:border-current"} ${dark ? "text-cream/85 hover:text-white" : "text-ink/70 hover:text-ink"}`}>{n.label}</Link>)}
          </nav>
          <div className="flex items-center gap-3 lg:gap-5">
            <button onClick={openCart} type="button" aria-label={`Open order bag, ${count} items`} className={`relative flex h-10 w-10 items-center justify-center ${dark ? "text-cream" : "text-ink"}`}><ShoppingBag size={18} strokeWidth={1.3} />{count > 0 && <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-bronze-deep px-1 text-[8px] font-semibold text-white">{count}</span>}</button>
            <div className="hidden sm:block"><Btn href="/order" variant={dark ? "light" : "solid"} className="!px-5 !py-3 !text-[9px]">Order Online</Btn></div>
            <button onClick={() => setOpen(true)} aria-label="Open navigation" aria-expanded={open} className={`flex h-11 w-11 items-center justify-center lg:hidden ${dark ? "text-cream" : "text-ink"}`}><Menu size={23} strokeWidth={1.2} /></button>
          </div>
        </div>
      </header>
      {open && typeof document !== "undefined" && createPortal(
        <div ref={panelRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Site navigation" className="fixed inset-0 z-[100] overflow-y-auto bg-cream text-ink">
          <div className="lux-container flex items-center justify-between py-6"><Logo compact /><button onClick={close} aria-label="Close navigation" className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20"><X size={19} strokeWidth={1.3} /></button></div>
          <nav aria-label="Mobile primary" className="lux-container pt-4 pb-8">{PRIMARY_NAV.map((n, i) => <Link onClick={close} key={n.href} href={n.href} aria-label={n.label} className="flex items-center justify-between gap-4 border-b border-ink/10 py-4"><span className="font-serif text-3xl leading-tight">{n.label}</span><span className="font-mono text-[10px] text-bronze-deep">0{i + 1}</span></Link>)}</nav>
          <div className="lux-container pb-8"><p className="text-[9px] uppercase tracking-[.22em] text-bronze-deep">Inside Maison Noor</p><nav aria-label="Mobile discoveries" className="mt-3 grid grid-cols-2 gap-2">{DISCOVER_NAV.map(n => <Link key={n.href} onClick={close} href={n.href} className="py-2 text-[12px] text-ink/65">{n.label}</Link>)}</nav><Btn href="/order" onClick={close} className="mt-7 w-full">Order Online</Btn><p className="mt-5 text-[10px] text-ink/45">Digital experience by <a href={WORD_BIT_X.url} className="font-semibold text-ink">WordbitX ↗</a></p></div>
        </div>, document.body
      )}
    </>
  );
}

/* Sticky mobile bottom bar: Order · WhatsApp · Call · Menu */
export function MobileDock() {
  const scrolled = useScrolled(480);
  const { openCart } = useCart();
  const pathname = usePathname();
  if (!scrolled || pathname.startsWith("/admin")) return null;
  const item = "flex min-h-[52px] flex-1 flex-col items-center justify-center gap-1 text-[9px] font-semibold uppercase tracking-[.14em]";
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-cream/97 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-4">
        <Link href="/order" className={`${item} bg-ink text-cream`}>
          <ShoppingBag size={17} strokeWidth={1.4} /> Order
        </Link>
        <a href={whatsappChatLink()} target="_blank" rel="noopener noreferrer" className={`${item} text-[#1d7a3d]`}>
          <MessageCircle size={17} strokeWidth={1.4} /> WhatsApp
        </a>
        <a href={`tel:${SITE.phoneRaw}`} className={`${item} text-ink/75`}>
          <Phone size={17} strokeWidth={1.4} /> Call
        </a>
        <Link href="/menu" className={`${item} text-ink/75`}>
          <Menu size={17} strokeWidth={1.4} /> Menu
        </Link>
      </div>
    </nav>
  );
}

/* Floating WhatsApp button — every page except admin */
export function FloatingWhatsApp() {
  const pathname = usePathname();
  const { isOpen } = useCart();
  if (pathname.startsWith("/admin") || isOpen) return null;
  return (
    <a
      href={whatsappChatLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Order on WhatsApp — ${WHATSAPP_DISPLAY}`}
      title="Order on WhatsApp"
      className="fixed bottom-24 right-4 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-[#20913f] p-3.5 text-white shadow-[0_10px_30px_-8px_rgba(32,145,63,0.7)] transition-transform duration-150 hover:scale-105 lg:bottom-8 lg:right-8"
    >
      <MessageCircle size={22} strokeWidth={1.6} />
    </a>
  );
}

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  const dineLinks = [
    { label: "The seasonal menu", href: "/menu" }, { label: "Order online", href: "/order" },
    { label: "Reserve a table", href: "/reserve" }, { label: "The experience", href: "/experience" },
    { label: "Private dining & events", href: "/private-dining" }, { label: "Location & hours", href: "/location" },
  ];
  return (
    <footer className="site-footer border-t border-ink/10 bg-ivory text-ink">
      <div className="lux-container grid gap-x-10 gap-y-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_.85fr_1.1fr] lg:gap-12 lg:py-16">
        <div><Logo /><p className="mt-6 max-w-[250px] font-serif text-[24px] italic leading-snug text-umber">Good food.<br />No hurry.</p><p className="mt-4 max-w-[220px] text-[11px] leading-[1.8] text-ink/55">Contemporary fire cuisine, imagined in Lahore. A fictional restaurant with a real digital experience.</p></div>
        <nav aria-label="Footer dining"><p className="mb-5 text-[9px] font-semibold uppercase tracking-[.24em] text-bronze-deep">At your table</p><ul className="space-y-3">{dineLinks.map(n => <li key={n.href}><Link href={n.href} className="text-[12px] text-ink/65 hover:text-bronze-deep">{n.label}</Link></li>)}</ul></nav>
        <nav aria-label="Footer stories"><p className="mb-5 text-[9px] font-semibold uppercase tracking-[.24em] text-bronze-deep">Behind the experience</p><ul className="space-y-3">{DISCOVER_NAV.map(n => <li key={n.href}><Link href={n.href} className="text-[12px] text-ink/65 hover:text-bronze-deep">{n.label}</Link></li>)}</ul></nav>
        <div>
          <p className="mb-5 text-[9px] font-semibold uppercase tracking-[.24em] text-bronze-deep">Find the courtyard</p>
          <p className="text-[12px] leading-[1.9] text-ink/65">{SITE.addressLines[0]}<br />{SITE.addressLines[1]}</p>
          <p className="mt-4 space-y-1 text-[12px] leading-[1.9] text-ink/65">
            <a href={`tel:${SITE.phoneRaw}`} className="block hover:text-bronze-deep">Call: {SITE.phoneDisplay}</a>
            <a href={whatsappChatLink("Assalam-o-Alaikum! I have a question about Maison Noor.")} target="_blank" rel="noopener noreferrer" className="block hover:text-bronze-deep">WhatsApp: {WHATSAPP_DISPLAY}</a>
          </p>
          <p className="mt-4 text-[11px] leading-[1.9] text-ink/65">Dinner · Tue–Sun · 18:00–00:00<br />Lunch · Fri–Sun · 12:00–15:00</p>
          <Link href="/location" className="mt-4 inline-flex items-center gap-2 text-[10px] text-bronze-deep">Plan your visit <ArrowUpRight size={13} /></Link>
        </div>
      </div>
      <div className="studio-footer">
        <div className="lux-container grid items-center gap-7 py-9 md:grid-cols-[1fr_1.15fr] md:gap-12">
          <div><p className="mb-2 text-[9px] font-medium uppercase tracking-[.22em] text-[#a9b9d8]">Designed & developed by</p><a href={WORD_BIT_X.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-baseline gap-4 font-sans text-[35px] font-semibold tracking-[-.055em] text-[#d6e0ff] hover:text-white">WordbitX <ArrowUpRight size={20} strokeWidth={1.3} /></a></div>
          <div><p className="max-w-md text-[12px] leading-[1.85] text-[#b5c3de]">Custom websites, software, mobile apps and AI solutions.<br className="hidden sm:block" /> Built in Pakistan. Made for businesses everywhere.</p><p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-[#b5c3de]"><span className="inline-flex items-center gap-2"><Phone size={13} strokeWidth={1.5} /><a href={`tel:${WORD_BIT_X.phones.pk.tel}`} className="text-[#e1e8fa] hover:underline">{WORD_BIT_X.phones.pk.display}</a><span className="text-[10px] text-[#8b9cbb]">(Main)</span></span><span className="inline-flex items-center gap-2"><a href={`tel:${WORD_BIT_X.phones.us.tel}`} className="text-[#e1e8fa] hover:underline">{WORD_BIT_X.phones.us.display}</a><span className="text-[10px] text-[#8b9cbb]">(USA)</span></span></p><div className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-3"><a href={WORD_BIT_X.url} target="_blank" rel="noopener noreferrer" className="text-[12px] text-[#e1e8fa] hover:underline">{WORD_BIT_X.displayDomain}</a><a href={WORD_BIT_X.contactUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[.18em] text-[#c3cff9] hover:text-white">Start a project <ArrowRight size={13} /></a><a href={WORD_BIT_X.servicesUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#b5c3de] hover:text-white">Explore services ↗</a></div></div>
        </div>
      </div>
      <div className="lux-container flex flex-col justify-between gap-3 py-5 text-[9px] leading-relaxed text-ink/50 sm:flex-row sm:items-center">
        <p>© 2026 {SITE.legalName} · A WordbitX showcase. Demo bookings and orders are not fulfilled. Digital Experience by <a href={WORD_BIT_X.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink/70 underline-offset-2 hover:text-bronze-deep hover:underline">WordbitX</a></p>
        <Link href="/admin" className="text-ink/60 hover:text-bronze-deep">House administration ↗</Link>
      </div>
    </footer>
  );
}
