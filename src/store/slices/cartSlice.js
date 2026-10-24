export const createCartSlice = (set, get) => ({
  cart: [],

  addToCart: (product, size, color, quantity = 1) => {
    const id = product._id || product.id;
    const cartId = `${id}-${size}-${color}`;
    const existing = get().cart.find((item) => item.cartId === cartId);

    set((state) => {
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.cartId === cartId ? { ...item, quantity: item.quantity + quantity } : item
          ),
        };
      }
      return {
        cart: [...state.cart, { ...product, id, cartId, selectedSize: size, selectedColor: color, quantity }],
      };
    });
  },

  updateQuantity: (cartId, delta) => {
    set((state) => ({
      cart: state.cart
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean),
    }));
  },

  removeFromCart: (cartId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.cartId !== cartId),
    }));
  },

  clearCart: () => set({ cart: [] }),
});
