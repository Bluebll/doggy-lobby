"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Heart, ShoppingBag, Trash2 } from "lucide-react"
import { useWishlist } from "@/stores/wishlist-store"
import { useCart } from "@/stores/cart-store"
import { formatPrice } from "@/lib/constants"
import type { Product } from "@/types/domain"

export default function WishlistPageClient() {
  const ids = useWishlist((s) => s.ids)
  const hasHydrated = useWishlist((s) => s.hasHydrated)
  const toggle = useWishlist((s) => s.toggle)
  const addToCart = useCart((s) => s.addItem)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!hasHydrated) return
    if (ids.length === 0) {
      setProducts([])
      setLoading(false)
      return
    }
    setLoading(true)
    fetch(`/api/products?ids=${ids.join(",")}`)
      .then((r) => r.json())
      .then((d) => setProducts(d.products || []))
      .finally(() => setLoading(false))
  }, [ids, hasHydrated])

  if (!hasHydrated || loading) {
    return <p className="text-gray-500 text-center py-20">Loading your wishlist…</p>
  }

  if (products.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-[var(--color-brand-gray)] flex items-center justify-center mx-auto mb-5">
          <Heart size={28} className="text-black/40" />
        </div>
        <h3 className="font-heading text-2xl font-extrabold text-black mb-2">Your wishlist is empty</h3>
        <p className="text-gray-500 text-sm mb-6">Save your favourites and come back anytime.</p>
        <Link href="/products" className="inline-block px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-[var(--color-brand-orange)] transition-colors">Browse products</Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((p) => (
        <div key={p.id} className="group flex flex-col bg-white rounded-[var(--radius-3xl)] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-black/5">
          <Link href={`/products/${p.slug}`} className="relative aspect-square w-full overflow-hidden bg-gray-100 block">
            {p.images?.[0] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.images[0]} alt={p.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            )}
          </Link>
          <div className="p-5 flex flex-col flex-1">
            <Link href={`/products/${p.slug}`} className="font-heading font-extrabold text-base text-black line-clamp-2 mb-2">{p.name}</Link>
            <span className="font-heading font-extrabold text-base text-black mb-4">{formatPrice(p.price)}</span>
            <div className="flex items-center gap-2 mt-auto">
              <button onClick={() => addToCart(p, 1)} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-black text-white font-semibold text-sm hover:bg-[var(--color-brand-orange)] transition-colors">
                <ShoppingBag size={14} /> Add to cart
              </button>
              <button onClick={() => toggle(p)} aria-label="Remove" className="w-10 h-10 rounded-full bg-[var(--color-brand-gray)] flex items-center justify-center hover:bg-red-100 hover:text-red-600 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
