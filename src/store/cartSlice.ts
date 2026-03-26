import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  subItems?: string[];
}

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
    addToCart: (state, action: PayloadAction<CartItem>) => {
      console.log('Adding to cart:', action.payload);
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      state.lastAddedItem = { ...action.payload };
      localStorage.setItem('cartItems', JSON.stringify(state.items));
      localStorage.setItem('cartTotalPrice', state.totalPrice.toString());
      console.log('Cart updated:', state.items);
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
