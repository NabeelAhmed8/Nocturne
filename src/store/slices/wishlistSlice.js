import { api } from '../../lib/api';

export const syncWishlistWithBackend = async (set) => {
  try {
    const wlData = await api.get('/wishlist');
    if (wlData?.products) {
      const ids = wlData.products.map((p) => p._id || p.id || p);
      set({ wishlist: ids });
    }
  } catch {
    // Keep local wishlist if endpoint fails
  }
};

export const createWishlistSlice = (set, get) => ({
  wishlist: [],

  toggleWishlist: async (productId) => {
    const exists = get().wishlist.includes(productId);
    set((state) => ({
      wishlist: exists
        ? state.wishlist.filter((id) => id !== productId)
        : [...state.wishlist, productId],
    }));

    // If user is authenticated, sync with backend
    if (get().user) {
      try {
        await api.post('/wishlist/toggle', { productId });
      } catch {
        // Keep local state on error
      }
    }
  },
});
