import { create } from 'zustand';

interface AuthStore {
  token: string | null;
  user: any;
  login: (token: string, user: any) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  token: null,
  user: null,
  login: (token: string, user: any) => set({ token, user }),
  logout: () => set({ token: null, user: null }),
  isAuthenticated: () => !!get().token,
}));
