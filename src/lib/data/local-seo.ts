/* Local SEO landing pages for the Pakistan market. Each entry carries
   unique copy written for its intent — no spun duplicates. */

export type LocalPage = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  h1a: string;
  h1b: string;
  intro: string[];
  areaNote: string;
  dishes: string[];
  faqs: { q: string; a: string }[];
};

export const LOCAL_PAGES: LocalPage[] = [
  {
    slug: "restaurant-lahore",
    title: "Restaurant in Lahore — Dine In, Order Online | Maison Noor",
    description: "Looking for a restaurant in Lahore? Maison Noor in Gulberg serves BBQ, desi classics, continental plates and desserts — dine in, order online or reserve a table.",
    eyebrow: "Restaurant · Lahore",
    h1a: "A restaurant in Lahore",
    h1b: "worth leaving the house for.",
    intro: [
      "Lahore eats out more seriously than almost any city in the region — and a restaurant here earns its regulars one plate at a time. Maison Noor, set in Gulberg III near MM Alam Road, was built for exactly that standard: a calm, beautiful room, a kitchen that cooks over live fire, and a menu that moves from smoky BBQ to dum biryani without losing its nerve.",
      "Guests come for family dinners, birthday evenings, business lunches and quiet date nights. Others order the same menu to DHA, Johar Town, Model Town and Bahria Town. Whether you dine in, take away or order delivery, the promise is the same — food prepared fresh, priced honestly in rupees, and served with unhurried hospitality.",
    ],
    areaNote: "Find us at 7-C, The Boulevard, Gulberg III, Lahore — minutes from MM Alam Road, with valet parking from 17:30 and delivery across eight Lahore zones.",
    dishes: ["pk1", "q4", "r1", "d1"],
    faqs: [
      { q: "Where is Maison Noor located in Lahore?", a: "Maison Noor is a fictional demo restaurant concept set at 7-C, The Boulevard, Gulberg III, Lahore — close to MM Alam Road and DHA." },
      { q: "Does the restaurant deliver across Lahore?", a: "The demo ordering flow supports eight Lahore delivery zones including DHA, Gulberg, Johar Town, Model Town and Bahria Town, each with its own fee and time estimate." },
      { q: "Can I reserve a table online?", a: "Yes. The six-step reservation flow covers date, guests, time, indoor, outdoor, rooftop or private seating, and your contact details." },
    ],
  },
  {
    slug: "best-restaurants-lahore",
    title: "Best Restaurants in Lahore — A Local Food Guide | Maison Noor",
    description: "Searching the best restaurants in Lahore? Use our local food guide to choose by occasion — plus what a great Lahori menu, from BBQ to biryani, should deliver.",
    eyebrow: "Lahore food guide",
    h1a: "The best restaurants in Lahore",
    h1b: "share three habits.",
    intro: [
      "Ask ten Lahoris to name the best restaurants in Lahore and you will get eleven answers — but the places that last share three habits: ingredients bought fresh each morning, a kitchen with a point of view, and service that treats a Tuesday dinner like an occasion.",
      "This guide walks through how to judge a menu before you book: the honesty of a karahi, the patience of a nihari, the fire behind the BBQ, and whether dessert feels like an afterthought or a finale. Maison Noor is our working answer to that checklist — explore its forty-dish menu, order online, or book a table and judge for yourself.",
    ],
    areaNote: "Our demo room sits in Gulberg, Lahore — an easy drive from DHA, Model Town and Johar Town, and a short walk from MM Alam Road's food street energy.",
    dishes: ["pk2", "q2", "m2", "d3"],
    faqs: [
      { q: "What makes a restaurant one of the best in Lahore?", a: "Consistency across the whole menu, fresh daily preparation, fair pricing, and service that handles families, celebrations and quiet dinners equally well." },
      { q: "Which dishes should I try first?", a: "Start with the BBQ platter for the table, a Lahori-style chicken karahi or dum biryani for the main, and saffron kulfi to finish." },
      { q: "Is this a real restaurant I can visit?", a: "No. Maison Noor is a fictional concept built by WordbitX to demonstrate restaurant website, ordering and reservation technology." },
    ],
  },
  {
    slug: "fine-dining-lahore",
    title: "Fine Dining in Lahore — Tasting Menus & Chef's Counter | Maison Noor",
    description: "Fine dining in Lahore, done properly: tasting menus, a chef's counter, wine-style pairings and a quiet Gulberg dining room. Explore the experience and reserve.",
    eyebrow: "Fine dining · Lahore",
    h1a: "Fine dining in Lahore,",
    h1b: "without the stiffness.",
    intro: [
      "True fine dining in Lahore is not about white tablecloths alone — it is about pacing, produce and a kitchen confident enough to serve seven courses without showing off. Maison Noor's tasting format moves from market snacks to ember vegetables, fish, meat and a dessert of fire, with pairings poured alongside.",
      "The chef's counter seats ten guests at the pass for a twelve-course evening of roughly three hours. For a first visit, the main room offers the same kitchen at a gentler pace — reserve indoor, outdoor, rooftop or private seating online.",
    ],
    areaNote: "Evenings run Tuesday to Sunday from 18:00 in Gulberg III, Lahore. The counter books out quickly — reserve well ahead for weekends.",
    dishes: ["m1", "m2", "f3", "d1"],
    faqs: [
      { q: "What is the chef's counter experience?", a: "Ten seats at the kitchen pass, twelve courses served by the chefs who cooked them, across an evening of roughly three hours." },
      { q: "Is there a vegetarian tasting option?", a: "Yes. The Noor Vegetarian Arc is a full seven-course vegetarian journey, cooked on its own section of the hearth." },
      { q: "What should I wear?", a: "Smart but comfortable. The room is elegant and never stiff." },
    ],
  },
  {
    slug: "family-restaurant-lahore",
    title: "Family Restaurant in Lahore — Big Tables, Honest Prices | Maison Noor",
    description: "A family restaurant in Lahore with room for everyone: BBQ platters, karahi, biryani, kid-friendly plates and easy online ordering for the whole table.",
    eyebrow: "Family dining · Lahore",
    h1a: "Built for the whole",
    h1b: "family — dadi to the kids.",
    intro: [
      "A great family restaurant in Lahore needs three things: tables big enough for the whole khandaan, food that pleases both spice-lovers and picky eaters, and prices that don't punish you for bringing everyone.",
      "Maison Noor's family playbook is simple — a sizzling BBQ platter for the centre, karahi and biryani for the traditionalists, burgers and pizza for the kids, kulfi for dadi. Order ahead for pickup, get delivery to your doorstep, or reserve a large indoor or private table online.",
    ],
    areaNote: "Families visit from DHA, Johar Town, Model Town and Wapda Town. Parties above eight are happiest in private dining — tell us when you book.",
    dishes: ["q4", "pk1", "r1", "pz1"],
    faqs: [
      { q: "Do you have space for large families?", a: "Yes. Parties above eight are seated in private dining. Mention the headcount in your reservation request." },
      { q: "Is there kid-friendly food?", a: "Yes — burgers, pizza, loaded fries, mild pasta and desserts sit alongside the desi menu." },
      { q: "Can we order family dinner for delivery?", a: "Yes. The online ordering flow supports delivery across eight Lahore zones with live fees and time estimates." },
    ],
  },
  {
    slug: "rooftop-restaurant-lahore",
    title: "Rooftop Restaurant in Lahore — Dinner Under the Sky | Maison Noor",
    description: "A rooftop restaurant in Lahore for sunset dinners: BBQ over coals, cool drinks and city lights. Reserve rooftop seating online in minutes.",
    eyebrow: "Rooftop · Lahore",
    h1a: "Dinner tastes better",
    h1b: "with a little sky.",
    intro: [
      "October to March, Lahore belongs on the roof. A rooftop restaurant in Lahore lives or dies on three details: wind-proof heaters for December, shade that actually shades, and a grill menu built for open air.",
      "Maison Noor's rooftop serves the full BBQ and grill menu under the sky — tikka, seekh kabab, malai boti and platters built for sharing — with coolers, spritzes and chai for the table. Choose Rooftop seating in the reservation flow and mention sunset if the hour matters.",
    ],
    areaNote: "Rooftop seating runs October to March, weather permitting, above our Gulberg III dining room in Lahore.",
    dishes: ["q1", "q2", "q4", "dr3"],
    faqs: [
      { q: "When is rooftop seating available?", a: "Evenings from October to March, weather permitting. Select Rooftop when reserving." },
      { q: "Is the full menu served on the roof?", a: "Yes — the complete BBQ, desi and grill menu travels upstairs, along with coolers and hot chai." },
      { q: "Can we book the rooftop for a birthday?", a: "Yes. Mention the occasion in your request and the events team will plan the table, cake and flowers." },
    ],
  },
  {
    slug: "pakistani-restaurant-lahore",
    title: "Pakistani Restaurant in Lahore — Karahi, Nihari & Biryani | Maison Noor",
    description: "A Pakistani restaurant in Lahore serving slow-cooked nihari, desi-ghee karahi, dum biryani and daal makhani. Dine in or order online across Lahore.",
    eyebrow: "Pakistani · Lahore",
    h1a: "Desi food, cooked",
    h1b: "the slow way.",
    intro: [
      "A Pakistani restaurant in Lahore is judged on patience: nihari that cooked overnight, karahi reduced until the ghee rises, biryani sealed on dum. Maison Noor's desi menu follows the old rules — bone-in chicken, fresh-ground masalas, desi ghee where it counts.",
      "Order the classics for delivery across Lahore, or eat them where they taste best: at the table, with hot naan arriving in waves. Every desi dish lists its spice level and allergens before you order.",
    ],
    areaNote: "Desi favourites deliver across DHA, Gulberg, Johar Town, Model Town, Bahria Town, Wapda Town and Iqbal Town.",
    dishes: ["pk1", "pk2", "r1", "pk3"],
    faqs: [
      { q: "What desi dishes are on the menu?", a: "Chicken karahi, beef nihari, daal makhani, palak paneer, dum biryani, beef pulao and jeera rice with daal." },
      { q: "How spicy is the food?", a: "Each dish carries a spice indicator from mild to properly hot. Karahi and nihari sit at the top end." },
      { q: "Is the meat halal?", a: "This is a fictional demo concept, so no real food is served. A real WordbitX client site would carry the restaurant's own sourcing and halal information." },
    ],
  },
  {
    slug: "bbq-restaurant-lahore",
    title: "BBQ Restaurant in Lahore — Tikka, Kababs & Platters | Maison Noor",
    description: "A BBQ restaurant in Lahore worth the smoke: chicken tikka, beef seekh kabab, malai boti and sharing platters grilled over live coals. Order or reserve.",
    eyebrow: "BBQ · Lahore",
    h1a: "Live coals.",
    h1b: "Real smoke. No shortcuts.",
    intro: [
      "Lahore understands BBQ the way coastal cities understand fish — completely. A BBQ restaurant in Lahore earns its name at the coals: marinades that worked overnight, skewers turned by hand, and platters that arrive still sizzling.",
      "Maison Noor grills tikka, malai boti, beef seekh kabab and wings over live coals every evening, with raita, chutneys and hot naan alongside. The platter for two feeds a family of four — order it online or eat it under the sky on the roof.",
    ],
    areaNote: "BBQ travels well: order smoky platters for delivery to DHA, Gulberg, Johar Town and beyond, packed to stay hot.",
    dishes: ["q1", "q2", "q3", "q4"],
    faqs: [
      { q: "What is on the BBQ platter?", a: "Tikka, malai boti, seekh kabab and wings with naan, fries, raita and two chutneys — built for sharing." },
      { q: "How spicy is the BBQ?", a: "Tikka and seekh kabab carry real heat; malai boti stays gentle. Spice levels are marked on every dish." },
      { q: "Do you offer a free drink with the platter?", a: "The demo includes a free mint cooler with the BBQ platter — a real restaurant would configure its own offers in the admin dashboard." },
    ],
  },
  {
    slug: "restaurant-dha-lahore",
    title: "Restaurant in DHA Lahore — Dine In or Order Delivery | Maison Noor",
    description: "Craving more than DHA's usual? Maison Noor in nearby Gulberg serves BBQ, desi and continental plates — dine in minutes away or order delivery to DHA Lahore.",
    eyebrow: "DHA · Lahore",
    h1a: "DHA, dinner",
    h1b: "is sorted.",
    intro: [
      "DHA Lahore has no shortage of restaurants — but the memorable evenings usually involve leaving the phase. Maison Noor sits minutes away in Gulberg III, near MM Alam Road: valet parking, a calm dining room, rooftop tables in season, and private rooms for family occasions.",
      "Staying in? The full menu delivers to DHA in 45–60 minutes, packed hot with raita, chutneys and salads on the side. Order online, pay cash on delivery or by mobile transfer, and track your reference in one place.",
    ],
    areaNote: "Delivery to DHA Lahore: PKR 350, 45–60 minutes. Dine-in at 7-C, The Boulevard, Gulberg III — roughly fifteen minutes from DHA Phase 5.",
    dishes: ["pk1", "q4", "bg1", "d2"],
    faqs: [
      { q: "Do you deliver to DHA Lahore?", a: "The demo ordering flow includes DHA Lahore as a delivery zone at PKR 350 with a 45–60 minute estimate." },
      { q: "How far is the restaurant from DHA?", a: "The fictional venue sits in Gulberg III near MM Alam Road — about fifteen minutes from DHA Phase 5 by car." },
      { q: "What payment methods work for DHA delivery?", a: "Cash on delivery, JazzCash, Easypaisa and cards are presented at checkout; online payment integration is marked ready rather than live in this demo." },
    ],
  },
  {
    slug: "restaurant-gulberg-lahore",
    title: "Restaurant in Gulberg Lahore — Near MM Alam Road | Maison Noor",
    description: "A restaurant in Gulberg, Lahore — steps from MM Alam Road. BBQ, karahi, continental plates, rooftop tables and online ordering from Maison Noor.",
    eyebrow: "Gulberg · Lahore",
    h1a: "Gulberg's table",
    h1b: "is already set.",
    intro: [
      "Gulberg is Lahore's dining crossroads — MM Alam Road's buzz on one side, quiet boulevards on the other. A restaurant in Gulberg, Lahore has to serve both moods: the quick business lunch and the three-hour family dinner.",
      "Maison Noor sits at 7-C, The Boulevard, Gulberg III: lunch Friday to Sunday, dinner Tuesday to Sunday, rooftop in season, and delivery across Gulberg in 35–50 minutes. Walk in from the boulevard or order to your office — the kitchen doesn't distinguish.",
    ],
    areaNote: "Delivery across Gulberg: PKR 250, 35–50 minutes. Valet parking at the door from 17:30.",
    dishes: ["s2", "pk1", "p1", "k2"],
    faqs: [
      { q: "Is the restaurant near MM Alam Road?", a: "Yes — the fictional venue sits in Gulberg III, minutes from MM Alam Road." },
      { q: "Do you serve lunch in Gulberg?", a: "Lunch runs Friday to Sunday, 12:00–15:00, alongside corporate lunch options for nearby offices." },
      { q: "Where do I park?", a: "Valet parking runs from 17:30, with private parking for Salon and Chef's Table guests." },
    ],
  },
  {
    slug: "restaurant-johar-town-lahore",
    title: "Restaurant in Johar Town Lahore — Family Dining & Delivery | Maison Noor",
    description: "Looking for a restaurant near Johar Town, Lahore? Enjoy family platters, biryani and BBQ at Maison Noor — or order fast delivery to Johar Town.",
    eyebrow: "Johar Town · Lahore",
    h1a: "Johar Town,",
    h1b: "come hungry.",
    intro: [
      "Johar Town families eat together, eat late, and eat well — a restaurant serving Johar Town, Lahore needs sharing platters, honest prices and delivery that actually arrives hot.",
      "Maison Noor's family menu travels to Johar Town in 40–55 minutes: BBQ platters, karahi, biryani, burgers for the kids and kulfi for the end. Dining in? Large tables and private rooms handle the whole khandaan without a wait.",
    ],
    areaNote: "Delivery to Johar Town: PKR 300, 40–55 minutes. The Gulberg dining room is roughly twenty minutes by car.",
    dishes: ["q4", "r1", "pz1", "d3"],
    faqs: [
      { q: "Do you deliver to Johar Town?", a: "Yes — Johar Town is a delivery zone in the demo checkout at PKR 300, arriving in 40–55 minutes." },
      { q: "What is good for kids?", a: "Burgers, pizza, loaded fries, mild pasta and desserts — alongside smaller portions of desi favourites." },
      { q: "Can we book for a dawat of 20?", a: "Yes. Choose private dining in the reservation flow or send an event enquiry for a full buyout plan." },
    ],
  },
];

export const getLocalPage = (slug: string) => LOCAL_PAGES.find((p) => p.slug === slug);
