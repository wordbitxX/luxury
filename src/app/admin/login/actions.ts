"use server";

import { redirect } from "next/navigation";
import { adminPassword, createSession } from "@/lib/admin/auth";

export async function login(_prev: { error?: string } | null, formData: FormData) {
  const p = String(formData.get("password") ?? "");
  if (p !== adminPassword()) return { error: "Incorrect password." };
  await createSession();
  redirect("/admin");
}
