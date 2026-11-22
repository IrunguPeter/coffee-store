import { useEffect, useState } from 'react';
import { BarChart3, Boxes, Megaphone, PackageCheck, Printer, ShieldCheck, ShoppingBag, Store } from 'lucide-react';
import { getOrderStats, type OrderStats } from '../data/orders';
import { cn } from '../lib/utils';
import ProductsTab from './admin/ProductsTab';
import PromosTab from './admin/PromosTab';
import OrdersTab from './admin/OrdersTab';
import StatsTab from './admin/StatsTab';

type Tab = 'stats' | 'products' | 'promos' | 'orders';

const tabs: { id: Tab; label: string; detail: string; icon: typeof BarChart3 }[] = [
  { id: 'stats', label: 'Overview', detail: 'Store pulse', icon: BarChart3 },
  { id: 'products', label: 'Products', detail: 'Catalog', icon: Boxes },
  { id: 'orders', label: 'Orders', detail: 'Fulfilment', icon: PackageCheck },
  { id: 'promos', label: 'Promos', detail: 'Campaigns', icon: Megaphone },
];

const emptyStats: OrderStats = { totalOrders: 0, totalSales: 0, averageOrderValue: 0, pendingOrders: 0, fulfilledOrders: 0 };

export default function Admin() {
  const [activeTab, setActiveTab] = useState<Tab>('stats');
  const [stats, setStats] = useState<OrderStats>(emptyStats);
  useEffect(() => { getOrderStats().then(setStats).catch(() => undefined); }, []);
  const active = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return <main className="min-h-[calc(100vh-76px)] bg-[#eee7dc] py-5 sm:py-8"><div className="mx-auto grid w-full max-w-[1440px] gap-5 px-4 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
    <aside className="h-fit rounded-[1.5rem] bg-espresso p-4 text-oat shadow-lift lg:sticky lg:top-28"><div className="flex items-center gap-3 border-b border-oat/15 px-3 pb-5"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-copper font-serif text-lg font-bold text-white">E/</span><div><p className="font-serif text-lg font-semibold">Back office</p><p className="font-mono text-[9px] uppercase tracking-[.12em] text-oat/45">E-Shop / Nairobi</p></div></div><div className="mt-5 hidden gap-2 lg:grid">{tabs.map((tab) => { const Icon = tab.icon; return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn('flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors', activeTab === tab.id ? 'bg-copper text-white' : 'text-oat/60 hover:bg-oat/10 hover:text-oat')}><Icon size={18} /><span><span className="block text-sm font-semibold">{tab.label}</span><span className="block font-mono text-[9px] uppercase tracking-[.08em] opacity-60">{tab.detail}</span></span></button>; })}</div><div className="flex gap-2 overflow-x-auto lg:hidden">{tabs.map((tab) => { const Icon = tab.icon; return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn('flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 font-mono text-[10px] uppercase tracking-[.1em]', activeTab === tab.id ? 'bg-copper text-white' : 'bg-oat/10 text-oat/60')}><Icon size={14} />{tab.label}</button>; })}</div><div className="mt-10 hidden rounded-xl border border-oat/15 p-3 lg:block"><p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.12em] text-sage-light"><span className="h-1.5 w-1.5 rounded-full bg-[#70c879]" /> Store status</p><p className="mt-2 text-xs text-oat/55">Catalog and checkout are live.</p></div></aside>
    <section className="min-w-0"><header className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow">Operations / {active.label}</p><h1 className="mt-3 text-4xl font-semibold text-espresso sm:text-5xl">{active.label}</h1><p className="mt-2 text-sm text-espresso/55">{active.id === 'stats' ? 'A quick read on what is happening across your store.' : `Manage your ${active.detail.toLowerCase()} from one focused workspace.`}</p></div><button onClick={() => window.print()} className="btn-outline self-start sm:self-auto"><Printer size={15} /> Print view</button></header>{activeTab === 'stats' && <><div className="mb-6 grid grid-cols-2 gap-3 xl:grid-cols-4"><Kpi label="Gross sales" value={`KSh ${(stats.totalSales / 100).toLocaleString()}`} icon={<ShoppingBag size={18} />} tone="copper" /><Kpi label="Total orders" value={stats.totalOrders} icon={<Store size={18} />} tone="sage" /><Kpi label="Awaiting action" value={stats.pendingOrders} icon={<PackageCheck size={18} />} tone="amber" /><Kpi label="Fulfilled" value={stats.fulfilledOrders} icon={<ShieldCheck size={18} />} tone="green" /></div><div className="rounded-[1.5rem] border border-espresso/10 bg-paper p-4 shadow-card sm:p-6"><StatsTab /></div></>}{activeTab === 'products' && <Workspace><ProductsTab /></Workspace>}{activeTab === 'orders' && <Workspace><OrdersTab /></Workspace>}{activeTab === 'promos' && <Workspace><PromosTab /></Workspace>}<div className="mt-5 flex items-start gap-3 rounded-2xl border border-sage/20 bg-sage-light/50 p-4"><ShieldCheck className="mt-0.5 shrink-0 text-sage" size={18} /><div><p className="text-sm font-semibold text-espresso">Demo workspace</p><p className="mt-1 text-xs leading-5 text-espresso/55">Changes currently live in memory and reset on refresh. Connect a production database when you are ready to persist catalog, campaign, and order changes.</p></div></div></section>
  </div></main>;
}

function Kpi({ label, value, icon, tone }: { label: string; value: string | number; icon: React.ReactNode; tone: 'copper' | 'sage' | 'amber' | 'green' }) { const tones = { copper: 'bg-copper/10 text-copper', sage: 'bg-sage/10 text-sage', amber: 'bg-savanna-honey/15 text-savanna-honey-dim', green: 'bg-mpesa/10 text-mpesa' }; return <div className="rounded-2xl border border-espresso/10 bg-paper p-4 shadow-card sm:p-5"><div className="flex items-start justify-between gap-2"><span className={`flex h-9 w-9 items-center justify-center rounded-xl ${tones[tone]}`}>{icon}</span><span className="font-mono text-[9px] uppercase tracking-[.12em] text-espresso/35">Today</span></div><p className="mt-5 font-mono text-[9px] uppercase tracking-[.12em] text-espresso/50">{label}</p><p className="mt-1 text-2xl font-semibold text-espresso sm:text-3xl">{value}</p></div>; }
function Workspace({ children }: { children: React.ReactNode }) { return <div className="rounded-[1.5rem] border border-espresso/10 bg-paper p-4 shadow-card sm:p-6">{children}</div>; }
