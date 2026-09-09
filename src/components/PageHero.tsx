import Image from "@/components/RestaurantImage";
import Link from "next/link";
import { px } from "@/lib/data/site";

export function PageHero({
  eyebrow,
  title,
  sub,
  img,
  alt,
  crumb,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  img: number;
  alt: string;
  crumb: string;
}) {
  return (
    <header className="relative flex min-h-[58vh] items-end overflow-hidden bg-ink pb-14 pt-40 sm:min-h-[62vh]">
      <Image
        src={px(img, 2200, 1300)}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/40" />
      <div className="lux-container relative z-10 w-full">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-cream/70">
          <Link href="/" className="transition-colors hover:text-cream">
            Home
          </Link>
          <span aria-hidden>—</span>
          <span className="text-champagne">{crumb}</span>
        </nav>
        <p className="eyebrow !text-champagne">{eyebrow}</p>
        <h1 className="display-serif mt-4 max-w-4xl text-[clamp(2.6rem,7vw,6rem)] text-cream">
          {title}
        </h1>
        {sub && (
          <p className="mt-5 max-w-2xl font-serif text-lg italic leading-relaxed text-cream/80 sm:text-xl">
            {sub}
          </p>
        )}
      </div>
    </header>
  );
}
