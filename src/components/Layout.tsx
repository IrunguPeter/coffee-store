import { AtSign, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import CartDrawer from './CartDrawer';

export default function Layout() {
  return (
    <div className="min-h-screen bg-oat text-espresso">
      <Navbar />
      <main><Outlet /></main>
      <footer id="story" className="relative overflow-hidden bg-espresso text-oat">
        <div className="paper-grain absolute inset-0 opacity-[.08]" />
        <div className="page-width relative py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_.8fr_.8fr_1fr]">
            <div>
              <div className="mb-5 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-copper font-serif text-lg font-bold text-white">E/</span><span className="font-serif text-2xl font-bold">E-SHOP</span></div>
              <p className="max-w-sm text-sm leading-7 text-oat/65">Good things, roasted close to home. A considered collection of Kenyan coffee, pantry staples, and objects that make the everyday feel more intentional.</p>
              <div className="mt-6 flex items-center gap-4 text-oat/55"><AtSign size={17} /><span className="font-mono text-[10px] uppercase tracking-[.12em]">eshop.ke</span></div>
            </div>
            <div><p className="eyebrow !text-copper">Explore</p><div className="mt-5 grid gap-3 text-sm text-oat/65"><Link to="/shop" className="hover:text-white">Shop all</Link><Link to="/shop?category=coffee" className="hover:text-white">Coffee</Link><Link to="/shop?category=kitchen" className="hover:text-white">Kitchen</Link><Link to="/shop?category=wellness" className="hover:text-white">Wellness</Link></div></div>
            <div><p className="eyebrow !text-copper">Visit</p><div className="mt-5 grid gap-3 text-sm text-oat/65"><span className="flex gap-2"><MapPin size={15} className="mt-0.5 shrink-0" /> Nairobi, Kenya</span><span>Mon–Sat / 8am–6pm</span><a href="mailto:hello@eshop.ke" className="flex items-center gap-2 hover:text-white"><Mail size={15} /> hello@eshop.ke</a></div></div>
            <div id="journal"><p className="eyebrow !text-copper">The journal</p><p className="mt-5 text-sm leading-6 text-oat/65">Notes on coffee, craft, and the small rituals that make a home.</p><a href="mailto:hello@eshop.ke?subject=Join%20the%20journal" className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.12em] text-oat hover:text-copper">Join the list <ArrowUpRight size={14} /></a></div>
          </div>
          <div className="mt-14 flex flex-col justify-between gap-3 border-t border-oat/15 pt-5 font-mono text-[9px] uppercase tracking-[.14em] text-oat/40 sm:flex-row"><span>© 2025 E-Shop Kenya</span><span>Made with care / Nairobi</span></div>
        </div>
      </footer>
      <CartDrawer />
    </div>
  );
}
