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

import { api } from '../lib/api';

// Frontend catalog fallback keeps the storefront populated when the demo API/database
// is not running. The API remains the source of truth whenever it returns products.
export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'kenya-aa',
    name: 'Kenya AA',
    description: 'A bright, juicy roast with blackcurrant sweetness and a clean finish. A beautiful everyday pour-over.',
    shortDescription: 'Blackcurrant, bright, beautifully clean.',
    price: 2400,
    category: 'coffee',
    categoryLabel: 'Coffee',
    image: 'https://images.unsplash.com/photo-1510707565773-92065ed4a924?q=80&w=900&auto=format&fit=crop',
    weight: '250 g',
    stock: 19,
    featured: true,
    bestseller: true,
  },
  {
    id: 'ceremonial-matcha',
    name: 'Ceremonial Matcha',
    description: 'Vibrant green tea from Uji, whisked into a creamy latte or enjoyed straight.',
    shortDescription: 'Vibrant green tea, creamy and bright.',
    price: 2600,
    category: 'tea',
    categoryLabel: 'Tea',
    image: 'https://images.unsplash.com/photo-1615186893837-c1435f0c9a8b?q=80&w=900&auto=format&fit=crop',
    weight: '30 g',
    stock: 26,
    new: true,
  },
  {
    id: 'glass-french-press',
    name: 'Glass French Press',
    description: 'An 8-cup borosilicate glass press with a stainless-steel plunger. Simple, timeless, and built for sharing.',
    shortDescription: '8-cup glass press, stainless plunger.',
    price: 3400,
    category: 'kitchen',
    categoryLabel: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1535034622062-6e189756853d?q=80&w=900&auto=format&fit=crop',
    weight: '1 L',
    stock: 14,
    featured: true,
  },
  {
    id: 'canvas-tote',
    name: 'Canvas Tote Bag',
    description: 'A heavyweight organic cotton tote with a screen-printed design. Carry your daily essentials in style.',
    shortDescription: 'Organic cotton, built for every day.',
    price: 2600,
    category: 'apparel',
    categoryLabel: 'Apparel',
    image: 'https://images.unsplash.com/photo-1553346708-fd2820b91233?q=80&w=900&auto=format&fit=crop',
    weight: '1 unit',
    stock: 36,
    bestseller: true,
  },
  {
    id: 'cotton-throw',
    name: 'Cotton Throw Blanket',
    description: 'A soft woven cotton throw in a neutral stripe. Made for the sofa, the foot of the bed, or a late evening outside.',
    shortDescription: 'Woven cotton, neutral stripe, very soft.',
    price: 6800,
    category: 'home',
    categoryLabel: 'Home',
    image: 'https://images.unsplash.com/photo-1543734497-0921c7f3c8b3?q=80&w=900&auto=format&fit=crop',
    weight: '1 unit',
    stock: 22,
    featured: true,
  },
  {
    id: 'aroma-diffuser',
    name: 'Aroma Diffuser',
    description: 'An ultrasonic essential-oil diffuser with a soft LED glow and quiet operation for any room.',
    shortDescription: 'Quiet mist, soft light, calmer rooms.',
    price: 4200,
    category: 'wellness',
    categoryLabel: 'Wellness',
    image: 'https://images.unsplash.com/photo-1601021059028-b024e4a0c080?q=80&w=900&auto=format&fit=crop',
    weight: '1 unit',
    stock: 18,
    new: true,
  },
  {
    id: 'seasonal-cookbook',
    name: 'Seasonal Cookbook',
    description: 'A generous cookbook organized by season, with simple recipes that let good ingredients shine.',
    shortDescription: 'Seasonal recipes, ingredient-led.',
    price: 3200,
    category: 'books',
    categoryLabel: 'Books',
    image: 'https://images.unsplash.com/photo-1544947951-fa475153bb82?q=80&w=900&auto=format&fit=crop',
    weight: '1 unit',
    stock: 25,
    new: true,
  },
  {
    id: 'wireless-charging-pad',
    name: 'Wireless Charging Pad',
    description: 'A slim 10W wireless charging pad with a soft silicone surface for Qi-enabled devices.',
    shortDescription: '10W Qi charging, clean desk energy.',
    price: 3600,
    category: 'tech',
    categoryLabel: 'Tech',
    image: 'https://images.unsplash.com/photo-1583497447615-3a28306b8fde?q=80&w=900&auto=format&fit=crop',
    weight: '1 unit',
    stock: 28,
    featured: true,
  },
];

async function fetchOrSample<T>(request: () => Promise<T[]>, fallback = SAMPLE_PRODUCTS): Promise<T[]> {
  try {
    const result = await request();
    return result.length > 0 ? result : fallback as T[];
  } catch {
    return fallback as T[];
  }
}

export async function getProducts(): Promise<Product[]> {
  return fetchOrSample(() => api.getProducts());
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  return fetchOrSample(() => api.getProducts({ category: categoryId }), SAMPLE_PRODUCTS.filter((product) => product.category === categoryId));
}

export async function getProduct(id: string): Promise<Product | undefined> {
  try {
    return await api.getProduct(id) || SAMPLE_PRODUCTS.find((product) => product.id === id);
  } catch {
    return SAMPLE_PRODUCTS.find((product) => product.id === id);
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return fetchOrSample(() => api.getProducts({ featured: 'true' }), SAMPLE_PRODUCTS.filter((product) => product.featured));
}

export async function getBestsellers(): Promise<Product[]> {
  return fetchOrSample(() => api.getProducts({ bestseller: 'true' }), SAMPLE_PRODUCTS.filter((product) => product.bestseller));
}

export async function getNewArrivals(): Promise<Product[]> {
  return fetchOrSample(() => api.getProducts({ new: 'true' }), SAMPLE_PRODUCTS.filter((product) => product.new));
}

export async function searchProducts(query: string): Promise<Product[]> {
  const all: Product[] = await getProducts();
  const q = query.toLowerCase();
  return all.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q),
  );
}

export async function createProduct(body: Omit<Product, 'id'>) {
  return api.createProduct(body);
}

export async function updateProduct(id: string, body: Partial<Product>) {
  return api.updateProduct(id, body);
}

export async function deleteProduct(id: string) {
  return api.deleteProduct(id);
}
