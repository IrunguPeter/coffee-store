import { createContext, useContext, useCallback, useState, useMemo } from 'react';
import type { Promo } from '../data/promos';
import { getPromo, calculateDiscount, isPromoValid } from '../data/promos';

type PromoContextType = {
  appliedPromo: Promo | null;
  promoCode: string;
  promoError: string | null;
  setPromoCode: (code: string) => void;
  applyPromo: (subtotal: number, applicableSubtotal: number) => { discount: number; description: string };
  removePromo: () => void;
  validatePromo: (code: string) => { valid: boolean; promo: Promo | null; message: string };
};

const PromoContext = createContext<PromoContextType | undefined>(undefined);

export function PromoProvider({ children }: { children: React.ReactNode }) {
  const [promoCode, setPromoCodeState] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<Promo | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

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

  const applyPromo = useCallback(
    (subtotal: number, applicableSubtotal: number) => {
      if (!appliedPromo) return { discount: 0, description: '' };
      return calculateDiscount(appliedPromo, subtotal, applicableSubtotal);
    },
    [appliedPromo],
  );

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

  const handleApply = useCallback(
    (subtotal: number, applicableSubtotal: number) => {
      const result = validatePromo(promoCode);
      if (result.valid && result.promo) {
        setAppliedPromo(result.promo);
        setPromoError(null);
        return calculateDiscount(result.promo, subtotal, applicableSubtotal);
      }
      setPromoError(result.message);
      return { discount: 0, description: '' };
    },
    [promoCode, validatePromo],
  );

  const value = useMemo(
    () => ({
      appliedPromo,
      promoCode,
      promoError,
      setPromoCode,
      applyPromo: handleApply,
      removePromo,
      validatePromo,
    }),
    [appliedPromo, promoCode, promoError, setPromoCode, handleApply, removePromo, validatePromo],
  );

  return <PromoContext.Provider value={value}>{children}</PromoContext.Provider>;
}

export function usePromo() {
  const ctx = useContext(PromoContext);
  if (!ctx) {
    throw new Error('usePromo must be used within a PromoProvider');
  }
  return ctx;
}
