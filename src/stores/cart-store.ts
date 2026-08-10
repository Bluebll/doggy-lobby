import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  stock: number
}

interface CartStore {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  decreaseQuantity: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id)
          if (existing) {
            const addedQty = item.quantity || 1
            if (existing.quantity >= existing.stock) {
              return state // Cannot exceed stock
            }
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: Math.min(i.stock, i.quantity + addedQty) } : i
              ),
            }
          }
          // Default stock if missing from older carts, though new additions will have it
          return { items: [...state.items, { ...item, quantity: item.quantity || 1, stock: item.stock ?? 999 }] }
        }),
      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      decreaseQuantity: (id) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === id)
          if (existing && existing.quantity > 1) {
            return {
              items: state.items.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity - 1 } : i
              ),
            }
          } else if (existing && existing.quantity === 1) {
            return {
              items: state.items.filter((i) => i.id !== id),
            }
          }
          return { items: state.items }
        }),
      updateQuantity: (id, quantity) =>
        set((state) => {
          return {
            items: state.items.map((i) => {
              if (i.id === id) {
                const newQuantity = Math.max(1, Math.min(quantity, i.stock))
                return { ...i, quantity: newQuantity }
              }
              return i
            }),
          }
        }),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-store' }
  )
)
