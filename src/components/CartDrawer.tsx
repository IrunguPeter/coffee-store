import { useState } from 'react';
import { X, CheckCircle, ChevronLeft, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { Product } from '../data/products';
import { formatPrice, cn } from '../lib/utils';

export default function CartDrawer() {
  const { items, subtotal, itemCount, removeItem, updateQuantity, clearCart, closeCart, isOpen } =
    useCart();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');

  if (!isOpen) return null;

  if (checkoutStep === 'checkout') {
    return <CheckoutPanel onBack={() => setCheckoutStep('cart')} />;
  }
  if (checkoutStep === 'success') {
    return <SuccessPanel onBack={() => setCheckoutStep('cart')} />;
  }

  return (
    <div className="fixed inset-0 z-[60] flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-cream border-l border-outline shadow-lift flex flex-col h-full">
        <div className="p-6 border-b border-outline flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink">Your cart</h2>
          <button
            onClick={closeCart}
            className="p-2 text-ink-variant hover:text-ink transition-colors"
            aria-label="Close cart"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-safari/10 flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.5 18.5v-10A1.5 1.5 0 0 0 16 7h-4a1.5 1.5 0 0 0-1.5 1.5v17" />
                  <path d="M3.5 18.5v-10A1.5 1.5 0 0 1 5 7h14a1.5 1.5 0 0 1 1.5 1.5v10" />
                  <line x1="6" x2="18" y1="6" y2="6" />
                  <line x1="6" x2="18" y1="18" y2="18" />
                </svg>
              </div>
              <p className="text-soft">Your cart is empty.</p>
              <p className="text-xs text-soft mono tracking-wide uppercase mt-2">
                Add some items to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItemRow
                  key={item.product.id}
                  item={item}
                  onRemove={() => removeItem(item.product.id)}
                  onChange={(q) => updateQuantity(item.product.id, q)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-outline bg-cream-low">
          <div className="flex items-baseline justify-between mb-6">
            <span className="text-xs mono tracking-wide uppercase text-ink-variant">Subtotal</span>
            <span className="text-lg font-bold text-ink">{formatPrice(subtotal)}</span>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                if (items.length === 0) return;
                setCheckoutStep('checkout');
              }}
              disabled={items.length === 0}
              className="w-full btn-primary"
            >
              {items.length === 0 ? 'Your cart is empty' : 'Checkout'}
            </button>
            <button
              onClick={clearCart}
              className="w-full btn-ghost text-xs"
            >
              Clear cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartItemRow({ item, onRemove, onChange }: { item: ReturnType<typeof useCart>['items'][number]; onRemove: () => void; onChange: (q: number) => void }) {
  const { product, quantity } = item;
  return (
    <div className="flex gap-4">
      <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md bg-savanna-container">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="flex-1">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-sm font-medium text-ink">{product.name}</span>
          <span className="text-xs text-soft mono">{formatPrice(product.price)}</span>
        </div>
        {product.weight && (
          <div className="text-[11px] text-soft mono mb-3">{product.weight}</div>
        )}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onChange(quantity - 1)}
            className="w-8 h-8 rounded-md border border-outline bg-cream text-ink text-xs font-bold flex items-center justify-center hover:bg-safari hover:text-cream transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="text-xs font-medium text-ink w-4 text-center">{quantity}</span>
          <button
            onClick={() => onChange(quantity + 1)}
            className="w-8 h-8 rounded-md border border-outline bg-cream text-ink text-xs font-bold flex items-center justify-center hover:bg-safari hover:text-cream transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
          <button
            onClick={onRemove}
            className="text-xs text-soft underline underline-offset-2 hover:text-error transition-colors"
            aria-label="Remove item"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckoutPanel({ onBack }: { onBack: () => void }) {
  const { items, subtotal, clearCart, closeCart } = useCart();
  const [email, setEmail] = useState('');

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-2 text-ink-variant hover:text-ink transition-colors"
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>
        <h2 className="text-lg font-bold text-ink">Checkout</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="you@example.com"
          />
        </div>
        <div className="p-3 rounded-md bg-safari/5 border border-safari/10">
          <p className="text-[10px] text-soft mono mb-2 tracking-wide uppercase">Order summary</p>
          {items.map((item) => (
            <div className="flex justify-between text-xs mb-1" key={item.product.id}>
              <span className="text-soft">{item.product.name} × {item.quantity}</span>
              <span className="text-ink">{formatPrice(item.product.price * item.quantity)}</span>
            </div>
          ))}
          <div className="flex justify-between mt-2 pt-2 border-t border-outline text-sm font-medium text-ink">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          clearCart();
          closeCart();
        }}
        disabled={!email || items.length === 0}
        className="w-full btn-primary"
      >
        Place order via M-Pesa
      </button>
      <p className="text-[11px] text-soft text-center mt-4">
        Secure checkout via Lipa na M-Pesa. No card details stored.
      </p>
    </div>
  );
}

function SuccessPanel({ onBack }: { onBack: () => void }) {
  return (
    <div className="p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-mpesa/10 flex items-center justify-center mx-auto mb-4">
        <CheckCircle size={24} strokeWidth={2} className="text-mpesa" />
      </div>
      <h2 className="text-lg font-bold text-ink mb-2">Order placed!</h2>
      <p className="text-soft mb-6">Thank you for supporting Kenyan artisans. Your order is being packed.</p>
      <button
        onClick={onBack}
        className="w-full btn-outline"
      >
        Browse more <ArrowRight size={18} strokeWidth={2} />
      </button>
    </div>
  );
}
