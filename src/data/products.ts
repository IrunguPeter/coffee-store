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
    weight: '250 g',
    stock: 34,
    featured: true,
    bestseller: true,
    image: 'https://images.unsplash.com/photo-1447933601403-0c698afde45e?q=80&w=800&auto=format&fit=crop',
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
    weight: '250 g',
    stock: 52,
    featured: true,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bc78a991?q=80&w=800&auto=format&fit=crop',
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
    weight: '250 g',
    stock: 28,
    image: 'https://images.unsplash.com/photo-1509059388597-a9961a6e8ac2?q=80&w=800&auto=format&fit=crop',
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
    weight: '500 g',
    stock: 60,
    bestseller: true,
    image: 'https://images.unsplash.com/photo-1559056199-641a0a8b852e?q=80&w=800&auto=format&fit=crop',
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
    weight: '500 g',
    stock: 40,
    featured: true,
    image: 'https://images.unsplash.com/photo-1517657613422-3a1321c678d0?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1615186893837-c1435f0c9a8b?q=80&w=800&auto=format&fit=crop',
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
    weight: '250 g',
    stock: 18,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop',
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
    weight: '1 L',
    stock: 14,
    image: 'https://images.unsplash.com/photo-1535034622062-6e189756853d?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1529656337949-f1eeb8b004df?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1585465275093-547788396e0d?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1590047093189-1a717693ee31?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1553346708-fd2820b91233?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1563399679-79793c401572?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1543734497-0921c7f3c8b3?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1518675471968-0c123d7e83f6?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1601021059028-b024e4a0c080?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1544367567-0f2dde668912?q=80&w=800&auto=format&fit=crop',
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
    weight: '6 × 40 g',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1565537577292-d05b9388a906?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1604744826267-0a56a5b9c218?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1544947951-fa475153bb82?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1515753908618-064795f5e8d6?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1583497447615-3a28306b8fde?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1589490333741-77f2fe2714e6?q=80&w=800&auto=format&fit=crop',
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
