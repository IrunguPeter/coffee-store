import { useState, useEffect } from 'react';
import { CheckCircle, RefreshCw } from 'lucide-react';
import type { OrderStatus } from '../../data/orders';
import { getOrders, updateOrderStatus } from '../../data/orders';
import { formatPrice } from '../../lib/utils';
import { InvoiceButton } from './InvoiceButton';

type StatusOption = { id: OrderStatus; label: string; color: string };

const STATUS_OPTIONS: StatusOption[] = [
  { id: 'pending', label: 'Pending', color: 'text-savanna-honey' },
  { id: 'paid', label: 'Paid', color: 'text-safari' },
  { id: 'fulfilled', label: 'Fulfilled', color: 'text-[#00B04F]' },
  { id: 'shipped', label: 'Shipped', color: 'text-safari-dark' },
  { id: 'cancelled', label: 'Cancelled', color: 'text-error' },
];

export default function OrdersTab() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewingInvoice, setViewingInvoice] = useState<any | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, status);
      await loadOrders();
    } catch {
      alert('Failed to update order status');
    }
  };

  if (loading) return <p className="text-soft">Loading orders...</p>;

  if (viewingInvoice) {
    return (
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 lg:w-1/3 border-r border-line p-6">
          <button
            onClick={() => setViewingInvoice(null)}
            className="mb-6 text-xs text-soft underline underline-offset-2 hover:text-ink"
          >
            ← Back to orders
          </button>
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-lg font-bold text-ink mb-2">Invoice {viewingInvoice.order_number}</h2>
              <p className="text-[11px] text-soft mono tracking-wide uppercase">{new Date(viewingInvoice.created_at).toLocaleDateString()}</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-soft">Customer</span>
                <span className="text-ink">{viewingInvoice.customer_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-soft">Email</span>
                <span className="text-soft mono">{viewingInvoice.customer_email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-soft">Phone</span>
                <span className="text-soft mono">{viewingInvoice.customer_phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-soft">Address</span>
                <span className="text-soft">{viewingInvoice.customer_address}, {viewingInvoice.customer_city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-soft">Payment</span>
                <span className="text-ink">{viewingInvoice.payment_method === 'mpesa' ? 'M-Pesa Express' : 'Card'}</span>
              </div>
              {viewingInvoice.payment_reference && (
                <div className="flex justify-between">
                  <span className="text-soft">M-Pesa ref</span>
                  <span className="text-soft mono">{viewingInvoice.payment_reference}</span>
                </div>
              )}
            </div>
            <div className="pt-4 border-t border-line">
              <h3 className="font-serif text-md font-bold text-ink mb-3">Items</h3>
              {viewingInvoice.items?.map((item: any) => (
                <div key={item.id} className="flex justify-between items-start gap-4 pb-3 border-b border-line last:border-0">
                  <div>
                    <div className="text-sm font-medium text-ink">{item.name}</div>
                    <div className="text-[11px] text-soft mono">{item.weight || ''}</div>
                    <div className="text-[11px] text-soft mono">× {item.quantity}</div>
                  </div>
                  <span className="text-sm font-medium text-ink text-right">{formatPrice(item.total)}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-line mt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-soft">Subtotal</span>
                  <span className="text-ink">{formatPrice(viewingInvoice.subtotal)}</span>
                </div>
                {viewingInvoice.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-soft">Discount ({viewingInvoice.promo_code})</span>
                    <span className="text-safari font-medium">- {formatPrice(viewingInvoice.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-extrabold text-ink pt-2 border-t border-line">
                  <span>Total</span>
                  <span>{formatPrice(viewingInvoice.total)}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <InvoiceButton order={viewingInvoice} />
              <button
                onClick={() => setViewingInvoice(null)}
                className="btn-outline flex-1"
              >
                Close
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 lg:w-2/3 p-6">
          <h2 className="font-serif text-2xl font-bold text-ink mb-6">Orders</h2>
          <button
            onClick={loadOrders}
            className="mb-4 btn-ghost flex items-center gap-2"
          >
            <RefreshCw size={16} strokeWidth={2} /> Refresh
          </button>
          <div className="overflow-x-auto border border-line rounded-lg">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-line bg-cream/50">
                  <th className="text-xs mono tracking-wide uppercase text-soft p-4">Order</th>
                  <th className="text-xs mono tracking-wide uppercase text-soft p-4">Customer</th>
                  <th className="text-xs mono tracking-wide uppercase text-soft p-4 text-right">Total</th>
                  <th className="text-xs mono tracking-wide uppercase text-soft p-4 text-center">Status</th>
                  <th className="text-xs mono tracking-wide uppercase text-soft p-4 text-center">Date</th>
                  <th className="text-xs mono tracking-wide uppercase text-soft p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {orders.map((order: any) => {
                  const statusOpt = STATUS_OPTIONS.find((s) => s.id === order.status);
                  return (
                    <tr key={order.id} className="hover:bg-safari/5 transition-colors cursor-pointer" onClick={() => setViewingInvoice(order)}>
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
                        <span className={`text-xs font-medium px-2 py-1 rounded-full border ${statusOpt.color} border-[color:currentColor]`}>
                          {statusOpt.label}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-soft text-center">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                            className="text-xs border border-outline rounded-md px-2 py-1 bg-transparent focus:outline-none focus:ring-1 focus:ring-safari"
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s.id} value={s.id}>{s.label}</option>
                            ))}
                          </select>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {orders.length === 0 && (
            <div className="text-center py-20">
              <p className="text-soft">No orders yet.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="font-serif text-2xl font-bold text-ink">Orders</h2>
        <button
          onClick={loadOrders}
          className="btn-ghost flex items-center gap-2"
        >
          <RefreshCw size={16} strokeWidth={2} /> Refresh
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
              <th className="text-xs mono tracking-wide uppercase text-soft p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {orders.map((order: any) => {
              const statusOpt = STATUS_OPTIONS.find((s) => s.id === order.status);
              return (
                <tr key={order.id} className="hover:bg-safari/5 transition-colors cursor-pointer" onClick={() => setViewingInvoice(order)}>
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
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${statusOpt.color} border-[color:currentColor]`}>
                      {statusOpt.label}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-soft text-center">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                        className="text-xs border border-outline rounded-md px-2 py-1 bg-transparent focus:outline-none focus:ring-1 focus:ring-safari"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s.id} value={s.id}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {orders.length === 0 && (
        <div className="text-center py-20">
          <p className="text-soft">No orders yet.</p>
        </div>
      )}
    </div>
  );
}
