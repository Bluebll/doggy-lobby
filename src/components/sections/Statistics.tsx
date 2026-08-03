"use client"

import { useEffect } from "react"
import { motion, useSpring, useTransform, useInView } from "framer-motion"
import { useRef } from "react"

function AnimatedNumber({ value, suffix = "", prefix = "", decimal = false }: { value: number, suffix?: string, prefix?: string, decimal?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 75,
    damping: 30,
    duration: 2000
  })

  const display = useTransform(spring, (current) => {
    if (decimal) {
      return prefix + current.toFixed(1) + suffix
    }
    return prefix + Math.floor(current) + suffix
  })

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, spring, value])

  return <motion.span ref={ref}>{display}</motion.span>
}

export default function Statistics() {
  return (
    <section className="py-24 bg-white relative z-20 border-b border-gray-100">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold text-black tracking-tighter mb-2">
              <AnimatedNumber value={4.9} decimal={true} suffix="★" />
            </h3>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Google Rating</p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold text-black tracking-tighter mb-2">
              <AnimatedNumber value={500} suffix="+" />
            </h3>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Premium Brands</p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--color-brand-orange)] tracking-tighter mb-2">
              <AnimatedNumber value={1500} suffix="+" />
            </h3>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Curated Products</p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold text-black tracking-tighter mb-2">
              <AnimatedNumber value={10} suffix="k+" />
            </h3>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Happy Pets</p>
          </div>

        </div>
      </div>
    </section>
  )
}
