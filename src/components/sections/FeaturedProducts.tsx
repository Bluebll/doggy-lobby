"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"

const products = [
  { 
    name: "Premium Wagyu Dog Treats", 
    brand: "Hokkaido Farms",
    desc: "Air-dried to preserve raw nutrients and rich flavor.",
    price: "₹1,299", 
    image: "https://images.unsplash.com/photo-1582798358481-d199fb7347bb?q=80&w=800&auto=format&fit=crop", 
    tag: "Bestseller", 
    category: "Treats" 
  },
  { 
    name: "Orthopedic Memory Foam Bed", 
    brand: "SleepyPaws",
    desc: "Engineered for joint relief and deep REM sleep.",
    price: "₹4,499", 
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800&auto=format&fit=crop", 
    tag: "New", 
    category: "Beds" 
  },
  { 
    name: "Grain-Free Salmon Feast", 
    brand: "WildCatch",
    desc: "Rich in Omega-3s for a glowing, healthy coat.",
    price: "₹2,199", 
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=800&auto=format&fit=crop", 
    tag: "", 
    category: "Food" 
  },
  { 
    name: "Indestructible Chew Toy", 
    brand: "ToughBite",
    desc: "Medical-grade rubber that withstands the toughest jaws.",
    price: "₹899", 
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=800&auto=format&fit=crop", 
    tag: "", 
    category: "Toys" 
  },
  { 
    name: "Ceramic Slow Feeder Bowl", 
    brand: "ZenPet",
    desc: "Promotes healthy digestion and prevents bloating.",
    price: "₹1,499", 
    image: "https://images.unsplash.com/photo-1623387641177-e8a49c0b471c?q=80&w=800&auto=format&fit=crop", 
    tag: "Trending", 
    category: "Accessories" 
  },
]

function ProductCard({ product }: { product: typeof products[0] }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div 
      className="w-[300px] md:w-[400px] h-[550px] md:h-[600px] flex flex-col group cursor-pointer bg-white rounded-[var(--radius-3xl)] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-black/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-[55%] w-full overflow-hidden bg-gray-100">
        {product.tag && (
          <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-black shadow-sm">
            {product.tag}
          </div>
        )}
        
        <motion.img 
          src={product.image} 
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover z-10"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      
      {/* Content Container */}
      <div className="flex flex-col flex-1 p-6 md:p-8 bg-white relative">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[var(--color-brand-orange)] text-xs font-bold tracking-widest uppercase">{product.brand}</p>
          <p className="text-gray-400 text-xs font-semibold tracking-wider uppercase">{product.category}</p>
        </div>
        
        <h4 className="font-heading font-extrabold text-xl md:text-2xl text-black leading-snug mb-3">
          {product.name}
        </h4>
        
        <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-auto line-clamp-2">
          {product.desc}
        </p>
        
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
          <p className="font-heading font-extrabold text-2xl text-black">{product.price}</p>
          
          <button 
            className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-[var(--color-brand-orange)] transition-colors duration-300"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function FeaturedProducts() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current || !textRef.current) return

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      animation: gsap.fromTo(textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
    })

    return () => {
      st.kill()
    }
  }, [])

  return (
    <section ref={containerRef} className="bg-[var(--color-brand-gray)] overflow-hidden py-24 md:py-32 relative z-10">
      <div ref={textRef} className="container mx-auto px-6 md:px-12 mb-12 md:mb-16 relative z-20">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-[2px] bg-[var(--color-brand-orange)]"></div>
          <h2 className="text-[var(--color-brand-orange)] font-bold tracking-widest uppercase text-xs">Featured Selection</h2>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-black max-w-2xl leading-tight md:leading-[1.1]">
            The finest goods for the finest companions.
          </h3>
          <p className="text-gray-500 font-medium hidden md:block max-w-xs text-right">
            Drag to explore our curated selection of global pet luxury.
          </p>
        </div>
      </div>

      {/* Native Horizontal Scroll Carousel */}
      <div className="w-full pl-6 md:pl-12">
        <div 
          className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-16 pr-6 md:pr-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
        >
          {products.map((product, idx) => (
            <div key={idx} className="snap-center md:snap-start shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
