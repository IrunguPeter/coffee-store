export type Product = {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number; // cents
  comparePrice?: number; // cents
  category: string;
  categoryLabel: string;
  image: string;
  images?: string[];
  weight?: string;
  stock: number;
  featured?: boolean;
  bestseller?: boolean;
  new?: boolean;
};

export type Category = {
  id: string;
  label: string;
  count: number;
};

export const CATEGORIES: Category[] = [
  { id: 'coffee', label: 'Coffee', count: 0 },
  { id: 'tea', label: 'Tea', count: 0 },
  { id: 'kitchen', label: 'Kitchen', count: 0 },
  { id: 'home', label: 'Home', count: 0 },
  { id: 'wellness', label: 'Wellness', count: 0 },
  { id: 'apparel', label: 'Apparel', count: 0 },
  { id: 'books', label: 'Books', count: 0 },
  { id: 'tech', label: 'Tech', count: 0 },
];

export const PRODUCTS: Product[] = [
  // Coffee
  {
    id: 'ethiopia-yirgacheffe',
    name: 'Ethiopia Yirgacheffe',
    description:
      'A bright, floral single-origin from the birthplace of coffee. Washed process brings out jasmine and citrus notes with a clean, tea-like body.',
    shortDescription: 'Floral, bright, tea-like single-origin.',
    price: 2200,
    category: 'coffee',
    categoryLabel: 'Coffee',
    weight: '12 oz',
    stock: 34,
    featured: true,
    bestseller: true,
    image: '/products/ethiopia-yirgacheffe.jpg',
  },
  {
    id: 'colombia-huila',
    name: 'Colombia Huila',
    description:
      'Balanced and approachable, this medium roast from Huila offers caramel sweetness, red apple, and a smooth finish.',
    shortDescription: 'Caramel, red apple, smooth everyday cup.',
    price: 1900,
    comparePrice: 2100,
    category: 'coffee',
    categoryLabel: 'Coffee',
    weight: '12 oz',
    stock: 52,
    featured: true,
    image: '/products/colombia-huila.jpg',
  },
  {
    id: 'sumatra-mandheling',
    name: 'Sumatra Mandheling',
    description:
      'Deep, earthy, and full-bodied. Dark chocolate and spice with low acidity. A classic choice for French press or cold brew.',
    shortDescription: 'Earthy, dark chocolate, full-bodied.',
    price: 2000,
    category: 'coffee',
    categoryLabel: 'Coffee',
    weight: '12 oz',
    stock: 28,
    image: '/products/sumatra-mandheling.jpg',
  },
  {
    id: 'house-blend',
    name: 'House Blend',
    description:
      'Our signature blend: chocolate, nut, and a hint of citrus. Consistent and crowd-pleasing, morning after morning.',
    shortDescription: 'Chocolate, nut, crowd-pleasing.',
    price: 1700,
    category: 'coffee',
    categoryLabel: 'Coffee',
    weight: '12 oz',
    stock: 60,
    bestseller: true,
    image: '/products/house-blend.jpg',
  },
  {
    id: 'espresso-blend',
    name: 'Espresso Blend',
    description:
      'Developed for the machine. Syrupy body with dark chocolate and a lingering caramel crema.',
    shortDescription: 'Syrupy, dark chocolate, caramel crema.',
    price: 2100,
    category: 'coffee',
    categoryLabel: 'Coffee',
    weight: '12 oz',
    stock: 40,
    featured: true,
    image: '/products/espresso-blend.jpg',
  },
  // Tea
  {
    id: 'matcha-latte',
    name: 'Ceremonial Matcha',
    description:
      'Vibrant green tea from Uji, whisked into a creamy latte or enjoyed straight.',
    shortDescription: 'Vibrant green tea, creamy latte.',
    price: 2600,
    category: 'tea',
    categoryLabel: 'Tea',
    weight: '30 g',
    stock: 26,
    new: true,
    image: '/products/matcha-latte.jpg',
  },
  {
    id: 'chai-concentrate',
    name: 'Spiced Chai Concentrate',
    description:
      'Cardamom, cinnamon, ginger, and black tea reduced to a concentrate. Mix with milk over ice.',
    shortDescription: 'Cardamom, cinnamon, ginger concentrate.',
    price: 1600,
    category: 'tea',
    categoryLabel: 'Tea',
    weight: '16 oz',
    stock: 18,
    image: '/products/chai-concentrate.jpg',
  },
  // Kitchen
  {
    id: 'french-press',
    name: 'Glass French Press',
    description:
      '8-cup borosilicate glass press with a stainless-steel plunger. Simple, timeless, and makes a clean cup.',
    shortDescription: '8-cup glass press, stainless plunger.',
    price: 3400,
    category: 'kitchen',
    categoryLabel: 'Kitchen',
    weight: '34 oz',
    stock: 14,
    image: '/products/french-press.jpg',
  },
  {
    id: 'pour-over-dripper',
    name: 'Ceramic Pour-Over Dripper',
    description:
      'Cone-shaped ceramic dripper for controlled, hands-on brewing.',
    shortDescription: 'Ceramic cone dripper for control.',
    price: 2800,
    category: 'kitchen',
    categoryLabel: 'Kitchen',
    stock: 20,
    image: '/products/pour-over-dripper.jpg',
  },
  {
    id: 'gooseneck-kettle',
    name: 'Gooseneck Kettle',
    description:
      'Temperature-controlled gooseneck kettle for precise pour-overs. Holds heat for 60 minutes.',
    shortDescription: 'Temp-controlled, precise pouring.',
    price: 7800,
    category: 'kitchen',
    categoryLabel: 'Kitchen',
    stock: 8,
    image: '/products/gooseneck-kettle.jpg',
  },
  {
    id: 'chef-knife',
    name: 'Chef\'s Knife',
    description:
      '8-inch high-carbon stainless chef\'s knife with a ergonomic handle. The workhorse of any kitchen.',
    shortDescription: '8-inch high-carbon chef\'s knife.',
    price: 8400,
    comparePrice: 9600,
    category: 'kitchen',
    categoryLabel: 'Kitchen',
    stock: 12,
    featured: true,
    image: '/products/chef-knife.jpg',
  },
  {
    id: 'cast-iron-skillet',
    name: 'Cast Iron Skillet',
    description:
      '12-inch pre-seasoned cast iron skillet. Goes from stovetop to oven and lasts generations.',
    shortDescription: '12-inch pre-seasoned cast iron.',
    price: 5200,
    category: 'kitchen',
    categoryLabel: 'Kitchen',
    stock: 16,
    image: '/products/cast-iron-skillet.jpg',
  },
  // Home
  {
    id: 'canvas-tote',
    name: 'Canvas Tote Bag',
    description:
      'Heavyweight organic cotton tote with a screen-printed design. Carry your goods in style.',
    shortDescription: 'Organic cotton tote bag.',
    price: 2600,
    category: 'home',
    categoryLabel: 'Home',
    stock: 36,
    image: '/products/canvas-tote.jpg',
  },
  {
    id: 'glass-mug',
    name: 'Double-Wall Glass Mug',
    description:
      'Double-wall borosilicate glass keeps your drink hot and your hands cool.',
    shortDescription: 'Double-wall glass, stays hot.',
    price: 2200,
    category: 'home',
    categoryLabel: 'Home',
    stock: 29,
    image: '/products/glass-mug.jpg',
  },
  {
    id: 'throw-blanket',
    name: 'Cotton Throw Blanket',
    description:
      'Soft woven cotton throw in a neutral stripe. Perfect for the sofa or the foot of the bed.',
    shortDescription: 'Woven cotton throw, neutral stripe.',
    price: 6800,
    category: 'home',
    categoryLabel: 'Home',
    stock: 22,
    new: true,
    image: '/products/throw-blanket.jpg',
  },
  {
    id: 'ceramic-vase',
    name: 'Ceramic Vase',
    description:
      'Hand-thrown ceramic vase in matte glaze. Holds fresh flowers or stands alone.',
    shortDescription: 'Hand-thrown ceramic vase.',
    price: 4400,
    category: 'home',
    categoryLabel: 'Home',
    stock: 11,
    image: '/products/ceramic-vase.jpg',
  },
  // Wellness
  {
    id: 'aroma-diffuser',
    name: 'Aroma Diffuser',
    description:
      'Ultrasonic essential oil diffuser with soft LED glow. Quiet operation for any room.',
    shortDescription: 'Ultrasonic oil diffuser with LED glow.',
    price: 4200,
    category: 'wellness',
    categoryLabel: 'Wellness',
    stock: 18,
    image: '/products/aroma-diffuser.jpg',
  },
  {
    id: 'yoga-mat',
    name: 'Yoga Mat',
    description:
      'Non-slip, extra-thick yoga mat with carrying strap. For practice anywhere.',
    shortDescription: 'Non-slip yoga mat with strap.',
    price: 3800,
    category: 'wellness',
    categoryLabel: 'Wellness',
    stock: 30,
    featured: true,
    image: '/products/yoga-mat.jpg',
  },
  {
    id: 'herbal-tea',
    name: 'Herbal Tea Sampler',
    description:
      'Six caffeine-free herbal blends: chamomile, peppermint, rooibos, hibiscus, lemongrass, and ginger.',
    shortDescription: 'Six caffeine-free herbal blends.',
    price: 2400,
    category: 'wellness',
    categoryLabel: 'Wellness',
    weight: '6 × 1.5 oz',
    stock: 40,
    image: '/products/herbal-tea.jpg',
  },
  // Apparel
  {
    id: 'organic-tee',
    name: 'Organic Cotton Tee',
    description:
      'Soft, heavyweight organic cotton t-shirt in a relaxed fit. Pre-shrunk and built to last.',
    shortDescription: 'Heavyweight organic cotton tee.',
    price: 3400,
    category: 'apparel',
    categoryLabel: 'Apparel',
    stock: 44,
    image: '/products/organic-tee.jpg',
  },
  {
    id: 'wool-socks',
    name: 'Merino Wool Socks',
    description:
      'Temperature-regulating merino wool socks, reinforced heel and toe. Three pairs.',
    shortDescription: 'Merino wool socks, 3 pairs.',
    price: 2800,
    category: 'apparel',
    categoryLabel: 'Apparel',
    stock: 50,
    image: '/products/wool-socks.jpg',
  },
  // Books
  {
    id: 'cookbook',
    name: 'Seasonal Cookbook',
    description:
      'A cookbook organized by season, with simple recipes that let ingredients shine.',
    shortDescription: 'Seasonal recipes, ingredient-led.',
    price: 3200,
    category: 'books',
    categoryLabel: 'Books',
    stock: 25,
    new: true,
    image: '/products/cookbook.jpg',
  },
  {
    id: 'notebook',
    name: 'Lined Notebook',
    description:
      '160 dotted pages, cloth cover, lay-flat binding. For notes, lists, and ideas.',
    shortDescription: '160 dotted pages, cloth cover.',
    price: 1800,
    category: 'books',
    categoryLabel: 'Books',
    stock: 60,
    image: '/products/notebook.jpg',
  },
  // Tech
  {
    id: 'wireless-charger',
    name: 'Wireless Charging Pad',
    description:
      '10W wireless charging pad with silicone surface. Compatible with Qi-enabled devices.',
    shortDescription: '10W Qi wireless charger.',
    price: 3600,
    category: 'tech',
    categoryLabel: 'Tech',
    stock: 28,
    image: '/products/wireless-charger.jpg',
  },
  {
    id: 'bluetooth-speaker',
    name: 'Portable Bluetooth Speaker',
    description:
      'Water-resistant portable speaker with 12-hour battery and rich sound.',
    shortDescription: 'Water-resistant, 12-hour battery.',
    price: 6400,
    category: 'tech',
    categoryLabel: 'Tech',
    stock: 14,
    featured: true,
    image: '/products/bluetooth-speaker.jpg',
  },
];

// Populate category counts
for (const cat of CATEGORIES) {
  cat.count = PRODUCTS.filter((p) => p.category === cat.id).length;
}

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return PRODUCTS.filter((p) => p.category === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getBestsellers(): Product[] {
  return PRODUCTS.filter((p) => p.bestseller);
}

export function getNewArrivals(): Product[] {
  return PRODUCTS.filter((p) => p.new);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q),
  );
}
