"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Search, X, Loader2 } from "lucide-react"
import { formatPrice } from "@/lib/constants"

interface SearchResult {
  id: string
  slug: string
  name: string
  price: number
  images: string[] | null
}

export default function SearchBar() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  useEffect(() => {
    if (!open) return
    if (debRef.current) clearTimeout(debRef.current)
    if (!q.trim()) { setResults([]); setLoading(false); return }
    setLoading(true)
    debRef.current = setTimeout(async () => {
      try {
        const r = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=8`)
        const d = await r.json()
        setResults(d.products || [])
      } finally {
        setLoading(false)
      }
    }, 250)
  }, [q, open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Search products"
        className="w-10 h-10 rounded-full bg-white/50 border border-white/60 shadow-sm flex items-center justify-center hover:bg-white transition-colors"
      >
        <Search size={16} className="text-black" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[210] flex items-start justify-center pt-20 md:pt-24 px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-black/5">
              <Search size={18} className="text-gray-400" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search food, treats, toys, brands…"
                className="flex-1 bg-transparent outline-none text-base placeholder:text-gray-400"
              />
              {loading && <Loader2 size={16} className="animate-spin text-gray-400" />}
              <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full bg-[var(--color-brand-gray)] flex items-center justify-center hover:bg-black hover:text-white transition-colors" aria-label="Close search">
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {q.trim() && !loading && results.length === 0 && (
                <p className="px-5 py-10 text-center text-sm text-gray-500">No products match “{q}”.</p>
              )}
              {results.length > 0 && (
                <ul className="divide-y divide-black/5">
                  {results.map((r) => (
                    <li key={r.id}>
                      <Link
                        href={`/products/${r.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-4 px-5 py-3 hover:bg-[var(--color-brand-gray)]"
                      >
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[var(--color-brand-gray)] shrink-0">
                          {r.images?.[0] && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={r.images[0]} alt={r.name} className="absolute inset-0 w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-heading font-bold text-sm text-black line-clamp-1">{r.name}</p>
                          <p className="text-[var(--color-brand-orange)] font-bold text-sm">{formatPrice(r.price)}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {q.trim() && results.length > 0 && (
                <div className="px-5 py-3 border-t border-black/5">
                  <Link
                    href={`/products?q=${encodeURIComponent(q)}`}
                    onClick={() => setOpen(false)}
                    className="text-sm font-semibold text-[var(--color-brand-orange)] hover:underline"
                  >
                    See all results →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
