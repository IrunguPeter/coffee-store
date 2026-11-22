import { useState } from 'react';
import { Plus, Trash2, Clock } from 'lucide-react';
import type { Promo, DiscountType } from '../../data/promos';
import { usePromo } from '../../context/PromoContext';
import { formatPrice, slugify } from '../../lib/utils';

export default function PromosTab() {
  const { promos, loading, error, createPromo, updatePromo, deletePromo, togglePromo, refetch } =
    usePromo();
  const [editing, setEditing] = useState<Promo | null>(null);
  const [form, setForm] = useState<Partial<Promo> & { id?: string }>({});

  const resetForm = () => {
    setEditing(null);
    setForm({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code || !form.type || !form.value) return;

    const newPromo: Omit<Promo, 'id'> = {
      code: form.code as string,
      description: form.description || '',
      type: form.type as DiscountType,
      value: Number(form.value),
      appliesTo: (form.appliesTo as 'all' | 'category' | 'product') || 'all',
      targetId: form.targetId || undefined,
      minSpend: form.minSpend ? Number(form.minSpend) : undefined,
      maxUses: form.maxUses ? Number(form.maxUses) : undefined,
      usedCount: editing?.usedCount ?? 0,
      expiresAt: form.expiresAt || undefined,
      active: form.active !== 'false',
      createdAt: editing?.createdAt || new Date().toISOString(),
    };

    try {
      if (editing) {
        await updatePromo(editing.id, newPromo);
      } else {
        await createPromo(newPromo);
      }
      resetForm();
    } catch {
      // Error is handled by context
    }
  };

  const handleEdit = (promo: Promo) => {
    setEditing(promo);
    setForm({ ...promo });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this promo code?')) {
      await deletePromo(id);
    }
  };

  const toggleActive = async (id: string) => {
    await togglePromo(id);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-serif text-2xl font-bold text-ink mb-1">Promo codes</h2>
          <p className="text-soft">Create and manage discount codes for your customers.</p>
        </div>
        <button onClick={resetForm} className="btn-primary">
          <Plus size={18} strokeWidth={2} /> Add promo
        </button>
      </div>

      {loading && <p className="text-soft">Loading promos...</p>}
      {error && <p className="text-error">{error}</p>}
      <button onClick={refetch} className="text-xs text-soft mb-4 underline underline-offset-2 hover:text-ink">
        Refresh
      </button>

      {editing && (
        <div className="card p-6 mb-8 max-w-2xl">
          <h2 className="font-serif text-lg font-bold text-ink mb-4">Edit promo code</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="id" defaultValue={editing.id} readOnly />
            <div className="grid md:grid-cols-2 gap-4">
              <AdminField label="Code (e.g. WELCOME10)" name="code" form={form} setForm={setForm} />
              <AdminField label="Description" name="description" form={form} setForm={setForm} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <AdminField
                label="Discount type"
                name="type"
                form={form}
                setForm={setForm}
                select
                options={[
                  { value: 'percentage', label: 'Percentage (%)' },
                  { value: 'fixed', label: 'Fixed amount (KSh)' },
                ]}
              />
              <AdminField label="Value" name="value" form={form} setForm={setForm} type="number" />
            </div>
            <AdminField label="Applies to" name="appliesTo" form={form} setForm={setForm} select options={[
              { value: 'all', label: 'All products' },
              { value: 'category', label: 'Specific category' },
              { value: 'product', label: 'Specific product' },
            ]} />
            {form.appliesTo !== 'all' && (
              <AdminField label="Target category / product ID" name="targetId" form={form} setForm={setForm} />
            )}
            <AdminField label="Minimum spend (cents, optional)" name="minSpend" form={form} setForm={setForm} type="number" />
            <AdminField label="Max uses (optional)" name="maxUses" form={form} setForm={setForm} type="number" />
            <AdminField label="Expires at (YYYY-MM-DD)" name="expiresAt" form={form} setForm={setForm} type="date" />
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.active !== 'false'} onChange={(e) => setForm({ ...form, active: e.target.checked ? 'true' : 'false' })} />
                Active
              </label>
            </div>
            <div className="flex gap-3 pt-4">
              <button type="submit" className="btn-primary flex-1">Save changes</button>
              <button type="button" onClick={resetForm} className="btn-outline flex-1">Cancel</button>
              <button type="button" onClick={() => handleDelete(editing!.id)} className="btn-ghost text-error flex-1">Delete</button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto border border-line rounded-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-line bg-cream/50">
              <th className="text-xs mono tracking-wide uppercase text-soft p-4">Code</th>
              <th className="text-xs mono tracking-wide uppercase text-soft p-4">Description</th>
              <th className="text-xs mono tracking-wide uppercase text-soft p-4 text-right">Discount</th>
              <th className="text-xs mono tracking-wide uppercase text-soft p-4 text-center">Uses</th>
              <th className="text-xs mono tracking-wide uppercase text-soft p-4 text-center">Expires</th>
              <th className="text-xs mono tracking-wide uppercase text-soft p-4 text-center">Status</th>
              <th className="text-xs mono tracking-wide uppercase text-soft p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {promos.map((promo) => {
              const valid = isPromoValid(promo);
              const discountText =
                promo.type === 'percentage' ? `${promo.value}%` : `KSh ${(promo.value / 100).toFixed(0)}`;
              return (
                <tr key={promo.id} className="hover:bg-safari/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-ink mono">{promo.code}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border text-[10px] ${valid ? 'text-safari border-safari/20 bg-safari/5' : 'text-error border-error/20 bg-error/5'}`}>
                        {valid ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-soft">{promo.description}</td>
                  <td className="p-4 text-sm text-ink font-medium text-right">{discountText}</td>
                  <td className="p-4 text-sm text-soft text-center">
                    {promo.usedCount} / {promo.maxUses ?? '∞'}
                  </td>
                  <td className="p-4 text-sm text-soft text-center">
                    {promo.expiresAt || 'Never'}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => toggleActive(promo.id)}
                      className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${promo.active ? 'bg-safari/10 text-safari border border-safari/20' : 'bg-outline/10 text-outline border border-outline/20'}`}
                    >
                      {promo.active ? 'Active' : 'Paused'}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleEdit(promo)} className="text-xs text-safari underline underline-offset-2 hover:text-safari-dark mr-2">Edit</button>
                    <button onClick={() => handleDelete(promo.id)} className="text-xs text-error underline underline-offset-2 hover:text-error">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function isPromoValid(promo: Promo): boolean {
  if (!promo.active) return false;
  if (promo.expiresAt && new Date(promo.expiresAt) < new Date()) return false;
  if (promo.maxUses && promo.usedCount >= promo.maxUses) return false;
  return true;
}

function AdminField({
  label,
  name,
  form,
  setForm,
  type = 'text',
  options,
}: {
  label: string;
  name: string;
  form: any;
  setForm: any;
  type?: string;
  options?: { value: string; label: string }[];
}) {
  return (
    <div className="space-y-2">
      <label className="label">{label}</label>
      {options ? (
        <select
          value={form[name] || ''}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          className="input"
        >
          <option value="">Select…</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={form[name] || ''}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          className="input"
        />
      )}
    </div>
  );
}
