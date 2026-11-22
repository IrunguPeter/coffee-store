export type OrderStatus = 'pending' | 'paid' | 'fulfilled' | 'shipped' | 'cancelled';

export type OrderItem = {
  productId: string;
  name: string;
  price: number; // cents
  quantity: number;
  total: number; // cents
  weight?: string;
};

export type Order = {
  id: string;
  orderNumber: string;
  customer: {
    email: string;
    name: string;
    address: string;
    city: string;
    zip: string;
    phone: string;
  };
  items: OrderItem[];
  subtotal: number; // cents
  discount: number; // cents
  promoCode?: string;
  promoDescription?: string;
  total: number; // cents
  status: OrderStatus;
  paymentMethod: 'mpesa' | 'card';
  paymentReference?: string; // M-Pesa transaction ID
  createdAt: string; // ISO date string
};

let orders: Order[] = [];
let orderCounter = 1000;

export function getOrders(): Order[] {
  return [...orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getOrder(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}

export function getOrderByNumber(orderNumber: string): Order | undefined {
  return orders.find((o) => o.orderNumber === orderNumber);
}

export function createOrder(order: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order {
  const newOrder: Order = {
    ...order,
    id: `order-${Date.now()}`,
    orderNumber: `E${orderCounter++}`,
    createdAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  return newOrder;
}

export function updateOrderStatus(id: string, status: OrderStatus): boolean {
  const order = orders.find((o) => o.id === id);
  if (!order) return false;
  order.status = status;
  return true;
}

export function getOrderStats() {
  const all = getOrders();
  const totalSales = all.reduce((sum, o) => sum + o.total, 0);
  const paidOrders = all.filter((o) => o.status === 'paid' || o.status === 'fulfilled' || o.status === 'shipped');
  const pendingOrders = all.filter((o) => o.status === 'pending');
  const fulfilledOrders = all.filter((o) => o.status === 'fulfilled' || o.status === 'shipped');
  return {
    totalOrders: all.length,
    totalSales,
    pendingOrders: pendingOrders.length,
    paidOrders: paidOrders.length,
    fulfilledOrders: fulfilledOrders.length,
    averageOrderValue: all.length > 0 ? Math.round(totalSales / all.length) : 0,
  };
}
