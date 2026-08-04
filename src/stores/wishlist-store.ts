"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/types/domain"

interface WishlistState {
  ids: string[]
  hasHydrated: boolean
  toggle: (product: Product) => void
  has: (id: string) => boolean
  clear: () => void
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      hasHydrated: false,
      toggle: (product) =>
        set((s) =>
          s.ids.includes(product.id)
            ? { ids: s.ids.filter((x) => x !== product.id) }
            : { ids: [...s.ids, product.id] }
        ),
      has: (id) => get().ids.includes(id),
      clear: () => set({ ids: [] }),
    }),
    {
      name: "doggy-lobby-wishlist",
      partialize: (s) => ({ ids: s.ids }),
      onRehydrateStorage: () => () => {
        useWishlist.setState({ hasHydrated: true })
      },
    }
  )
)
