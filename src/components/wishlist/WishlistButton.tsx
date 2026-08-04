"use client"

import { Heart } from "lucide-react"
import { useWishlist } from "@/stores/wishlist-store"
import type { Product } from "@/types/domain"

export default function WishlistButton({
  product,
  size = "sm",
  className = "",
}: {
  product: Product
  size?: "sm" | "md"
  className?: string
}) {
  const toggle = useWishlist((s) => s.toggle)
  const ids = useWishlist((s) => s.ids)
  const hasHydrated = useWishlist((s) => s.hasHydrated)
  const active = hasHydrated && ids.includes(product.id)
  const dim = size === "sm" ? "w-9 h-9" : "w-11 h-11"
  const iconSize = size === "sm" ? 14 : 18

  const handle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(product)
  }

  return (
    <button
      onClick={handle}
      aria-label={active ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      className={`${dim} rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
        active
          ? "bg-[var(--color-brand-orange)] text-white shadow-md"
          : "bg-white/90 text-black hover:bg-white"
      } ${className}`}
    >
      <Heart size={iconSize} className={active ? "fill-current" : ""} />
    </button>
  )
}
