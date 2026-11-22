import { useState, useEffect } from 'react';
import { ArrowLeft, Minus, Plus, ShieldCheck, Truck } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { Product } from '../data/products';
import { getProduct } from '../data/products';
import { formatPrice } from '../lib/utils';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getProduct(id ?? '').then((item) => { if (active) setProduct(item ?? null); }).catch(() => { if (active) setProduct(null); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  if (loading) return <div className="section page-width text-center"><p className="font-mono text-xs uppercase tracking-[.15em] text-espresso/50">Finding your product…</p></div>;
  if (!product) return <div className="section page-width text-center"><button onClick={() => navigate(-1)} className="btn-ghost"><ArrowLeft size={16} /> Go back</button><h1 className="mt-8 text-4xl">Product not found</h1><p className="mt-3 text-espresso/55">This piece may have found another home.</p></div>;

  return <section className="section bg-oat"><div className="page-width"><button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.12em] text-espresso/50 hover:text-copper"><ArrowLeft size={15} /> Back to collection</button><div className="grid gap-10 lg:grid-cols-[1.02fr_.98fr] lg:gap-20"><div className="relative"><div className="aspect-[.9] overflow-hidden rounded-[2rem] bg-oat-deep shadow-lift"><img src={product.image} alt={product.name} className="h-full w-full object-cover" /></div><span className="absolute left-5 top-5 rounded-full bg-paper px-3 py-2 font-mono text-[9px] uppercase tracking-[.12em] text-copper shadow-card">{product.categoryLabel}</span></div><div className="flex flex-col justify-center"><span className="eyebrow">The house edit / {product.id.slice(0, 4)}</span><h1 className="mt-5 text-5xl font-semibold leading-[.96] sm:text-7xl">{product.name}</h1><div className="mt-6 flex items-center gap-3"><span className="text-2xl font-semibold text-espresso">{formatPrice(product.price)}</span>{product.comparePrice && <span className="text-sm text-espresso/35 line-through">{formatPrice(product.comparePrice)}</span>}</div><p className="mt-6 max-w-lg text-base leading-7 text-espresso/65">{product.description}</p>{product.weight && <p className="mt-5 font-mono text-[10px] uppercase tracking-[.13em] text-copper">{product.weight} / carefully considered</p>}<div className="my-8 rule" /><div className="flex flex-col gap-3 sm:flex-row"><div className="flex items-center justify-between rounded-full border border-espresso/15 bg-paper px-2"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="flex h-11 w-10 items-center justify-center text-espresso/60 hover:text-copper" aria-label="Decrease quantity"><Minus size={15} /></button><span className="w-8 text-center font-mono text-xs">{quantity}</span><button onClick={() => setQuantity((value) => value + 1)} className="flex h-11 w-10 items-center justify-center text-espresso/60 hover:text-copper" aria-label="Increase quantity"><Plus size={15} /></button></div><button onClick={() => addItem(product, quantity)} className="btn-primary flex-1">Add to bag <Plus size={17} /></button></div><div className="mt-8 grid gap-4 sm:grid-cols-2"><div className="flex gap-3"><Truck className="shrink-0 text-copper" size={19} /><div><p className="text-sm font-semibold">Same-day dispatch</p><p className="mt-1 text-xs text-espresso/50">Nairobi orders before 2pm</p></div></div><div className="flex gap-3"><ShieldCheck className="shrink-0 text-copper" size={19} /><div><p className="text-sm font-semibold">Made to last</p><p className="mt-1 text-xs text-espresso/50">Thoughtful quality, always</p></div></div></div></div></div></div></section>;
}
