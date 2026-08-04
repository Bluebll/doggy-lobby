"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { useWishlist } from "@/stores/wishlist-store"

export default function WishlistIcon({ className = "" }: { className?: string }) {
  const ids = useWishlist((s) => s.ids)
  const hasHydrated = useWishlist((s) => s.hasHydrated)
  const count = hasHydrated ? ids.length : 0

  return (
    <Link
      href="/wishlist"
      aria-label={`Wishlist (${count})`}
      className={`relative w-10 h-10 rounded-full bg-white/50 border border-white/60 shadow-sm flex items-center justify-center hover:bg-white transition-colors ${className}`}
    >
      <Heart size={16} className="text-black" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--color-brand-orange)] text-white text-[10px] font-bold flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  )
}
