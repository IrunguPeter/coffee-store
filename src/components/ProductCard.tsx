import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { Product } from '../data/products';
import { formatPrice } from '../lib/utils';

interface ProductCardProps { product: Product; variant?: 'default' | 'featured'; }

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { addItem } = useCart();
  const badge = product.bestseller ? 'Bestseller' : product.new ? 'New in' : product.featured ? 'House pick' : null;

  return (
    <article className={`group ${variant === 'featured' ? 'card' : ''}`}>
      <div className="relative aspect-[.88] overflow-hidden rounded-[1.25rem] bg-oat-deep">
        <Link to={`/shop/${product.id}`} aria-label={`View ${product.name}`}>
          <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105" loading="lazy" />
        </Link>
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2"><div>{badge && <span className="inline-flex rounded-full bg-paper px-2.5 py-1 font-mono text-[9px] uppercase tracking-[.1em] text-copper shadow-card">{badge}</span>}</div>{product.comparePrice && <span className="rounded-full bg-copper px-2.5 py-1 font-mono text-[9px] uppercase tracking-[.1em] text-white shadow-card">Sale</span>}</div>
        <button onClick={() => addItem(product)} className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-espresso text-oat opacity-0 shadow-lift transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-copper" aria-label={`Add ${product.name} to bag`}><Plus size={18} /></button>
      </div>
      <div className="px-1 pt-4"><div className="flex items-center justify-between gap-3"><span className="font-mono text-[9px] uppercase tracking-[.13em] text-copper">{product.categoryLabel}</span>{product.weight && <span className="font-mono text-[9px] text-espresso/40">{product.weight}</span>}</div><Link to={`/shop/${product.id}`} className="mt-2 flex items-start justify-between gap-2"><h3 className="text-lg font-semibold leading-tight text-espresso transition-colors group-hover:text-copper sm:text-xl">{product.name}</h3><ArrowUpRight size={16} className="mt-1 shrink-0 text-espresso/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-copper" /></Link><p className="mt-2 line-clamp-2 text-xs leading-5 text-espresso/55">{product.shortDescription}</p><div className="mt-3 flex items-center gap-2"><span className="font-semibold text-espresso">{formatPrice(product.price)}</span>{product.comparePrice && <span className="text-xs text-espresso/35 line-through">{formatPrice(product.comparePrice)}</span>}</div></div>
    </article>
  );
}
