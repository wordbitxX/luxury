"use client";

import Image from "@/components/RestaurantImage";
import { Star } from "lucide-react";
import { getDish } from "@/lib/data/menu";
import { formatPrice, px } from "@/lib/data/site";
import { useCart } from "./cart";
import { Btn } from "./ui";

/* Demo guest notes — clearly labelled, never presented as Google reviews. */
const REVIEWS = [
  { name: "Ayesha K.", visit: "Family Dinner", text: "The karahi arrived still bubbling and the kids are still talking about the pavlova. Service never rushed us — we stayed three hours.", rating: 5 },
  { name: "Daniyal S.", visit: "Birthday", text: "Booked the rooftop for my father's 60th. The team set the table with flowers and the BBQ platter fed twelve of us happily.", rating: 5 },
  { name: "Mahnoor & Ali", visit: "Date Night", text: "Quiet corner, candlelight, and the best nihari we have had outside our grandmother's kitchen. Worth every rupee.", rating: 5 },
  { name: "Bilal R.", visit: "Business Lunch", text: "In and out in fifty minutes without feeling hurried. The biryani is genuinely dum-style, and the bill was exactly as quoted online.", rating: 4 },
  { name: "Sana F.", visit: "Family Gathering", text: "Ordered delivery for eighteen people in DHA — everything arrived hot, labelled, and the mint margaritas survived the ride.", rating: 5 },
  { name: "Hamza T.", visit: "Dinner with Friends", text: "Smash burger and loaded fries at midnight after a long week. The WhatsApp ordering took two minutes flat.", rating: 5 },
];

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={13} className={i < n ? "fill-bronze text-bronze" : "text-ink/25"} aria-hidden />
      ))}
    </span>
  );
}

export function Reviews() {
  return (
    <section aria-labelledby="reviews-heading" className="border-y border-ink/10 bg-cream py-20 lg:py-24">
      <div className="lux-container">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-bronze-deep">Guest notes · demo showcase</p>
            <h2 id="reviews-heading" className="display-serif mt-5 text-[clamp(2.7rem,4.8vw,4.5rem)]">
              Loved by <em className="font-light text-umber">Our Guests.</em>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Stars n={5} />
            <p className="text-sm text-ink/60"><strong className="text-ink">4.9/5</strong> across demo guest notes</p>
          </div>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <li key={r.name} className="flex flex-col border border-ink/12 bg-ivory p-7">
              <Stars n={r.rating} />
              <p className="mt-4 flex-1 font-serif text-[19px] italic leading-snug text-ink/85">“{r.text}”</p>
              <p className="mt-6 text-sm font-semibold text-ink">{r.name}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-bronze-deep">{r.visit}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[11px] text-ink/45">
          Illustrative guest notes written for this demo — not Google reviews and not a rating claim.
        </p>
      </div>
    </section>
  );
}

const PICK_IDS = ["q4", "pk1", "r1", "m2", "s2", "p1", "d1", "bg1"];

export function ChefRecommendations() {
  const { addDish } = useCart();
  const dishes = PICK_IDS.map((id) => getDish(id)!).filter(Boolean);
  return (
    <section aria-labelledby="picks-heading" className="bg-cream py-20 lg:py-24">
      <div className="lux-container">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-bronze-deep">From the pass</p>
            <h2 id="picks-heading" className="display-serif mt-5 text-[clamp(2.7rem,4.8vw,4.5rem)]">
              Chef&apos;s <em className="font-light text-umber">Recommendations.</em>
            </h2>
          </div>
          <Btn href="/menu" variant="line">Full menu</Btn>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dishes.map((d) => (
            <li key={d.id} className="group flex flex-col border border-ink/12 bg-ivory">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={px(d.img, 700, 525, d.imgExt)}
                  alt={d.name}
                  fill
                  sizes="(min-width:1024px) 22vw, (min-width:640px) 45vw, 90vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {d.spicy ? (
                  <span className="absolute left-3 top-3 bg-ink/80 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-cream">
                    {d.spicy === 2 ? "Spicy" : "Mild heat"}
                  </span>
                ) : d.tags.includes("V") ? (
                  <span className="absolute left-3 top-3 bg-ink/80 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-cream">
                    Vegetarian
                  </span>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="font-serif text-xl leading-tight text-ink">{d.name}</p>
                <p className="mt-2 line-clamp-2 flex-1 text-[13px] leading-relaxed text-ink/60">{d.desc}</p>
                <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
                  <span className="font-serif text-lg text-bronze-deep">{formatPrice(d.price)}</span>
                  <button
                    type="button"
                    onClick={() => addDish(d)}
                    className="bg-ink px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-bronze-deep"
                    aria-label={`Order ${d.name} now`}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
