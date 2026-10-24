import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createCartSlice } from './slices/cartSlice';
import { createWishlistSlice } from './slices/wishlistSlice';
import { createAuthSlice } from './slices/authSlice';
import { createProductSlice } from './slices/productSlice';

export const useStore = create(
  persist(
    (set, get) => ({
      ...createCartSlice(set, get),
      ...createWishlistSlice(set, get),
      ...createAuthSlice(set, get),
      ...createProductSlice(set, get),
    }),
    {
      name: 'nocturne-storage',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        user: state.user,
      }),
    }
  )
);

export default useStore;
