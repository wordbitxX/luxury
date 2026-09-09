"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode, type CSSProperties } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Soft fade + rise when the element enters the viewport */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* Typography reveal — each line lifts out of an overflow mask */
export function Lines({
  text,
  className,
  lineClassName,
  delay = 0,
  as: Tag = "div",
}: {
  text: string;
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
}) {
  const reduce = useReducedMotion();
  const parts = text.split("\n");
  if (reduce)
    return (
      <Tag className={className}>
        {parts.map((p, i) => (
          <span key={i} className={lineClassName ?? "block"}>
            {p}
          </span>
        ))}
      </Tag>
    );
  return (
    <Tag className={className} aria-label={text}>
      {parts.map((p, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={lineClassName ?? "block will-change-transform"}
            initial={{ y: "112%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.05, ease: EASE, delay: delay + i * 0.12 }}
          >
            {p}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* Parallax wrapper — inner content drifts slowly relative to scroll */
export function Parallax({
  children,
  speed = 8,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

export type { MotionValue };
export { EASE };
