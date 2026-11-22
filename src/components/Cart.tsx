import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartButton() {
  const { itemCount, toggleCart } = useCart();

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 text-ink hover:text-safari-dark transition-colors"
      aria-label={`Cart (${itemCount} items)`}
    >
      <ShoppingCart size={20} strokeWidth={2} />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center">
          <span className="w-full h-full rounded-full bg-safari-dark text-[10px] text-cream font-bold leading-none">
            {itemCount}
          </span>
        </span>
      )}
    </button>
  );
}
