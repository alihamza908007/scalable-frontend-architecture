import { useAuthStore } from "@/shared/store/auth-store";
import { User } from "../types";

export const useAuth = () => {
  const { user, token, isAuthenticated, setAuth, clearAuth } = useAuthStore();

  const login = (user: User, token: string) => {
    setAuth(user, token);
  };

  const logout = () => {
    clearAuth();
  };

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
  };
};
