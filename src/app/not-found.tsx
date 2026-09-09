import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for has left the building.",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-cream pt-24 text-center">
      <div className="lux-container py-16">
        <p className="display-serif text-8xl text-champagne sm:text-9xl">404</p>
        <h1 className="display-serif mt-6 text-4xl text-ink sm:text-5xl">This table is taken.</h1>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-ink/60">
          The page you were looking for has already left the building — but the hearth is still lit
          and there is plenty more to see.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="bg-ink px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-cream transition-colors hover:bg-bronze-deep">
            Return home
          </Link>
          <Link href="/menu" className="border border-ink/35 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink transition-colors hover:bg-ink hover:text-cream">
            View the menu
          </Link>
        </div>
      </div>
    </section>
  );
}
