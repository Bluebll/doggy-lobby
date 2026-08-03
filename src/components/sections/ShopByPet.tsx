"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCursor } from "@/components/ui/CursorProvider"
import { ArrowRight } from "lucide-react"

const pets = [
  {
    id: "dogs",
    title: "Dogs",
    description: "Premium nutrition and tough toys.",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=800&auto=format&fit=crop",
    color: "from-amber-600/60"
  },
  {
    id: "cats",
    title: "Cats",
    description: "Finicky felines deserve the best.",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=800&auto=format&fit=crop",
    color: "from-zinc-600/60"
  },
  {
    id: "puppies",
    title: "Puppies",
    description: "Start their journey right.",
    image: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=800&auto=format&fit=crop",
    color: "from-orange-500/60"
  },
  {
    id: "kittens",
    title: "Kittens",
    description: "Tiny treats for tiny teeth.",
    image: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=800&auto=format&fit=crop",
    color: "from-rose-500/60"
  }
]

export default function ShopByPet() {
  const { setCursorVariant, setCursorText } = useCursor()

  const handleMouseEnter = () => {
    setCursorVariant("explore")
    setCursorText("Shop")
  }

  const handleMouseLeave = () => {
    setCursorVariant("default")
    setCursorText("")
  }

  return (
    <section className="py-24 md:py-32 bg-black relative z-20">
      <div className="container mx-auto px-6 md:px-12 text-center mb-20">
        <h2 className="text-[var(--color-brand-orange)] font-bold tracking-widest uppercase text-sm mb-4 flex items-center justify-center gap-2">
          <span className="w-8 h-[2px] bg-[var(--color-brand-orange)]"></span>
          Tailored For Them
          <span className="w-8 h-[2px] bg-[var(--color-brand-orange)]"></span>
        </h2>
        <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
          Shop by Pet
        </h3>
      </div>

      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pets.map((pet, idx) => (
            <PetCard key={pet.id} pet={pet} index={idx} onEnter={handleMouseEnter} onLeave={handleMouseLeave} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PetCard({ pet, index, onEnter, onLeave }: { pet: typeof pets[0], index: number, onEnter: () => void, onLeave: () => void }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => {
        setIsHovered(true)
        onEnter()
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        onLeave()
      }}
      className="relative h-[400px] md:h-[500px] rounded-[var(--radius-3xl)] overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-700"
    >
      <div className="absolute inset-0 bg-[#111] z-0">
        <AnimatePresence initial={false}>
          {isHovered ? (
            <motion.img 
              key="hover-image"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.8, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              src={pet.hoverImage}
              alt={`${pet.title} hovering`}
              className="absolute inset-0 w-full h-full object-cover mix-blend-lighten"
            />
          ) : (
            <motion.img 
              key="base-image"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.6, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              src={pet.image}
              alt={pet.title}
              className="absolute inset-0 w-full h-full object-cover mix-blend-lighten"
            />
          )}
        </AnimatePresence>
        
        <div className={`absolute inset-0 bg-gradient-to-t ${pet.color} to-transparent mix-blend-multiply opacity-50 group-hover:opacity-80 transition-opacity duration-700`}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      </div>
      
      <div className="absolute inset-x-8 bottom-8 z-10 flex flex-col justify-end">
        <h4 className="text-white font-heading font-extrabold text-3xl mb-2 group-hover:-translate-y-2 transition-transform duration-500 ease-out">
          {pet.title}
        </h4>
        
        <div className="overflow-hidden">
          <p className="text-white/60 text-sm mb-4 transform group-hover:-translate-y-2 transition-transform duration-500 ease-out delay-75">
            {pet.description}
          </p>
        </div>

        <div className="overflow-hidden">
          <div className="flex items-center gap-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100 delay-150">
            <span className="text-white font-bold text-sm">Shop Collection</span>
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
