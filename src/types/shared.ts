export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  images?: string[];
  model3d?: string;
  ingredients?: string[];
  stock?: number;
  weight?: string;
  rating?: number;
  reviews?: number;
  brand?: string;
  events?: string[];
  cacaoContent?: string;
  notes?: string;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role?: 'user' | 'admin';
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category?: string;
  subItems?: string[];
}

export type CartItemInput = Omit<CartItem, 'id' | 'quantity'> & {
  id?: string;
  _id?: string;
  quantity?: number;
};

export interface Order {
  _id: string;
  user: string | User;
  items: {
    product: string | Product;
    name: string;
    price: number;
    quantity: number;
  }[];
  shippingAddress: {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    postalCode: string;
  };
  totalPrice: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'paid';
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  createdAt: string;
}

export interface Category {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  _id: string;
  user: string | User;
  product: string | Product;
  rating: number;
  comment: string;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
