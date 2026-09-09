import { px } from "./site";

/* ------------------------------------------------------------------ */
/*  Editorial content for Maison Noor                                  */
/* ------------------------------------------------------------------ */

export const STORY_CHAPTERS = [
  {
    step: "01",
    title: "Ingredient",
    lead: "It begins hours before service, before the light changes, before the first guest arrives.",
    body: "Each morning a single buyer walks the markets of Lahore and the farms beyond it — guava from the orchards of Kasur, fish from the coast, herbs cut at dawn. Nothing is ordered from a list. The list is written by what the day provides.",
    img: 8629083,
    alt: "Chef's hands sorting green vegetables at the morning market",
  },
  {
    step: "02",
    title: "Preparation",
    lead: "The afternoon belongs to stillness — brines, cures, stocks, doughs.",
    body: "In the quiet hours, the kitchen prepares the evening: chicken brined overnight, lamb trimmed to the bone, pasta rolled at two, sauces reduced until they shine. Preparation is the discipline that makes service look effortless.",
    img: 4252142,
    alt: "Chef slicing onion among bowls of fresh vegetables",
  },
  {
    step: "03",
    title: "Fire",
    lead: "At six, the hearth is lit. After that, the kitchen answers to nothing else.",
    body: "Fire is not a garnish here. It is the oldest ingredient we own. Oak and mango wood burn down to embers; the grill, the rotisserie and the ash oven each hold a different temperature, a different personality. We cook with it the way it has always been cooked — honestly.",
    img: 6897409,
    alt: "Chef finishing a dish over the flame at the stove",
  },
  {
    step: "04",
    title: "Plate",
    lead: "The plate is the last sentence of a long paragraph.",
    body: "Plating at Maison Noor is deliberately quiet. We believe a dish should look like itself — an ingredient, a sauce, a garnish, and nothing that pretends to be something else. The beauty is in the restraint.",
    img: 4253315,
    alt: "Chef plating a course with precise, calm hands",
  },
  {
    step: "05",
    title: "Experience",
    lead: "And then it leaves the pass — and becomes yours.",
    body: "The room takes over. The light is low, the linen is heavy, the wine is poured at the right temperature. What we cook is only half the evening. The other half is the pause between courses, the conversation, the hour that passes like a minute.",
    img: 37968303,
    alt: "Candlelit tables during service at Maison Noor",
  },
];

export const CHEF_CONTENT = {
  bio: [
    "Chef Elena Marchetti came to cooking sideways — through archaeology, of all things. A decade of digging through the culinary history of three continents taught her what most kitchens forget: that fire, salt and patience predate every trend, and that they will outlast them all.",
    "She trained across Europe's most demanding kitchens before the idea of Maison Noor took hold: a restaurant built around a single open hearth, in a city whose food culture she had come to love. Lahore answered with ingredients she had never imagined — and a room that wanted something new.",
    "Today she leads a kitchen of eighteen, cooks the Chef's Counter herself on weekends, and still insists on tasting every sauce before it leaves the pass. 'A restaurant,' she says, 'is a promise made twice a night, to every person at every table.'",
  ],
  quote: "Cooking is the only art you can eat — and the only one where the audience arrives hungry.",
  philosophy: [
    { title: "Fire first", body: "Every dish on the menu can trace its character to the hearth. Technique serves the flame, never the other way around." },
    { title: "The market writes the menu", body: "If the day offers something extraordinary, the menu changes. Printed menus are suggestions; the kitchen is the authority." },
    { title: "Restraint is a flavour", body: "Seven ingredients, properly handled, will always defeat seventeen that are merely assembled." },
    { title: "The room is a dish too", body: "Light, sound, linen and pace are seasoned like food. We cook the evening, not only the plate." },
  ],
  milestones: [
    { year: "2011", text: "First professional kitchen — garde manger, a two-star dining room in Copenhagen" },
    { year: "2014", text: "Chef de partie on fire & grill sections across Paris and Bangkok kitchens" },
    { year: "2017", text: "Head chef of a celebrated hearth restaurant on the Italian Riviera" },
    { year: "2019", text: "Guest chef residencies across Asia; begins research trips to Lahore's old city" },
    { year: "2022", text: "Founds Maison Noor in Gulberg, Lahore — hearth, courtyard and all" },
    { year: "2024", text: "Opens the Chef's Counter; the room grows to its present twelve-course format" },
  ],
};

export type JourneyStep = {
  step: string;
  title: string;
  copy: string;
  img: number;
  alt: string;
  imgExt?: "png";
};

export const EVENING_JOURNEY: JourneyStep[] = [
  { step: "01", title: "Arrival", copy: "The car door opens onto a courtyard garden. Beyond it, lamplight through linen curtains — the room is already warm, already yours.", img: 17294737, alt: "Courtyard approach with flowers and warm lamplight" },
  { step: "02", title: "Welcome", copy: "A glass of something cold, a quiet table, no hurry to decide. The evening begins with a pause, not a pitch.", img: 12181763, alt: "Wine service laid out under warm light" },
  { step: "03", title: "Table", copy: "Heavy linen, water poured at the right temperature, bread from the hearth still warm at the centre. Small details, done properly, are the whole point.", img: 1872889, alt: "Set table with crystal glassware and candlelight" },
  { step: "04", title: "Kitchen", copy: "The Chef's Counter brings the fire to your table — ten seats where the cooks hand you each plate and watch you take the first bite.", img: 20509791, alt: "Chef at the pass in the open kitchen" },
  { step: "05", title: "Dessert", copy: "Sweetness, then a small plate of something from the pastry room, then coffee the colour of the room itself.", img: 12258206, alt: "Hand plating a dessert with edible flowers", imgExt: "png" },
  { step: "06", title: "Departure", copy: "The courtyard again, cooler now. A car is called, a card is pressed into your hand. You will dream about the bread.", img: 17001748, alt: "Candlelit table after dinner" },
];

export const PRIVATE_DINING = [
  {
    id: "salon",
    name: "The Salon",
    tag: "Private dining · 12 guests",
    desc: "A panelled room off the main dining hall with its own entrance, dedicated sommelier and a menu written for your table alone.",
    features: ["Seats 8 — 12", "Private entrance & sommelier", "Choose from menu or bespoke", "Audio-visual ready"],
    img: 16935958,
    alt: "Private salon table with candles and floral arrangements",
  },
  {
    id: "chefs-table",
    name: "The Chef's Table",
    tag: "Inside the kitchen · 6 guests",
    desc: "Not a table near the kitchen — a table in it. Six seats at the pass for the full twelve-course counter experience, narrated by the chefs.",
    features: ["6 seats at the pass", "Twelve-course counter menu", "Wine pairing included", "One evening, one table"],
    img: 20509791,
    alt: "The chef's table at the pass in the open kitchen",
  },
  {
    id: "celebrations",
    name: "Celebrations",
    tag: "Anniversaries · birthdays · proposals",
    desc: "Cakes from our pastry room, flowers from our florist, a toast poured at the right moment. Tell us the story; we will set the table for it.",
    features: ["Bespoke cakes & flowers", "Private or semi-private", "Menus tailored to the occasion", "Photography corners"],
    img: 3926205,
    alt: "A guest at a beautifully set celebration table",
  },
  {
    id: "corporate",
    name: "Corporate Evenings",
    tag: "Dinners · launches · board evenings",
    desc: "A long table, a fixed menu, an unhurried pace — the antidote to the conference dinner. Full buyout of the house available for larger evenings.",
    features: ["Buyout up to 60 guests", "Fixed & tasting menus", "AV & presentation support", "Dedicated event manager"],
    img: 17294737,
    alt: "Long corporate table dressed in ivory linen",
  },
];

export const GALLERY = [
  { src: 37968303, alt: "The dining room at night, lit by candle and brass", span: "tall", w: 900, h: 1150 },
  { src: 8112891, alt: "Hand-dived scallops, brown butter and cauliflower", span: "wide", w: 1150, h: 760 },
  { src: 12919407, alt: "The light-filled dining hall of Maison Noor", span: "wide", w: 1150, h: 760 },
  { src: 4253315, alt: "A course being plated at the pass", span: "tall", w: 900, h: 1150 },
  { src: 17035085, alt: "Saffron kulfi dressed with rose and pistachio", span: "tall", w: 900, h: 1150 },
  { src: 17294737, alt: "Ivory linen and seasonal flowers before service", span: "wide", w: 1150, h: 760 },
  { src: 7243881, alt: "Lamb from the hearth, rested and carved", span: "wide", w: 1150, h: 760 },
  { src: 31631249, alt: "The bar's coupe glasses at rest", span: "tall", w: 900, h: 1150 },
  { src: 32793290, alt: "Crisp prawns with green chile aioli", span: "wide", w: 1150, h: 760 },
  { src: 35546720, alt: "Chocolate dessert with olive oil and salt", span: "tall", w: 900, h: 1150 },
];

export const JOURNAL = [
  {
    slug: "seasonal-ingredients-fire-menu",
    kicker: "Kitchen Notes",
    title: "Why the Menu Changes With the Season",
    excerpt: "The market writes the menu at Maison Noor. Here is how a single season reshapes an entire kitchen — and why we would not have it any other way.",
    date: "2026-01-18",
    read: "6 min read",
    cover: 8629083,
    coverAlt: "Seasonal vegetables from the morning market",
    body: [
      { type: "p", text: "There is a moment, twice a year, when the menu at Maison Noor stops making sense. Spring vegetables arrive before the kitchen has finished with winter roots; the first mangoes of summer appear while the last of the citrus is still being pressed. For two weeks, the menu is a conversation between seasons — and then, quietly, the old season bows out." },
      { type: "h2", text: "The buyer is the menu" },
      { type: "p", text: "We do not have a menu committee. We have a buyer. Every morning she walks the market and calls the kitchen with what is extraordinary: a batch of figs that tastes like honey, fish that came in with the dawn tide, herbs that were cut while the dew was still on them. The evening menu is written around those calls." },
      { type: "quote", text: "A printed menu is a promise we made last week. The market is the promise we can actually keep." },
      { type: "p", text: "The system is simple: if an ingredient is at its peak, it appears on the menu the same evening. If it is not, no amount of technique will rescue it. Technique can coax, but it cannot lie." },
      { type: "h2", text: "What this means for you" },
      { type: "p", text: "It means the dish you loved in January will probably be gone by April — and that the dish you order in April will never exist again. We think that is the point of a seasonal kitchen. A menu that never changes is a menu that has stopped paying attention." },
    ],
  },
  {
    slug: "behind-the-kitchen-hearth",
    kicker: "Behind the Kitchen",
    title: "Inside the Hearth: A Day at the Fire",
    excerpt: "From the first spark at six in the morning to the last ember at midnight — one full day inside the kitchen that cooks with fire.",
    date: "2025-12-02",
    read: "8 min read",
    cover: 6897409,
    coverAlt: "Chef working over the flame at the stove",
    body: [
      { type: "p", text: "The hearth is lit at six in the morning, and it is never allowed to go out again until the room is empty. Wood burns down to coals; coals are banked, raked and fed through the day. By the time the first guest arrives, the fire is not a flame anymore — it is a bed of embers with a memory." },
      { type: "h2", text: "Six in the morning" },
      { type: "p", text: "The first chef in lights the fire and puts the stock on. Not for the menu — for the bones and trimmings of yesterday, which have been waiting overnight. Stock is the bank account of a hearth kitchen. We never spend more than we earn." },
      { type: "quote", text: "The fire is a colleague. You learn its moods. Some days it burns fast and bright; those are days for grilling. Some days it sulks; those are days for slow braises." },
      { type: "h2", text: "The evening shift" },
      { type: "p", text: "At five, the pass is set: towels folded, tweezers laid out, plates warming above the hearth. The rhythm of service is a waltz in three-quarter time — fire, plate, hand. Fire, plate, hand. Every plate leaves the pass with the same sentence spoken quietly: 'Enjoy.'" },
    ],
  },
  {
    slug: "chef-story-elena-marchetti",
    kicker: "Chef Stories",
    title: "Elena Marchetti: From Digging to Dinner",
    excerpt: "Our founder started as an archaeology student. She says the two disciplines are closer than they look.",
    date: "2025-11-10",
    read: "7 min read",
    cover: 20509791,
    coverAlt: "Portrait of Chef Elena Marchetti in the kitchen",
    body: [
      { type: "p", text: "Ask Elena Marchetti how she learned to cook and she will tell you she learned to dig first. Archaeology taught her to read a site the way a cook reads a pan: slowly, patiently, paying attention to what is underneath." },
      { type: "h2", text: "The accidental chef" },
      { type: "p", text: "She spent her university summers on excavations across the Mediterranean, and it was the dig kitchens — feeding forty people from a single gas ring and a crate of vegetables — that changed her life. 'I realised cooking was archaeology in reverse. Instead of uncovering what people ate, I was deciding what they would remember.'" },
      { type: "quote", text: "Every plate is a small excavation. Layer by layer — salt, acid, fire — until the truth of the ingredient appears." },
      { type: "p", text: "Today, Elena still cooks the Chef's Counter on weekends and tastes every sauce before service. Her kitchen staff are taught two things on their first day: how to hold a knife, and that the customer is not an interruption of the work — the customer is the work." },
    ],
  },
  {
    slug: "dining-guide-first-evening",
    kicker: "Dining Guide",
    title: "Your First Evening at Maison Noor: A Guide",
    excerpt: "How to choose between the menu, the tasting and the counter — and everything else worth knowing before you arrive.",
    date: "2025-10-21",
    read: "5 min read",
    cover: 37968303,
    coverAlt: "The candlelit dining room in the evening",
    body: [
      { type: "p", text: "A first visit to a restaurant you have been thinking about for months deserves a little planning. Here is how to make the most of an evening at Maison Noor." },
      { type: "h2", text: "Menu, tasting or counter?" },
      { type: "p", text: "The à la carte menu is for those who like to decide. The Hearth Tasting is seven courses from the open fire, no choices required — ideal for a first visit, because it shows the kitchen's full range. The Chef's Counter is twelve courses at the pass itself, and it is the full experience: expect three hours, ten seats and a running commentary from the people cooking your dinner." },
      { type: "h2", text: "Practical notes" },
      { type: "p", text: "Dinner runs from six until midnight, Tuesday to Sunday. The room dresses smartly but not stiffly. If you have allergies or aversions, tell us when you book — the kitchen would rather know. And one honest piece of advice: leave room for the bread. The bread is not a prelude. The bread is a course." },
    ],
  },
  {
    slug: "food-pairing-fire-wine",
    kicker: "Food Pairings",
    title: "What to Drink With Fire: Our Sommelier's Notes",
    excerpt: "Smoke is a flavour, not a problem. Our sommelier explains how to choose wine for a hearth-cooked meal.",
    date: "2025-09-14",
    read: "6 min read",
    cover: 3937673,
    coverAlt: "A glass of red wine at an elegant table",
    body: [
      { type: "p", text: "Guests often ask what wine survives a wood-fired kitchen. The honest answer: the right wine does not survive the fire — it joins it." },
      { type: "h2", text: "Smoke is a texture" },
      { type: "p", text: "Charred food asks for wines with a little weight and a little grip. A grilled ribeye wants a Cabernet with structure; ember-roasted vegetables are flattered by a white with texture, like a barrel-aged Chardonnay. The mistake is choosing something delicate and hoping it survives — it will not." },
      { type: "quote", text: "For a hearth kitchen, think of smoke as a spice. Then season the wine the same way you season the food." },
      { type: "h2", text: "Our house rules" },
      { type: "p", text: "We pour a dozen wines by the glass, chosen to sit beside the fire. Ask for the evening's list — it changes as often as the menu. And for the tasting menu, let us pair it: five glasses, poured at the moment each course is plated, is the way the kitchen intends the meal to be eaten." },
    ],
  },
  {
    slug: "restaurant-events-winter-series",
    kicker: "Restaurant Events",
    title: "The Winter Hearth Series",
    excerpt: "Through January, the courtyard fire burns every evening and the kitchen hosts a programme of long-table dinners, wine evenings and one unforgettable supper club.",
    date: "2025-08-30",
    read: "4 min read",
    cover: 17001748,
    coverAlt: "Long table by candlelight for the winter series",
    body: [
      { type: "p", text: "Winter is when a hearth kitchen comes into its own, and this year we are marking the season with a series of evenings built around the courtyard fire." },
      { type: "h2", text: "The programme" },
      { type: "p", text: "Long-table dinners seat forty beneath the courtyard trees, with a single slow menu cooked over the open fire. Wine evenings pair rare bottles with the grill. And once a month, the Chef's Counter becomes a supper club: twelve courses, one table, no menu, no cameras — the way dinner used to be." },
      { type: "p", text: "Places are limited and released a month ahead. The journal will carry each announcement; the reservation desk will carry your name. We look forward to lighting the fire for you." },
    ],
  },
];

export const CASE_STUDY = {
  title: "A digital dining experience, built end to end",
  summary:
    "WordbitX designed and developed this complete premium restaurant experience — restaurant storytelling, interactive menu, online ordering, multi-step reservations, private dining enquiries and an AI concierge — as a single unified platform.",
  chapters: [
    { n: "01", title: "Challenge", body: "A modern restaurant needs more than a brochure website. Guests expect to browse a living menu, understand the kitchen's philosophy, reserve a table in moments, order for pickup or delivery, and ask questions before they arrive. Most restaurant sites scatter these across third-party tools, each with its own look, login and lost customer." },
    { n: "02", title: "Strategy", body: "We treated the guest journey as one continuous experience — discovery, desire, decision, reservation or order. Every screen, from the editorial homepage to the reservation confirmation, was designed to feel like the restaurant itself: light, calm, deliberate." },
    { n: "03", title: "Design", body: "A light-luxury editorial interface: warm ivory, champagne and deep charcoal; a serif voice for storytelling and a modern sans for utility. Typography, whitespace, photography and motion carry the luxury — no gradients, no glass, no noise." },
    { n: "04", title: "Technology", body: "Next.js with the App Router, PostgreSQL and Drizzle ORM, structured data models ready for menu, orders, reservations and enquiries, an API-first AI concierge designed to accept a live model later, and a component architecture built for an admin dashboard." },
    { n: "05", title: "Experience", body: "The site behaves like the best kind of restaurant staff: it greets you, guides you, remembers your cart, answers your questions and never rushes you. Motion is subtle and purposeful; every interaction has a reason." },
    { n: "06", title: "Outcome", body: "Designed as a conversion-ready digital experience — a complete, demonstrable blueprint of the kind of platform WordbitX builds for restaurant owners, ready to connect to live booking, payment and management systems." },
  ],
  faqs: [
    { q: "What does WordbitX build for restaurants?", a: "WordbitX develops custom restaurant websites, online ordering experiences, reservation systems, digital menus, POS integrations, mobile apps and AI-powered customer experiences — designed and developed as one platform." },
    { q: "Is Maison Noor a real restaurant?", a: "No. Maison Noor is a fictional showcase brand created by WordbitX to demonstrate the level of design, engineering and hospitality thinking we can bring to a real restaurant." },
    { q: "Can this system handle real bookings and payments?", a: "Yes. The architecture is structured so live reservation, ordering, payment and admin systems can be connected — the demo runs on structured data and API-ready endpoints." },
    { q: "Where is WordbitX based?", a: "WordbitX is a software development company based in Lahore, Pakistan, serving clients in Pakistan, the USA, the UK, the UAE, Canada and Australia." },
  ],
};

export type JournalArticle = (typeof JOURNAL)[number];
export type JournalBlock = { type: "p" | "h2" | "quote"; text: string };

export const getArticle = (slug: string) => JOURNAL.find((j) => j.slug === slug);
export const pxW = px;
