"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import { getSupabaseServer } from "@/lib/supabase/server"

type Product = {
  name: string;
  brand: string;
  desc: string;
  price: string;
  image: string;
  tag: string;
  category: string;
};

function ProductCard({ product }: { product: Product }) {
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
  const [displayProducts, setDisplayProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const supabase = await getSupabaseServer()
        if (supabase) {
          const { data } = await supabase.from('products').select('id, name, description, price, image_urls, is_active').eq('is_active', true)
          if (data && data.length > 0) {
            setDisplayProducts(data.map((p: {
              id: string;
              name: string;
              description: string | null;
              price: number | string;
              image_urls: string[] | null;
              is_active: boolean;
            }) => ({
              name: p.name,
              brand: "Doggy Lobby",
              desc: p.description || "",
              price: `₹${p.price}`,
              image: p.image_urls?.[0] || "",
              tag: "",
              category: "Products"
            })))
          }
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchProducts()
  }, [])

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
        {displayProducts.length === 0 ? (
          <div className="pb-16 pr-6 md:pr-12 text-gray-500 font-medium">
            No featured products available at the moment. Check back soon!
          </div>
        ) : (
          <div 
            className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-16 pr-6 md:pr-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
          >
            {displayProducts.map((product, idx) => (
              <div key={idx} className="snap-center md:snap-start shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
