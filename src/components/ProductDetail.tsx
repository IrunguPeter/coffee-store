import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mail, Clock, MapPin, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { Product } from '../data/products';
import { getProduct } from '../data/products';
import { formatPrice } from '../lib/utils';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = getProduct(id ?? '');
  if (!product) {
    return (
      <div className="page-width section text-center">
        <ArrowLeft size={20} strokeWidth={2} className="text-soft mb-4 inline-block cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="font-serif text-2xl text-ink mb-2">Product not found</h1>
        <p className="text-soft">The coffee you're looking for isn't available right now.</p>
      </div>
    );
  }

  const [quantity, setQuantity] = useState(1);

  return (
    <div className="section">
      <div className="page-width">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line bg-coffee-pale shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-md border border-line bg-coffee-pale cursor-pointer hover:border-coffee/50 transition-colors">
                  <img src={product.image} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                <span className="text-xs font-medium text-soft mono tracking-wide uppercase">
                  {product.categoryLabel}
                </span>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-2">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xl font-bold text-ink">{formatPrice(product.price)}</span>
                  {product.comparePrice && (
                    <span className="text-sm text-soft line-through">
                      {formatPrice(product.comparePrice)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-soft mono tracking-wide uppercase">
                  {product.weight} · {product.origin} · {product.roast} roast
                </p>
              </div>
              <div className="flex items-center gap-2">
                {product.bestseller && (
                  <span className="px-3 py-1 rounded-full bg-coffee text-cream-soft text-[10px] font-bold tracking-wide uppercase">
                    Bestseller
                  </span>
                )}
                {product.new && (
                  <span className="px-3 py-1 rounded-full bg-line text-ink text-[10px] font-bold tracking-wide uppercase">
                    New
                  </span>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold text-ink mb-2">About this coffee</h3>
              <p className="text-soft leading-relaxed max-w-md">{product.description}</p>
            </div>

            {product.notes && product.notes.length > 0 && (
              <div>
                <h3 className="font-serif text-lg font-bold text-ink mb-2">Tasting notes</h3>
                <div className="flex flex-wrap gap-2">
                  {product.notes.map((note) => (
                    <span
                      key={note}
                      className="px-3 py-1 rounded-full border border-line bg-cream text-soft text-xs"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-line">
              <h3 className="font-serif text-lg font-bold text-ink mb-4">Brew it fresh</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <InfoRow label="Grind" value="Just before brewing" icon={<Mail size={16} />} />
                <InfoRow label="Water" value="90–96°C / 195–205°F" icon={<Clock size={16} />} />
                <InfoRow label="Ratio" value="1:16 (coffee:water)" icon={<MapPin size={16} />} />
              </div>
            </div>

            <div className="pt-4 border-t border-line space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink">Quantity</span>
                <div className="flex items-center gap-2 border border-line rounded-md">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-ink hover:bg-coffee hover:text-cream-soft transition-colors"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-medium text-ink">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-ink hover:bg-coffee hover:text-cream-soft transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => addItem(product, quantity)}
                className="w-full btn-primary py-4 text-base"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-coffee/10 flex items-center justify-center text-coffee text-xs">
        {icon}
      </div>
      <div>
        <div className="text-xs text-soft mono tracking-wide uppercase">{label}</div>
        <div className="text-sm text-ink">{value}</div>
      </div>
    </div>
  );
}
