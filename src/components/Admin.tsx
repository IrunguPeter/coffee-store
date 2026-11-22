import { useState } from 'react';
import { Layout, List, ShieldCheck, CreditCard, TrendingUp, Package } from 'lucide-react';
import { getOrderStats } from '../data/orders';
import { cn } from '../lib/utils';
import ProductsTab from './admin/ProductsTab';
import PromosTab from './admin/PromosTab';
import OrdersTab from './admin/OrdersTab';
import StatsTab from './admin/StatsTab';

type Tab = 'stats' | 'products' | 'promos' | 'orders';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<Tab>('stats');

  const stats = getOrderStats();

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'stats', label: 'Dashboard', icon: <TrendingUp size={20} strokeWidth={2} /> },
    { id: 'products', label: 'Products', icon: <Layout size={20} strokeWidth={2} /> },
    { id: 'promos', label: 'Promos', icon: <CreditCard size={20} strokeWidth={2} /> },
    { id: 'orders', label: 'Orders', icon: <Package size={20} strokeWidth={2} /> },
  ];

  return (
    <div className="page-width section">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ink mb-1">Admin</h1>
          <p className="text-soft">Manage your store, promos, and orders.</p>
        </div>
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => window.print()}
            className="btn-ghost"
          >
            Print view
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<Layout size={24} strokeWidth={2} />}
          color="safari"
        />
        <StatCard
          title="Total Sales"
          value={`KSh ${(stats.totalSales / 100).toLocaleString()}`}
          icon={<CreditCard size={24} strokeWidth={2} />}
          color="mpesa"
        />
        <StatCard
          title="Pending"
          value={stats.pendingOrders}
          icon={<CreditCard size={24} strokeWidth={2} className="text-savanna-honey" />}
          color="savanna-honey"
        />
        <StatCard
          title="Fulfilled"
          value={stats.fulfilledOrders}
          icon={<Package size={24} strokeWidth={2} className="text-[#00B04F]" />}
          color="mpesa"
        />
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 border-b border-line mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-6 py-4 text-sm font-medium mono tracking-wide uppercase transition-colors border-b-2',
              activeTab === tab.id
                ? 'border-safari text-safari bg-safari/5'
                : 'border-transparent text-ink-variant hover:text-safari hover:bg-safari/5',
            )}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'stats' && <StatsTab stats={stats} />}
      {activeTab === 'products' && <ProductsTab />}
      {activeTab === 'promos' && <PromosTab />}
      {activeTab === 'orders' && <OrdersTab />}

      <div className="mt-8 p-6 rounded-lg bg-safari/5 border border-safari/10">
        <div className="flex items-center gap-3 mb-3">
          <ShieldCheck size={18} strokeWidth={2} className="text-safari" />
          <span className="text-sm font-medium text-ink">Admin notes</span>
        </div>
        <p className="text-sm text-soft">
          This is a demo admin panel. Changes live in memory and reset on refresh. Connect a real
          backend and database to persist products, promos, and orders.
        </p>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}) {
  const bgColor = color === 'mpesa' ? 'bg-[#00B04F]/10 text-[#00B04F]' : `bg-${color}/10 text-${color}`;
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] text-soft mono tracking-wide uppercase">{title}</p>
          <p className="text-2xl font-extrabold text-ink mt-1">{value}</p>
        </div>
        <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
