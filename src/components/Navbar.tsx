import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowRight, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';

export default function Navbar() {
  const { itemCount, toggleCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-espresso px-5 py-2 text-center font-mono text-[10px] uppercase tracking-[.14em] text-oat/80">
        Free Nairobi delivery on orders over KSh 5,000 <span className="mx-2 text-copper">•</span> Pay securely with M-Pesa
      </div>
      <nav className="border-b border-espresso/10 bg-oat/95 backdrop-blur-xl">
        <div className="page-width">
          <div className="flex h-[76px] items-center justify-between gap-6">
            <Link to="/" className="group flex items-center gap-3" onClick={() => setMenuOpen(false)}>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-espresso text-lg text-oat shadow-card transition-transform group-hover:-rotate-6">E/</span>
              <span>
                <span className="block font-serif text-xl font-bold tracking-tight text-espresso">E-SHOP</span>
                <span className="block font-mono text-[8px] uppercase tracking-[.18em] text-espresso/50">Kenya / everyday goods</span>
              </span>
            </Link>

            <div className="hidden items-center gap-8 lg:flex">
              <NavItem to="/" label="Home" />
              <NavItem to="/shop" label="Shop" />
              <a href="#story" className="font-mono text-[11px] uppercase tracking-[.12em] text-espresso/60 transition-colors hover:text-copper">Our story</a>
              <a href="#journal" className="font-mono text-[11px] uppercase tracking-[.12em] text-espresso/60 transition-colors hover:text-copper">Journal</a>
            </div>

            <div className="flex items-center gap-2">
              <Link to="/shop" className="hidden rounded-full p-3 text-espresso/65 transition-colors hover:bg-espresso/5 hover:text-copper sm:block" aria-label="Search the shop">
                <Search size={19} strokeWidth={1.8} />
              </Link>
              <button onClick={toggleCart} className="relative rounded-full p-3 text-espresso transition-colors hover:bg-espresso/5 hover:text-copper" aria-label={`Shopping bag (${itemCount} items)`}>
                <ShoppingBag size={20} strokeWidth={1.8} />
                {itemCount > 0 && <span className="absolute right-0 top-0 flex h-5 min-w-5 animate-soft-pulse items-center justify-center rounded-full bg-copper px-1 font-mono text-[9px] font-bold text-white">{itemCount}</span>}
              </button>
              <button onClick={() => setMenuOpen((value) => !value)} className="rounded-full p-3 text-espresso transition-colors hover:bg-espresso/5 lg:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="border-t border-espresso/10 py-5 lg:hidden">
              <div className="grid gap-1">
                <NavItem to="/" label="Home" mobile onClick={() => setMenuOpen(false)} />
                <NavItem to="/shop" label="Shop all" mobile onClick={() => setMenuOpen(false)} />
                <a href="#story" onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-b border-espresso/10 py-3 font-mono text-xs uppercase tracking-[.12em] text-espresso/70">Our story <ArrowRight size={15} /></a>
                <a href="#journal" onClick={() => setMenuOpen(false)} className="flex items-center justify-between py-3 font-mono text-xs uppercase tracking-[.12em] text-espresso/70">Journal <ArrowRight size={15} /></a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

function NavItem({ to, label, mobile, onClick }: { to: string; label: string; mobile?: boolean; onClick?: () => void }) {
  return <NavLink to={to} onClick={onClick} className={({ isActive }) => cn(mobile ? 'flex items-center justify-between border-b border-espresso/10 py-3 font-mono text-xs uppercase tracking-[.12em]' : 'font-mono text-[11px] uppercase tracking-[.12em]', isActive ? 'text-copper' : 'text-espresso/60 hover:text-copper')}>
    {label}{mobile && <ArrowRight size={15} />}
  </NavLink>;
}
