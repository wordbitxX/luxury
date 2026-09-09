"use client";

import { useActionState } from "react";
import { login } from "./actions";
import { Btn } from "@/components/ui";

export default function LoginForm() {
  const [state, formAction] = useActionState(login, null);
  return (
    <form action={formAction} className="mt-10 space-y-5">
      <label className="block">
        <span className="eyebrow text-bronze-deep">Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 w-full border-b border-ink/25 bg-transparent py-3 text-sm outline-none focus:border-bronze-deep"
        />
      </label>
      {state?.error && <p className="text-xs text-red-700">{state.error}</p>}
      <Btn type="submit" variant="solid" className="w-full">
        Enter the dashboard
      </Btn>
    </form>
  );
}
