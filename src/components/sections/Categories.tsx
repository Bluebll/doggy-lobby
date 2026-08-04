"use client"

import { useState } from "react"
import Link from "next/link"
import type { Category } from "@/types/domain"

// Rotating gradient overlays (design token — not stored in DB)
const GRADIENTS = [
  "from-blue-500/60",
  "from-green-500/60",
  "from-amber-500/60",
  "from-red-500/60",
  "from-purple-500/60",
  "from-pink-500/60",
]

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop"

function CategoryCard({ category, gradient }: { category: Category; gradient: string }) {
  const [, setIsHovered] = useState(false)

  return (
    <Link
      href={`/categories/${category.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer block"
    >
      <img
        src={category.image_url || FALLBACK_IMAGE}
        alt={category.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className={`absolute inset-0 bg-gradient-to-t ${gradient} to-transparent opacity-70`}></div>
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="absolute inset-0 flex items-end p-6">
        <h4 className="text-white font-bold text-2xl">{category.name}</h4>
      </div>
    </Link>
  )
}

export default function Categories({ categories = [] }: { categories?: Category[] }) {
  return (
    <section id="gallery" className="py-32 bg-white scroll-mt-24">
      <div className="container mx-auto px-6 text-center mb-20">
        <h2 className="text-orange-500 font-bold text-sm mb-4">SHOP BY CATEGORY</h2>
        <h3 className="text-5xl font-bold text-black">Curated for your best friend.</h3>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, i) => (
            <CategoryCard key={category.id} category={category} gradient={GRADIENTS[i % GRADIENTS.length]} />
          ))}
        </div>
      </div>
    </section>
  )
}
