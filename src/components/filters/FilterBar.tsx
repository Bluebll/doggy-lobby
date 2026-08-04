"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { SlidersHorizontal, X } from "lucide-react"
import { formatPrice } from "@/lib/constants"

interface Props {
  brands: string[]
  minPrice: number
  maxPrice: number
}

export default function FilterBar({ brands, minPrice, maxPrice }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const sp = useSearchParams()

  const [open, setOpen] = useState(false)
  const [brand, setBrand] = useState(sp.get("brand") || "")
  const [min, setMin] = useState(sp.get("min") || "")
  const [max, setMax] = useState(sp.get("max") || "")
  const [sort, setSort] = useState(sp.get("sort") || "new")

  useEffect(() => {
    setBrand(sp.get("brand") || "")
    setMin(sp.get("min") || "")
    setMax(sp.get("max") || "")
    setSort(sp.get("sort") || "new")
  }, [sp])

  const apply = () => {
    const params = new URLSearchParams(sp.toString())
    brand ? params.set("brand", brand) : params.delete("brand")
    min ? params.set("min", min) : params.delete("min")
    max ? params.set("max", max) : params.delete("max")
    sort && sort !== "new" ? params.set("sort", sort) : params.delete("sort")
    router.push(`${pathname}?${params.toString()}`)
    setOpen(false)
  }

  const clear = () => {
    const params = new URLSearchParams(sp.toString())
    params.delete("brand"); params.delete("min"); params.delete("max"); params.delete("sort")
    router.push(`${pathname}?${params.toString()}`)
  }

  const activeCount = [brand, min, max, sort !== "new" ? sort : ""].filter(Boolean).length

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-black text-white text-sm font-semibold hover:bg-[var(--color-brand-orange)] transition-colors"
        >
          <SlidersHorizontal size={14} /> Filters
          {activeCount > 0 && (
            <span className="ml-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--color-brand-orange)] text-white text-[10px] font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>

        <select
          value={sort}
          onChange={(e) => {
            const params = new URLSearchParams(sp.toString())
            e.target.value === "new" ? params.delete("sort") : params.set("sort", e.target.value)
            router.push(`${pathname}?${params.toString()}`)
          }}
          className="px-4 py-2.5 rounded-full bg-[var(--color-brand-gray)] text-sm font-semibold text-black outline-none cursor-pointer"
        >
          <option value="new">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name: A–Z</option>
        </select>

        {activeCount > 0 && (
          <button onClick={clear} className="text-sm text-gray-500 hover:text-black inline-flex items-center gap-1">
            <X size={14} /> Clear
          </button>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-[210] flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-full md:max-w-md bg-white rounded-t-3xl md:rounded-3xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-heading text-xl font-extrabold text-black">Filters</h3>
              <button onClick={() => setOpen(false)} className="w-9 h-9 rounded-full bg-[var(--color-brand-gray)] flex items-center justify-center hover:bg-black hover:text-white transition-colors" aria-label="Close">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 inline-block">Brand</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[var(--color-brand-gray)] focus:bg-white focus:ring-2 focus:ring-black outline-none text-sm"
                >
                  <option value="">All brands</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 inline-block">
                  Price ({formatPrice(minPrice)}–{formatPrice(maxPrice)})
                </label>
                <div className="flex gap-2">
                  <input
                    type="number" inputMode="numeric" placeholder="Min"
                    value={min} onChange={(e) => setMin(e.target.value)}
                    className="w-1/2 px-4 py-3 rounded-2xl bg-[var(--color-brand-gray)] focus:bg-white focus:ring-2 focus:ring-black outline-none text-sm"
                  />
                  <input
                    type="number" inputMode="numeric" placeholder="Max"
                    value={max} onChange={(e) => setMax(e.target.value)}
                    className="w-1/2 px-4 py-3 rounded-2xl bg-[var(--color-brand-gray)] focus:bg-white focus:ring-2 focus:ring-black outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={clear} className="flex-1 py-3 rounded-full bg-[var(--color-brand-gray)] font-semibold text-sm text-black hover:bg-gray-200">Reset</button>
              <button onClick={apply} className="flex-1 py-3 rounded-full bg-black text-white font-semibold text-sm hover:bg-[var(--color-brand-orange)] transition-colors">Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
