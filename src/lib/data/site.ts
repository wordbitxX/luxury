/* ------------------------------------------------------------------ */
/*  Maison Noor — brand, contact, media & helpers                      */
/*  Fictional premium restaurant demo — digital experience by WordbitX */
/* ------------------------------------------------------------------ */

/* Future deployment base — keeps canonicals & sitemap architecture-ready */
export const DEMO_BASE = "https://www.wordbitxtech.com/maison-noor";

export const WORD_BIT_X = {
  name: "WordbitX",
  url: "https://www.wordbitxtech.com/",
  displayDomain: "wordbitxtech.com",
  contactUrl: "https://www.wordbitxtech.com/contact",
  servicesUrl: "https://www.wordbitxtech.com/services",
  hospitalityUrl: "https://www.wordbitxtech.com/industries/hospitality",
  blurb:
    "Custom websites, software, mobile apps and AI-powered experiences. Designed and developed in Pakistan, for businesses worldwide.",
  /* Primary contact is Pakistan; USA line serves international clients. */
  phones: {
    pk: {
      label: "Pakistan (Main)",
      display: "+92 325 1888841",
      tel: "+923251888841",
      wa: "923251888841",
    },
    us: {
      label: "USA",
      display: "+1 (929) 619-7699",
      tel: "+19296197699",
      wa: "19296197699",
    },
  },
};

export const SITE = {
  name: "Maison Noor",
  shortName: "NOOR",
  legalName: "Maison Noor Restaurant",
  tagline: "An evening shaped by light, fire and time.",
  cuisine: "Contemporary fire cuisine · European technique, South Asian soul",
  heroStatement:
    "A single table, a long evening, and a kitchen that cooks with fire the way it has always been cooked — honestly, slowly, without shortcuts.",
  story:
    "Maison Noor began with a question: what would a restaurant feel like if every detail — the light, the linen, the rhythm of the room — was treated with the same care as the plate? In a restored courtyard house in Lahore, we built that answer around an open hearth, seasonal ingredients and a kitchen that answers to no clock but the fire.",
  est: "MMXXII",
  founded: "2022",
  city: "Lahore",
  country: "Pakistan",
  addressLines: ["7-C, The Boulevard", "Gulberg III, Lahore 54660", "Pakistan"],
  mapQuery: "Gulberg III, Lahore, Pakistan",
  phoneDisplay: "+92 325 1888841",
  phoneRaw: "+923251888841",
  email: "table@maisonnoor.example",
  hours: [
    { days: "Tuesday — Sunday", label: "Dinner", time: "18:00 — 00:00" },
    { days: "Friday — Sunday", label: "Lunch", time: "12:00 — 15:00" },
    { days: "Monday", label: "Closed", time: "The kitchen rests" },
  ],
  notes: [
    "Valet parking available from 17:30",
    "Private parking for guests of the Salon & Chef's Table",
    "15 minutes from Allama Iqbal International Airport",
  ],
  currency: { symbol: "PKR", code: "PKR" },
  /* Demo only — structure prepared for a live booking engine */
  reservationLeadHours: 3,
};

export const CHEF = {
  name: "Elena Marchetti",
  title: "Founder & Executive Chef",
  portraitMain: 20509791,
  portraitAlt: 5737830,
};

/* ------------------------------------------------------------------ */
/*  Pakistan ordering configuration                                    */
/*  WhatsApp ordering goes to the main PK line by default; override    */
/*  per deployment with NEXT_PUBLIC_WHATSAPP_NUMBER (digits only).     */
/* ------------------------------------------------------------------ */

export const WHATSAPP_NUMBER =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) || "923251888841";

export const WHATSAPP_DISPLAY = "+92 325 1888841";

export const DELIVERY_AREAS = [
  { id: "dha", name: "DHA Lahore", fee: 350, eta: "45–60 min" },
  { id: "gulberg", name: "Gulberg", fee: 250, eta: "35–50 min" },
  { id: "mm-alam", name: "MM Alam Road", fee: 250, eta: "35–50 min" },
  { id: "johar-town", name: "Johar Town", fee: 300, eta: "40–55 min" },
  { id: "model-town", name: "Model Town", fee: 300, eta: "40–55 min" },
  { id: "bahria-town", name: "Bahria Town", fee: 450, eta: "55–75 min" },
  { id: "wapda-town", name: "Wapda Town", fee: 300, eta: "40–55 min" },
  { id: "iqbal-town", name: "Iqbal Town", fee: 350, eta: "45–60 min" },
] as const;

export type PaymentMethodId = "cod" | "counter" | "jazzcash" | "easypaisa" | "card";

export const PAYMENT_METHODS: { id: PaymentMethodId; name: string; note: string }[] = [
  { id: "cod", name: "Cash on Delivery", note: "Pay at your door" },
  { id: "counter", name: "Cash at Restaurant", note: "Pay on pickup or dine-in" },
  { id: "jazzcash", name: "JazzCash", note: "Mobile account transfer" },
  { id: "easypaisa", name: "Easypaisa", note: "Mobile account transfer" },
  { id: "card", name: "Card Payment", note: "Debit / credit card" },
];

export const SERVICE_TYPES = [
  { id: "delivery", name: "Delivery", note: "To your doorstep" },
  { id: "pickup", name: "Pickup", note: "Ready in ~35 minutes · No fee" },
  { id: "dinein", name: "Dine-In", note: "We will keep your table ready" },
] as const;

export type ServiceTypeId = (typeof SERVICE_TYPES)[number]["id"];

export const areaFee = (areaId: string) =>
  DELIVERY_AREAS.find((a) => a.id === areaId)?.fee ?? 350;

/* ------------------------------------------------------------------ */
/*  Photography — real editorial stock, keyed by semantic id           */
/* ------------------------------------------------------------------ */

// Keep the same photographs without depending on binary files being carried
// over from the sandbox into the hosting deployment. next/image still handles
// responsive sizing and caching; RestaurantImage adds bounded error recovery.
import { photoUrl } from "../image-sources";
export const px = photoUrl;

type MediaEntry = {
  id: number;
  alt: string;
  ext?: string;
};

export const MEDIA: Record<string, MediaEntry> = {
  /* interiors & room */
  heroRoom: { id: 37968303, alt: "Candlelit dining tables set with linen in the evening light of Maison Noor" },
  diningVault: { id: 12919407, alt: "Light-filled dining room with linen-dressed tables and tall windows" },
  diningArt: { id: 12387896, alt: "Editorial interior of the restaurant's main dining hall" },
  tableSetting: { id: 1872889, alt: "Set table with crystal glasses and soft candlelight" },
  tableFloral: { id: 17294737, alt: "Long table dressed in ivory linen with seasonal flowers" },
  tableNight: { id: 17001748, alt: "Candlelit table prepared for a private dinner" },
  banquet: { id: 16935958, alt: "Private banquet table with candles and floral arrangements" },
  womanDining: { id: 3926205, alt: "Guest seated alone at a beautifully set table in the dining room" },
  wineGlasses: { id: 9556512, alt: "Glassware and tableware arranged on a warm restaurant table" },
  wineBar: { id: 12181763, alt: "Wine service laid out with a bottle and glasses under warm light" },
  redWine: { id: 3937673, alt: "Glass of red wine beside an elegant table setting" },
  cocktailBar: { id: 31631249, alt: "Neatly arranged coupe glasses at the bar" },
  martini: { id: 3092967, alt: "Martini with a twist of citrus at the lounge bar" },
  warmLamp: { id: 32395820, alt: "Drinks on a marble table lit by a warm lamp" },

  /* dishes */
  fishHerb: { id: 24186303, alt: "Refined yellow fire-cooked course on a dark plate with fresh herbs" },
  scallops: { id: 24289213, alt: "Elegant seafood course with foam, herbs and microgreens on a dark plate" },
  salmonCouscous: { id: 6297198, alt: "Slow-roasted salmon over couscous and roasted vegetables" },
  greenBowl: { id: 15671324, alt: "Seasonal greens in a handmade bowl with herb dressing" },
  pastrySauce: { id: 34520959, alt: "Minimalist gourmet plate with pastry and sauce" },
  seafoodPlate: { id: 22994309, alt: "Artfully plated seafood course" },
  shrimpCrisp: { id: 32793290, alt: "Crisp prawns with microgreens and emulsion" },
  plateGreen: { id: 29101365, alt: "Colourful seasonal vegetable course revealed beneath a chef's hand" },
  plateColor: { id: 19748948, alt: "Minimalist gourmet duck course with broccoli and sauce" },
  searedFish: { id: 24186303, alt: "Seared fish-style course with citrus and herbs on a dark plate" },
  signatureVegetable: { id: 29101365, alt: "Seasonal vegetable course plated with vivid colour and restraint" },
  signatureHearth: { id: 7243877, alt: "Gourmet meat course with spinach and vibrant mustard sauce" },
  signatureDessert: { id: 35708376, alt: "Artistic honeycomb and cream dessert on a dark plate" },
  signatureSeafood: { id: 24289213, alt: "Elegant seafood course with foam, herbs and microgreens on a dark plate" },

  /* dessert */
  dessertChoc: { id: 35546720, alt: "Chocolate dessert with minimalist artistic plating" },
  dessertCitrus: { id: 17035085, alt: "Gourmet dessert of orange, blueberry and edible flowers" },
  dessertPlating: { id: 12258206, alt: "Hand plating a dessert with edible flowers", ext: "png" },
  dessertGarnish: { id: 15671269, alt: "Dessert finished with fresh garnish and sauce" },
  dessertRedVelvet: { id: 35622247, alt: "Red velvet dessert with artistic garnish" },
  dessertFig: { id: 39314857, alt: "Fig and berry dessert on a striped ceramic plate" },

  /* kitchen & craft */
  chefChopping: { id: 8629083, alt: "Chef's hands preparing green vegetables on a board" },
  chefSlice: { id: 4252142, alt: "Chef slicing onion among fresh vegetables in the pass" },
  chefFinish: { id: 8629120, alt: "Chef adding the final garnish to a plate in the kitchen" },
  chefStove: { id: 6897409, alt: "Chef finishing a vegetable dish at the stove" },
  chefFocus: { id: 8093836, alt: "Chef at work over the preparation bench" },
  chefSeason: { id: 37923425, alt: "Chef seasoning an avocado dish with precision" },
  chefPortrait: { id: 20509791, alt: "Portrait of Executive Chef Elena Marchetti in the kitchen" },
  chefSmile: { id: 5737830, alt: "Portrait of Executive Chef Elena Marchetti at rest" },
  chefPlating: { id: 4253315, alt: "Chef plating a course with focused precision" },
};

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-PK").format(n) + " " + SITE.currency.symbol;

export const metaImage = px(MEDIA.heroRoom.id, 1200, 630);
