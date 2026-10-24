import { api } from '../../lib/api';
import { syncWishlistWithBackend } from './wishlistSlice';

export const createAuthSlice = (set, get) => ({
  user: null,

  setUser: (userData) => set({ user: userData }),

  // Verify active user session with backend
  verifyAuth: async () => {
    const currentUser = get().user;
    if (!currentUser?.token) return;

    try {
      const data = await api.get('/auth/profile');
      if (data?.user) {
        set({
          user: { ...currentUser, ...data.user },
          isServerOnline: true,
        });
        await syncWishlistWithBackend(set);
      }
    } catch (error) {
      console.warn('Session verification failed (server offline or invalid token):', error.message);
      set({
        user: null,
        isServerOnline: false,
      });
    }
  },

  loginUser: async (email, password) => {
    try {
      const data = await api.post('/auth/login', { email, password });
      if (data?.requireVerification) {
        return {
          success: true,
          requireVerification: true,
          email: data.email || email,
          message: data.message,
        };
      }
      if (data?.user) {
        set({ user: data.user, isServerOnline: true });
        await syncWishlistWithBackend(set);
        return { success: true, user: data.user };
      }
      return { success: false, message: 'Invalid credentials' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  registerUser: async (name, email, password, phone = '') => {
    try {
      const data = await api.post('/auth/register', { name, email, password, phone });
      if (data?.requireVerification) {
        return {
          success: true,
          requireVerification: true,
          email: data.email || email,
          message: data.message,
        };
      }
      if (data?.user) {
        set({ user: data.user, isServerOnline: true });
        return { success: true, user: data.user };
      }
      return { success: false, message: 'Invalid registration response' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  verifyEmailToken: async (token) => {
    try {
      const data = await api.post('/auth/verify-email', { token });
      if (data?.user) {
        set({ user: data.user, isServerOnline: true });
        await syncWishlistWithBackend(set);
        return { success: true, user: data.user, message: data.message };
      }
      return { success: false, message: data?.message || 'Verification failed' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  verifyLoginToken: async (token) => {
    try {
      const data = await api.post('/auth/verify-login', { token });
      if (data?.user) {
        set({ user: data.user, isServerOnline: true });
        await syncWishlistWithBackend(set);
        return { success: true, user: data.user, message: data.message };
      }
      return { success: false, message: data?.message || 'Sign in verification failed' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  resendVerificationLink: async (email, type = 'signup') => {
    try {
      const data = await api.post('/auth/resend-verification', { email, type });
      return { success: true, message: data?.message || 'Verification link resent successfully' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  updateUserProfile: async (userData) => {
    try {
      const data = await api.put('/auth/profile', userData);
      if (data?.user) {
        const currentUser = get().user;
        set({ user: { ...currentUser, ...data.user } });
        return { success: true, user: data.user };
      }
      return { success: false, message: 'Failed to update profile' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  updatePassword: async (password) => {
    try {
      const data = await api.put('/auth/profile', { password });
      if (data?.user) {
        const currentUser = get().user;
        set({ user: { ...currentUser, ...data.user } });
        return { success: true, message: 'Password updated successfully' };
      }
      return { success: false, message: data?.message || 'Failed to update password' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
});
