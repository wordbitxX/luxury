"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
  type ReactNode,
} from "react";
import Link from "next/link";
import Image from "@/components/RestaurantImage";
import { AnimatePresence, motion } from "motion/react";
import { X, Minus, Plus, Check, Tag } from "lucide-react";
import { getDish, type Dish } from "@/lib/data/menu";
import {
  formatPrice,
  px,
  DELIVERY_AREAS,
  PAYMENT_METHODS,
  SERVICE_TYPES,
  areaFee,
  type PaymentMethodId,
  type ServiceTypeId,
} from "@/lib/data/site";
import { buildWhatsAppOrderLink } from "@/lib/whatsapp";
import { Btn } from "./ui";
import { useModal } from "./useModal";

export type CartLine = {
  key: string;
  dishId: string;
  name: string;
  qty: number;
  unit: number;
  optionLabels: string[];
  note: string;
};

type CartCtx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  openCart: () => void;
  closeCart: () => void;
  isOpen: boolean;
  addDish: (dish: Dish, qty?: number, optionIds?: string[], note?: string) => void;
  setQty: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
  clear: () => void;
  justAdded: string | null;
};

const Ctx = createContext<CartCtx | null>(null);
export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const addDish = useCallback(
    (dish: Dish, qty = 1, optionIds: string[] = [], note = "") => {
      const chosen = (dish.options ?? []).filter((o) => optionIds.includes(o.id));
      const unit = dish.price + chosen.reduce((s, o) => s + o.delta, 0);
      const key = [dish.id, ...chosen.map((o) => o.id), note].join("|");
      setLines((prev) => {
        const existing = prev.find((l) => l.key === key);
        if (existing)
          return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l));
        return [
          ...prev,
          {
            key,
            dishId: dish.id,
            name: dish.name,
            qty,
            unit,
            optionLabels: chosen.map((o) => o.label),
            note,
          },
        ];
      });
      setJustAdded(dish.id);
      window.setTimeout(() => setJustAdded(null), 2200);
      setIsOpen(true);
    },
    []
  );

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l))
    );
  }, []);

  const removeLine = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const clear = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const { count, subtotal } = useMemo(
    () => ({
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal: lines.reduce((s, l) => s + l.qty * l.unit, 0),
    }),
    [lines]
  );

  const value: CartCtx = useMemo(
    () => ({ lines, count, subtotal, openCart, closeCart, isOpen, addDish, setQty, removeLine, clear, justAdded }),
    [lines, count, subtotal, openCart, closeCart, isOpen, addDish, setQty, removeLine, clear, justAdded]
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <CartDrawer />
    </Ctx.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Drawer + checkout                                                  */
/* ------------------------------------------------------------------ */

type Step = "cart" | "service" | "details" | "confirm" | "done";

const PROMO_CODE = "NOOR20";

function CartDrawer() {
  const { lines, count, subtotal, isOpen, closeCart, setQty, removeLine, clear } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [service, setService] = useState<ServiceTypeId>("delivery");
  const [area, setArea] = useState<string>(DELIVERY_AREAS[1].id);
  const [payment, setPayment] = useState<PaymentMethodId>("cod");
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", whatsapp: "", email: "", address: "", note: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [refCode, setRefCode] = useState("");

  const fee = service === "delivery" ? areaFee(area) : 0;
  const discount = promoApplied ? Math.min(Math.round(subtotal * 0.2), 1000) : 0;
  const total = Math.max(0, subtotal + fee - discount);

  const panelRef = useRef<HTMLElement>(null);
  useModal(isOpen, closeCart, panelRef);

  useEffect(() => {
    if (!isOpen) return;
    setStep("cart");
    setError("");
  }, [isOpen]);

  const reset = () => {
    setStep("cart");
    setForm({ name: "", phone: "", whatsapp: "", email: "", address: "", note: "" });
    setPromo("");
    setPromoApplied(false);
    setError("");
  };

  const close = () => {
    closeCart();
    if (step === "done") reset();
  };

  const detailsValid = () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Please add your name and phone number (03xx xxxxxxx).");
      return false;
    }
    if (service === "delivery" && (!form.address.trim() || !area)) {
      setError("Please choose your delivery area and add your street address.");
      return false;
    }
    setError("");
    return true;
  };

  const orderPayload = () => ({
    name: form.name,
    phone: form.phone,
    whatsapp: form.whatsapp,
    email: form.email,
    serviceType: service,
    area: service === "delivery" ? area : "",
    address: service === "delivery" ? form.address : "",
    payment,
    discount,
    note: form.note,
    items: lines.map((l) => ({
      dishId: l.dishId,
      name: l.name,
      qty: l.qty,
      unit: l.unit,
      options: l.optionLabels,
      note: l.note,
    })),
    total,
  });

  const placeOrder = async () => {
    if (busy) return;
    if (!detailsValid()) {
      setStep("details");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload()),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      setRefCode(data.ref);
      setStep("done");
      clear();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  const whatsappLink = buildWhatsAppOrderLink({
    name: form.name || "Guest",
    items: lines.map((l) => ({ name: l.name, qty: l.qty, unit: l.unit })),
    subtotal,
    deliveryFee: fee,
    discount,
    total,
    service: service === "delivery" ? "Delivery" : service === "pickup" ? "Pickup" : "Dine-In",
    address: form.address,
    area: DELIVERY_AREAS.find((a) => a.id === area)?.name,
    phone: form.phone,
    note: form.note,
  });

  const input =
    "w-full border-b border-ink/25 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-bronze-deep";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label="Your order">
          <motion.button
            aria-label="Close order bag"
            className="absolute inset-0 bg-ink/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={close}
          />
          <motion.aside
            ref={panelRef}
            tabIndex={-1}
            initial={{ x: "104%" }}
            animate={{ x: 0 }}
            exit={{ x: "104%" }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-[34rem] flex-col bg-cream shadow-2xl"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-ink/10 px-7 py-5">
              <div>
                <p className="eyebrow text-bronze-deep">Maison Noor</p>
                <h2 className="display-serif mt-1 text-2xl">
                  {step === "done" ? "Order received" : "Your Order"}
                </h2>
              </div>
              <button
                onClick={close}
                aria-label="Close bag"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 hover:border-ink"
              >
                <X size={18} strokeWidth={1.25} />
              </button>
            </div>

            {/* step indicator */}
            {step !== "done" && step !== "cart" && (
              <div className="border-b border-ink/10 px-7 py-3">
                <div className="flex items-center gap-2">
                  {["cart", "service", "details", "confirm"].map((s, i) => (
                    <span key={s} className="flex items-center gap-2">
                      <span
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          ["cart", "service", "details", "confirm"].indexOf(step) >= i
                            ? "w-6 bg-bronze-deep"
                            : "w-1.5 bg-ink/15"
                        }`}
                      />
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-7 py-6">
              {error && <p role="alert" className="mb-5 border border-red-200 bg-red-50 p-3 text-xs text-red-800">{error}</p>}
              {step === "done" ? (
                <div className="flex h-full flex-col items-start justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-cream">
                    <Check size={22} strokeWidth={1.5} />
                  </span>
                  <h3 className="display-serif mt-8 text-4xl">Thank you.</h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/65">
                    Your order reference is{" "}
                    <span className="font-semibold text-ink">{refCode}</span>. Your demo order is saved
                    in the house dashboard. No payment has been taken and no meal will be prepared.
                  </p>
                  <div className="mt-10 flex flex-wrap gap-3">
                    <Btn variant="solid" onClick={close}>
                      Continue browsing
                    </Btn>
                    <Btn variant="outline" href="/menu" onClick={close}>
                      Back to menu
                    </Btn>
                  </div>
                </div>
              ) : lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="display-serif text-3xl text-ink/70">Your bag is empty</p>
                  <p className="mt-3 max-w-xs text-sm text-ink/55">
                    From smoky BBQ to dum biryani — the menu is waiting.
                  </p>
                  <div className="mt-8">
                    <Btn href="/menu" onClick={close}>
                      Explore the menu
                    </Btn>
                  </div>
                </div>
              ) : step === "cart" ? (
                <ul className="space-y-5">
                  {lines.map((l) => {
                    const d = getDish(l.dishId);
                    return (
                      <li key={l.key} className="flex gap-4 border-b border-ink/10 pb-5">
                        <Link href="/menu" className="img-frame h-20 w-20 shrink-0" onClick={close}>
                          <Image
                            src={px(d?.img ?? 27612507, 200, 200, d?.imgExt)}
                            alt={d?.name ?? l.name}
                            loading="lazy"
                            width={80}
                            height={80}
                            className="h-full w-full object-cover"
                          />
                        </Link>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-serif text-lg leading-tight">{l.name}</p>
                              {l.optionLabels.length > 0 && (
                                <p className="mt-1 text-xs text-ink/55">{l.optionLabels.join(" · ")}</p>
                              )}
                              {l.note && <p className="mt-1 text-xs italic text-ink/50">“{l.note}”</p>}
                            </div>
                            <p className="text-sm font-medium">{formatPrice(l.unit * l.qty)}</p>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-3 border border-ink/15 px-2 py-1">
                              <button
                                aria-label={`Reduce quantity of ${l.name}`}
                                onClick={() => setQty(l.key, l.qty - 1)}
                                className="p-1"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="min-w-5 text-center text-sm">{l.qty}</span>
                              <button
                                aria-label={`Increase quantity of ${l.name}`}
                                onClick={() => setQty(l.key, l.qty + 1)}
                                className="p-1"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeLine(l.key)}
                              className="text-[11px] uppercase tracking-[0.18em] text-ink/45 hover:text-ink"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                  {/* promo */}
                  <li className="pt-1">
                    {promoApplied ? (
                      <p className="flex items-center justify-between border border-emerald-700/30 bg-emerald-700/5 px-4 py-3 text-sm">
                        <span className="flex items-center gap-2 text-emerald-800">
                          <Tag size={14} /> {PROMO_CODE} applied — 20% off
                        </span>
                        <button
                          onClick={() => setPromoApplied(false)}
                          className="text-[11px] uppercase tracking-[0.18em] text-ink/50 hover:text-ink"
                        >
                          Remove
                        </button>
                      </p>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          value={promo}
                          onChange={(e) => setPromo(e.target.value.toUpperCase())}
                          placeholder="Promo code (try NOOR20)"
                          aria-label="Promo code"
                          className="flex-1 border border-ink/20 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-ink/35 focus:border-bronze-deep"
                        />
                        <button
                          onClick={() => {
                            if (promo.trim() === PROMO_CODE) {
                              setPromoApplied(true);
                              setError("");
                            } else {
                              setError("That promo code is not valid. Try NOOR20.");
                            }
                          }}
                          className="border border-ink px-5 text-[11px] font-semibold uppercase tracking-[0.18em] hover:bg-ink hover:text-cream"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                  </li>
                </ul>
              ) : step === "service" ? (
                <div className="flex h-full flex-col">
                  <h3 className="display-serif text-3xl">Delivery, pickup or dine-in?</h3>
                  <p className="mt-3 text-sm text-ink/60">
                    Choose how you would like to enjoy your meal.
                  </p>
                  <div className="mt-8 space-y-4" role="radiogroup" aria-label="Order type">
                    {SERVICE_TYPES.map((o) => (
                      <button
                        key={o.id}
                        role="radio"
                        aria-checked={service === o.id}
                        onClick={() => setService(o.id)}
                        className={`w-full border p-5 text-left transition-all duration-300 ${
                          service === o.id ? "border-ink bg-ivory" : "border-ink/15 hover:border-ink/40"
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          <span className="font-serif text-xl capitalize">{o.id === "dinein" ? "Dine-In" : o.id}</span>
                          <span
                            className={`h-4 w-4 rounded-full border ${
                              service === o.id ? "border-bronze-deep" : "border-ink/30"
                            } flex items-center justify-center`}
                          >
                            {service === o.id && <span className="h-2 w-2 rounded-full bg-bronze-deep" />}
                          </span>
                        </span>
                        <span className="mt-1 block text-xs text-ink/55">{o.note}</span>
                      </button>
                    ))}
                  </div>
                  {service === "delivery" && (
                    <label className="mt-6 block">
                      <span className="eyebrow text-bronze-deep">Delivery area</span>
                      <select
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="mt-2 w-full border border-ink/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-bronze-deep"
                      >
                        {DELIVERY_AREAS.map((a) => (
                          <option key={a.id} value={a.id}>
                            {a.name} · PKR {a.fee} · {a.eta}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                </div>
              ) : step === "details" ? (
                <div className="flex h-full flex-col">
                  <h3 className="display-serif text-3xl">Your details</h3>
                  <p className="mt-3 text-sm text-ink/60">
                    We only call to confirm — never to sell.
                  </p>
                  <div className="mt-8 space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <label className="block">
                        <span className="eyebrow text-bronze-deep">Full name *</span>
                        <input
                          className={input}
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="e.g. Ahmed Raza"
                          autoComplete="name"
                        />
                      </label>
                      <label className="block">
                        <span className="eyebrow text-bronze-deep">Phone *</span>
                        <input
                          className={input}
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="03xx xxxxxxx"
                          autoComplete="tel"
                          inputMode="tel"
                        />
                      </label>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <label className="block">
                        <span className="eyebrow text-bronze-deep">WhatsApp</span>
                        <input
                          className={input}
                          value={form.whatsapp}
                          onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                          placeholder="03xx xxxxxxx"
                          inputMode="tel"
                        />
                      </label>
                      <label className="block">
                        <span className="eyebrow text-bronze-deep">Email</span>
                        <input
                          className={input}
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@example.com"
                          autoComplete="email"
                        />
                      </label>
                    </div>
                    {service === "delivery" && (
                      <>
                        <label className="block">
                          <span className="eyebrow text-bronze-deep">Delivery area *</span>
                          <select
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            className="mt-2 w-full border-b border-ink/25 bg-transparent py-3 text-sm outline-none focus:border-bronze-deep"
                          >
                            {DELIVERY_AREAS.map((a) => (
                              <option key={a.id} value={a.id}>
                                {a.name} · PKR {a.fee}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="block">
                          <span className="eyebrow text-bronze-deep">Complete address *</span>
                          <textarea
                            className={`${input} min-h-20 resize-none`}
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                            placeholder="House, street, block, nearby landmark"
                          />
                        </label>
                      </>
                    )}
                    <label className="block">
                      <span className="eyebrow text-bronze-deep">Delivery instructions</span>
                      <textarea
                        className={`${input} min-h-20 resize-none`}
                        value={form.note}
                        onChange={(e) => setForm({ ...form, note: e.target.value })}
                        placeholder="Gate code, floor, spice level, cutlery…"
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col">
                  <h3 className="display-serif text-3xl">Confirm your order</h3>
                  <div className="mt-8 space-y-3 border-b border-ink/10 pb-6 text-sm">
                    <div className="flex justify-between"><span className="text-ink/55">Service</span><span className="font-medium capitalize">{service === "dinein" ? "Dine-In" : service}</span></div>
                    <div className="flex justify-between"><span className="text-ink/55">Name</span><span className="font-medium">{form.name}</span></div>
                    <div className="flex justify-between"><span className="text-ink/55">Phone</span><span className="font-medium">{form.phone}</span></div>
                    {service === "delivery" && (
                      <div className="flex justify-between gap-6"><span className="shrink-0 text-ink/55">Address</span><span className="text-right font-medium">{form.address}, {DELIVERY_AREAS.find((a) => a.id === area)?.name}</span></div>
                    )}
                    {form.note && (
                      <div className="flex justify-between gap-6"><span className="shrink-0 text-ink/55">Note</span><span className="text-right italic">{form.note}</span></div>
                    )}
                  </div>

                  {/* payment */}
                  <p className="eyebrow mt-6 text-bronze-deep">Payment method</p>
                  <div className="mt-3 space-y-2" role="radiogroup" aria-label="Payment method">
                    {PAYMENT_METHODS.map((m) => (
                      <button
                        key={m.id}
                        role="radio"
                        aria-checked={payment === m.id}
                        onClick={() => setPayment(m.id)}
                        className={`flex w-full items-center justify-between border px-4 py-3 text-left text-sm transition-colors ${
                          payment === m.id ? "border-ink bg-ivory" : "border-ink/15 hover:border-ink/40"
                        }`}
                      >
                        <span>
                          <span className="block font-medium">{m.name}</span>
                          <span className="block text-xs text-ink/55">{m.note}</span>
                        </span>
                        <span
                          className={`h-4 w-4 shrink-0 rounded-full border ${
                            payment === m.id ? "border-bronze-deep" : "border-ink/30"
                          } flex items-center justify-center`}
                        >
                          {payment === m.id && <span className="h-2 w-2 rounded-full bg-bronze-deep" />}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 text-[11px] leading-relaxed text-ink/50">
                    Online payments are not connected in this demo — payment integration ready
                    (JazzCash, Easypaisa & cards via a secure gateway).
                  </p>

                  <div className="space-y-1.5 pt-5 text-sm">
                    <div className="flex justify-between"><span className="text-ink/55">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                    <div className="flex justify-between"><span className="text-ink/55">{service === "delivery" ? `Delivery (${DELIVERY_AREAS.find((a) => a.id === area)?.name})` : service === "pickup" ? "Pickup" : "Dine-In"}</span><span>{fee === 0 ? "—" : formatPrice(fee)}</span></div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-800"><span>Discount ({PROMO_CODE})</span><span>−{formatPrice(discount)}</span></div>
                    )}
                    <div className="flex justify-between pt-2 text-base font-semibold"><span>Total</span><span>{formatPrice(total)}</span></div>
                  </div>
                </div>
              )}
            </div>

            {/* footer actions */}
            {step !== "done" && lines.length > 0 && (
              <div className="border-t border-ink/10 px-7 py-5">
                {step === "cart" ? (
                  <>
                    <div className="mb-4 flex items-center justify-between text-sm">
                      <span className="text-ink/60">
                        {count} item{count === 1 ? "" : "s"}
                      </span>
                      <span className="font-serif text-xl">{formatPrice(subtotal)}</span>
                    </div>
                    <Btn variant="solid" className="w-full" onClick={() => setStep("service")}>
                      Continue to checkout
                    </Btn>
                  </>
                ) : step === "service" ? (
                  <div className="flex gap-3">
                    <Btn variant="line" className="flex-1 !justify-center" onClick={() => setStep("cart")}>
                      Back
                    </Btn>
                    <Btn variant="solid" className="flex-[2]" onClick={() => setStep("details")}>
                      Continue
                    </Btn>
                  </div>
                ) : step === "details" ? (
                  <div className="flex gap-3">
                    <Btn variant="line" className="flex-1 !justify-center" onClick={() => setStep("service")}>
                      Back
                    </Btn>
                    <Btn
                      variant="solid"
                      className="flex-[2]"
                      onClick={() => detailsValid() && setStep("confirm")}
                      ariaLabel="Review order"
                    >
                      Review order
                    </Btn>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <Btn variant="line" className="flex-1 !justify-center" onClick={() => setStep("details")}>
                        Back
                      </Btn>
                      <Btn
                        variant="solid"
                        className="flex-[2]"
                        onClick={placeOrder}
                        ariaLabel="Confirm order"
                      >
                        {busy ? "Placing…" : `Checkout · ${formatPrice(total)}`}
                      </Btn>
                    </div>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center justify-center gap-2.5 border border-[#1d7a3d] bg-[#20913f] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors duration-150 hover:bg-[#1a7a34]"
                    >
                      <span>Order on WhatsApp</span>
                      <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                )}
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
