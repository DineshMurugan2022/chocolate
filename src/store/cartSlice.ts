import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, CartItemInput } from '@/types';

interface CartState {
  items: CartItem[];
  totalPrice: number;
  lastAddedItem: CartItem | null;
}

const STORAGE_KEYS = {
  ITEMS: 'cartItems',
  TOTAL: 'cartTotalPrice',
};

const getPersistedCart = () => {
  try {
    const itemsJson = localStorage.getItem(STORAGE_KEYS.ITEMS);
    const totalJson = localStorage.getItem(STORAGE_KEYS.TOTAL);
    return {
      items: itemsJson ? JSON.parse(itemsJson) : [],
      total: totalJson ? parseFloat(totalJson) : 0
    };
  } catch (err) {
    console.error('Error loading cart from localStorage:', err);
    return { items: [], total: 0 };
  }
};

const persistCart = (items: CartItem[], total: number) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items));
    localStorage.setItem(STORAGE_KEYS.TOTAL, total.toString());
  } catch (err) {
    console.error('Error persisting cart:', err);
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
      } as CartItem;

      const existingItem = state.items.find(item => item.id === normalizedId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push(normalizedItem);
      }
      
      state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      state.lastAddedItem = { ...normalizedItem };
      persistCart(state.items, state.totalPrice);
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
      persistCart(state.items, state.totalPrice);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.lastAddedItem = null;
      localStorage.removeItem(STORAGE_KEYS.ITEMS);
      localStorage.removeItem(STORAGE_KEYS.TOTAL);
    },
    clearNotification: (state) => {
      state.lastAddedItem = null;
    },
  },
});

export const { addToCart, decrementQuantity, clearCart, clearNotification } = cartSlice.actions;
export default cartSlice.reducer;
