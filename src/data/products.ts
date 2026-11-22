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

export async function getProducts(): Promise<Product[]> {
  return api.getProducts();
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  return api.getProducts({ category: categoryId });
}

export async function getProduct(id: string): Promise<Product | undefined> {
  try {
    return await api.getProduct(id);
  } catch {
    return undefined;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return api.getProducts({ featured: 'true' });
}

export async function getBestsellers(): Promise<Product[]> {
  return api.getProducts({ bestseller: 'true' });
}

export async function getNewArrivals(): Promise<Product[]> {
  return api.getProducts({ new: 'true' });
}

export async function searchProducts(query: string): Promise<Product[]> {
  const all: Product[] = await api.getProducts();
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
