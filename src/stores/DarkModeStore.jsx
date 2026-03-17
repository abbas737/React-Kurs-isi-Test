import { create } from 'zustand'
import { persist } from 'zustand/middleware'
 
export const useDarkmode = create(persist(
  (set) => ({
    isDarkmodeActive: false,
    toggleDarkmode: () => set((state) => ({ isDarkmodeActive: !state.isDarkmodeActive })),
  }), {name: "darkmode"}
))
 
 