export type DiscountType = 'percentage' | 'fixed';

export type Promo = {
  id: string;
  code: string;
  description: string;
  type: DiscountType;
  value: number;
  appliesTo: 'all' | 'category' | 'product';
  targetId?: string;
  minSpend?: number;
  maxUses?: number;
  usedCount: number;
  expiresAt?: string;
  active: boolean;
  createdAt: string;
};

import { api } from '../lib/api';

export async function getPromos(): Promise<Promo[]> {
  return api.getPromos();
}

export async function getPromo(code: string): Promise<Promo | undefined> {
  try {
    return await api.getPromo(code);
  } catch {
    return undefined;
  }
}

export async function createPromo(body: Omit<Promo, 'id'>) {
  return api.createPromo(body);
}

export async function updatePromo(id: string, body: Partial<Promo>) {
  return api.updatePromo(id, body);
}

export async function deletePromo(id: string) {
  return api.deletePromo(id);
}

export async function togglePromo(id: string) {
  return api.togglePromo(id);
}

export function isPromoValid(promo: Promo): boolean {
  if (!promo.active) return false;
  if (promo.expiresAt && new Date(promo.expiresAt) < new Date()) return false;
  if (promo.maxUses && promo.usedCount >= promo.maxUses) return false;
  return true;
}

export function calculateDiscount(
  promo: Promo,
  subtotal: number,
  applicableSubtotal: number,
): { discount: number; description: string } {
  if (!isPromoValid(promo)) return { discount: 0, description: '' };

  let discount = 0;
  let description = '';

  if (promo.type === 'percentage') {
    discount = Math.round((applicableSubtotal * promo.value) / 100);
    description = `${promo.value}% off`;
  } else if (promo.type === 'fixed') {
    discount = Math.min(promo.value, applicableSubtotal);
    description = `KSh ${(promo.value / 100).toFixed(0)} off`;
  }

  return { discount, description };
}
