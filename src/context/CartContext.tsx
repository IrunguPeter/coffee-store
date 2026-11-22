import { createContext, useContext, useCallback, useState, useMemo } from 'react';
import type { Product } from '../data/products';
import type { Promo } from '../data/promos';
import { getPromo, isPromoValid, calculateDiscount } from '../data/promos';

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
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  // Promo support
  appliedPromo: Promo | null;
  promoCode: string;
  promoError: string | null;
  setPromoCode: (code: string) => void;
  applyPromo: () => { discount: number; description: string };
  removePromo: () => void;
  validatePromo: (code: string) => { valid: boolean; promo: Promo | null; message: string };
  discount: number;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [promoCode, setPromoCodeState] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<Promo | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

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

  // Promo logic
  const validatePromo = useCallback((code: string) => {
    if (!code.trim()) {
      return { valid: false, promo: null, message: 'Please enter a promo code' };
    }
    const promo = getPromo(code);
    if (!promo) {
      return { valid: false, promo: null, message: 'Invalid promo code' };
    }
    if (!isPromoValid(promo)) {
      return { valid: false, promo: null, message: 'This promo code is no longer valid' };
    }
    return { valid: true, promo, message: 'Promo code applied' };
  }, []);

  const discount = useMemo(() => {
    if (!appliedPromo) return 0;
    // Calculate applicable subtotal based on promo scope
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

  const applyPromo = useCallback(() => {
    const result = validatePromo(promoCode);
    if (result.valid && result.promo) {
      // Check min spend
      if (result.promo.minSpend && subtotal < result.promo.minSpend) {
        setPromoError(`Minimum spend of KSh ${(result.promo.minSpend / 100).toFixed(0)} required`);
        return { discount: 0, description: '' };
      }
      setAppliedPromo(result.promo);
      setPromoError(null);
      return { discount, description: result.promo.type === 'percentage' ? `${result.promo.value}% off` : `KSh ${(result.promo.value / 100).toFixed(0)} off` };
    }
    setPromoError(result.message);
    return { discount: 0, description: '' };
  }, [promoCode, subtotal, discount, validatePromo]);

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
      setPromoCode,
      applyPromo,
      removePromo,
      validatePromo,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal, discount, total, isOpen, openCart, closeCart, toggleCart, appliedPromo, promoCode, promoError, setPromoCode, applyPromo, removePromo, validatePromo],
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
