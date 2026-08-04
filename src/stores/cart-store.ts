"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem, Product } from "@/types/domain"

interface CartState {
  items: CartItem[]
  isOpen: boolean
  hasHydrated: boolean
  addItem: (product: Product, qty?: number) => void
  removeItem: (productId: string) => void
  updateQty: (productId: string, qty: number) => void
  clear: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  count: () => number
  subtotal: () => number
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      hasHydrated: false,

      addItem: (product, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.product_id === product.id)
          const items = existing
            ? s.items.map((i) => (i.product_id === product.id ? { ...i, qty: i.qty + qty } : i))
            : [
                ...s.items,
                {
                  product_id: product.id,
                  name: product.name,
                  price: Number(product.price),
                  qty,
                  image: product.images?.[0],
                  slug: product.slug,
                },
              ]
          return { items, isOpen: true }
        }),

      removeItem: (productId) => set((s) => ({ items: s.items.filter((i) => i.product_id !== productId) })),

      updateQty: (productId, qty) =>
        set((s) => ({
          items: qty <= 0
            ? s.items.filter((i) => i.product_id !== productId)
            : s.items.map((i) => (i.product_id === productId ? { ...i, qty } : i)),
        })),

      clear: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      count: () => get().items.reduce((n, i) => n + i.qty, 0),
      subtotal: () => get().items.reduce((n, i) => n + i.price * i.qty, 0),
    }),
    {
      name: "doggy-lobby-cart",
      partialize: (s) => ({ items: s.items }),
      onRehydrateStorage: () => (state) => {
        state?.hasHydrated && state
        // mark hydrated so UI can safely read count without SSR mismatch
        useCart.setState({ hasHydrated: true })
      },
    }
  )
)
