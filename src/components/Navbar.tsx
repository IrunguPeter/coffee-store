import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, Search, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';

export default function Navbar() {
  const { itemCount, toggleCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-cream/95 backdrop-blur-md">
      <div className="page-width">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-safari flex items-center justify-center">
              <span className="text-[10px] text-cream font-bold">☕</span>
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-ink">
              ZAWADI
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <navLink to="/" label="Home" />
            <navLink to="/shop" label="Shop" />
            <navLink to="/about" label="About" />
            <a href="#" className="text-sm mono tracking-wide uppercase text-soft hover:text-ink transition-colors">
              Wholesale
            </a>
          </div>

          <div className="flex items-center gap-3">
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
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-ink hover:text-safari-dark transition-colors"
              aria-label="Open menu"
            >
              {menuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-line pt-4 pb-6 space-y-3">
            <navLink to="/" label="Home" mobile />
            <navLink to="/shop" label="Shop" mobile />
            <navLink to="/about" label="About" mobile />
            <a
              href="#"
              className="block text-sm mono tracking-wide uppercase text-soft hover:text-ink transition-colors py-2"
            >
              Wholesale
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

function navLink({ to, label, mobile }: { to: string; label: string; mobile?: boolean }) {
  return (
    <Link
      to={to}
      className={cn(
        'text-sm mono tracking-wide uppercase transition-colors',
        mobile ? 'block py-2 text-soft hover:text-ink' : 'text-soft hover:text-ink',
      )}
    >
      {label}
    </Link>
  );
}
