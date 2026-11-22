import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1447933601403-0c698afde45e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-60" />
      <div className="absolute inset-0 -z-10 bg-cream/80" />
      <div className="page-width relative">
        <div className="max-w-2xl">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-coffee/10 text-coffee text-xs mono font-medium tracking-wide uppercase border border-coffee/20">
            Freshly roasted · Shipped weekly
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-ink leading-tight mb-6">
            Good things, delivered.
          </h1>
          <p className="text-soft text-lg md:text-xl mb-8 max-w-xl leading-relaxed">
            Coffee, tea, kitchenware, home goods, and more — curated essentials for everyday life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/shop" className="btn-primary">
              Shop all <ArrowRight size={18} strokeWidth={2} />
            </Link>
            <Link to="/shop?category=kitchen" className="btn-outline">
              Kitchen
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
