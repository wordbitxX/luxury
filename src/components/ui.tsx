"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { DIET_META, type DietaryTag } from "@/lib/data/menu";

/* ---------------- Eyebrow ---------------- */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`eyebrow text-bronze-deep ${className}`}>{children}</span>;
}

/* ---------------- Buttons ---------------- */
type BtnVariant = "solid" | "outline" | "light" | "line" | "gold";

const btnBase =
  "group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors duration-150 select-none cursor-pointer";

const btnVariants: Record<BtnVariant, string> = {
  solid: "bg-ink text-cream hover:bg-bronze-deep",
  light: "bg-cream text-ink hover:bg-ivory hover:text-bronze-deep",
  outline: "border border-ink/40 text-ink hover:border-ink hover:bg-ink hover:text-cream",
  gold: "border border-bronze-deep bg-bronze-deep text-cream hover:bg-ink",
  line: "border-b border-ink/40 text-ink px-0 py-1.5 hover:border-bronze-deep hover:text-bronze-deep",
};

export function Btn({
  children,
  variant = "solid",
  href,
  onClick,
  className = "",
  type = "button",
  ariaLabel,
}: {
  children: ReactNode;
  variant?: BtnVariant;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
}) {
  const cls = `${btnBase} ${btnVariants[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden className="transition-transform duration-150 ease-out group-hover:translate-x-1">
        →
      </span>
    </>
  );
  if (href)
    return (
      <Link href={href} className={cls} aria-label={ariaLabel} onClick={onClick}>
        {inner}
      </Link>
    );
  return (
    <button type={type} className={cls} onClick={onClick} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}

/* ---------------- Section heading ---------------- */
export function SectionHead({
  index,
  eyebrow,
  title,
  aside,
  dark = false,
  className = "",
}: {
  index?: string;
  eyebrow: string;
  title: string;
  aside?: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="max-w-3xl">
        <div className="flex items-center gap-3">
          {index && (
            <span className={`eyebrow ${dark ? "text-champagne" : "text-bronze-deep"}`}>{index}</span>
          )}
          <Eyebrow className={dark ? "!text-champagne" : ""}>{eyebrow}</Eyebrow>
          <span aria-hidden className={`h-px w-12 ${dark ? "bg-cream/25" : "bg-ink/20"}`} />
        </div>
        <h2
          className={`display-serif mt-4 text-[clamp(2.2rem,4.4vw,3.8rem)] ${
            dark ? "text-cream" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </div>
      {aside && <div className="md:max-w-xs md:pb-2">{aside}</div>}
    </div>
  );
}

/* ---------------- Dietary badge ---------------- */
export function DietBadge({ tag, className = "" }: { tag: DietaryTag; className?: string }) {
  const meta = DIET_META[tag];
  return (
    <span
      title={meta.label}
      className={`inline-flex h-5 w-5 items-center justify-center rounded-full border border-ink/25 font-serif text-[10px] leading-none ${className}`}
    >
      {tag}
    </span>
  );
}

export function DietRow({ tags, className = "" }: { tags: DietaryTag[]; className?: string }) {
  if (!tags.length) return null;
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} aria-label={`Dietary: ${tags.map((t) => DIET_META[t].label).join(", ")}`}>
      {tags.map((t) => (
        <DietBadge key={t} tag={t} />
      ))}
    </span>
  );
}

/* ---------------- Logo / wordmark ---------------- */
export function Logo({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex flex-col leading-none" aria-label="Maison Noor — home">
      <span
        className={`eyebrow mb-1 !text-[8.5px] tracking-[0.45em] ${dark ? "text-cream/70" : "text-bronze-deep"}`}
      >
        Maison
      </span>
      <span
        className={`display-serif text-[1.85rem] transition-colors duration-200 ${
          dark ? "text-cream group-hover:text-champagne" : "text-ink group-hover:text-bronze-deep"
        }`}
      >
        Noor
      </span>
      {!compact && (
        <span
          className={`mt-1 block h-px w-full transition-all duration-300 ${
            dark ? "bg-cream/30 group-hover:w-3/4" : "bg-ink/25 group-hover:w-3/4"
          }`}
        />
      )}
    </Link>
  );
}
