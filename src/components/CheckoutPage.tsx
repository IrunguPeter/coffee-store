import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowLeft, CheckCircle, Phone as PhoneIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../data/orders';
import { formatPrice } from '../lib/utils';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const {
    items,
    subtotal,
    discount,
    total,
    itemCount,
    appliedPromo,
    clearCart,
    closeCart,
  } = useCart();
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');
  const [form, setForm] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    zip: '',
    phone: '',
  });
  const [processing, setProcessing] = useState(false);

  if (items.length === 0) {
    navigate('/shop');
    return null;
  }

  if (step === 'success') {
    return (
      <div className="page-width section">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-[#00B04F]/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} strokeWidth={2} className="text-[#00B04F]" />
          </div>
          <h1 className="text-3xl font-extrabold text-ink mb-2">Order placed!</h1>
          <p className="text-ink-variant mb-8">
            Asante sana for shopping with E-shop. Your order is being packed.
          </p>
          <div className="card p-6 text-left mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-soft">Order total</span>
              <span className="font-medium text-ink">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-[11px] text-soft mono">
              <span>Items</span>
              <span>{itemCount}</span>
            </div>
            {appliedPromo && (
              <div className="flex justify-between text-[11px] text-soft mono mt-1">
                <span>Promo ({appliedPromo.code})</span>
                <span className="text-safari font-medium">- {formatPrice(discount)}</span>
              </div>
            )}
          </div>
          <button onClick={() => navigate('/shop')} className="w-full btn-primary">
            Browse more
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-width section">
      <div className="max-w-3xl mx-auto lg:grid lg:grid-cols-2 lg:gap-12">
        {/* Left: form */}
        <div className="space-y-6">
          {step === 'info' && (
            <>
              <ArrowLeft size={20} strokeWidth={2} className="text-soft mb-2 inline-block cursor-pointer" onClick={() => navigate('/shop')} />
              <h1 className="text-3xl font-extrabold text-ink">Checkout</h1>
              <p className="text-ink-variant max-w-md">Tell us where to send your order.</p>

              <form onSubmit={(e) => {
                e.preventDefault();
                setStep('payment');
              }} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} icon={<Mail size={18} strokeWidth={2} />} />
                  <Field label="Full name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <Field label="Street address" type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} icon={<MapPin size={18} strokeWidth={2} />} />
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="City" type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="e.g. Nairobi" />
                  <Field label="ZIP / postal" type="text" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} placeholder="e.g. 00100" />
                </div>
                <Field label="Phone (+254)" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} icon={<PhoneIcon size={18} strokeWidth={2} />} placeholder="7XX XXX XXX" />

                <button type="submit" className="w-full btn-primary py-4 text-base">
                  Continue to M-Pesa <span className="ml-2">→</span>
                </button>
              </form>
            </>
          )}

          {step === 'payment' && (
            <>
              <ArrowLeft size={20} strokeWidth={2} className="text-soft mb-2 inline-block cursor-pointer" onClick={() => setStep('info')} />
              <h1 className="text-3xl font-extrabold text-ink">M-Pesa Express</h1>
              <p className="text-ink-variant max-w-md">Pay safely via Lipa na M-Pesa STK push.</p>

              <div className="space-y-5">
                <div className="card p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-[#00B04F] flex items-center justify-center">
                      <span className="text-[10px] text-white font-bold">📱</span>
                    </div>
                    <span className="font-semibold text-ink">M-Pesa Till / PayBill</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-ink-variant">Pay via</span>
                      <span className="text-xs font-bold text-safari">STK Push</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-ink-variant">Till number</span>
                      <span className="text-xs font-medium text-ink mono">247 247</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-ink-variant">Amount</span>
                      <span className="text-xs font-bold text-ink">{formatPrice(total)}</span>
                    </div>
                    {appliedPromo && (
                      <div className="flex justify-between text-xs mb-1 mt-1">
                        <span className="text-ink-variant">Promo ({appliedPromo.code})</span>
                        <span className="text-xs font-medium text-safari">- {formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="p-3 rounded-md bg-[#00B04F]/10 border border-[#00B04F]/20">
                      <p className="text-[11px] text-[#009e43] font-semibold mb-1">
                        An STK push will be sent to {form.phone || 'your registered number'}
                      </p>
                      <p className="text-[11px] text-soft">Enter your M-Pesa PIN to confirm.</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setProcessing(true);
                    const orderItems = items.map((item) => ({
                      productId: item.product.id,
                      name: item.product.name,
                      price: item.product.price,
                      quantity: item.quantity,
                      total: item.product.price * item.quantity,
                      weight: item.product.weight,
                    }));

                    createOrder({
                      customer: {
                        email: form.email,
                        name: form.name,
                        address: form.address,
                        city: form.city,
                        zip: form.zip,
                        phone: form.phone,
                      },
                      items: orderItems,
                      subtotal,
                      discount,
                      promoCode: appliedPromo?.code,
                      promoDescription: appliedPromo?.description,
                      total,
                      status: 'paid',
                      paymentMethod: 'mpesa',
                      paymentReference: `MP${Date.now().toString().slice(-8)}`,
                    }).then(() => {
                      setProcessing(false);
                      clearCart();
                      closeCart();
                      setStep('success');
                    }).catch((err) => {
                      console.error('Order failed:', err);
                      setProcessing(false);
                      alert('Order failed. Please try again.');
                    });
                  }}
                  disabled={processing}
                  className="w-full btn-mpesa py-4 text-base"
                >
                  {processing ? 'Processing M-Pesa...' : `Confirm M-Pesa Payment — ${formatPrice(total)}`}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right: order summary */}
        <div className="card p-6 space-y-6 lg:sticky lg:top-24">
          <div>
            <h2 className="text-lg font-bold text-ink mb-3">Order summary</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between items-start gap-3">
                  <div>
                    <div className="text-sm font-medium text-ink">{item.product.name}</div>
                    {item.product.weight && (
                      <div className="text-[11px] text-soft mono">{item.product.weight}</div>
                    )}
                    <div className="text-[11px] text-soft mono">× {item.quantity}</div>
                  </div>
                  <span className="text-sm font-medium text-ink">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-outline mt-3 flex justify-between text-sm font-medium text-ink">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-xs text-safari font-medium">
                  <span>Promo discount</span>
                  <span>- {formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[11px] text-soft mono">
                <span>Shipping</span>
                <span>Nairobi same-day · KSh 200 flat</span>
              </div>
              <div className="flex justify-between mt-2 text-lg font-extrabold text-ink">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-md bg-safari/5 border border-safari/10">
            <p className="text-[11px] text-soft mono mb-2 tracking-wide uppercase">Secure checkout</p>
            <p className="text-[11px] text-soft">
              Pay via Lipa na M-Pesa. Your transaction is encrypted and confirmed instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, type, value, onChange, icon, placeholder }: { label: string; type: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; icon?: React.ReactNode; placeholder?: string }) {
  return (
    <div className="space-y-2">
      <label className="label">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-soft text-[11px] pointer-events-none">{icon}</div>
        )}
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} className={`input ${icon ? 'pl-9' : ''}`} />
      </div>
    </div>
  );
}
