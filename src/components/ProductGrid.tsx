import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid2X2, List, SlidersHorizontal, Search, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { getProducts, getProductsByCategory, searchProducts, CATEGORIES, type Product } from '../data/products';

export default function ProductGrid() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const query = searchParams.get('q') ?? '';
  const category = searchParams.get('category') ?? 'all';

  useEffect(() => {
    setLoading(true);
    const load = query ? searchProducts(query) : category !== 'all' ? getProductsByCategory(category) : getProducts();
    load.then(setProducts).catch(() => setProducts([])).finally(() => setLoading(false));
  }, [query, category]);

  const currentLabel = query ? `Results for “${query}”` : category === 'all' ? 'The full collection' : CATEGORIES.find((item) => item.id === category)?.label ?? category;

  return <section className="section min-h-[70vh] bg-oat"><div className="page-width"><div className="mb-12 flex flex-col justify-between gap-8 border-b border-espresso/15 pb-8 lg:flex-row lg:items-end"><div><span className="eyebrow">The collection / 2025</span><h1 className="mt-4 text-5xl font-semibold sm:text-7xl">Shop the good stuff.</h1><p className="mt-4 max-w-xl text-sm leading-6 text-espresso/60">Small-batch coffee, useful objects, and gifts with a sense of place. Take your time.</p></div><div className="flex items-center gap-3"><span className="flex items-center gap-2 rounded-full border border-espresso/15 bg-paper px-4 py-2 font-mono text-[10px] uppercase tracking-[.12em] text-espresso/55"><Search size={14} className="text-copper" /> {currentLabel}</span></div></div><div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div className="flex items-center gap-2 overflow-x-auto pb-1">{[['all', 'All'], ...CATEGORIES.slice(0, 5).map((item) => [item.id, item.label] as [string, string])].map(([id, label]) => <a key={id} href={id === 'all' ? '/shop' : `/shop?category=${id}`} className={`whitespace-nowrap rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[.1em] transition-colors ${category === id ? 'border-espresso bg-espresso text-oat' : 'border-espresso/15 bg-paper text-espresso/60 hover:border-copper hover:text-copper'}`}>{label}</a>)}</div><div className="flex items-center gap-2"><button className="btn-ghost border border-espresso/10 bg-paper"><SlidersHorizontal size={15} /> Filter</button><div className="flex rounded-full border border-espresso/10 bg-paper p-1"><button onClick={() => setView('grid')} className={`rounded-full p-2 ${view === 'grid' ? 'bg-espresso text-oat' : 'text-espresso/45'}`} aria-label="Grid view"><Grid2X2 size={15} /></button><button onClick={() => setView('list')} className={`rounded-full p-2 ${view === 'list' ? 'bg-espresso text-oat' : 'text-espresso/45'}`} aria-label="List view"><List size={15} /></button></div></div></div>{loading ? <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{[1,2,3,4,5,6,7,8].map((item) => <div key={item} className="animate-pulse"><div className="aspect-[.88] rounded-[1.25rem] bg-oat-deep" /><div className="mt-4 h-4 w-2/3 rounded bg-oat-deep" /><div className="mt-2 h-3 w-1/2 rounded bg-oat-deep" /></div>)}</div> : products.length > 0 ? <div className={view === 'grid' ? 'grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4' : 'grid gap-6 md:grid-cols-2'}>{products.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="rounded-[1.5rem] border border-dashed border-espresso/20 bg-paper px-6 py-20 text-center"><span className="eyebrow">Nothing here yet</span><h2 className="mt-4 text-3xl font-semibold">Try another shelf.</h2><p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-espresso/55">We couldn’t find a match for this search. Browse the full collection and find something unexpected.</p><a href="/shop" className="btn-primary mt-7">Browse all products <ArrowRight size={16} /></a></div>}</div></section>;
}
