import { create } from "zustand";
import { api } from "../api/client";

type User = {
  id: string;
  email: string;
  role: "UP" | "DOWN";
};

type AuthState = {
  token: string | null;
  user: User | null;
  loading: boolean;

  setToken: (token: string) => void;
  fetchMe: () => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: null,
  loading: false,

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  fetchMe: async () => {
    try {
      const res = await api.get("/auth/me");
      set({ user: res.data.user });
    } catch (err) {
      localStorage.removeItem("token");
      set({ token: null, user: null });
      throw err;
    }
  },


  checkAuth: async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      set({ loading: false });
      return;
    }

    try {
      const res = await api.get("/auth/me");
      set({ user: res.data.user, loading: false });
    } catch {
      localStorage.removeItem("token");
      set({ user: null, token: null, loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  }
}));
