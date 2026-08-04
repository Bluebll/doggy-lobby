"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/types/domain"

const MAX = 8

interface RecentlyViewedState {
  items: Product[]
  hasHydrated: boolean
  add: (product: Product) => void
  clear: () => void
}

export const useRecentlyViewed = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      items: [],
      hasHydrated: false,
      add: (product) =>
        set((s) => {
          const filtered = s.items.filter((p) => p.id !== product.id)
          return { items: [product, ...filtered].slice(0, MAX) }
        }),
      clear: () => set({ items: [] }),
    }),
    {
      name: "doggy-lobby-recently-viewed",
      partialize: (s) => ({ items: s.items }),
      onRehydrateStorage: () => () => {
        useRecentlyViewed.setState({ hasHydrated: true })
      },
    }
  )
)
