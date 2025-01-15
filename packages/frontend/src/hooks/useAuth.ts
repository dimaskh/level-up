import { create } from 'zustand';
import { api } from '@/lib/api';

interface AuthState {
  hero: any | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, heroName: string, password: string) => Promise<void>;
  signInWithGoogle: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
}

export const useAuth = create<AuthState>((set, get) => ({
  hero: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  signIn: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.post('/auth/signin', { email, password });
      set({
        hero: response.data.hero,
        accessToken: response.data.tokens.accessToken,
        refreshToken: response.data.tokens.refreshToken,
        isAuthenticated: true,
      });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Sign in failed' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (email: string, heroName: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.post('/auth/signup', {
        email,
        heroName,
        password,
      });
      set({
        hero: response.data.hero,
        accessToken: response.data.tokens.accessToken,
        refreshToken: response.data.tokens.refreshToken,
        isAuthenticated: true,
      });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Sign up failed' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signInWithGoogle: async (token: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.post('/auth/social', {
        token,
        provider: 'google',
      });
      set({
        hero: response.data.hero,
        accessToken: response.data.tokens.accessToken,
        refreshToken: response.data.tokens.refreshToken,
        isAuthenticated: true,
      });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Google sign in failed' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true, error: null });
      await api.post('/auth/logout');
      set({
        hero: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Sign out failed' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  refreshAccessToken: async () => {
    try {
      const refreshToken = get().refreshToken;
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post('/auth/refresh', { refreshToken });
      set({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
    } catch (error: any) {
      set({
        hero: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        error: error.response?.data?.message || 'Token refresh failed',
      });
      throw error;
    }
  },
}));
