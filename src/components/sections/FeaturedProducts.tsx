"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import type { Product } from "@/types/domain"
import { formatPrice } from "@/lib/constants"
import AddToCartButton from "@/components/cart/AddToCartButton"
import WishlistButton from "@/components/wishlist/WishlistButton"
import { site } from "@/config/site"

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1601758260908-9dd6c47ffbfe?q=80&w=800&auto=format&fit=crop"

function productTag(p: Product): string {
  if (p.is_best_seller) return "Bestseller"
  if (p.is_on_offer) return "Offer"
  if (p.is_featured) return "Featured"
  return ""
}

function productBrand(p: Product): string {
  const brand = (p.attributes as { brand?: string })?.brand
  return brand ?? site.name
}

function productCategory(p: Product): string {
  const c = (p.attributes as { category?: string })?.category
  return c ?? ""
}

function ProductCard({ product }: { product: Product }) {
  const tag = productTag(product)
  const image = product.images?.[0] || FALLBACK_IMAGE

  return (
    <Link href={`/products/${product.slug}`} className="block">
      <motion.div
        className="w-[300px] md:w-[400px] h-[550px] md:h-[600px] flex flex-col group cursor-pointer bg-white rounded-[var(--radius-3xl)] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-black/5"
      >
        {/* Image Container */}
        <div className="relative h-[55%] w-full overflow-hidden bg-gray-100">
          {tag && (
            <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-black shadow-sm">
              {tag}
            </div>
          )}
          <div className="absolute top-4 right-4 z-20">
            <WishlistButton product={product} />
          </div>

          <img
            src={image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover z-10"
          />
        </div>

        {/* Content Container */}
        <div className="flex flex-col flex-1 p-6 md:p-8 bg-white relative">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[var(--color-brand-orange)] text-xs font-bold tracking-widest uppercase">{productBrand(product)}</p>
            {productCategory(product) && (
              <p className="text-gray-400 text-xs font-semibold tracking-wider uppercase">{productCategory(product)}</p>
            )}
          </div>

          <h4 className="font-heading font-extrabold text-xl md:text-2xl text-black leading-snug mb-3">
            {product.name}
          </h4>

          <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-auto line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl text-black">{formatPrice(product.price)}</span>
              {product.compare_at_price && product.compare_at_price > product.price && (
                <span className="text-gray-400 text-sm line-through">{formatPrice(product.compare_at_price)}</span>
              )}
            </div>

            <AddToCartButton product={product} size="md" variant="icon" />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export default function FeaturedProducts({ products = [] }: { products?: Product[] }) {
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
            Luxury essentials for pets who deserve the very best.
          </h3>
          <p className="text-gray-500 font-medium hidden md:block max-w-xs text-right">
            Discover premium products handpicked for your beloved companions.
          </p>
        </div>
      </div>

      {/* Native Horizontal Scroll Carousel */}
      <div className="w-full pl-6 md:pl-12">
        <div
          className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-16 pr-6 md:pr-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
        >
          {products.map((product) => (
            <div key={product.id} className="snap-center md:snap-start shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
