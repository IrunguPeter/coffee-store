import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { PRODUCTS, CATEGORIES, getProductsByCategory, getFeaturedProducts } from '../data/products';
import { Layout, List } from 'lucide-react';

export default function ProductGrid() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const [view, setView] = useState<'grid' | 'list'>('grid');
  const query = searchParams.get('q') ?? '';
  const category = searchParams.get('category') ?? 'all';

  let filtered = PRODUCTS;
  if (query) {
    const q = query.toLowerCase();
    filtered = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.notes?.some((n) => n.toLowerCase().includes(q)),
    );
  } else if (category !== 'all') {
    filtered = getProductsByCategory(category);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {query && (
            <span className="text-sm text-soft mono tracking-wide uppercase">
              Results for “{query}”
            </span>
          )}
          {!query && category !== 'all' && (
            <span className="text-sm text-soft mono tracking-wide uppercase">
              {category}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 border border-line rounded-md bg-cream p-1">
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-sm transition-colors ${
              view === 'grid' ? 'bg-safari text-cream' : 'text-soft hover:text-ink'
            }`}
            aria-label="Grid view"
          >
            <Layout size={18} strokeWidth={2} />
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-2 rounded-sm transition-colors ${
              view === 'list' ? 'bg-safari text-cream' : 'text-soft hover:text-ink'
            }`}
            aria-label="List view"
          >
            <List size={18} strokeWidth={2} />
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} variant="default" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} variant="default" />
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-soft">No products found.</p>
        </div>
      )}
    </div>
  );
}
