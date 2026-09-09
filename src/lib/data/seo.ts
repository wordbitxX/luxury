import { MEDIA } from "./site";

export type ServicePage = {
  slug: string;
  title: string;
  eyebrow: string;
  heroTitle: string;
  heroSub: string;
  description: string;
  primaryTopic: string;
  keywords: string[];
  image: number;
  imageAlt: string;
  intro: string;
  features: { title: string; body: string }[];
  audience: string[];
  faqs: { q: string; a: string }[];
};

export const WORD_BIT_X_SERVICES: ServicePage[] = [
  {
    slug: "restaurant-website-development",
    title: "Restaurant Website Development",
    eyebrow: "WordbitX · Restaurant technology",
    heroTitle: "Restaurant websites with a point of view",
    heroSub: "WordbitX builds conversion-ready restaurant websites that make the food feel desirable before the first booking is made.",
    description: "WordbitX restaurant website development combines editorial design, interactive menus, reservations, online ordering and a mobile-first guest experience in one custom platform.",
    primaryTopic: "Restaurant Website Development",
    keywords: ["restaurant website design", "restaurant web development", "restaurant digital experience", "custom restaurant website"],
    image: MEDIA.diningArt.id,
    imageAlt: MEDIA.diningArt.alt,
    intro: "Restaurants need more than a brochure page. They need a digital front door that carries the personality of the room, answers practical questions, and moves a guest naturally from discovery to a reservation or direct order. WordbitX designs and develops that experience around the restaurant's real operation.",
    features: [
      { title: "Editorial brand expression", body: "A considered visual system for the room, the chef, the menu and the occasions the restaurant wants to own — without a template look." },
      { title: "Interactive digital menu", body: "Structured dishes with pricing, ingredients, dietary tags, allergens, pairings and rich detail states that are easy to browse on mobile." },
      { title: "Direct conversion paths", body: "Reservation, ordering, private dining and concierge journeys are designed as part of one customer experience, not a stack of disconnected tools." },
      { title: "Performance by design", body: "Semantic HTML, responsive imagery, efficient animation, accessible controls and a technical foundation that respects Core Web Vitals." },
    ],
    audience: ["Independent fine-dining restaurants", "Restaurant groups and hospitality brands", "Chef-led concepts launching a new venue", "Hotels seeking a distinctive dining experience"],
    faqs: [
      { q: "What does a custom restaurant website include?", a: "A custom restaurant website can include brand storytelling, menus, online ordering, table reservations, private dining enquiries, journal content, location information, analytics and an admin-ready content model." },
      { q: "Can WordbitX connect a restaurant POS or booking system?", a: "Yes. The front end can be connected to a live reservation engine, payment provider, POS, CRM or restaurant management platform through secure APIs." },
      { q: "Is the website suitable for mobile guests?", a: "Yes. The experience is designed mobile-first with touch-friendly browsing, fast interactions, sticky reservation actions and readable menu content." },
    ],
  },
  {
    slug: "restaurant-online-ordering",
    title: "Restaurant Online Ordering System",
    eyebrow: "WordbitX · Direct ordering",
    heroTitle: "A better route to the order",
    heroSub: "Give guests a direct online ordering experience that looks and feels like your restaurant — from first dish to final confirmation.",
    description: "WordbitX develops restaurant online ordering websites with rich menu data, cart customisation, pickup and delivery flows, customer details and API-ready order management.",
    primaryTopic: "Restaurant Online Ordering System",
    keywords: ["restaurant ordering website", "food ordering website development", "restaurant online ordering", "direct food ordering platform"],
    image: MEDIA.plateColor.id,
    imageAlt: MEDIA.plateColor.alt,
    intro: "Online ordering should not feel like a generic ecommerce checkout. It should preserve appetite, make choices clear, handle dietary needs responsibly and give the kitchen the information it needs. WordbitX builds direct ordering journeys that are beautiful at the surface and structured underneath.",
    features: [
      { title: "Menu-first ordering", body: "Guests browse categories, search dishes, inspect ingredients and open detailed dish sheets before adding anything to the bag." },
      { title: "Thoughtful customisation", body: "Options, quantities, special instructions and dietary notes are captured clearly so the order is useful to both guest and kitchen." },
      { title: "Pickup and delivery", body: "Flexible service types, addresses, fees, timing and customer details can be connected to a live fulfillment workflow." },
      { title: "Built for direct relationships", body: "Reduce dependence on disconnected marketplace experiences by giving your restaurant an ownable digital ordering channel." },
    ],
    audience: ["Restaurants taking direct pickup orders", "Delivery-led food brands", "Restaurant groups needing a unified ordering layer", "Bakeries, cafes and chef-led food businesses"],
    faqs: [
      { q: "Can customers customise dishes?", a: "Yes. Dish options, add-ons, quantity changes and special instructions can all be part of the ordering journey." },
      { q: "Can the ordering system support payments later?", a: "Yes. The demo architecture separates order capture from fulfillment and payment, making a provider such as Stripe or a local gateway straightforward to connect." },
      { q: "Can it integrate with a POS?", a: "Yes. Orders can be posted to a POS, kitchen display or restaurant management system through a secure API integration." },
    ],
  },
  {
    slug: "restaurant-reservation-system",
    title: "Restaurant Reservation System",
    eyebrow: "WordbitX · Booking experience",
    heroTitle: "Reservations that feel like hospitality",
    heroSub: "A calm, branded reservation flow for dates, guests, seating preferences, special requests and the details your team needs.",
    description: "WordbitX builds restaurant reservation websites and booking systems with multi-step journeys, availability logic, guest details, seating preferences and confirmation states.",
    primaryTopic: "Restaurant Reservation System",
    keywords: ["restaurant booking website", "restaurant table reservation system", "restaurant reservation website", "restaurant booking system"],
    image: MEDIA.tableNight.id,
    imageAlt: MEDIA.tableNight.alt,
    intro: "A reservation is the first promise a restaurant makes. WordbitX designs booking experiences that feel personal, reduce friction and collect the operational detail needed to welcome a guest well — without sending them through a generic third-party form.",
    features: [
      { title: "Multi-step by intention", body: "Date, party size, time, seating and guest details are separated into calm, readable steps that make a decision feel easy." },
      { title: "Seating and occasion logic", body: "Main room, terrace, chef's counter, private salons, celebrations and special requests can all be represented in the flow." },
      { title: "Availability-ready architecture", body: "The interface is prepared to connect to real table inventory, pacing rules, deposits, waitlists and confirmation messaging." },
      { title: "Admin visibility", body: "Bookings are structured for a team dashboard so reservations, orders and private dining enquiries can live in one operational view." },
    ],
    audience: ["Fine-dining and destination restaurants", "Restaurants with chef's counters or private rooms", "Hospitality groups replacing fragmented booking links", "New concepts designing their guest journey from scratch"],
    faqs: [
      { q: "Can a reservation system show real availability?", a: "Yes. The UI can consume live availability from a booking engine or restaurant management backend." },
      { q: "Can guests select a seating preference?", a: "Yes. Seating zones, terrace, window tables, chef's counter and private dining can be exposed as controlled options." },
      { q: "Can deposits and cancellation policies be added?", a: "Yes. Deposit collection, policy acknowledgement, reminder messages and cancellation handling can be integrated as part of the booking flow." },
    ],
  },
  {
    slug: "restaurant-software-development",
    title: "Restaurant Software Development",
    eyebrow: "WordbitX · Custom systems",
    heroTitle: "The operating layer behind the room",
    heroSub: "Custom restaurant technology that connects guest experience, menu operations, reservations, ordering and the team behind the pass.",
    description: "WordbitX develops custom restaurant software, digital menu systems, ordering platforms, reservation tools, POS integrations and AI hospitality experiences for modern food businesses.",
    primaryTopic: "Restaurant Software Development",
    keywords: ["custom restaurant software", "restaurant technology solutions", "restaurant management software", "restaurant POS software", "AI restaurant solutions"],
    image: MEDIA.chefStove.id,
    imageAlt: MEDIA.chefStove.alt,
    intro: "A restaurant's digital experience and its operating system should not be strangers. WordbitX works across customer-facing interfaces and the structured systems behind them — creating a foundation that can grow from a single venue to a multi-location hospitality operation.",
    features: [
      { title: "Unified data model", body: "Menu items, categories, prices, images, orders, reservations, customers, events and enquiries can be managed through a connected architecture." },
      { title: "POS and platform integrations", body: "Connect guest-facing experiences to POS, payments, CRM, loyalty, kitchen display and other operational tools through APIs." },
      { title: "AI hospitality layers", body: "Recommendation engines, ingredient answers, dietary guidance and reservation support can be added with an API-ready concierge foundation." },
      { title: "Admin and reporting", body: "Give managers the visibility to update content, review orders, manage reservations, understand demand and keep the brand consistent." },
    ],
    audience: ["Restaurant groups and hospitality operators", "Food businesses building proprietary technology", "POS and restaurant software companies needing product design", "International hospitality brands entering new markets"],
    faqs: [
      { q: "What is custom restaurant software?", a: "It is a technology platform designed around a restaurant's own workflows — menu management, ordering, reservations, operations, integrations and customer experience — rather than a one-size-fits-all template." },
      { q: "Can WordbitX build a restaurant POS?", a: "WordbitX can design and develop POS-adjacent software, kitchen workflows, ordering layers and integrations. The right scope depends on the operation and hardware requirements." },
      { q: "Does WordbitX work with businesses outside Pakistan?", a: "Yes. WordbitX is based in Pakistan and works with businesses in Pakistan and international markets including the USA, UK, UAE, Canada and Australia." },
    ],
  },
];

export const getServicePage = (slug: string) => WORD_BIT_X_SERVICES.find((page) => page.slug === slug);
