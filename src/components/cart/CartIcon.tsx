"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "@/stores/cart-store"
import { useCartUI } from "./CartDrawer"
import { useEffect, useState } from "react"

export default function CartIcon({ className = "" }: { className?: string }) {
  const openCart = useCartUI((s) => s.openCart)
  const items = useCart((s) => s.items)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => setMounted(true), [])
  const count = mounted ? items.reduce((n, i) => n + i.quantity, 0) : 0

  return (
    <button
      onClick={openCart}
      aria-label={`Open cart (${count} item${count === 1 ? "" : "s"})`}
      className={`relative w-10 h-10 rounded-full bg-white/50 border border-white/60 shadow-sm flex items-center justify-center hover:bg-white transition-colors ${className}`}
    >
      <ShoppingBag size={16} className="text-black" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--color-brand-orange)] text-white text-[10px] font-bold flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  )
}
