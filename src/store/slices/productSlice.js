import { api } from '../../lib/api';

export const createProductSlice = (set, get) => ({
  products: [],
  isLoadingProducts: false,
  productError: null,
  searchQuery: '',
  selectedCategory: 'all',
  isServerOnline: true,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  checkServerHealth: async () => {
    const isOnline = await api.checkHealth();
    set({ isServerOnline: isOnline });
    return isOnline;
  },

  fetchProducts: async (category = 'all', search = '') => {
    const currentProducts = get().products || [];
    if (currentProducts.length === 0) {
      set({ isLoadingProducts: true });
    }
    set({ productError: null });

    try {
      let endpoint = '/products';
      const params = new URLSearchParams();
      if (category && category !== 'all') params.append('category', category);
      if (search && search.trim()) params.append('search', search.trim());
      if (params.toString()) endpoint += `?${params.toString()}`;

      const data = await api.get(endpoint);
      set({
        products: data.products || [],
        isLoadingProducts: false,
        productError: null,
        isServerOnline: true,
      });
    } catch (error) {
      console.error('Error fetching garments from backend:', error.message);
      set({
        products: [],
        isLoadingProducts: false,
        productError: error.message,
        isServerOnline: false,
      });
    }
  },

  createBackendOrder: async (orderData) => {
    try {
      const data = await api.post('/orders', orderData);
      return { success: true, order: data.order };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  submitProductReview: async (productId, reviewData) => {
    try {
      const data = await api.post(`/products/${productId}/reviews`, reviewData);
      if (data?.success) {
        set((state) => ({
          products: state.products.map((p) =>
            String(p._id || p.id) === String(productId) ? { ...p, ...data.product } : p
          ),
        }));
        return { success: true, product: data.product, review: data.review };
      }
      return { success: false, message: 'Review submission failed' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
});
