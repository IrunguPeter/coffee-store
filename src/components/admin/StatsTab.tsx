import { useState, useEffect } from 'react';
import { getOrders, getOrderStats } from '../../data/orders';
import { formatPrice } from '../../lib/utils';

export default function StatsTab() {
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [ordersData, statsData] = await Promise.all([getOrders(), getOrderStats()]);
      setOrders(ordersData);
      setStats(statsData);
    } catch {
      setOrders([]);
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-soft">Loading stats...</p>;

  const colorMap: Record<string, string> = {
    pending: 'text-savanna-honey',
    paid: 'text-safari',
    fulfilled: 'text-[#00B04F]',
    shipped: 'text-safari-dark',
    cancelled: 'text-error',
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="font-serif text-2xl font-bold text-ink">Recent orders</h2>
        <button
          onClick={loadData}
          className="btn-ghost flex items-center gap-2"
        >
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto border border-line rounded-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-line bg-cream/50">
              <th className="text-xs mono tracking-wide uppercase text-soft p-4">Order</th>
              <th className="text-xs mono tracking-wide uppercase text-soft p-4">Customer</th>
              <th className="text-xs mono tracking-wide uppercase text-soft p-4 text-right">Total</th>
              <th className="text-xs mono tracking-wide uppercase text-soft p-4 text-center">Status</th>
              <th className="text-xs mono tracking-wide uppercase text-soft p-4 text-center">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {orders.slice(0, 10).map((order: any) => (
              <tr key={order.id} className="hover:bg-safari/5 transition-colors">
                <td className="p-4">
                  <div className="text-sm font-medium text-ink">{order.order_number}</div>
                  <div className="text-[11px] text-soft mono">{order.payment_method === 'mpesa' ? 'M-Pesa' : 'Card'}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm font-medium text-ink">{order.customer_name}</div>
                  <div className="text-[11px] text-soft mono">{order.customer_email}</div>
                </td>
                <td className="p-4 text-sm font-medium text-ink text-right">{formatPrice(order.total)}</td>
                <td className="p-4 text-center">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full border ${colorMap[order.status]} border-[color:currentColor]`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="p-4 text-sm text-soft text-center">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-soft">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="card p-6">
            <h3 className="font-serif text-lg font-bold text-ink mb-4">Sales summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-soft">Total orders</span>
                <span className="text-ink">{stats.totalOrders}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-soft">Total sales</span>
                <span className="text-ink font-medium">{formatPrice(stats.totalSales)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-soft">Average order value</span>
                <span className="text-ink font-medium">{formatPrice(stats.averageOrderValue)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-soft">Pending orders</span>
                <span className="text-soft text-savanna-honey">{stats.pendingOrders}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-soft">Fulfilled orders</span>
                <span className="text-soft text-[#00B04F]">{stats.fulfilledOrders}</span>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-serif text-lg font-bold text-ink mb-4">How it works</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-safari/10 flex items-center justify-center text-safari text-xs font-bold">
                  1
                </div>
                <div>
                  <div className="text-sm font-medium text-ink">Customer places order</div>
                  <div className="text-[11px] text-soft">Via E-shop website with M-Pesa</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-safari/10 flex items-center justify-center text-safari text-xs font-bold">
                  2
                </div>
                <div>
                  <div className="text-sm font-medium text-ink">STK push sent</div>
                  <div className="text-[11px] text-soft">Customer enters M-Pesa PIN</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-safari/10 flex items-center justify-center text-safari text-xs font-bold">
                  3
                </div>
                <div>
                  <div className="text-sm font-medium text-ink">Order confirmed</div>
                  <div className="text-[11px] text-soft">Invoice generated &amp; order packed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
