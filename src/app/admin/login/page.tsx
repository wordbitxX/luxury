import type { Metadata } from "next";
import { DEMO_BASE } from "@/lib/data/site";
import Link from "next/link";
import LoginForm from "./LoginForm";
import { Logo } from "@/components/ui";
import { getSession } from "@/lib/admin/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  alternates: { canonical: DEMO_BASE + "/admin/login" },
  title: "Admin · Sign in",
  description: "Maison Noor admin login",
  robots: { index: false, follow: false },
};

export default async function AdminLogin() {
  const s = await getSession();
  if (s) redirect("/admin");
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-10 inline-block">
          <Logo />
        </div>
        <p className="eyebrow text-bronze-deep">House Administration</p>
        <h1 className="display-serif mt-4 text-4xl text-ink">Sign in</h1>
        <p className="mt-3 text-sm text-ink/60">
          Internal dashboard — reservations, orders, enquiries and the menu. Demo password:{" "}
          <span className="font-mono text-bronze-deep">admin</span>
        </p>
        <LoginForm />
        <Link
          href="/"
          className="mt-8 inline-block text-[11px] uppercase tracking-[0.22em] text-ink/50 hover:text-ink"
        >
          ← Back to the restaurant
        </Link>
      </div>
    </main>
  );
}
