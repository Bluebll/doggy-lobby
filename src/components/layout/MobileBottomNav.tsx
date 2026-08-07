"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, MessageCircle, Navigation, MapPin } from "lucide-react"
import { WHATSAPP_NUMBER } from "@/lib/constants"

export default function MobileBottomNav() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false) // scrolling down
      } else {
        setIsVisible(true) // scrolling up
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Hide on desktop
  if (typeof window !== "undefined" && window.innerWidth >= 768) {
    return null
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 z-[90] md:hidden"
        >
          <div className="glass-card bg-white/90 backdrop-blur-xl rounded-full px-6 py-4 flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white">
            
            <Link href={`tel:+${WHATSAPP_NUMBER}`} aria-label="Call Store" className="flex flex-col items-center gap-1 text-black/60 hover:text-[var(--color-brand-orange)] transition-colors">
              <Phone size={20} aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Call</span>
            </Link>

            <Link href={`https://wa.me/${WHATSAPP_NUMBER}`} aria-label="Chat on WhatsApp" className="flex flex-col items-center gap-1 text-black/60 hover:text-[#25D366] transition-colors relative">
              <MessageCircle size={20} aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Chat</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#25D366] rounded-full animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#25D366] rounded-full"></span>
            </Link>

            <Link href="#contact" aria-label="Store Location" className="flex items-center justify-center -mt-8 w-16 h-16 rounded-full bg-black text-white shadow-[0_10px_20px_rgba(0,0,0,0.2)] border-[4px] border-[var(--background)] focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]">
              <MapPin size={24} className="text-[var(--color-brand-orange)]" aria-hidden="true" />
            </Link>

            <Link href="https://goo.gl/maps/placeholder" aria-label="Get Directions" target="_blank" className="flex flex-col items-center gap-1 text-black/60 hover:text-blue-500 transition-colors">
              <Navigation size={20} aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Route</span>
            </Link>

            <Link href="#categories" aria-label="Shop Categories" className="flex flex-col items-center gap-1 text-black/60 hover:text-black transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              <span className="text-[10px] font-bold uppercase tracking-wider">Shop</span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
