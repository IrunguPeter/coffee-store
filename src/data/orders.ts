export type OrderStatus = 'pending' | 'paid' | 'fulfilled' | 'shipped' | 'cancelled';

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
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
  subtotal: number;
  discount: number;
  promoCode?: string;
  promoDescription?: string;
  total: number;
  status: OrderStatus;
  paymentMethod: 'mpesa' | 'card';
  paymentReference?: string;
  createdAt: string;
};

import { api } from '../lib/api';

export async function getOrders(): Promise<Order[]> {
  return api.getOrders();
}

export async function getOrder(id: string): Promise<Order | undefined> {
  try {
    return await api.getOrder(id);
  } catch {
    return undefined;
  }
}

export async function createOrder(order: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) {
  return api.createOrder(order);
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  return api.updateOrderStatus(id, status);
}

export async function getOrderStats() {
  return api.getOrderStats();
}
