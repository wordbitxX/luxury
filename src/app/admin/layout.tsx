import type { Metadata } from "next";
import { DEMO_BASE } from "@/lib/data/site";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: { canonical: DEMO_BASE + "/admin" },
  title: "Admin · Maison Noor",
  description: "Maison Noor house dashboard",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
