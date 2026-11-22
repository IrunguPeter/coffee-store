import { createContext, useContext, useCallback, useState, useMemo, useEffect } from 'react';
import type { Promo } from '../data/promos';
import { getPromos, createPromo, updatePromo, deletePromo, togglePromo } from '../data/promos';

type PromoContextType = {
  promos: Promo[];
  loading: boolean;
  error: string | null;
  createPromo: (body: Omit<Promo, 'id'>) => Promise<void>;
  updatePromo: (id: string, body: Partial<Promo>) => Promise<void>;
  deletePromo: (id: string) => Promise<void>;
  togglePromo: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
};

const PromoContext = createContext<PromoContextType | undefined>(undefined);

export function PromoProvider({ children }: { children: React.ReactNode }) {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPromos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPromos();
      setPromos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load promos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPromos();
  }, [fetchPromos]);

  const createPromoHandler = useCallback(async (body: Omit<Promo, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      await createPromo(body);
      await fetchPromos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create promo');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchPromos]);

  const updatePromoHandler = useCallback(async (id: string, body: Partial<Promo>) => {
    setLoading(true);
    setError(null);
    try {
      await updatePromo(id, body);
      await fetchPromos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update promo');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchPromos]);

  const deletePromoHandler = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deletePromo(id);
      await fetchPromos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete promo');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchPromos]);

  const togglePromoHandler = useCallback(async (id: string) => {
    try {
      await togglePromo(id);
      await fetchPromos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle promo');
      throw err;
    }
  }, [fetchPromos]);

  const value = useMemo(
    () => ({
      promos,
      loading,
      error,
      createPromo: createPromoHandler,
      updatePromo: updatePromoHandler,
      deletePromo: deletePromoHandler,
      togglePromo: togglePromoHandler,
      refetch: fetchPromos,
    }),
    [promos, loading, error, createPromoHandler, updatePromoHandler, deletePromoHandler, togglePromoHandler, fetchPromos],
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
