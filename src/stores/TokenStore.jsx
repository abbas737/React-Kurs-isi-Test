import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTokens = create(
  persist(
    (set) => ({
      accessToken: "",
      refreshToken: "",
      loading: false,

      setLoading: (loadingState) => set({ loading: loadingState }),
      setAccessToken: (token) => set({ accessToken: token }),
      setRefreshToken: (token) => set({ refreshToken: token }),
      clearTokens: () => set({ accessToken: "", refreshToken: "" }),
    }),
    { name: "auth-storage" }
  )
);