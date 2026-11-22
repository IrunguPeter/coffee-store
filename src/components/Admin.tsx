import { useState } from 'react';
import { Plus, Upload, Trash2, CoffeeBeans, ShieldCheck } from 'lucide-react';
import type { Product } from '../data/products';
import { PRODUCTS, CATEGORIES, getProduct } from '../data/products';
import { formatPrice, slugify } from '../lib/utils';

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([...PRODUCTS]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Partial<Product> & { id?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) return;

    const newProduct: Product = {
      id: form.id || slugify(form.name as string),
      name: form.name as string,
      description: form.description || '',
      shortDescription: form.shortDescription || '',
      price: Number(form.price),
      category: form.category as string,
      categoryLabel: CATEGORIES.find((c) => c.id === form.category)?.label || form.category,
      image: form.image || '/products/placeholder.jpg',
      stock: Number(form.stock || 0),
      featured: form.featured === 'true',
      bestseller: form.bestseller === 'true',
      new: form.new === 'true',
    };

    if (editing) {
      setProducts(products.map((p) => (p.id === editing.id ? newProduct : p)));
      setEditing(null);
    } else {
      setProducts([...products, newProduct]);
    }
    setForm({});
  };

  const handleEdit = (product: Product) => {
    setEditing(product);
    setForm({ ...product });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="page-width section">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink mb-1">Admin</h1>
          <p className="text-soft">Upload and manage your products.</p>
        </div>
        <button
          onClick={() => { setEditing(null); setForm({}); }}
          className="btn-primary"
        >
          <Plus size={18} strokeWidth={2} /> Add product
        </button>
      </div>

      {editing && (
        <div className="card p-6 mb-8 max-w-2xl">
          <h2 className="font-serif text-lg font-bold text-ink mb-4">Edit product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="id" defaultValue={editing.id} readOnly />
            <AdminField label="Name" name="name" form={form} setForm={setForm} />
            <AdminField label="Short description" name="shortDescription" form={form} setForm={setForm} />
            <AdminField label="Description" name="description" form={form} setForm={setForm} textarea />
            <div className="grid md:grid-cols-2 gap-4">
              <AdminField label="Price (cents)" name="price" form={form} setForm={setForm} type="number" />
              <AdminField label="Stock" name="stock" form={form} setForm={setForm} type="number" />
            </div>
            <AdminField label="Category" name="category" form={form} setForm={setForm} select options={CATEGORIES.map((c) => ({ value: c.id, label: c.label }))} />
            <AdminField label="Image URL" name="image" form={form} setForm={setForm} />
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured === 'true'} onChange={(e) => setForm({ ...form, featured: e.target.checked ? 'true' : 'false' })} />
                Featured
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.bestseller === 'true'} onChange={(e) => setForm({ ...form, bestseller: e.target.checked ? 'true' : 'false' })} />
                Bestseller
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.new === 'true'} onChange={(e) => setForm({ ...form, new: e.target.checked ? 'true' : 'false' })} />
                New arrival
              </label>
            </div>
            <div className="flex gap-3 pt-4">
              <button type="submit" className="btn-primary flex-1">Save changes</button>
              <button type="button" onClick={() => { setEditing(null); setForm({}); }} className="btn-outline flex-1">Cancel</button>
              <button type="button" onClick={() => handleDelete(editing!.id)} className="btn-ghost text-error flex-1">Delete</button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto border border-line rounded-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-line bg-cream/50">
              <th className="text-xs mono tracking-wide uppercase text-soft p-4">Product</th>
              <th className="text-xs mono tracking-wide uppercase text-soft p-4">Category</th>
              <th className="text-xs mono tracking-wide uppercase text-soft p-4 text-right">Price</th>
              <th className="text-xs mono tracking-wide uppercase text-soft p-4 text-center">Stock</th>
              <th className="text-xs mono tracking-wide uppercase text-soft p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-coffee/5 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded overflow-hidden bg-coffee-pale">
                      <img src={product.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-ink">{product.name}</div>
                      <div className="text-xs text-soft mono">{slugify(product.name)}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-soft">{product.categoryLabel}</td>
                <td className="p-4 text-sm text-ink font-medium text-right">{formatPrice(product.price)}</td>
                <td className="p-4 text-sm text-soft text-center">{product.stock}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleEdit(product)} className="text-xs text-coffee underline underline-offset-2 hover:text-coffee-dark">Edit</button>
                  <button onClick={() => handleDelete(product.id)} className="ml-3 text-xs text-error underline underline-offset-2 hover:text-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 p-6 rounded-lg bg-coffee/5 border border-coffee/10">
        <div className="flex items-center gap-3 mb-3">
          <ShieldCheck size={18} strokeWidth={2} className="text-coffee" />
          <span className="text-sm font-medium text-ink">Admin notes</span>
        </div>
        <p className="text-sm text-soft">
          This is a demo admin panel. Changes live in memory and reset on refresh. Connect a real
          backend and database to persist products and process orders.
        </p>
      </div>
    </div>
  );
}

function AdminField({
  label,
  name,
  form,
  setForm,
  type = 'text',
  options,
  textarea,
}: {
  label: string;
  name: string;
  form: any;
  setForm: any;
  type?: string;
  options?: { value: string; label: string }[];
  textarea?: boolean;
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
      ) : textarea ? (
        <textarea
          value={form[name] || ''}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          className="input min-h-[80px] resize-y"
          rows={3}
        />
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
