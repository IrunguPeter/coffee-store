import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, CreditCard, ArrowLeft, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, itemCount, clearCart } = useCart();
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');
  const [form, setForm] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    zip: '',
    phone: '',
  });

  if (items.length === 0) {
    navigate('/shop');
    return null;
  }

  if (step === 'success') {
    return (
      <div className="page-width section">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} strokeWidth={2} className="text-success" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-ink mb-2">Order confirmed</h1>
          <p className="text-soft mb-8">Thank you for your order. Your coffee is being roasted and will ship soon.</p>
          <div className="card p-6 text-left mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-soft">Order total</span>
              <span className="font-medium text-ink">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-xs text-soft mono">
              <span>Items</span>
              <span>{itemCount}</span>
            </div>
          </div>
          <button onClick={() => navigate('/shop')} className="w-full btn-primary">
            Browse more coffee
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
              <h1 className="font-serif text-3xl font-bold text-ink">Checkout</h1>
              <p className="text-soft max-w-md">Tell us where to send your coffee.</p>

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
                  <Field label="City" type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                  <Field label="ZIP / postal" type="text" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} />
                </div>
                <Field label="Phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} icon={<Phone size={18} strokeWidth={2} />} />

                <button type="submit" className="w-full btn-primary py-4 text-base">
                  Continue to payment <span className="ml-2">→</span>
                </button>
              </form>
            </>
          )}

          {step === 'payment' && (
            <>
              <ArrowLeft size={20} strokeWidth={2} className="text-soft mb-2 inline-block cursor-pointer" onClick={() => setStep('info')} />
              <h1 className="font-serif text-3xl font-bold text-ink">Payment</h1>
              <p className="text-soft max-w-md">Securely complete your order.</p>

              <div className="space-y-5">
                <div className="card p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard size={20} strokeWidth={2} className="text-coffee" />
                    <span className="font-medium text-ink">Card details</span>
                  </div>
                  <div className="relative">
                    <input type="text" className="input pl-10" placeholder="1234 5678 9012 3456" />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-soft text-xs">
                      •••• •••• •••• ••••
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <input type="text" className="input" placeholder="MM/YY" />
                    <input type="text" className="input" placeholder="CVC" />
                  </div>
                </div>

                <button onClick={() => setStep('success')} className="w-full btn-primary py-4 text-base">
                  Place order — {formatPrice(subtotal)}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right: order summary */}
        <div className="card p-6 space-y-6 lg:sticky lg:top-24">
          <div>
            <h2 className="font-serif text-lg font-bold text-ink mb-3">Order summary</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between items-start gap-3">
                  <div>
                    <div className="text-sm font-medium text-ink">{item.product.name}</div>
                    <div className="text-xs text-soft mono">{item.product.weight}</div>
                    <div className="text-xs text-soft mono">× {item.quantity}</div>
                  </div>
                  <span className="text-sm font-medium text-ink">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-line mt-3 flex justify-between text-sm font-medium text-ink">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-soft mono">
                <span>Shipping</span>
                <span>Free over $40</span>
              </div>
              <div className="flex justify-between mt-2 text-lg font-bold text-ink">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-md bg-coffee/5 border border-coffee/10">
            <p className="text-xs text-soft mono mb-2">Secure checkout</p>
            <p className="text-xs text-soft">We never store your card details. Powered by Stripe.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, type, value, onChange, icon }: { label: string; type: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; icon?: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="label">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-soft text-xs pointer-events-none">{icon}</div>
        )}
        <input type={type} value={value} onChange={onChange} className={`input ${icon ? 'pl-9' : ''}`} />
      </div>
    </div>
  );
}
