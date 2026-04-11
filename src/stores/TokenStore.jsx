import { create } from 'zustand'
import { persist } from 'zustand/middleware'


export const useTokens = create(persist(
    (set) => ({
        accessToken: "",
        refreshToken: "",
        role: "",
        loading: false,
        setLoading: (loadingState) => set((state) => ({ ...state, loading: loadingState })),
        setAccessToken: (token) => set((state) => ({ ...state, accessToken: token })),
        setRefreshToken: (token) => set((state) => ({ ...state, refreshToken: token })),
         setRole: (role) => set((state) => ({ ...state, role })),
        clearTokens: () => set((state) => ({ ...state, accessToken: "", refreshToken: "", role: "" })),
    }), { name: "auth-storage" }
))

