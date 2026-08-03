"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const categories = [
  { name: "Dog Food", image: "https://images.pexels.com/photos/8473516/pexels-photo-8473516.jpeg?auto=compress&cs=tinysrgb&w=800", color: "from-blue-500/60" },
  { name: "Cat Food", image: "https://images.unsplash.com/photo-1580238169544-86bf7cd8c84c?q=80&w=800&auto=format&fit=crop", color: "from-green-500/60" },
  { name: "Toys", image: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?q=80&w=800&auto=format&fit=crop", color: "from-amber-500/60" },
  { name: "Treats", image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?q=80&w=800&auto=format&fit=crop", color: "from-red-500/60" },
]

function CategoryCard({ category }: { category: typeof categories[0] }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
    >
      <img 
        src={category.image} 
        alt={category.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className={`absolute inset-0 bg-gradient-to-t ${category.color} to-transparent opacity-70`}></div>
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="absolute inset-0 flex items-end p-6">
        <h4 className="text-white font-bold text-2xl">{category.name}</h4>
      </div>
    </div>
  )
}

export default function Categories() {
  return (
    <section id="gallery" className="py-32 bg-white scroll-mt-24">
      <div className="container mx-auto px-6 text-center mb-20">
        <h2 className="text-orange-500 font-bold text-sm mb-4">SHOP BY CATEGORY</h2>
        <h3 className="text-5xl font-bold text-black">Curated for your best friend.</h3>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, i) => (
            <CategoryCard key={i} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}
