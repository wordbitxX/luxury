/* ------------------------------------------------------------------ */
/*  Maison Noor — menu data                                            */
/*  Structured so it can be served from a database later without       */
/*  touching UI (id + imageId map to a `dishes` table).                */
/* ------------------------------------------------------------------ */

export type DietaryTag = "V" | "VG" | "GF" | "N" | "D" | "E" | "SF";

export const DIET_META: Record<DietaryTag, { label: string; group: "veg" | "vegan" | "gf" | "allergen" }> = {
  V: { label: "Vegetarian", group: "veg" },
  VG: { label: "Vegan", group: "vegan" },
  GF: { label: "Gluten-free", group: "gf" },
  N: { label: "Contains nuts", group: "allergen" },
  D: { label: "Contains dairy", group: "allergen" },
  E: { label: "Contains eggs", group: "allergen" },
  SF: { label: "Contains shellfish", group: "allergen" },
};

export type DishOption = { id: string; label: string; delta: number };

export type Dish = {
  id: string;
  cat: string;
  name: string;
  desc: string;
  price: number;
  ingredients: string[];
  tags: DietaryTag[];
  img: number;
  imgExt?: string;
  spicy?: 1 | 2;
  chef?: boolean;
  popular?: boolean;
  signature?: boolean;
  chefNote: string;
  allergens: string[];
  pairing: string;
  options?: DishOption[];
};

export type Category = {
  id: string;
  name: string;
  kicker: string;
  note: string;
  img: number;
};

export const CATEGORIES: Category[] = [
  { id: "breakfast", name: "Breakfast", kicker: "Morning light", note: "Served Friday — Sunday until 15:00", img: 15671324 },
  { id: "starters", name: "Starters", kicker: "To begin", note: "Small plates from the hearth", img: 32793290 },
  { id: "soups", name: "Soups", kicker: "Slow & warming", note: "Simmered over embers each morning", img: 15671324 },
  { id: "salads", name: "Salads", kicker: "Garden & market", note: "Dressed at the moment of service", img: 19409040 },
  { id: "mains", name: "Main Course", kicker: "From the kitchen", note: "Composed plates of the season", img: 27612507 },
  { id: "chefs-selection", name: "Chef's Selection", kicker: "The tasting menus", note: "A single arc, seven movements", img: 8112891 },
  { id: "grill", name: "Steak & Grill", kicker: "Over the fire", note: "Ember & oak, rested and carved", img: 7243881 },
  { id: "seafood", name: "Seafood", kicker: "From the coast", note: "Arriving whole, cooked simply", img: 22994309 },
  { id: "pasta", name: "Pasta", kicker: "Rolled by hand", note: "Made each afternoon in the pastry room", img: 34520959 },
  { id: "desserts", name: "Desserts", kicker: "To close", note: "The sweet last word", img: 35546720 },
  { id: "coffee", name: "Coffee", kicker: "The bar", note: "Single origin, roasted in Lahore", img: 32395820 },
  { id: "beverages", name: "Beverages", kicker: "Cellar & bar", note: "Wines, aperitifs and long drinks", img: 3937673 },
  { id: "bbq", name: "BBQ", kicker: "Smoke & coal", note: "Skewers over live coals, served sizzling", img: 7243881 },
  { id: "pakistani", name: "Pakistani", kicker: "Desi classics", note: "Slow-cooked favourites of the house", img: 8629083 },
  { id: "chinese", name: "Chinese", kicker: "Wok & fire", note: "High-heat wok cooking, Lahori-Chinese style", img: 32793290 },
  { id: "burgers", name: "Burgers", kicker: "Stacked high", note: "Grilled patties, toasted brioche buns", img: 34520959 },
  { id: "pizza", name: "Pizza", kicker: "Wood-fired", note: "Leopard-spotted crusts from the oven", img: 27612507 },
  { id: "rice", name: "Rice", kicker: "Dum & steam", note: "Fragrant basmati, sealed on dum", img: 15671324 },
];

const D = (
  id: string,
  cat: string,
  name: string,
  desc: string,
  price: number,
  ingredients: string[],
  tags: DietaryTag[],
  img: number,
  chefNote: string,
  allergens: string[],
  pairing: string,
  extra?: Partial<Dish>
): Dish => ({
  id,
  cat,
  name,
  desc,
  price,
  ingredients,
  tags,
  img: ({
    b1: 9597589, b3: 9597589, s3: 24706519, so1: 38786370,
    m1: 24289215, m2: 11795618, m3: 36430166, m5: 19748948,
    g1: 27305335, g2: 27305335, g3: 11795618,
    p1: 38868615, p2: 38868615, p3: 34342499,
    d1: 34552000, k1: 459489, k2: 459489,
  } as Record<string, number>)[id] ?? img,
  chefNote,
  allergens,
  pairing,
  ...extra,
});

export const DISHES: Dish[] = [
  /* ---------------- Breakfast ---------------- */
  D("b1", "breakfast", "Brioche Perdue", "Thick-cut brioche soaked overnight in vanilla custard, seared in cultured butter and finished with burnt-honey figs.", 1850, ["Brioche", "Vanilla custard", "Burnt honey", "Black figs"], ["V", "E", "D"], 34520959, "We toast the brioche over low embers until the edges caramelise — patience is the flavour.", ["Gluten", "Eggs", "Dairy", "Nuts"], "Masala chai latte, or a glass of chilled Chaï Infusé", { options: [{ id: "b1-a", label: "Add pistachio crumble", delta: 350 }] }),
  D("b2", "breakfast", "Shakshuka Noor", "Eggs baked in a slow pepper & tomato sofrito, spiced with roasted cumin, served with grilled sourdough from our own oven.", 1650, ["Free-range eggs", "Roasted peppers", "Tomato sofrito", "Cumin", "Sourdough"], ["V", "E"], 8629120, "Our sofrito cooks for two hours before the eggs ever meet the pan.", ["Eggs", "Gluten"], "Fresh lime soda with mint", { spicy: 1, options: [{ id: "b2-a", label: "Add feta & herbs", delta: 250 }] }),
  D("b3", "breakfast", "Cardamom French Toast", "Saffron-cardamom custard, caramelised banana, roasted coconut and a dusting of pistachio soil.", 1750, ["Brioche", "Saffron", "Cardamom", "Banana", "Coconut", "Pistachio"], ["V", "E", "D", "N"], 15671269, "A nod to the chai houses of old Lahore, translated into breakfast.", ["Gluten", "Eggs", "Dairy", "Nuts"], "House chai, brewed with whole spices", { popular: true }),
  D("b4", "breakfast", "Market Fruit & Flowers", "A composition of the morning market — citrus, stone fruit and berries — with elderflower, edible flowers and toasted seeds.", 1250, ["Seasonal fruit", "Elderflower", "Edible flowers", "Toasted seeds"], ["VG", "GF"], 15671324, "Dressed only with lime and a whisper of rosewater.", ["Seeds"], "Grapefruit & basil cooler"),
  D("b5", "breakfast", "Smoked Salmon Rosti", "Crisp potato rosti, cured salmon from the coast, caper cream and a soft hen's egg.", 2150, ["Potato rosti", "Cured salmon", "Caper cream", "Hen's egg"], ["D", "E"], 6297198, "The salmon is cured in-house with fennel and juniper for forty-eight hours.", ["Fish", "Eggs", "Dairy"], "Blood orange & mint spritz"),

  /* ---------------- Starters ---------------- */
  D("s1", "starters", "Ember-Roasted Celeriac", "Celeriac roasted whole in ember ash until molten, lifted with brown butter, hazelnut and a sharp apple verjus.", 1450, ["Celeriac", "Brown butter", "Hazelnut", "Apple verjus"], ["V", "GF", "N", "D"], 29101365, "Our most requested starter — the celeriac spends ninety minutes in the coals.", ["Nuts", "Dairy"], "Arneis, Piedmont, Italy", { signature: true, popular: true }),
  D("s2", "starters", "Crisp Prawns, Green Chile Aioli", "Butterflied prawns in a featherlight batter, charred lime and a green chile aioli that arrives with a gentle heat.", 1950, ["Prawns", "Rice flour", "Green chile", "Lime"], ["SF", "E"], 32793290, "The batter is made with rice flour and sparkling water — shattering, never oily.", ["Shellfish", "Eggs"], "Albariño, Rías Baixas, Spain", { spicy: 2, popular: true }),
  D("s3", "starters", "Burrata & Burnt Tomato", "Creamy burrata over fire-roasted tomatoes, basil oil and torn sourdough crostini.", 1650, ["Burrata", "Heirloom tomatoes", "Basil", "Sourdough"], ["V", "D"], 17294737, "Tomatoes are charred on the hearth until the sugars begin to weep.", ["Dairy", "Gluten"], "Rosé de Provence, France"),
  D("s4", "starters", "Duck & Fig Terrine", "Slow-cooked duck pressed with black figs and pistachio, served with pickled mustard seeds and grilled bread.", 1850, ["Duck", "Black figs", "Pistachio", "Mustard seeds"], ["N", "E"], 7243881, "Pressed for two days under stone for a clean, dense slice.", ["Nuts", "Eggs", "Gluten"], "Pinot Noir, Willamette Valley, USA"),
  D("s5", "starters", "Raw Scallop, Finger Lime", "Hand-dived scallop, coconut cream, finger lime pearls and a slick of chile oil.", 2200, ["Scallops", "Coconut cream", "Finger lime", "Chile oil"], ["SF", "GF"], 8112891, "Served the moment it is cut — bright, cold, sea-sweet.", ["Shellfish"], "Chablis, Burgundy, France", { spicy: 1 }),

  /* ---------------- Soups ---------------- */
  D("so1", "soups", "Smoked Tomato & Basil", "Tomatoes smoked over applewood, blended silken with cream and finished with basil from the courtyard garden.", 950, ["Smoked tomatoes", "Cream", "Basil"], ["V", "GF", "D"], 27612507, "Served in a warmed bowl with a thread of olive oil.", ["Dairy"], "Vermentino, Liguria, Italy"),
  D("so2", "soups", "Lentil & Ember Onion", "Black lentils simmered with onions roasted directly in the coals, cumin and a spoon of house yogurt.", 850, ["Black lentils", "Ember onion", "Cumin", "Yogurt"], ["V", "GF", "D"], 8629083, "The onion's char does the seasoning — no stock cube has ever crossed our threshold.", ["Dairy"], "Tempranillo Rosado, Rioja, Spain", { spicy: 1 }),
  D("so3", "soups", "Coastal Chowder", "Hake, clams and new potato in a saffron-scented broth, finished with brown butter crumb.", 1450, ["Hake", "Clams", "New potato", "Saffron", "Brown butter"], ["SF", "D"], 22994309, "A lighter take on chowder — broth first, cream last.", ["Shellfish", "Dairy", "Gluten"], "Sancerre, Loire Valley, France"),

  /* ---------------- Salads ---------------- */
  D("sa1", "salads", "Charred Leaves, Labneh", "Little gem and radicchio kissed by the grill, whipped labneh, hazelnut dukkah and preserved lemon.", 1250, ["Little gem", "Radicchio", "Labneh", "Hazelnut dukkah", "Preserved lemon"], ["V", "GF", "N", "D"], 19409040, "Grilled leaves are a winter obsession of the chef.", ["Dairy", "Nuts"], "Verdejo, Rueda, Spain", { popular: true }),
  D("sa2", "salads", "Burnt Citrus & Fennel", "Segments of blood orange and grapefruit seared on the plancha, shaved fennel, black olive and mint.", 1100, ["Blood orange", "Grapefruit", "Fennel", "Black olive", "Mint"], ["VG", "GF"], 15671324, "Bitter, sweet, charred and clean all at once.", ["Olives"], "Picpoul de Pinet, France"),
  D("sa3", "salads", "Garden Plate", "Whatever arrived that morning from the market garden — herbs, leaves, young roots — with a green goddess dressing.", 1150, ["Market vegetables", "Herbs", "Green goddess"], ["VG", "GF"], 8629083, "Ask the kitchen what is in it; the answer changes daily.", [], "Gavi, Piedmont, Italy", { options: [{ id: "sa3-a", label: "Add soft-boiled egg", delta: 200 }, { id: "sa3-b", label: "Add grilled chicken", delta: 500 }] }),

  /* ---------------- Main Course ---------------- */
  D("m1", "mains", "Truffle Mushroom Risotto Nero", "Carnaroli rice cooked in porcini stock, black truffle, aged parmesan and a spoon of mascarpone.", 2350, ["Carnaroli rice", "Porcini", "Black truffle", "Parmesan", "Mascarpone"], ["V", "D"], 34342499, "Stirred for eighteen minutes, no more, no less — the rice should fall like a wave.", ["Dairy"], "Barolo, Piedmont, Italy", { chef: true, popular: true, signature: true }),
  D("m2", "mains", "Charred Lamb Rack, Saffron Beurre Blanc", "New Zealand lamb rack grilled over oak, rested in brown butter, finished with a saffron beurre blanc and garden herbs.", 3950, ["Lamb rack", "Oak embers", "Saffron", "Beurre blanc"], ["GF", "D"], 7243877, "The rack is marked over coals for colour, then kissed by the rotisserie.", ["Dairy"], "Côte-Rôtie, Rhône, France", { signature: true, chef: true }),
  D("m3", "mains", "Chicken Supreme, Vermouth", "Corn-fed chicken cooked sous vide, skin blistered over flame, served with a silken vermouth jus and pomme purée.", 2450, ["Corn-fed chicken", "Vermouth", "Pomme purée"], ["GF", "D"], 6297198, "Resting is not optional. We rest the bird longer than we cook it.", ["Dairy"], "Chardonnay, Burgundy, France", { popular: true }),
  D("m4", "mains", "Cauliflower Steak, Brown Butter", "A whole cauliflower roasted in embers, cut into a single proud steak, brown butter, capers and raisin.", 1550, ["Cauliflower", "Brown butter", "Capers", "Raisin"], ["V", "GF", "D"], 19409040, "Proof that a vegetable can carry an entire main course.", ["Dairy"], "Chablis Premier Cru, France"),
  D("m5", "mains", "Duck Breast, Cherry & Star Anise", "Gressingham duck breast, skin like glass, with a sour cherry and star anise glaze and wilted greens.", 3450, ["Duck breast", "Sour cherry", "Star anise", "Wilted greens"], ["GF"], 7243881, "The glaze is reduced three times to a lacquer.", [], "Pinot Noir, Central Otago, NZ", { spicy: 1 }),

  /* ---------------- Chef's Selection ---------------- */
  D("c1", "chefs-selection", "The Hearth Tasting — Seven Movements", "Seven courses from the open hearth: market snacks, raw bar, ember vegetables, fish, meat, cheese and a dessert of fire.", 7250, ["Seven courses", "Market-led", "Chef's discretion"], [], 8112891, "No menu is printed. Tell us what you do not eat; we take care of the rest.", [], "Sommelier pairing available", { chef: true, options: [{ id: "c1-a", label: "Wine pairing, five glasses", delta: 4500 }] }),
  D("c2", "chefs-selection", "The Chef's Counter", "Ten seats at the pass. Twelve courses served by the chefs who cooked them, across an evening of roughly three hours.", 11250, ["Twelve courses", "Chef's counter", "Front row to the fire"], [], 20509791, "The counter is booked weeks in advance. Arrive hungry and curious.", [], "Sommelier pairing included", { chef: true, options: [{ id: "c2-a", label: "Add cellar pairing, two rare vintages", delta: 6500 }] }),
  D("c3", "chefs-selection", "The Noor Vegetarian Arc", "A full vegetarian journey — seven courses built around the hearth, from ember beets to a chocolate & olive oil finale.", 4950, ["Seven vegetarian courses", "Hearth vegetables", "Dessert of fire"], ["V"], 19409040, "Cooked on its own section of the hearth — never a 'meat menu minus meat'.", [], "Vegetarian-friendly wine pairing available", { chef: true, popular: true }),

  /* ---------------- Steak & Grill ---------------- */
  D("g1", "grill", "Wagyu Rump, Bone Marrow Butter", "Australian wagyu rump grilled over embered oak, rested, carved, finished with roasted bone marrow butter.", 5950, ["Wagyu rump", "Oak embers", "Bone marrow butter"], ["GF", "D"], 7243881, "Served on a warmed stone with the carving juices poured at the table.", ["Dairy"], "Malbec, Mendoza, Argentina", { chef: true, popular: true }),
  D("g2", "grill", "48-Day Dry-Aged Ribeye", "Dry-aged in our own ageing room for forty-eight days, grilled rare over white oak.", 6950, ["Dry-aged ribeye", "White oak"], ["GF"], 36563571, "Aged beef needs almost nothing — salt, fire, time.", [], "Cabernet Sauvignon, Napa Valley, USA", { options: [{ id: "g2-a", label: "Add bone marrow crust", delta: 800 }, { id: "g2-b", label: "Truffle butter", delta: 600 }] }),
  D("g3", "grill", "Lamb Cutlets, Za'atar", "Loin cutlets marinated in za'atar and olive oil, grilled over grapevine cuttings, served with smoked yogurt.", 3850, ["Lamb cutlets", "Za'atar", "Grapevine", "Smoked yogurt"], ["GF", "D"], 7243881, "Grapevine smoke is sweet and gentle — it flatters lamb like nothing else.", ["Dairy"], "Syrah, Stellenbosch, South Africa"),
  D("g4", "grill", "Chicken of the Woods, Charred Leek", "The grill's vegetarian claim to fame — wild mushroom 'steak' seared hard, with charred leek and mushroom butter.", 2050, ["Wild mushrooms", "Charred leek", "Mushroom butter"], ["V", "GF", "D"], 19409040, "We treat this mushroom with the respect of a fine cut of meat.", ["Dairy"], "Pinot Noir, Marlborough, NZ"),

  /* ---------------- Seafood ---------------- */
  D("f1", "seafood", "Sea Bass en Papillote", "Whole sea bass baked in parchment with fennel, citrus and herbs, opened at the table.", 4250, ["Sea bass", "Fennel", "Citrus", "Herbs"], ["GF"], 36563571, "The parchment does the work — steam, aroma, theatre.", [], "Pouilly-Fumé, Loire Valley, France", { popular: true }),
  D("f2", "seafood", "Charred Octopus, Chorizo & Potato", "Octopus braised until tender, charred over coals, with crisped chorizo and confit potato.", 3850, ["Octopus", "Chorizo", "Confit potato"], ["GF"], 22994309, "Braised for three hours, grilled for ninety seconds.", [], "Garnacha Blanca, Priorat, Spain"),
  D("f3", "seafood", "Scallops, Cauliflower & Brown Butter", "Hand-dived scallops seared in brown butter, cauliflower purée and hazelnut crumb.", 3950, ["Hand-dived scallops", "Cauliflower", "Brown butter", "Hazelnut"], ["SF", "GF", "N", "D"], 8112891, "One side only — colour is flavour, and flavour is everything.", ["Shellfish", "Dairy", "Nuts"], "Sancerre, Loire Valley, France", { popular: true }),
  D("f4", "seafood", "Prawn & Saffron Linguine", "Tiger prawns, saffron, chilli and white wine over hand-rolled linguine — the south of France meets the Arabian Sea.", 3350, ["Tiger prawns", "Saffron", "Chilli", "Linguine"], ["SF", "E"], 32793290, "The pan sauce is finished with pasta water and patience.", ["Shellfish", "Eggs", "Gluten"], "Vermentino di Sardegna, Italy", { spicy: 2 }),

  /* ---------------- Pasta ---------------- */
  D("p1", "pasta", "Tagliatelle, White Ragù", "Silk ribbons of egg pasta with a slow white ragù of veal and pork, parmesan and sage.", 2450, ["Egg tagliatelle", "Veal & pork ragù", "Parmesan", "Sage"], ["E", "D"], 34520959, "Rolled at 2pm, sauced at 8pm — the pasta never sleeps overnight.", ["Eggs", "Dairy", "Gluten"], "Chianti Classico, Tuscany, Italy", { popular: true }),
  D("p2", "pasta", "Ricotta & Lemon Tortelli", "Hand-pinched tortelli filled with sheep's ricotta and lemon, in brown butter with poppy seed.", 2150, ["Sheep's ricotta", "Lemon", "Brown butter", "Poppy seed"], ["V", "D"], 15671269, "The filling is whipped until it is light as air.", ["Dairy", "Gluten"], "Orvieto Classico, Umbria, Italy"),
  D("p3", "pasta", "Lobster Ravioli, Bisque", "Ravioli filled with lobster and mascarpone, served in a coral bisque with chive oil.", 4950, ["Lobster", "Mascarpone", "Coral bisque"], ["SF", "D"], 22994309, "Every shell from the morning delivery goes into the bisque.", ["Shellfish", "Dairy", "Gluten"], "Meursault, Burgundy, France", { chef: true }),
  D("p4", "pasta", "Spaghetti al Pomodoro", "The dish every chef must master — San Marzano tomatoes, hand-rolled spaghetti, basil and good olive oil.", 1650, ["San Marzano tomato", "Hand-rolled spaghetti", "Basil", "Olive oil"], ["V", "VG"], 27612507, "Twenty ingredients can hide a bad cook. Three cannot.", [], "Nero d'Avola, Sicily, Italy"),

  /* ---------------- Desserts ---------------- */
  D("d1", "desserts", "Burnt Honey Pavlova", "A crisp honey meringue with whipped vanilla cream, fresh seasonal berries and a bright berry reduction.", 1450, ["Meringue", "Burnt honey", "Vanilla cream", "Blueberries", "Seasonal berries"], ["V", "GF", "E", "D"], 34552000, "The honey is lightly caramelised — a little bitterness balances the cream and fruit.", ["Eggs", "Dairy"], "Chilled berry and hibiscus infusion", { signature: true, popular: true }),
  D("d2", "desserts", "Chocolate & Olive Oil", "Single-origin dark chocolate mousse, arbequina olive oil, flaked salt and a hazelnut praline shard.", 1350, ["Dark chocolate", "Olive oil", "Hazelnut praline", "Flaked salt"], ["V", "GF", "N", "D"], 35546720, "Olive oil in dessert is not a gimmick — it is the salt's best friend.", ["Nuts", "Dairy"], "Vin Santo, Tuscany, Italy"),
  D("d3", "desserts", "Saffron Kulfi, Pistachio", "Kulfi set overnight with real saffron, crushed pistachio and a rose syrup that arrives at the table.", 1250, ["Saffron kulfi", "Pistachio", "Rose syrup"], ["V", "GF", "N", "D"], 17035085, "A love letter to Lahore's old city, served frozen.", ["Nuts", "Dairy"], "Sauternes, Bordeaux, France", { popular: true }),
  D("d4", "desserts", "Citrus & Edible Flowers", "A bright composition of orange, blueberry and cream, dressed with edible flowers from the courtyard.", 1350, ["Orange", "Blueberry", "Cream", "Edible flowers"], ["V", "GF", "D"], 17035085, "Plated like a still life — guests photograph it before they eat it.", ["Dairy"], "Riesling Auslese, Mosel, Germany"),
  D("d5", "desserts", "Red Velvet, Cream Cheese", "Our pastry chef's reimagining of the classic — beet-red velvet, cream cheese frosting, cocoa crumb.", 1250, ["Red velvet sponge", "Cream cheese", "Cocoa"], ["V", "E", "D"], 35622247, "Beetroot gives the colour; buttermilk gives the crumb.", ["Eggs", "Dairy", "Gluten"], "Ruby Port, Douro, Portugal"),

  /* ---------------- Coffee ---------------- */
  D("k1", "coffee", "Single-Origin Espresso", "A rotating single origin, roasted weekly in Lahore. Ask the bar what is on the bar today.", 650, ["Single-origin coffee"], ["VG", "GF"], 32395820, "Served with sparkling water and a single date.", [], "—"),
  D("k2", "coffee", "Masala Chai Latte", "Whole spices simmered with milk and a single-origin Assam, finished with a whisper of rose.", 750, ["Assam", "Whole spices", "Milk", "Rose"], ["V", "GF", "D"], 3937673, "The spices are ground to order — cardamom, clove, black pepper, ginger.", ["Dairy"], "—", { popular: true }),
  D("k3", "coffee", "Cold Brew Tonic", "Eighteen-hour cold brew over ice with tonic, orange peel and a sprig of rosemary.", 850, ["Cold brew", "Tonic", "Orange", "Rosemary"], ["VG", "GF"], 3092967, "Our answer to the afternoon heat.", [], "—"),
  D("k4", "coffee", "Affogato", "Vanilla bean gelato drowned in a double ristretto — dessert and coffee in one act.", 950, ["Vanilla gelato", "Double ristretto"], ["V", "GF", "D"], 35546720, "Eat it fast. The moment is the point.", ["Dairy"], "—"),

  /* ---------------- Beverages ---------------- */
  D("dr1", "beverages", "The Noor Spritz", "Aperol, blood orange, prosecco and a frozen grape garnish — the room's favourite opening move.", 1450, ["Aperol", "Blood orange", "Prosecco"], ["VG"], 31631249, "Built long, served cold, gone quickly.", [], "—", { popular: true }),
  D("dr2", "beverages", "Ember Old Fashioned", "Bourbon rested overnight with roasted oak, demerara and orange oil — smoke without the theatre.", 1850, ["Bourbon", "Roasted oak", "Demerara", "Orange"], ["VG", "GF"], 3937673, "We char a finger of oak and leave it in the bottle for twenty-four hours.", [], "—"),
  D("dr3", "beverages", "Rose & Pomegranate Cooler", "House rose syrup, pomegranate, lime and soda — bright, floral and entirely non-alcoholic.", 750, ["Rose syrup", "Pomegranate", "Lime"], ["VG", "GF"], 32395820, "The syrup is made in the pastry room each week.", [], "—"),
  D("dr4", "beverages", "Wine by the Glass", "A rotating list of twelve wines, chosen by our sommelier to sit beside the fire — ask for the evening's pours.", 1450, ["Rotating cellar selection"], ["VG"], 12181763, "We pour by the glass what we would drink ourselves.", [], "—"),
  D("dr5", "beverages", "Sparkling & Still Water", "Still or sparkling, filtered and chilled, served with lemon on request.", 400, ["Filtered water", "Lemon"], ["VG", "GF"], 9556512, "The small details matter — even the water.", [], "—"),

  /* ---------------- BBQ ---------------- */
  D("q1", "bbq", "Chicken Tikka, Smoked Yoghurt", "Overnight-marinated leg piece grilled over coals until charred at the edges, served with smoked yoghurt and onion rings.", 650, ["Chicken leg", "Yoghurt marinade", "Red chilli", "Cumin"], ["GF"], 7243881, "The marinade works overnight; the coals do the rest in twelve minutes.", ["Dairy"], "Mint raita & naan", { spicy: 2, popular: true }),
  D("q2", "bbq", "Seekh Kabab Beef, Green Chilli", "Hand-minced beef with green chilli, coriander and roasted spices, pressed onto skewers and grilled over live coals.", 850, ["Beef mince", "Green chilli", "Coriander", "Roasted spices"], ["GF"], 7243877, "Minced twice, rested once, grilled fast — juicy all the way through.", [], "Paratha & imli chutney", { spicy: 2, popular: true }),
  D("q3", "bbq", "Malai Boti, Charred Lime", "Cream-and-cheese marinated chicken cubes, impossibly soft, finished over gentle coals with charred lime.", 750, ["Chicken breast", "Cream", "Cheese", "White pepper"], ["GF", "D"], 6297198, "Gentle coals only — malai boti punishes a fierce fire.", ["Dairy"], "Garlic naan", { spicy: 1 }),
  D("q4", "bbq", "BBQ Platter for Two", "Tikka, malai boti, seekh kabab and wings on one sizzling platter with naan, fries, raita and two chutneys.", 1950, ["Tikka", "Malai boti", "Seekh kabab", "Wings", "Naan"], ["D"], 7243881, "Order this when the table cannot agree — it ends every debate.", ["Dairy", "Gluten"], "Free mint margarita with this platter", { spicy: 1, popular: true }),

  /* ---------------- Pakistani ---------------- */
  D("pk1", "pakistani", "Chicken Karahi, Desi Ghee", "Tomatoes, ginger and green chillies reduced in desi ghee with bone-in chicken, finished tableside-style in the wok.", 1450, ["Chicken on bone", "Tomatoes", "Desi ghee", "Ginger", "Green chilli"], ["GF"], 8629083, "No onions, no shortcuts — the Lahori way, reduced until the ghee rises.", ["Dairy"], "Hot tandoori naan", { spicy: 2, popular: true, chef: true }),
  D("pk2", "pakistani", "Beef Nihari, Slow Overnight", "Shank slow-cooked overnight until the gravy turns silken, crowned with ginger, lime and green chillies.", 1250, ["Beef shank", "Nihari masala", "Wheat thickening", "Ginger"], [], 8629120, "Twelve hours on a low flame. There is no faster way to make nihari.", ["Gluten"], "Khamiri roti & lassi", { spicy: 2, popular: true }),
  D("pk3", "pakistani", "Daal Makhani & Tarka", "Black lentils simmered with butter and cream, finished with a garlic tarka that arrives crackling.", 950, ["Black lentils", "Butter", "Cream", "Garlic tarka"], ["V", "GF", "D"], 8629083, "Comfort in a bowl — the tarka must be poured at the very last second.", ["Dairy"], "Jeera rice", { spicy: 1 }),
  D("pk4", "pakistani", "Palak Paneer, White Butter", "Hand-torn spinach folded with soft paneer and a knob of white butter, mellow and deeply green.", 1050, ["Spinach", "Paneer", "White butter", "Cumin"], ["V", "GF", "D"], 19409040, "Blanched, shocked and ground fresh every afternoon — never dull, never grey.", ["Dairy"], "Makki di roti", {}),

  /* ---------------- Chinese ---------------- */
  D("ch1", "chinese", "Chicken Chow Mein, Wok Hei", "Smoky wok-tossed noodles with julienned chicken, cabbage and spring onion in a light soy glaze.", 950, ["Egg noodles", "Chicken", "Cabbage", "Soy glaze"], ["E"], 32793290, "The wok must breathe fire — ninety seconds, no more.", ["Eggs", "Gluten", "Soy"], "Chilli oil on the side", { popular: true }),
  D("ch2", "chinese", "Kung Pao Chicken, Cashew", "Diced chicken with cashews, dried chillies and Sichuan pepper in a glossy sweet-sour glaze.", 1150, ["Chicken", "Cashews", "Dried chillies", "Sichuan pepper"], ["N"], 32793290, "Numbing, sweet, hot and crunchy — all four in one bite.", ["Nuts", "Soy"], "Egg fried rice", { spicy: 2 }),
  D("ch3", "chinese", "Vegetable Fried Rice, Burnt Garlic", "Smoky rice tossed with seasonal vegetables, burnt garlic and a whisper of sesame.", 750, ["Basmati rice", "Seasonal vegetables", "Burnt garlic", "Sesame"], ["V", "VG"], 15671324, "Day-old rice, screaming-hot wok — the two rules of fried rice.", ["Sesame"], "Hot & sour soup", {}),
  D("ch4", "chinese", "Hot & Sour Soup", "Peppery, tangy and loaded — mushrooms, tofu, egg ribbons and bamboo shoot in a dark, glossy broth.", 650, ["Mushrooms", "Tofu", "Egg ribbons", "Bamboo shoot"], ["E"], 27612507, "It should clear the sinuses and warm the chest in equal measure.", ["Eggs", "Soy"], "Crackers & vinegar", { spicy: 1 }),

  /* ---------------- Burgers ---------------- */
  D("bg1", "burgers", "Smash Burger, Double Patty", "Two smashed beef patties with molten cheddar, pickles, house sauce and a toasted brioche bun.", 1250, ["Beef patties", "Cheddar", "Pickles", "House sauce", "Brioche"], ["E", "D"], 34520959, "Smashed thin for maximum crust, stacked fast so the cheese never sets.", ["Eggs", "Dairy", "Gluten"], "Masala fries", { popular: true }),
  D("bg2", "burgers", "Grilled Chicken Burger", "Flame-grilled chicken thigh with garlic mayo, lettuce and tomato in a soft toasted bun.", 950, ["Chicken thigh", "Garlic mayo", "Lettuce", "Tomato"], ["E"], 6297198, "Thigh, never breast — juiciness is non-negotiable.", ["Eggs", "Gluten"], "Cold coffee", { spicy: 1 }),
  D("bg3", "burgers", "Mushroom Melt (Veg)", "Crisp mushroom patty with Swiss-style cheese, caramelised onions and truffle mayo.", 1050, ["Mushroom patty", "Cheese", "Caramelised onion", "Truffle mayo"], ["V", "E", "D"], 19409040, "Vegetarian guests order this twice — once to try, once to be sure.", ["Eggs", "Dairy", "Gluten"], "Sweet potato fries", {}),
  D("bg4", "burgers", "Loaded Fries Platter", "Crispy fries layered with cheese sauce, jalapeños, chicken crumbs and house drizzle — built for sharing.", 850, ["Fries", "Cheese sauce", "Jalapeños", "Chicken crumbs"], ["D"], 15671324, "Eat from the top down. Strategy matters.", ["Dairy"], "Mint margarita", { spicy: 1, popular: true }),

  /* ---------------- Pizza ---------------- */
  D("pz1", "pizza", "Chicken Tikka Pizza", "Wood-fired base with tikka chunks, mozzarella, onions and a drizzle of mint chutney.", 1550, ["Pizza dough", "Tikka chicken", "Mozzarella", "Mint chutney"], ["D"], 27612507, "Lahore asked for it — desi soul on an Italian crust.", ["Dairy", "Gluten"], "Garlic dip", { spicy: 1, popular: true }),
  D("pz2", "pizza", "Pepperoni & Cheese Burst", "Double pepperoni, molten mozzarella and oregano on a crisp, leopard-spotted crust.", 1750, ["Pepperoni", "Mozzarella", "Oregano", "Tomato sauce"], ["D"], 34520959, "Ninety seconds in fierce heat — puffed, spotted, gone too soon.", ["Dairy", "Gluten"], "Chilli honey dip", {}),
  D("pz3", "pizza", "Garden Veggie Pizza", "Charred peppers, mushrooms, olives and onions over tomato and mozzarella.", 1350, ["Peppers", "Mushrooms", "Olives", "Onion", "Mozzarella"], ["V", "D"], 19409040, "Vegetables get the same fire as everything else here.", ["Dairy", "Gluten"], "Lemon iced tea", {}),
  D("pz4", "pizza", "Garlic Bread Supreme", "Buttery garlic bread loaded with cheese, herbs and a side of marinara.", 750, ["Bread", "Garlic butter", "Cheese", "Herbs"], ["V", "D"], 34520959, "The quiet starter that steals the show.", ["Dairy", "Gluten"], "—", {}),

  /* ---------------- Rice ---------------- */
  D("r1", "rice", "Chicken Biryani, Dum Style", "Layered basmati with saffron, fried onions and tender chicken, sealed on dum and opened at serving.", 650, ["Basmati", "Chicken", "Saffron", "Fried onion", "Yoghurt"], ["GF", "D"], 15671324, "Served with raita and salad — the way Friday demands.", ["Dairy"], "Raita & salad included", { spicy: 2, popular: true }),
  D("r2", "rice", "Beef Pulao, Yakhni", "Fragrant yakhni-cooked rice with soft beef pieces, whole spices and caramelised onion.", 750, ["Basmati", "Beef", "Yakhni stock", "Whole spices"], ["GF"], 8629083, "Pulao is patience: the yakhni decides everything.", [], "Shami kabab on the side", { spicy: 1, popular: true }),
  D("r3", "rice", "Egg Fried Rice & Shashlik", "Smoky egg fried rice paired with a chicken shashlik skewer in tangy tomato-pepper sauce.", 850, ["Rice", "Egg", "Chicken shashlik", "Peppers"], ["E"], 32793290, "A Lahori-Chinese classic, done properly hot.", ["Eggs", "Soy"], "Extra chilli garlic sauce", { spicy: 1 }),
  D("r4", "rice", "Jeera Rice & Daal", "Ghee-tempered cumin rice with a bowl of tarka daal — simple, honest, deeply satisfying.", 550, ["Basmati", "Cumin", "Ghee", "Tarka daal"], ["V", "GF", "D"], 15671269, "Sometimes the simplest plate is the hardest to get right.", ["Dairy"], "Papad & onion", {}),
];

export const allDishes = DISHES;

/* Forty distinct food dishes, curated from the complete catalogue.
   Coffee, beverages and the counter experience remain available by category. */
export const MENU_HIGHLIGHT_IDS = [
  "b1", "b2", "b3", "b4", "b5",
  "s1", "s2", "s3", "s4", "s5",
  "so1", "so2", "so3",
  "sa1", "sa2", "sa3",
  "m1", "m2", "m3", "m4", "m5",
  "c1", "c3",
  "g1", "g2", "g3", "g4",
  "f1", "f2", "f3", "f4",
  "p1", "p2", "p3", "p4",
  "d1", "d2", "d3", "d4", "d5",
] as const;
export const menuHighlights = MENU_HIGHLIGHT_IDS.map((id) => DISHES.find((d) => d.id === id)).filter(
  (d): d is Dish => Boolean(d),
);

export const getDish = (id: string) => DISHES.find((d) => d.id === id);
export const dishesByCategory = (cat: string) => DISHES.filter((d) => d.cat === cat);
export const signatureDishes = DISHES.filter((d) => d.signature);
export const chefPicks = DISHES.filter((d) => d.chef);
export const popularDishes = DISHES.filter((d) => d.popular);

export const catName = (id: string) => CATEGORIES.find((c) => c.id === id)?.name ?? id;
