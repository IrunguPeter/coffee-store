import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-50" />
      <div className="absolute inset-0 -z-10 bg-cream/80" />
      <div className="page-width relative">
        <div className="max-w-2xl">
          <span className="trust-pill mb-4 block">
            Lipa na M-Pesa Express Verified · Same-Day Nairobi Dispatch
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-ink leading-tight mb-6 tracking-tight">
            Crafted with pride in Kenya 🇰🇪
          </h1>
          <p className="text-ink-variant text-lg md:text-xl mb-8 max-w-xl leading-relaxed">
            Coffee, tea, kitchenware, home goods, and more. Kenyan artisan essentials for everyday
            life.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
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
