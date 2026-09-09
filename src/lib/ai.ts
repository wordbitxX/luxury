/* ------------------------------------------------------------------ */
/*  CONCIERGE — recommendation engine                                  */
/*  Rule-based demo intelligence. The API route /api/concierge wraps   */
/*  this module so a live LLM or embedding service can be swapped in   */
/*  later without touching the interface.                              */
/* ------------------------------------------------------------------ */

import { DISHES, getDish, type Dish } from "./data/menu";

export type ConciergeDish = Pick<Dish, "id" | "name" | "desc" | "price" | "img" | "tags" | "cat">;

export type ConciergeReply = {
  text: string;
  dishes?: ConciergeDish[];
  chips?: string[];
};

export const MOODS = [
  { id: "light", label: "Light & Fresh", hint: "Bright plates, garden greens, clean seafood" },
  { id: "rich", label: "Rich & Indulgent", hint: "Fire, butter, slow cooking, deep flavour" },
  { id: "chef", label: "Chef's Choice", hint: "Let the kitchen decide — tasting menus" },
  { id: "veg", label: "Vegetarian", hint: "The full vegetarian arc of the house" },
  { id: "surprise", label: "Something Unexpected", hint: "The dishes guests talk about for weeks" },
] as const;

export type MoodId = (typeof MOODS)[number]["id"];

const toC = (d: Dish): ConciergeDish => ({
  id: d.id,
  name: d.name,
  desc: d.desc,
  price: d.price,
  img: d.img,
  tags: d.tags,
  cat: d.cat,
});

const pick = (arr: Dish[], n: number) => arr.slice(0, n).map(toC);

export function respond(input: string, mood?: MoodId | null): ConciergeReply {
  const q = (input || "").toLowerCase();
  const has = (...words: string[]) => words.some((w) => q.includes(w));

  /* ---- mood-driven openings ---- */
  if (mood === "light") {
    return {
      text: "Light & fresh — a wonderful way to begin. These are the plates we reach for on warm evenings: bright, clean and quietly brilliant.",
      dishes: pick([...DISHES.filter((d) => ["sa1", "sa2", "sa3", "f3", "s5", "f1"].includes(d.id))], 3),
      chips: ["What about dessert?", "Recommend a wine", "Something richer?"],
    };
  }
  if (mood === "rich") {
    return {
      text: "Rich & indulgent — now we are talking. These are the dishes built for slow evenings and long conversations, where fire does the heavy lifting.",
      dishes: pick([...DISHES.filter((d) => ["g1", "m2", "m1", "p3", "g2", "m5"].includes(d.id))], 3),
      chips: ["Show me the grill", "Chef's tasting menu", "What pairs with this?"],
    };
  }
  if (mood === "chef") {
    return {
      text: "Chef's Choice — the right answer. Elena has designed two ways to surrender: the seven-course Hearth Tasting, or the full twelve-course experience at the Chef's Counter.",
      dishes: pick([...DISHES.filter((d) => ["c1", "c2", "c3"].includes(d.id))], 3),
      chips: ["Reserve the Chef's Counter", "What's on the tasting today?", "Book a table"],
    };
  }
  if (mood === "veg") {
    return {
      text: "Vegetarian — you are in exceptionally good hands. The hearth has its own vegetarian vocabulary; the Ember-Roasted Celeriac has converted more than a few carnivores.",
      dishes: pick([...DISHES.filter((d) => d.tags.includes("V") || d.tags.includes("VG"))], 3),
      chips: ["Show all vegetarian dishes", "Vegan options?", "Chef's vegetarian arc"],
    };
  }
  if (mood === "surprise") {
    return {
      text: "Something unexpected — our favourite brief. These are the plates that make guests lean across the table and say 'you have to taste this'.",
      dishes: pick([...DISHES.filter((d) => ["s1", "s5", "g4", "d2", "b3", "so2"].includes(d.id))], 3),
      chips: ["Surprise me with dessert", "What's the most ordered dish?", "Tell me a chef secret"],
    };
  }

  /* ---- intent detection ---- */
  if (has("vegetarian", "veg ", "no meat", "plant")) {
    return {
      text: "For vegetarian guests we recommend the Ember-Roasted Celeriac and the Garden Plate to start — and the full Noor Vegetarian Arc if you would like the kitchen to take you on a journey.",
      dishes: pick([...DISHES.filter((d) => d.id === "s1" || d.id === "c3" || d.id === "sa3" || d.id === "m4")], 3),
      chips: ["Vegan options?", "Dessert without dairy?"],
    };
  }
  if (has("vegan")) {
    return {
      text: "Gladly. These dishes are fully vegan, and we can adapt most of the garden section on request — just note it when you order or book.",
      dishes: pick([...DISHES.filter((d) => d.tags.includes("VG"))], 3),
      chips: ["What about drinks?", "Anything gluten-free?"],
    };
  }
  if (has("gluten", "celiac", "coeliac", "gf")) {
    return {
      text: "A large part of the menu is gluten-free by design — the kitchen cooks with rice flour, polenta and good bread you can simply skip. These are safe, delicious starting points.",
      dishes: pick([...DISHES.filter((d) => d.tags.includes("GF"))], 3),
      chips: ["Recommend a dessert", "Is the grill gluten-free?"],
    };
  }
  if (has("allerg", "nut", "allergy")) {
    return {
      text: "Please always tell us about allergies when you book or order — the kitchen prefers to know. A note: nuts appear in the celeriac, the terrine, the scallop dish and the kulfi, and dairy is used widely. We will adapt wherever we safely can.",
      dishes: [],
      chips: ["Vegetarian options", "Book a table"],
    };
  }
  if (has("spicy", "chilli", "chili", "heat")) {
    return {
      text: "Heat is used with intent here. These carry the most fire — though our spiciest dish is still built to be finished, not survived.",
      dishes: pick([...DISHES.filter((d) => (d.spicy ?? 0) >= 2)], 3),
      chips: ["Something milder", "Show me the grill"],
    };
  }
  if (has("sweet", "dessert", "chocolate", "cake")) {
    return {
      text: "The sweet close — an important matter. The Burnt Honey & Fig Pavlova is the house icon; the Saffron Kulfi is our love letter to old Lahore.",
      dishes: pick([...DISHES.filter((d) => d.cat === "desserts")], 3),
      chips: ["Coffee to finish", "What about the affogato?"],
    };
  }
  if (has("wine", "pair", "drink", "sommelier")) {
    return {
      text: "Our sommelier's rule: smoke is a flavour, so the wine must have a little grip of its own. For fire-cooked meat, ask for the Côte-Rôtie by the glass; with ember vegetables, the Arneis is a quiet revelation.",
      dishes: pick([...DISHES.filter((d) => d.id === "dr4" || d.id === "m2" || d.id === "s1")], 3),
      chips: ["Recommend a dish", "Non-alcoholic options?"],
    };
  }
  if (has("recommend", "best", "signature", "famous", "must")) {
    return {
      text: "If it is your first evening, we would send you to the Ember-Roasted Celeriac, the Truffle Risotto Nero and the Burnt Honey & Fig Pavlova. Between them they tell the whole story of the house.",
      dishes: pick([...DISHES.filter((d) => d.signature)], 3),
      chips: ["The full tasting menu", "Book a table"],
    };
  }
  if (has("price", "cost", "expensive", "budget", "pk", "rupee")) {
    return {
      text: "Starters run from PKR 850–2,200, mains from PKR 1,550–6,950, and the tasting experiences from PKR 4,950 (vegetarian arc) to PKR 11,250 (the Chef's Counter). The bread, by the way, is always worth it.",
      dishes: [],
      chips: ["Show me the menu", "Chef's Choice"],
    };
  }
  if (has("book", "reserve", "table", "reservation", "seat")) {
    return {
      text: "We would love to host you. Reservations open through our reservation page — choose your date, guests, time and seating in a few moments. For the Chef's Counter, book well ahead; it holds only ten seats.",
      dishes: [],
      chips: ["Open reservations", "What are the hours?", "Private dining"],
    };
  }
  if (has("hour", "open", "close", "time", "when")) {
    return {
      text: "We serve dinner Tuesday to Sunday from 18:00 until midnight, and lunch on Friday to Sunday from 12:00. Monday the kitchen rests — and so does the hearth.",
      dishes: [],
      chips: ["Book a table", "Where are you located?"],
    };
  }
  if (has("address", "location", "where", "park", "map", "find")) {
    return {
      text: "You will find us at 7-C, The Boulevard, Gulberg III, Lahore. Valet is available from 17:30, and we are fifteen minutes from the airport. The courtyard door is the one with the warm light.",
      dishes: [],
      chips: ["Plan your visit", "Book a table"],
    };
  }
  if (has("menu", "order", "deliver", "takeaway", "pickup")) {
    return {
      text: "You can browse the full menu and order for pickup or delivery right here — every dish opens into its details, and your cart travels with you across the site.",
      dishes: pick([...DISHES.filter((d) => d.popular)], 3),
      chips: ["Open the menu", "Chef's Choice"],
    };
  }
  if (has("chef", "elena", "who cooks", "marchetti")) {
    return {
      text: "Chef Elena Marchetti founded Maison Noor in 2022 after years cooking across Europe's finest hearth kitchens. She still tastes every sauce, cooks the Chef's Counter on weekends, and believes the customer is the work.",
      dishes: [],
      chips: ["Read her story", "Chef's Choice", "Reserve the counter"],
    };
  }
  if (has("private", "event", "celebrat", "corporate", "function", "birthday", "salon")) {
    return {
      text: "The Salon seats twelve with its own entrance; the Chef's Table seats six inside the kitchen; and we host corporate evenings and full buyouts up to sixty guests. Tell us about your evening and we will set the table for it.",
      dishes: [],
      chips: ["Plan your evening", "Book a table"],
    };
  }
  if (has("hello", "hi", "hey", "salam", "good")) {
    return {
      text: "Welcome to Maison Noor. I am the Concierge — I can recommend dishes, answer questions about ingredients and allergies, help with pairings, or point you to reservations and ordering. What are you in the mood for tonight?",
      chips: ["Light & Fresh", "Rich & Indulgent", "Chef's Choice", "Vegetarian", "Something Unexpected"],
    };
  }

  /* ---- fallback ---- */
  return {
    text: "I would love to help with that — try asking me about vegetarian dishes, spice, allergies, wine pairings, our hours, reservations, or let me simply recommend the evening's standouts.",
    dishes: pick([...DISHES.filter((d) => d.chef || d.signature)], 3),
    chips: ["What are you in the mood for?", "Show me the menu", "Book a table"],
  };
}

export const intro = (): ConciergeReply => ({
  text: "Good evening — I am the Concierge at Maison Noor. Tell me what you are in the mood for, or ask me about the menu, ingredients, allergies, pairings, hours or reservations. How shall we begin?",
  chips: ["Light & Fresh", "Rich & Indulgent", "Chef's Choice", "Vegetarian", "Something Unexpected"],
});

export const dishBrief = (id: string) => {
  const d = getDish(id);
  return d ? toC(d) : null;
};
