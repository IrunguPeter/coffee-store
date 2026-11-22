import { Link } from 'react-router-dom';
import { Plus, Coffee } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { Product } from '../data/products';
import { formatPrice, cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'featured';
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { addItem } = useCart();

  const isSale = Boolean(product.comparePrice);
  const badge = product.bestseller ? 'Bestseller' : product.new ? 'New' : null;

  return (
    <article className="card group cursor-pointer">
      <div className="relative overflow-hidden aspect-[4/3] bg-coffee-pale">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {variant === 'featured' && (
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        )}
        {badge && (
          <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-ink text-cream-soft text-[10px] font-bold tracking-wide uppercase shadow-sm">
            <Coffee size={10} strokeWidth={2} />
            {badge}
          </span>
        )}
        {isSale && (
          <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-dark text-cream-soft text-[10px] font-bold tracking-wide uppercase shadow-sm">
            Sale
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addItem(product);
          }}
          className="absolute bottom-2 left-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus size={14} strokeWidth={2} />
        </button>
      </div>
      <div className="p-3">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-[10px] font-medium text-soft mono tracking-wide uppercase">
            {product.categoryLabel}
          </span>
          {product.comparePrice && (
            <span className="text-[10px] text-error line-through">{formatPrice(product.comparePrice)}</span>
          )}
        </div>
        <Link
          to={`/shop/${product.id}`}
          className="text-ink font-serif text-sm font-medium group-hover:text-coffee-dark transition-colors"
        >
          {product.name}
        </Link>
        <p className="text-[11px] text-soft mt-1 line-clamp-2">{product.shortDescription}</p>
        <div className="flex items-baseline justify-between mt-3 pt-2 border-t border-line">
          <span className="font-bold text-ink">{formatPrice(product.price)}</span>
          <span className="text-[10px] text-soft mono">{product.weight}</span>
        </div>
      </div>
    </article>
  );
}
