import indian from "@/assets/rest-indian.jpg";
import burger from "@/assets/rest-burger.jpg";
import asian from "@/assets/rest-asian.jpg";
import healthy from "@/assets/rest-healthy.jpg";
import italian from "@/assets/rest-italian.jpg";
import cafe from "@/assets/rest-cafe.jpg";
import mexican from "@/assets/rest-mexican.jpg";

export type Kitchen = "indian" | "burger" | "asian" | "healthy" | "italian" | "cafe" | "mexican";

export const kitchenImage: Record<Kitchen, string> = {
  indian,
  burger,
  asian,
  healthy,
  italian,
  cafe,
  mexican,
};

export type Category = {
  id: string;
  name: string;
  emoji: string;
  gradient: string;
  kitchens: Kitchen[];
};

export const categories: Category[] = [
  { id: "pizza", name: "Pizza", emoji: "🍕", gradient: "gradient-sunset", kitchens: ["italian"] },
  { id: "burgers", name: "Burgers", emoji: "🍔", gradient: "gradient-mango", kitchens: ["burger"] },
  { id: "asian", name: "Asian", emoji: "🍜", gradient: "gradient-berry", kitchens: ["asian"] },
  { id: "indian", name: "Indian", emoji: "🍛", gradient: "gradient-sunset", kitchens: ["indian"] },
  {
    id: "mexican",
    name: "Mexican",
    emoji: "🌮",
    gradient: "gradient-mango",
    kitchens: ["mexican"],
  },
  { id: "sushi", name: "Sushi", emoji: "🍣", gradient: "gradient-berry", kitchens: ["asian"] },
  {
    id: "healthy",
    name: "Healthy",
    emoji: "🥗",
    gradient: "gradient-garden",
    kitchens: ["healthy"],
  },
  { id: "desserts", name: "Desserts", emoji: "🍰", gradient: "gradient-berry", kitchens: ["cafe"] },
  { id: "cafe", name: "Café", emoji: "☕", gradient: "gradient-mango", kitchens: ["cafe"] },
  {
    id: "chicken",
    name: "Chicken",
    emoji: "🍗",
    gradient: "gradient-sunset",
    kitchens: ["indian", "burger"],
  },
];

export type Restaurant = {
  id: string;
  name: string;
  kitchen: Kitchen;
  cuisines: string[];
  rating: number;
  reviews: number;
  deliveryMins: number;
  priceForTwo: number;
  distanceKm: number;
  pureVeg: boolean;
  offer: string | null;
  address: string;
  hours: string;
  promoted: boolean;
  categories: string[];
};

const rows: Array<
  [
    string,
    Kitchen,
    string[],
    number,
    number,
    number,
    number,
    number,
    boolean,
    string | null,
    string,
  ]
> = [
  [
    "Spice Route",
    "indian",
    ["North Indian", "Mughlai"],
    4.6,
    2140,
    28,
    650,
    1.2,
    false,
    "50% OFF up to ₹120",
    "12 Saffron Lane, Bandra West",
  ],
  [
    "Burger District",
    "burger",
    ["Burgers", "American"],
    4.4,
    1876,
    22,
    450,
    0.8,
    false,
    "Free delivery",
    "8 Grill Street, Lower Parel",
  ],
  [
    "Tokyo Bowl",
    "asian",
    ["Japanese", "Sushi"],
    4.7,
    1502,
    34,
    900,
    2.4,
    false,
    "20% OFF",
    "44 Sakura Road, Powai",
  ],
  [
    "The Green Fork",
    "healthy",
    ["Salads", "Bowls"],
    4.5,
    980,
    25,
    520,
    1.6,
    true,
    "₹100 OFF above ₹499",
    "3 Garden Cross, Andheri",
  ],
  [
    "Pasta House",
    "italian",
    ["Italian", "Pizza"],
    4.3,
    1340,
    30,
    700,
    2.1,
    false,
    null,
    "27 Basil Avenue, Juhu",
  ],
  [
    "Curry Culture",
    "indian",
    ["South Indian", "Curries"],
    4.5,
    2410,
    26,
    480,
    1.1,
    true,
    "Buy 1 Get 1",
    "19 Turmeric Street, Dadar",
  ],
  [
    "Urban Tandoor",
    "indian",
    ["Kebabs", "Tandoori"],
    4.2,
    1620,
    32,
    750,
    3.0,
    false,
    "40% OFF",
    "6 Clay Oven Road, Worli",
  ],
  [
    "Brew & Bean",
    "cafe",
    ["Café", "Desserts"],
    4.8,
    3120,
    18,
    350,
    0.5,
    true,
    "Free cookie",
    "1 Roastery Walk, Khar",
  ],
  [
    "Taco Fiesta",
    "mexican",
    ["Mexican", "Tex-Mex"],
    4.4,
    890,
    29,
    560,
    2.8,
    false,
    "30% OFF",
    "51 Lime Plaza, Versova",
  ],
  [
    "Napoli Slice Co.",
    "italian",
    ["Pizza", "Wood Fired"],
    4.6,
    2050,
    24,
    620,
    1.4,
    false,
    "Free delivery",
    "9 Marinara Street, Colaba",
  ],
  [
    "Wok Republic",
    "asian",
    ["Chinese", "Thai"],
    4.1,
    1180,
    31,
    540,
    2.6,
    false,
    null,
    "72 Bamboo Lane, Chembur",
  ],
  [
    "Sunrise Salads",
    "healthy",
    ["Healthy", "Juices"],
    4.3,
    640,
    20,
    400,
    1.9,
    true,
    "15% OFF",
    "5 Sprout Court, Santacruz",
  ],
  [
    "Smoke & Patty",
    "burger",
    ["Burgers", "Grill"],
    4.5,
    1440,
    27,
    520,
    2.2,
    false,
    "₹75 OFF",
    "38 Charcoal Road, Malad",
  ],
  [
    "Ramen Lantern",
    "asian",
    ["Ramen", "Japanese"],
    4.7,
    1760,
    33,
    680,
    3.4,
    false,
    "20% OFF",
    "14 Broth Street, Goregaon",
  ],
  [
    "Masala Junction",
    "indian",
    ["Street Food", "Chaat"],
    4.2,
    2680,
    21,
    300,
    0.9,
    true,
    "Free delivery",
    "22 Chaat Circle, Matunga",
  ],
  [
    "Dolce Forno",
    "cafe",
    ["Bakery", "Desserts"],
    4.6,
    1290,
    23,
    420,
    1.7,
    true,
    "Buy 2 Get 1",
    "11 Vanilla Street, Bandra",
  ],
  [
    "El Comal",
    "mexican",
    ["Burritos", "Mexican"],
    4.3,
    760,
    30,
    500,
    3.2,
    false,
    null,
    "63 Agave Road, Vile Parle",
  ],
  [
    "Trattoria Verde",
    "italian",
    ["Italian", "Pasta"],
    4.4,
    1120,
    35,
    820,
    4.0,
    true,
    "25% OFF",
    "7 Olive Grove, Bandra",
  ],
  [
    "Clucky's Coop",
    "burger",
    ["Fried Chicken", "Wings"],
    4.5,
    2210,
    26,
    460,
    1.5,
    false,
    "50% OFF up to ₹100",
    "29 Crisp Lane, Kurla",
  ],
  [
    "Chai & Chapter",
    "cafe",
    ["Café", "Snacks"],
    4.7,
    1980,
    19,
    280,
    0.7,
    true,
    "Free delivery",
    "2 Bookmark Road, Khar",
  ],
  [
    "Bombay Biryani House",
    "indian",
    ["Biryani", "Hyderabadi"],
    4.6,
    3410,
    29,
    600,
    2.0,
    false,
    "₹120 OFF above ₹699",
    "48 Dum Street, Byculla",
  ],
  [
    "Poke Harbour",
    "healthy",
    ["Poke", "Seafood"],
    4.4,
    540,
    28,
    700,
    2.9,
    false,
    "10% OFF",
    "16 Tide Walk, Worli",
  ],
];

export const restaurants: Restaurant[] = rows.map(
  (
    [
      name,
      kitchen,
      cuisines,
      rating,
      reviews,
      deliveryMins,
      priceForTwo,
      distanceKm,
      pureVeg,
      offer,
      address,
    ],
    i,
  ) => ({
    id: name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    name,
    kitchen,
    cuisines,
    rating,
    reviews,
    deliveryMins,
    priceForTwo,
    distanceKm,
    pureVeg,
    offer,
    address,
    hours: i % 3 === 0 ? "10:00 AM – 11:30 PM" : "11:00 AM – 12:00 AM",
    promoted: i % 5 === 0,
    categories: categories.filter((c) => c.kitchens.includes(kitchen)).map((c) => c.id),
  }),
);

export const MENU_SECTIONS = [
  "Recommended",
  "Starters",
  "Main Course",
  "Breads",
  "Rice",
  "Beverages",
  "Desserts",
] as const;
export type MenuSection = (typeof MENU_SECTIONS)[number];

export type MenuItem = {
  id: string;
  restaurantId: string;
  section: MenuSection;
  name: string;
  description: string;
  price: number;
  veg: boolean;
  rating: number;
  bestseller: boolean;
};

type Tmpl = [MenuSection, string, string, number, boolean];

const menuTemplates: Record<Kitchen, Tmpl[]> = {
  indian: [
    [
      "Recommended",
      "Butter Chicken",
      "Tandoori chicken simmered in a silky tomato-butter gravy",
      380,
      false,
    ],
    [
      "Recommended",
      "Paneer Tikka Masala",
      "Charred cottage cheese in a rich onion-cashew masala",
      320,
      true,
    ],
    ["Starters", "Chicken Malai Tikka", "Creamy cardamom marinade, clay-oven finished", 340, false],
    [
      "Starters",
      "Hara Bhara Kebab",
      "Spinach, pea and potato patties with mint chutney",
      240,
      true,
    ],
    ["Main Course", "Dal Makhani", "Black lentils slow-cooked overnight with cream", 260, true],
    ["Main Course", "Rogan Josh", "Kashmiri lamb curry with fennel and dried ginger", 460, false],
    ["Main Course", "Palak Paneer", "Cottage cheese in velvety spinach gravy", 290, true],
    ["Breads", "Butter Naan", "Leavened flatbread brushed with white butter", 70, true],
    ["Breads", "Laccha Paratha", "Flaky layered whole wheat paratha", 80, true],
    [
      "Rice",
      "Hyderabadi Chicken Biryani",
      "Long grain rice dum-cooked with saffron and mint",
      420,
      false,
    ],
    ["Rice", "Veg Pulao", "Basmati tossed with seasonal vegetables and whole spices", 240, true],
    ["Beverages", "Salted Lassi", "Churned yoghurt with roasted cumin", 110, true],
    ["Beverages", "Masala Chai", "Assam tea with ginger and cardamom", 60, true],
    ["Desserts", "Gulab Jamun", "Warm milk dumplings in rose syrup", 140, true],
    ["Desserts", "Rasmalai", "Saffron milk soaked cheese discs with pistachio", 160, true],
  ],
  burger: [
    [
      "Recommended",
      "District Double Smash",
      "Two smashed patties, aged cheddar, house sauce",
      340,
      false,
    ],
    ["Recommended", "Crispy Chicken Deluxe", "Buttermilk fried thigh, slaw, pickles", 300, false],
    ["Starters", "Loaded Cheese Fries", "Skin-on fries, molten cheese, jalapeño", 200, true],
    ["Starters", "Buffalo Wings", "Six wings tossed in tangy hot butter", 280, false],
    ["Main Course", "Mushroom Truffle Burger", "Portobello, truffle mayo, brioche bun", 320, true],
    ["Main Course", "BBQ Bacon Stack", "Smoked bacon, onion rings, bourbon BBQ", 380, false],
    ["Main Course", "Paneer Peri Peri Burger", "Grilled paneer with peri peri mayo", 260, true],
    ["Breads", "Garlic Cheese Toast", "Sourdough, garlic butter, mozzarella", 180, true],
    ["Rice", "Cajun Rice Bowl", "Spiced rice with grilled chicken and corn", 300, false],
    ["Beverages", "Salted Caramel Shake", "Thick shake with caramel drizzle", 190, true],
    ["Beverages", "Fresh Lime Soda", "Sweet or salted, served chilled", 90, true],
    ["Desserts", "Molten Brownie", "Warm fudge brownie with vanilla scoop", 210, true],
    ["Desserts", "Choco Chip Cookie", "Chewy centre, sea salt finish", 120, true],
  ],
  asian: [
    ["Recommended", "Tonkotsu Ramen", "18-hour pork broth, chashu, ajitama egg", 460, false],
    ["Recommended", "Salmon Aburi Roll", "Torched salmon, spicy mayo, tobiko", 520, false],
    ["Starters", "Edamame with Sea Salt", "Steamed soy pods, flaky salt", 190, true],
    ["Starters", "Chicken Gyoza", "Pan-seared dumplings, ponzu dip", 280, false],
    ["Main Course", "Pad Thai Noodles", "Rice noodles, tamarind, crushed peanuts", 340, true],
    ["Main Course", "Thai Green Curry", "Coconut curry with basil and bamboo", 360, true],
    ["Main Course", "Kung Pao Chicken", "Wok-tossed with dried chilli and cashew", 380, false],
    ["Rice", "Chicken Donburi", "Teriyaki chicken over steamed rice", 350, false],
    ["Rice", "Veg Burnt Garlic Rice", "Fried rice with crisp garlic and greens", 260, true],
    ["Breads", "Bao Buns (2 pcs)", "Steamed buns with hoisin filling", 240, true],
    ["Beverages", "Matcha Iced Latte", "Ceremonial matcha over cold milk", 220, true],
    ["Beverages", "Lychee Iced Tea", "Jasmine tea with lychee", 170, true],
    ["Desserts", "Mochi Trio", "Mango, matcha and chocolate mochi", 240, true],
    ["Desserts", "Black Sesame Pudding", "Silky pudding with toasted sesame", 200, true],
  ],
  healthy: [
    ["Recommended", "Rainbow Buddha Bowl", "Quinoa, avocado, chickpeas, tahini drizzle", 340, true],
    ["Recommended", "Grilled Chicken Caesar", "Cos lettuce, parmesan, light caesar", 360, false],
    ["Starters", "Hummus & Veg Sticks", "Creamy hummus with crunchy crudités", 220, true],
    ["Starters", "Beet Carpaccio", "Roasted beets, orange, pistachio", 260, true],
    ["Main Course", "Teriyaki Tofu Bowl", "Brown rice, edamame, sesame tofu", 320, true],
    [
      "Main Course",
      "Peri Chicken Protein Plate",
      "Grilled chicken, sweet potato, greens",
      420,
      false,
    ],
    ["Main Course", "Zucchini Pesto Noodles", "Spiralised zucchini, basil pesto", 300, true],
    ["Rice", "Millet Khichdi Bowl", "Comfort millet with seasonal veg", 260, true],
    ["Beverages", "Cold Pressed Green Juice", "Spinach, apple, cucumber, ginger", 210, true],
    ["Beverages", "Berry Protein Smoothie", "Mixed berries, whey, almond milk", 260, true],
    ["Desserts", "Date & Almond Bites", "No added sugar energy bites", 180, true],
    ["Desserts", "Greek Yoghurt Parfait", "Granola, honey, fresh fruit", 220, true],
  ],
  italian: [
    ["Recommended", "Margherita Wood Fired", "San Marzano sauce, fior di latte, basil", 380, true],
    ["Recommended", "Truffle Mushroom Pizza", "Cream base, mushrooms, truffle oil", 480, true],
    ["Starters", "Bruschetta al Pomodoro", "Toasted sourdough, tomato, basil", 240, true],
    ["Starters", "Arancini Bites", "Crisp risotto balls with marinara", 280, true],
    ["Main Course", "Penne Arrabbiata", "Chilli tomato sauce, fresh herbs", 320, true],
    [
      "Main Course",
      "Chicken Alfredo Fettuccine",
      "Creamy parmesan sauce, grilled chicken",
      420,
      false,
    ],
    ["Main Course", "Lasagna al Forno", "Layered pasta, ragu, béchamel", 460, false],
    ["Breads", "Focaccia Rosemary", "Olive oil, sea salt, rosemary", 190, true],
    ["Breads", "Cheesy Garlic Bread", "Mozzarella stuffed, herb butter", 220, true],
    ["Rice", "Mushroom Risotto", "Arborio rice, porcini, parmesan", 400, true],
    ["Beverages", "Italian Lemon Soda", "House lemonade with basil", 160, true],
    ["Beverages", "Affogato", "Espresso poured over gelato", 220, true],
    ["Desserts", "Tiramisu", "Mascarpone, espresso, cocoa", 260, true],
    ["Desserts", "Panna Cotta", "Vanilla cream with berry compote", 240, true],
  ],
  cafe: [
    ["Recommended", "Flat White", "Double ristretto, silky microfoam", 200, true],
    ["Recommended", "Belgian Waffle Stack", "Maple butter, berries, cream", 320, true],
    ["Starters", "Avocado Toast", "Sourdough, smashed avocado, chilli flakes", 290, true],
    ["Starters", "Chicken Croissant Sandwich", "Herb mayo, greens, flaky croissant", 320, false],
    ["Main Course", "Truffle Mac & Cheese", "Three cheese bake with truffle", 360, true],
    ["Main Course", "Big Breakfast Plate", "Eggs, sausage, beans, toast", 420, false],
    ["Breads", "Butter Croissant", "48-hour laminated dough", 160, true],
    ["Breads", "Cinnamon Roll", "Cream cheese glaze", 190, true],
    ["Beverages", "Cold Brew", "16-hour steeped, smooth finish", 220, true],
    ["Beverages", "Hazelnut Cappuccino", "Roasted hazelnut syrup", 230, true],
    ["Desserts", "Basque Cheesecake", "Burnt top, molten centre", 280, true],
    ["Desserts", "Chocolate Hazelnut Tart", "Dark ganache, praline crunch", 300, true],
  ],
  mexican: [
    ["Recommended", "Al Pastor Tacos (3)", "Marinated pork, pineapple, onion", 340, false],
    ["Recommended", "Loaded Nachos Grande", "Queso, beans, pico, jalapeño", 320, true],
    ["Starters", "Guacamole & Chips", "Hand mashed avocado, lime, coriander", 280, true],
    ["Starters", "Elote Street Corn", "Charred corn, chipotle mayo, cotija", 220, true],
    ["Main Course", "Chicken Burrito Bowl", "Cilantro rice, black beans, salsa verde", 380, false],
    ["Main Course", "Veg Enchiladas", "Rolled tortillas, red sauce, cheese", 340, true],
    ["Main Course", "Chipotle Quesadilla", "Griddled tortilla, cheese, peppers", 300, true],
    ["Rice", "Mexican Red Rice", "Tomato rice with peas and corn", 200, true],
    ["Breads", "Warm Tortilla Basket", "Soft corn tortillas, four pieces", 140, true],
    ["Beverages", "Watermelon Agua Fresca", "Fresh melon, lime, mint", 180, true],
    ["Beverages", "Horchata", "Chilled rice-cinnamon cooler", 190, true],
    ["Desserts", "Churros with Chocolate", "Cinnamon sugar, dark dip", 240, true],
    ["Desserts", "Tres Leches Cake", "Three-milk soaked sponge", 260, true],
  ],
};

export const menuItems: MenuItem[] = restaurants.flatMap((r) =>
  menuTemplates[r.kitchen].map(([section, name, description, price, veg], idx) => ({
    id: `${r.id}-${idx}`,
    restaurantId: r.id,
    section,
    name,
    description,
    price: r.pureVeg && !veg ? price : price + (r.promoted ? 20 : 0),
    veg: r.pureVeg ? true : veg,
    rating: Number((3.9 + ((idx * 7) % 10) / 10).toFixed(1)),
    bestseller: idx < 2,
  })),
);

export const getRestaurant = (id: string) => restaurants.find((r) => r.id === id);
export const getMenu = (id: string) => menuItems.filter((m) => m.restaurantId === id);

export type Offer = {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  gradient: string;
  terms: string;
};

export const offers: Offer[] = [
  {
    id: "first50",
    title: "50% OFF",
    subtitle: "On your first order",
    code: "FEASTO50",
    gradient: "gradient-sunset",
    terms: "Max discount ₹120. Valid once per account.",
  },
  {
    id: "freedel",
    title: "FREE DELIVERY",
    subtitle: "On orders above ₹299",
    code: "SHIPFREE",
    gradient: "gradient-garden",
    terms: "Applicable within 5 km.",
  },
  {
    id: "weekend100",
    title: "₹100 OFF",
    subtitle: "Weekend special",
    code: "WEEKEND100",
    gradient: "gradient-berry",
    terms: "Saturday and Sunday only, above ₹499.",
  },
  {
    id: "bogo",
    title: "BUY 1 GET 1",
    subtitle: "On selected pizzas & burgers",
    code: "DOUBLEUP",
    gradient: "gradient-mango",
    terms: "On participating restaurants.",
  },
  {
    id: "cafe20",
    title: "20% OFF",
    subtitle: "Café & bakery orders",
    code: "BREWLOVE",
    gradient: "gradient-sunset",
    terms: "Max discount ₹80.",
  },
  {
    id: "night15",
    title: "₹75 OFF",
    subtitle: "Late night cravings after 10 PM",
    code: "MIDNIGHT75",
    gradient: "gradient-berry",
    terms: "Above ₹349.",
  },
];

export const popularSearches = [
  "Biryani",
  "Pizza",
  "Cold Brew",
  "Sushi",
  "Butter Chicken",
  "Tacos",
  "Salads",
];

export type Review = {
  id: string;
  restaurantId: string;
  author: string;
  rating: number;
  date: string;
  body: string;
};

const reviewBodies = [
  "Packed hot and the flavours were spot on. Will order weekly.",
  "Portions are generous and delivery beat the estimate by 6 minutes.",
  "Loved the freshness. Slightly spicy for my taste but excellent quality.",
  "Beautiful packaging, everything sealed well. The dessert stole the show.",
  "Consistently good. My go-to for weekend dinners with family.",
];
const authors = ["Aarav M.", "Ishita R.", "Kabir S.", "Meera D.", "Rohan T.", "Sana K."];

export const reviews: Review[] = restaurants.flatMap((r, ri) =>
  Array.from({ length: 4 }, (_, i) => ({
    id: `${r.id}-rev-${i}`,
    restaurantId: r.id,
    author: authors[(ri + i) % authors.length]!,
    rating: [5, 4, 5, 4][i]!,
    date: ["2 days ago", "1 week ago", "3 weeks ago", "2 months ago"][i]!,
    body: reviewBodies[(ri + i) % reviewBodies.length]!,
  })),
);

export const getReviews = (id: string) => reviews.filter((r) => r.restaurantId === id);

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
