
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  isOrganic: boolean;
  discount: number;
  brand?: string;
  rating?: number;
  tags?: string[];
  sizes?: string[];
  colors?: string[];
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'delivered' | 'canceled';
  createdAt: string;
  shippingAddress: Address;
  paymentMethod: string;
  trackingNumber?: string;
  deliveryEstimate?: string;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt?: string;
  lastLogin?: string;
  ordersCount?: number;
  totalSpent?: number;
}

export interface DeliveryZone {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
  active: boolean;
}

export interface ProductInventory {
  id: string;
  productId: string;
  quantity: number;
  lastRestocked: string;
}

export type AdminTab = 'dashboard' | 'products' | 'orders' | 'users' | 'delivery';
