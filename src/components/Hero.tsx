import { ArrowDown, ArrowRight, Coffee, Leaf, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useEffect, useState } from 'react';
import { getBestsellers, getFeaturedProducts, type Product } from '../data/products';
import heroImage from '../assets/hero.png';

const categories = [
  { label: 'Coffee & tea', detail: 'Roasted / steeped', href: '/shop?category=coffee', tone: 'bg-sage-light' },
  { label: 'Kitchen ritual', detail: 'Tools / tableware', href: '/shop?category=kitchen', tone: 'bg-oat-deep' },
  { label: 'Slow living', detail: 'Home / wellness', href: '/shop?category=wellness', tone: 'bg-[#ead8cf]' },
];

export default function Hero() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    Promise.all([getFeaturedProducts(), getBestsellers()]).then(([featured, bestsellers]) => {
      const unique = [...featured, ...bestsellers].filter((product, index, list) => list.findIndex((item) => item.id === product.id) === index);
      setProducts(unique.slice(0, 4));
    }).catch(() => setProducts([]));
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-espresso/10 bg-oat">
        <div className="paper-grain absolute inset-0" />
        <div className="page-width relative grid min-h-[680px] items-center gap-10 py-14 lg:grid-cols-[.92fr_1.08fr] lg:py-20">
          <div className="relative z-10 max-w-xl animate-slide-up">
            <span className="eyebrow">The everyday, elevated</span>
            <h1 className="mt-6 max-w-lg text-6xl font-semibold leading-[.94] text-espresso sm:text-7xl lg:text-[6.4rem]">Good things, <em className="font-normal text-copper">close to home.</em></h1>
            <p className="mt-7 max-w-md text-base leading-7 text-espresso/65 sm:text-lg">A considered edit of Kenyan coffee, kitchenware, and home goods for the rituals that make a day feel like yours.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link to="/shop" className="btn-primary">Shop the collection <ArrowRight size={17} /></Link><Link to="/shop?category=coffee" className="btn-outline">Find your roast</Link></div>
            <div className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-espresso/15 pt-5"><Proof icon={<Coffee size={16} />} value="04" label="roast profiles" /><Proof icon={<Leaf size={16} />} value="100%" label="Kenyan roots" /><Proof icon={<ShieldCheck size={16} />} value="24h" label="Nairobi dispatch" /></div>
          </div>
          <div className="relative min-h-[520px] animate-fade-in sm:min-h-[610px]">
            <div className="absolute right-0 top-1/2 h-[88%] w-[82%] -translate-y-1/2 overflow-hidden rounded-[2rem] rounded-bl-[8rem] bg-oat-deep shadow-lift"><img src={heroImage} alt="A warm coffee ritual with Kenyan character" className="h-full w-full object-cover" /></div>
            <div className="absolute bottom-5 left-0 w-44 rounded-2xl border border-espresso/10 bg-paper p-4 shadow-lift sm:w-52"><p className="font-mono text-[9px] uppercase tracking-[.14em] text-copper">01 / origin note</p><p className="mt-3 font-serif text-xl leading-tight">For slow mornings and long conversations.</p></div>
            <div className="absolute right-5 top-8 flex h-20 w-20 -rotate-12 items-center justify-center rounded-full border border-copper bg-copper p-3 text-center font-mono text-[9px] uppercase leading-3 tracking-[.12em] text-white shadow-card sm:right-10">Made in<br />Kenya<br />✦</div>
          </div>
        </div>
        <div className="page-width flex items-center gap-3 pb-6 font-mono text-[9px] uppercase tracking-[.16em] text-espresso/45"><ArrowDown size={14} className="text-copper" /> Scroll to explore / 2025 edit</div>
      </section>

      <section className="section bg-paper"><div className="page-width"><div className="mb-8 flex items-end justify-between gap-4"><div><span className="eyebrow">Shop by ritual</span><h2 className="mt-3 text-4xl font-semibold sm:text-5xl">Make room for good things.</h2></div><Link to="/shop" className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[.12em] text-copper hover:text-copper-dark sm:flex">View all <ArrowRight size={15} /></Link></div><div className="grid gap-4 md:grid-cols-3">{categories.map((category, index) => <Link key={category.label} to={category.href} className={`group relative min-h-48 overflow-hidden rounded-2xl ${category.tone} p-6 transition-transform hover:-translate-y-1`}><span className="font-mono text-[10px] text-espresso/45">0{index + 1}</span><h3 className="mt-16 text-2xl font-semibold text-espresso">{category.label}</h3><p className="mt-1 font-mono text-[9px] uppercase tracking-[.14em] text-espresso/50">{category.detail}</p><ArrowRight className="absolute bottom-6 right-6 text-copper transition-transform group-hover:translate-x-1" size={20} /></Link>)}</div></div></section>

      {products.length > 0 && <section className="section bg-oat"><div className="page-width"><div className="mb-8 flex items-end justify-between gap-4"><div><span className="eyebrow">The house edit</span><h2 className="mt-3 text-4xl font-semibold sm:text-5xl">Most loved, lately.</h2></div><Link to="/shop" className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[.12em] text-copper hover:text-copper-dark sm:flex">Shop everything <ArrowRight size={15} /></Link></div><div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div></div></section>}

      <section className="section bg-espresso text-oat"><div className="page-width grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]"><div><span className="eyebrow !text-copper">Why E-Shop</span><h2 className="mt-4 text-5xl font-semibold leading-[.98] sm:text-6xl">Small rituals.<br /><em className="font-normal text-copper">Big feeling.</em></h2></div><div className="grid gap-6 border-l border-oat/20 pl-6 sm:grid-cols-2 sm:pl-10"><div><p className="font-mono text-[10px] uppercase tracking-[.14em] text-copper">01 / considered</p><p className="mt-3 text-sm leading-6 text-oat/65">We choose fewer, better things and tell you exactly why they earned their place.</p></div><div><p className="font-mono text-[10px] uppercase tracking-[.14em] text-copper">02 / connected</p><p className="mt-3 text-sm leading-6 text-oat/65">Every order supports local makers, growers, and the hands behind the good stuff.</p></div></div></div></section>
    </div>
  );
}

function Proof({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) { return <div><div className="flex items-center gap-2 text-copper">{icon}<span className="font-serif text-xl font-semibold text-espresso">{value}</span></div><p className="mt-1 font-mono text-[8px] uppercase tracking-[.1em] text-espresso/45">{label}</p></div>; }
