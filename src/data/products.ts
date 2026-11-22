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
  roast?: 'light' | 'medium' | 'dark';
  origin?: string;
  notes?: string[];
  weight?: string; // e.g. "12 oz"
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
  { id: 'espresso', label: 'Espresso', count: 0 },
  { id: 'cold-brew', label: 'Cold Brew', count: 0 },
  { id: 'tea', label: 'Tea', count: 0 },
  { id: 'gear', label: 'Brew Gear', count: 0 },
  { id: 'accessories', label: 'Accessories', count: 0 },
];

export const PRODUCTS: Product[] = [
  {
    id: 'ethiopia-yirgacheffe',
    name: 'Ethiopia Yirgacheffe',
    description:
      'A bright, floral single-origin from the birthplace of coffee. Washed process brings out jasmine and citrus notes with a clean, tea-like body. Best enjoyed black, pour-over or Chemex.',
    shortDescription: 'Floral, bright, tea-like single-origin.',
    price: 2200,
    category: 'coffee',
    categoryLabel: 'Coffee',
    roast: 'light',
    origin: 'Yirgacheffe, Ethiopia',
    notes: ['jasmine', 'lemon', 'bergamot'],
    weight: '12 oz',
    stock: 34,
    featured: true,
    bestseller: true,
    image: '/products/ethiopia-yirgacheffe.jpg',
    images: ['/products/ethiopia-yirgacheffe.jpg'],
  },
  {
    id: 'colombia-huila',
    name: 'Colombia Huila',
    description:
      'Balanced and approachable, this medium roast from Huila offers caramel sweetness, red apple, and a smooth finish. A great everyday cup.',
    shortDescription: 'Caramel, red apple, smooth everyday cup.',
    price: 1900,
    comparePrice: 2100,
    category: 'coffee',
    categoryLabel: 'Coffee',
    roast: 'medium',
    origin: 'Huila, Colombia',
    notes: ['caramel', 'red apple', 'hazelnut'],
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
    roast: 'dark',
    origin: 'Sumatra, Indonesia',
    notes: ['dark chocolate', 'cedar', 'spice'],
    weight: '12 oz',
    stock: 28,
    image: '/products/sumatra-mandheling.jpg',
  },
  {
    id: 'kenya-aa',
    name: 'Kenya AA',
    description:
      'Bold and juicy with blackcurrant and wine-like acidity. A high-grown AA lot that shines as a pour-over.',
    shortDescription: 'Blackcurrant, wine-like, bright.',
    price: 2400,
    category: 'coffee',
    categoryLabel: 'Coffee',
    roast: 'light',
    origin: 'Nyeri, Kenya',
    notes: ['blackcurrant', 'wine', 'grapefruit'],
    weight: '12 oz',
    stock: 19,
    new: true,
    image: '/products/kenya-aa.jpg',
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
    roast: 'medium',
    origin: 'Blend',
    notes: ['milk chocolate', 'almond', 'orange'],
    weight: '12 oz',
    stock: 60,
    bestseller: true,
    image: '/products/house-blend.jpg',
  },
  {
    id: 'decaf-swiss-water',
    name: 'Decaf (Swiss Water)',
    description:
      'All the flavor, none of the kick. Swiss Water Process decaf with notes of toasted hazelnut and milk chocolate.',
    shortDescription: 'Caffeine-free, hazelnut, milk chocolate.',
    price: 1900,
    category: 'coffee',
    categoryLabel: 'Coffee',
    roast: 'medium',
    origin: 'Blend',
    notes: ['toasted hazelnut', 'milk chocolate'],
    weight: '12 oz',
    stock: 22,
    image: '/products/decaf-swiss-water.jpg',
  },
  {
    id: 'espresso-blend',
    name: 'Espresso Blend',
    description:
      'Developed for the machine. Syrupy body with dark chocolate and a lingering caramel crema. Pulls great as a shot or in milk drinks.',
    shortDescription: 'Syrupy, dark chocolate, caramel crema.',
    price: 2100,
    category: 'espresso',
    categoryLabel: 'Espresso',
    roast: 'dark',
    origin: 'Blend',
    notes: ['dark chocolate', 'caramel', 'nut'],
    weight: '12 oz',
    stock: 40,
    featured: true,
    image: '/products/espresso-blend.jpg',
  },
  {
    id: 'cold-brew-pack',
    name: 'Cold Brew Pack',
    description:
      'Coarsely ground and pre-portioned for cold brew. Steep overnight for a smooth, chocolatey concentrate.',
    shortDescription: 'Pre-portioned, smooth concentrate.',
    price: 1800,
    category: 'cold-brew',
    categoryLabel: 'Cold Brew',
    origin: 'Blend',
    notes: ['cocoa', 'molasses'],
    weight: '6 × 3 oz pouches',
    stock: 31,
    image: '/products/cold-brew-pack.jpg',
  },
  {
    id: 'matcha-latte',
    name: 'Ceremonial Matcha',
    description:
      'Not coffee, but just as ritual. Vibrant green tea from Uji, whisked into a creamy latte or enjoyed straight.',
    shortDescription: 'Vibrant green tea, creamy latte.',
    price: 2600,
    category: 'tea',
    categoryLabel: 'Tea',
    origin: 'Uji, Japan',
    notes: ['umami', 'seaweed', 'sweet cream'],
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
    origin: 'Blend',
    notes: ['cardamom', 'cinnamon', 'ginger'],
    weight: '16 oz',
    stock: 18,
    image: '/products/chai-concentrate.jpg',
  },
  {
    id: 'french-press',
    name: 'Glass French Press',
    description:
      '8-cup borosilicate glass press with a stainless-steel plunger. Simple, timeless, and makes a clean cup.',
    shortDescription: '8-cup glass press, stainless plunger.',
    price: 3400,
    category: 'gear',
    categoryLabel: 'Brew Gear',
    weight: '34 oz',
    stock: 14,
    image: '/products/french-press.jpg',
  },
  {
    id: 'pour-over-dripper',
    name: 'Ceramic Pour-Over Dripper',
    description:
      'Cone-shaped ceramic dripper for controlled, hands-on brewing. Pairs with paper filters and a gooseneck kettle.',
    shortDescription: 'Ceramic cone dripper for control.',
    price: 2800,
    category: 'gear',
    categoryLabel: 'Brew Gear',
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
    category: 'gear',
    categoryLabel: 'Brew Gear',
    stock: 8,
    image: '/products/gooseneck-kettle.jpg',
  },
  {
    id: 'coffee-scoop',
    name: 'Wooden Coffee Scoop',
    description:
      'Hand-turned beechwood scoop, holds exactly 10 g of whole beans. A small ritual made better.',
    shortDescription: 'Hand-turned beechwood, 10 g.',
    price: 1400,
    category: 'accessories',
    categoryLabel: 'Accessories',
    stock: 44,
    image: '/products/coffee-scoop.jpg',
  },
  {
    id: 'canvas-tote',
    name: 'Canvas Tote Bag',
    description:
      'Heavyweight organic cotton tote with a screen-printed coffee branch. Carry your beans in style.',
    shortDescription: 'Organic cotton, coffee branch print.',
    price: 2600,
    category: 'accessories',
    categoryLabel: 'Accessories',
    stock: 36,
    image: '/products/canvas-tote.jpg',
  },
  {
    id: 'glass-mug',
    name: 'Double-Wall Glass Mug',
    description:
      'Double-wall borosilicate glass keeps your coffee hot and your hands cool. Shows off latte art beautifully.',
    shortDescription: 'Double-wall glass, stays hot.',
    price: 2200,
    category: 'accessories',
    categoryLabel: 'Accessories',
    stock: 29,
    image: '/products/glass-mug.jpg',
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
      p.notes?.some((n) => n.toLowerCase().includes(q)),
  );
}
