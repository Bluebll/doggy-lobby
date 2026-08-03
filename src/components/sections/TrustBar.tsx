"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Star, Award, Heart, ShieldCheck, ThumbsUp } from "lucide-react"

export default function TrustBar() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    if (!containerRef.current) return
    
    const items = containerRef.current.querySelectorAll('.trust-item')
    
    gsap.fromTo(items, 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        }
      }
    )
  }, [])

  const trustItems = [
    { icon: <Star className="fill-current text-yellow-400" size={24} />, text: "4.9★ Google Rating" },
    { icon: <Award className="text-[var(--color-brand-orange)]" size={24} />, text: "Premium Products" },
    { icon: <Heart className="text-red-500" size={24} />, text: "Imported Treats" },
    { icon: <ThumbsUp className="text-blue-500" size={24} />, text: "Best Prices" },
    { icon: <ShieldCheck className="text-green-500" size={24} />, text: "Trusted by Local Pet Parents" },
  ]

  return (
    <section className="bg-white py-12 border-b border-gray-100 overflow-hidden">
      <div className="container mx-auto px-6" ref={containerRef}>
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4">
          {trustItems.map((item, index) => (
            <div key={index} className="trust-item flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-[var(--color-brand-gray)] flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <span className="font-semibold text-[var(--color-brand-black)] max-w-[120px] md:max-w-none text-sm md:text-base leading-tight">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
