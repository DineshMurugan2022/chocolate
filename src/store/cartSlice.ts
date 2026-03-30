import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category?: string;
  subItems?: string[];
}

type CartItemInput = Omit<CartItem, 'id' | 'quantity'> & {
  id?: string;
  _id?: string;
  quantity?: number;
};

interface CartState {
  items: CartItem[];
  totalPrice: number;
  lastAddedItem: CartItem | null;
}

const getPersistedCart = () => {
  try {
    const items = localStorage.getItem('cartItems');
    const total = localStorage.getItem('cartTotalPrice');
    return {
      items: items ? JSON.parse(items) : [],
      total: total ? parseFloat(total) : 0
    };
  } catch (err) {
    console.error('Error loading cart from localStorage:', err);
    return { items: [], total: 0 };
  }
};

const persisted = getPersistedCart();

const initialState: CartState = {
  items: persisted.items,
  totalPrice: persisted.total,
  lastAddedItem: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemInput>) => {
      const normalizedId = action.payload.id || action.payload._id || `item-${Date.now()}`;
      const quantity = action.payload.quantity ?? 1;
      
      const normalizedItem: CartItem = {
        ...action.payload,
        id: normalizedId,
        quantity,
      };
      // Explicitly remove _id if it exists to keep state clean
      if ('_id' in normalizedItem) delete (normalizedItem as any)._id;

      const existingItem = state.items.find(item => item.id === normalizedId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push(normalizedItem);
      }
      state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      state.lastAddedItem = { ...normalizedItem };
      localStorage.setItem('cartItems', JSON.stringify(state.items));
      localStorage.setItem('cartTotalPrice', state.totalPrice.toString());
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(item => item.id === action.payload);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(item => item.id !== action.payload);
        }
      }
      state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
      localStorage.setItem('cartTotalPrice', state.totalPrice.toString());
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.lastAddedItem = null;
      localStorage.removeItem('cartItems');
      localStorage.removeItem('cartTotalPrice');
    },
    clearNotification: (state) => {
      state.lastAddedItem = null;
    },
  },
});

export const { addToCart, decrementQuantity, clearCart, clearNotification } = cartSlice.actions;
export default cartSlice.reducer;
