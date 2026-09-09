/* Lahore food guides — SEO content hub. Unique, practical copy per guide. */

export type Guide = {
  slug: string;
  title: string;
  description: string;
  read: string;
  intro: string;
  sections: { h: string; p: string[] }[];
  faq: { q: string; a: string };
};

const G = (
  slug: string, title: string, description: string, read: string, intro: string,
  sections: { h: string; p: string[] }[], faq: { q: string; a: string }
): Guide => ({ slug, title, description, read, intro, sections, faq });

export const GUIDES: Guide[] = [
  G("best-restaurants-lahore-guide", "Best Restaurants in Lahore: Complete Food Guide", "The complete Lahore food guide — how to pick BBQ, desi, continental and family restaurants across DHA, Gulberg, Johar Town and MM Alam Road.", "8 min read",
    "Lahore rewards people who take food seriously. This guide helps you choose where to eat — by cuisine, occasion and neighbourhood — instead of scrolling reviews for an hour.",
    [
      { h: "Start with the occasion, not the cuisine", p: ["A birthday needs a private room and a cake plan; a business lunch needs speed and quiet corners; a family dawat needs sharing platters and tolerant service. Decide the evening first, then let the menu follow.", "Maison Noor's demo covers all three modes — reserve indoor, outdoor, rooftop or private seating, or order the same menu home."] },
      { h: "Judge the menu before you book", p: ["Look for specifics: overnight marinades, dum biryani, tasting menus with real structure. Vague superlatives on a menu usually mean a vague kitchen.", "Check spice indicators, allergen notes and honest pricing in rupees — all present on our forty-dish demo menu."] },
      { h: "Neighbourhood cheat sheet", p: ["DHA and Clifton-style evenings suit Gulberg's calm rooms; MM Alam Road brings the buzz; Johar Town and Model Town reward family platters and easy parking. Delivery zones now cover all of them.", "When in doubt, order a BBQ platter for the table and a karahi for the traditionalists — no Lahori table has ever regretted that combination."] },
    ],
    { q: "Is Maison Noor a real restaurant I can visit?", a: "No. It is a fictional concept by WordbitX demonstrating restaurant websites, ordering and reservations." }),
  G("best-rooftop-restaurants-lahore", "Best Rooftop Restaurants in Lahore", "Lahore's rooftop season, decoded: what to order, when to go, and how to book a sunset table without the stress.", "5 min read",
    "From October to March, the best seat in Lahore has no roof. Here is how to do rooftop dining properly.",
    [
      { h: "Go for sunset, stay for the grill", p: ["Arrive forty minutes before maghrib for golden light, then let the coals take over: tikka, seekh kabab and malai boti all taste better with a breeze.", "Book Rooftop seating explicitly — ground-floor tables can't be moved upstairs on a busy night."] },
      { h: "Dress for December", p: ["Lahore winter nights drop fast. Heaters help, but a shawl beats shivering through dessert.", "Hot chai and coolers both belong on a rooftop table; order both and let the evening decide."] },
    ],
    { q: "When is rooftop season in Lahore?", a: "Roughly October to March. Summer rooftops are for the very brave." }),
  G("best-pakistani-food-lahore", "Best Pakistani Food in Lahore", "Karahi, nihari, biryani and daal — where desi classics come from and how to tell the great ones apart.", "6 min read",
    "Desi food is Lahore's mother tongue. This guide explains what makes each classic sing — and what to order first.",
    [
      { h: "Karahi: the ghee must rise", p: ["A proper Lahori karahi has no onions — just tomatoes, ginger, green chillies and desi ghee reduced until it glistens. Bone-in chicken only.", "Eat it with hot tandoori naan, never rice. Those are the rules."] },
      { h: "Nihari: patience you can taste", p: ["Overnight shank, silken gravy, ginger and lime on top. If it arrived in twenty minutes, it isn't nihari.", "Pair with khamiri roti and a salty lassi, then cancel your morning plans."] },
      { h: "Biryani vs pulao", p: ["Biryani is layered and bold; pulao is fragrant restraint built on yakhni. Lahore loves both and argues about neither at the table.", "Friday demands biryani. This is not a debate."] },
    ],
    { q: "How spicy is Lahori desi food?", a: "Properly hot at the top end. Our demo menu marks every dish from mild to spicy so there are no surprises." }),
  G("best-bbq-restaurants-lahore", "Best BBQ Restaurants in Lahore", "Tikka, seekh kabab, malai boti and the perfect platter — a smoke-lover's guide to BBQ in Lahore.", "5 min read",
    "BBQ is Lahore's love language. Here's how to order it like you mean it.",
    [
      { h: "Know your cuts", p: ["Tikka brings char and chew; seekh kabab brings juice; malai boti brings melt. A platter lets the table stop arguing and start eating.", "Always ask what comes with it — naan, raita and chutneys should be part of the deal, not a surprise on the bill."] },
      { h: "Heat, honestly marked", p: ["Green chillies hide in marinades. Good menus mark spice levels; great ones let you adjust them.", "Mint raita is not a garnish — it is fire insurance. Keep it close."] },
    ],
    { q: "What feeds a family of six?", a: "A BBQ platter for two plus a karahi and biryani covers six hungry people with leftovers worth fighting over." }),
  G("best-family-restaurants-lahore", "Best Family Restaurants in Lahore", "Big tables, kid-friendly plates and bills that don't sting — how to choose a family restaurant in Lahore.", "5 min read",
    "Feeding the whole khandaan is logistics as much as dinner. This guide makes it painless.",
    [
      { h: "Book for the headcount you have, not the one you hope for", p: ["Parties above eight need private rooms — book them explicitly and mention kids, wheelchairs or high chairs in the request.", "Arrive together when you can; kitchens fire family orders as one wave."] },
      { h: "Order for every generation", p: ["Karahi and biryani for the elders, BBQ for the uncles, burgers and pizza for the kids, kulfi for dadi. Nobody compromises.", "Delivery works for dawats at home: one order, labelled boxes, zero dishes."] },
    ],
    { q: "Do family restaurants need reservations?", a: "On weekends, absolutely — especially for groups above six. Weekday lunches are usually calmer." }),
  G("birthday-dinner-lahore", "Best Restaurants for Birthday Dinner in Lahore", "Private rooms, cakes, flowers and a table that feels like yours — planning a birthday dinner in Lahore.", "4 min read",
    "A birthday dinner should feel personal, not procedural. Here's the planning checklist that actually matters.",
    [
      { h: "The room matters more than the menu", p: ["A private room turns dinner into an event. Book Private Dining, share the headcount and mention the cake.", "Flowers, a printed menu card and a candle on dessert cost little and photograph beautifully."] },
      { h: "Order of operations", p: ["Starters for grazing while latecomers arrive, a shared main so nobody waits, dessert with the candles. Tell the kitchen the schedule — they'll pace it.", "For home birthdays, order the same menu for delivery and spend the savings on a bigger cake."] },
    ],
    { q: "How far ahead should I book a birthday dinner?", a: "Two weeks for private rooms in season; a month for December weekends." }),
  G("best-fine-dining-lahore", "Best Fine Dining Restaurants in Lahore", "Tasting menus, chef's counters and quiet rooms — what fine dining in Lahore looks like at its best.", "6 min read",
    "Fine dining in Lahore is about restraint: fewer dishes, better ingredients, and service that disappears when it should.",
    [
      { h: "Tasting menu or à la carte?", p: ["First visit? Take the tasting menu — it shows the kitchen's full range without decisions. Regulars order à la carte and their usual table.", "Vegetarian guests should ask about a dedicated arc, not adaptations of the meat menu."] },
      { h: "The counter is a different sport", p: ["Ten seats, twelve courses, three hours, front-row fire. Book ahead, arrive hungry, and talk to the chefs — that is the point.", "Pairings matter more at the counter; let the sommelier pour."] },
    ],
    { q: "What does fine dining cost in Lahore?", a: "Mains typically run PKR 1,500–7,000 in premium rooms; tasting experiences higher. Our demo menu lists every price upfront." }),
  G("best-restaurants-dha-lahore", "Best Restaurants in DHA Lahore", "DHA dining without the guesswork — plus delivery and Gulberg rooms minutes away.", "4 min read",
    "DHA Lahore eats well, but the best evenings often start with a short drive. Here's the playbook.",
    [
      { h: "Dine out or order in?", p: ["Celebrations deserve the drive to Gulberg — valet, rooftop, private rooms. Weeknights deserve delivery: 45–60 minutes to DHA, packed hot.", "Cash on delivery, JazzCash and Easypaisa all work at checkout in the demo flow."] },
      { h: "What travels best to DHA?", p: ["Karahi, biryani and BBQ platters survive the ride beautifully. Order raita and salads on the side — they travel in separate boxes.", "Desserts arrive chilled; kulfi is practically built for delivery."] },
    ],
    { q: "How long is delivery to DHA?", a: "The demo checkout estimates 45–60 minutes to DHA at PKR 350." }),
  G("restaurants-near-mm-alam-road", "Best Restaurants Near MM Alam Road", "The MM Alam Road food run: where the buzz is, where the calm is, and what to order.", "4 min read",
    "MM Alam Road is Lahore's loudest dinner conversation. Here's how to navigate it.",
    [
      { h: "Buzz vs calm", p: ["The road itself brings energy, music and people-watching. One boulevard over, Gulberg's quiet rooms bring conversation.", "Do both in one week. That is the Lahori way."] },
      { h: "Parking is strategy", p: ["Valet from 17:30 beats circling for twenty minutes. For groups, one car with parking beats three without.", "Lunch hours are calmer — corporate tables eat well Friday to Sunday, 12:00–15:00."] },
    ],
    { q: "Is there parking near MM Alam Road restaurants?", a: "Our fictional Gulberg venue offers valet from 17:30 plus private parking for Salon and Chef's Table guests." }),
  G("where-to-eat-lahore", "Where to Eat in Lahore: Local Food Guide", "First time eating out in Lahore? Start here — areas, dishes, etiquette and a perfect first weekend.", "7 min read",
    "New to Lahore's food scene? This is your orientation week, compressed into one guide.",
    [
      { h: "The areas", p: ["Gulberg and MM Alam Road for variety, DHA for polished rooms, Johar Town and Model Town for family value, old Lahore for breakfast history.", "Pick one area per evening. Lahore traffic punishes ambition."] },
      { h: "The dishes", p: ["Karahi, nihari, biryani, BBQ platter, chow mein, and kulfi. Six dishes, six arguments settled.", "Order chai with breakfast, lassi with nihari, and mint coolers with everything grilled."] },
      { h: "The etiquette", p: ["Sharing is default — order for the table, not the person. The host orders; guests suggest. Whoever suggests the restaurant pays is a myth; whoever invited, pays.", "Friday lunch is sacred. Book ahead or eat at 15:00."] },
    ],
    { q: "What is the one dish I must try in Lahore?", a: "If forced to one: dum biryani on Friday, or desi-ghee chicken karahi any other day." }),
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
