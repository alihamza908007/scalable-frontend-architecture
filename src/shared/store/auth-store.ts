import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";

interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

const cookieStorage = {
  getItem: (key: string) => Cookies.get(key) || null,
  setItem: (key: string, value: string) => {
    Cookies.set(key, value, { expires: 7 });
    return undefined;
  },
  removeItem: (key: string) => {
    Cookies.remove(key);
    return undefined;
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        Cookies.set("auth-token", token, { expires: 7 });
        set({ user, token, isAuthenticated: true });
      },
      clearAuth: () => {
        Cookies.remove("auth-token");
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => cookieStorage),
    },
  ),
);
