import { createContext, useContext, useCallback, useState, useMemo } from 'react';
import type { Product } from '../data/products';
import type { Promo } from '../data/promos';
import { getPromo, calculateDiscount, isPromoValid } from '../data/promos';

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  discount: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  // Promo support (async via API)
  appliedPromo: Promo | null;
  promoCode: string;
  promoError: string | null;
  promoLoading: boolean;
  setPromoCode: (code: string) => void;
  applyPromo: () => Promise<{ discount: number; description: string }>;
  removePromo: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [promoCode, setPromoCodeState] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<Promo | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoLoading, setPromoLoading] = useState(false);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedPromo(null);
    setPromoCodeState('');
    setPromoError(null);
  }, []);

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items],
  );

  const discount = useMemo(() => {
    if (!appliedPromo) return 0;
    let applicableSubtotal = subtotal;
    if (appliedPromo.appliesTo === 'category' && appliedPromo.targetId) {
      applicableSubtotal = items
        .filter((i) => i.product.category === appliedPromo.targetId)
        .reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    } else if (appliedPromo.appliesTo === 'product' && appliedPromo.targetId) {
      applicableSubtotal = items
        .filter((i) => i.product.id === appliedPromo.targetId)
        .reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    }
    const { discount } = calculateDiscount(appliedPromo, subtotal, applicableSubtotal);
    return discount;
  }, [appliedPromo, items, subtotal]);

  const total = useMemo(() => subtotal - discount, [subtotal, discount]);

  const setPromoCode = useCallback((code: string) => {
    setPromoCodeState(code);
    setPromoError(null);
    if (!code.trim()) {
      setAppliedPromo(null);
    }
  }, []);

  const removePromo = useCallback(() => {
    setPromoCodeState('');
    setAppliedPromo(null);
    setPromoError(null);
  }, []);

  const applyPromo = useCallback(async () => {
    if (!promoCode.trim()) return { discount: 0, description: '' };
    setPromoLoading(true);
    setPromoError(null);
    try {
      const promo = await getPromo(promoCode);
      if (!promo || !isPromoValid(promo)) {
        setPromoError('Invalid or expired promo code');
        return { discount: 0, description: '' };
      }
      if (promo.minSpend && subtotal < promo.minSpend) {
        setPromoError(`Minimum spend of KSh ${(promo.minSpend / 100).toFixed(0)} required`);
        return { discount: 0, description: '' };
      }
      setAppliedPromo(promo);
      const { discount, description } = calculateDiscount(promo, subtotal, subtotal);
      return { discount, description };
    } catch {
      setPromoError('Failed to validate promo code');
      return { discount: 0, description: '' };
    } finally {
      setPromoLoading(false);
    }
  }, [promoCode, subtotal]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((o) => !o), []);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
      discount,
      total,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      appliedPromo,
      promoCode,
      promoError,
      promoLoading,
      setPromoCode,
      applyPromo,
      removePromo,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal, discount, total, isOpen, openCart, closeCart, toggleCart, appliedPromo, promoCode, promoError, promoLoading, setPromoCode, applyPromo, removePromo],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
