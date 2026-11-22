export type DiscountType = 'percentage' | 'fixed';

export type Promo = {
  id: string;
  code: string;
  description: string;
  type: DiscountType;
  value: number; // percentage (0-100) or fixed amount in cents
  appliesTo: 'all' | 'category' | 'product';
  targetId?: string; // category id or product id
  minSpend?: number; // cents
  maxUses?: number;
  usedCount: number;
  expiresAt?: string; // ISO date string
  active: boolean;
  createdAt: string;
};

export const PROMOS: Promo[] = [
  {
    id: 'promo-1',
    code: 'WELCOME10',
    description: '10% off your first order',
    type: 'percentage',
    value: 10,
    appliesTo: 'all',
    minSpend: 1000,
    maxUses: 100,
    usedCount: 12,
    expiresAt: '2027-12-31',
    active: true,
    createdAt: '2026-11-01',
  },
  {
    id: 'promo-2',
    code: 'COFFEE200',
    description: 'KSh 200 off coffee orders over KSh 1000',
    type: 'fixed',
    value: 200,
    appliesTo: 'category',
    targetId: 'coffee',
    minSpend: 1000,
    maxUses: 50,
    usedCount: 8,
    expiresAt: '2026-12-31',
    active: true,
    createdAt: '2026-11-01',
  },
  {
    id: 'promo-3',
    code: 'FREESHIP',
    description: 'Free shipping on all orders',
    type: 'fixed',
    value: 0,
    appliesTo: 'all',
    maxUses: 200,
    usedCount: 45,
    expiresAt: '2027-06-30',
    active: true,
    createdAt: '2026-11-01',
  },
];

export function getPromo(code: string): Promo | undefined {
  return PROMOS.find(
    (p) => p.code.toLowerCase() === code.toLowerCase() && p.active,
  );
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
