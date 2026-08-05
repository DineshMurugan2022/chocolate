import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types';

export interface AuthState {
  user: User | null;
  isAuthModalOpen: boolean;
}

const initialState: AuthState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  isAuthModalOpen: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.removeItem('token'); // Clean up old tokens if they exist
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    openAuthModal: (state) => {
      state.isAuthModalOpen = true;
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },
  },
});

export const { setCredentials, logout, openAuthModal, closeAuthModal } = authSlice.actions;
export default authSlice.reducer;
