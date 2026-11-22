const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5174';

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export const api = {
  // Products
  getProducts: (params?: { category?: string; featured?: string; bestseller?: string; new?: string }) => {
    const search = new URLSearchParams();
    if (params?.category) search.set('category', params.category);
    if (params?.featured) search.set('featured', params.featured);
    if (params?.bestseller) search.set('bestseller', params.bestseller);
    if (params?.new) search.set('new', params.new);
    return request(`/api/products${search.toString() ? '?' + search.toString() : ''}`);
  },
  getProduct: (id: string) => request(`/api/products/${id}`),
  createProduct: (body: any) => request('/api/products', { method: 'POST', body: JSON.stringify(body) }),
  updateProduct: (id: string, body: any) => request(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteProduct: (id: string) => request(`/api/products/${id}`, { method: 'DELETE' }),

  // Promos
  getPromos: () => request('/api/promos'),
  getPromo: (code: string) => request(`/api/promos/${code}`),
  createPromo: (body: any) => request('/api/promos', { method: 'POST', body: JSON.stringify(body) }),
  updatePromo: (id: string, body: any) => request(`/api/promos/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deletePromo: (id: string) => request(`/api/promos/${id}`, { method: 'DELETE' }),
  togglePromo: (id: string) => request(`/api/promos/${id}/toggle`, { method: 'POST' }),

  // Orders
  getOrders: () => request('/api/orders'),
  getOrder: (id: string) => request(`/api/orders/${id}`),
  createOrder: (body: any) => request('/api/orders', { method: 'POST', body: JSON.stringify(body) }),
  updateOrderStatus: (id: string, status: string) => request(`/api/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  getOrderStats: () => request('/api/orders/stats'),
};
