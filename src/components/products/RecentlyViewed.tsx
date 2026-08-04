"use client"

import Link from "next/link"
import { useRecentlyViewed } from "@/stores/recently-viewed-store"
import { formatPrice } from "@/lib/constants"

export default function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const items = useRecentlyViewed((s) => s.items)
  const hasHydrated = useRecentlyViewed((s) => s.hasHydrated)
  const list = hasHydrated ? items.filter((p) => p.id !== excludeId) : []

  if (list.length === 0) return null

  return (
    <div className="mt-24">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-[2px] bg-[var(--color-brand-orange)]"></div>
        <h2 className="text-[var(--color-brand-orange)] font-bold tracking-widest uppercase text-xs">Recently viewed</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {list.slice(0, 4).map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.slug}`}
            className="group flex flex-col bg-white rounded-[var(--radius-3xl)] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-black/5"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
              {p.images?.[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.images[0]} alt={p.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              )}
            </div>
            <div className="p-5">
              <h4 className="font-heading font-extrabold text-base text-black line-clamp-2 mb-1">{p.name}</h4>
              <span className="font-heading font-extrabold text-base text-black">{formatPrice(p.price)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
