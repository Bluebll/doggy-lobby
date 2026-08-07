"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Loader2 } from "lucide-react"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

type Product = {
  id: string
  name: string
  slug: string
  price: number
  collection: string
  image_urls: string[]
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function ProductSearch({ className = "" }: { className?: string }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([])
      setIsOpen(false)
      return
    }

    const searchTimer = setTimeout(async () => {
      setIsSearching(true)
      const term = `%${query.trim()}%`
      const { data, error } = await supabase
        .from("products")
        .select("id, name, slug, price, collection, image_urls")
        .eq("is_active", true)
        .or(`name.ilike.${term},collection.ilike.${term}`)
        .limit(5)

      if (!error && data) {
        setResults(data)
        if (data.length > 0) {
          setIsOpen(true)
        } else {
          setIsOpen(false) // Never show empty state as per requirements
        }
      }
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(searchTimer)
  }, [query])

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true)
          }}
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-orange)] focus:border-transparent focus:bg-white transition-all text-sm text-black"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {isSearching ? <Loader2 size={16} className="animate-spin text-[var(--color-brand-orange)]" /> : <Search size={16} />}
        </div>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
          {results.map((product) => (
            <button
              key={product.id}
              onClick={() => {
                setIsOpen(false)
                setQuery("")
                router.push(`/products/${product.slug}`)
              }}
              className="w-full flex items-center gap-3 p-3 hover:bg-orange-50 transition-colors border-b border-gray-50 last:border-0 text-left"
            >
              <div className="w-10 h-10 rounded-md bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200/50">
                {product.image_urls?.[0] ? (
                  <img src={product.image_urls[0]} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-100" />
                )}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold text-gray-900 truncate">{product.name}</span>
                <span className="text-xs font-semibold text-[var(--color-brand-orange)]">₹{product.price}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
