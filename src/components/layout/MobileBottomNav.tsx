"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, MessageCircle, Navigation, MapPin, ShoppingBag } from "lucide-react"
import { useCart } from "@/stores/cart-store"
import { telHref, waHref, site } from "@/config/site"

export default function MobileBottomNav() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const openCart = useCart((s) => s.openCart)
  const cartItems = useCart((s) => s.items)
  const hasHydrated = useCart((s) => s.hasHydrated)
  const cartCount = hasHydrated ? cartItems.reduce((n, i) => n + i.qty, 0) : 0

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

  // Hide on admin routes
  if (pathname?.startsWith("/admin")) return null

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
            
            <Link href={telHref()} aria-label="Call Store" className="flex flex-col items-center gap-1 text-black/60 hover:text-[var(--color-brand-orange)] transition-colors">
              <Phone size={20} aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Call</span>
            </Link>

            <Link href={waHref()} aria-label="Chat on WhatsApp" className="flex flex-col items-center gap-1 text-black/60 hover:text-[#25D366] transition-colors relative">
              <MessageCircle size={20} aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Chat</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#25D366] rounded-full animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#25D366] rounded-full"></span>
            </Link>

            <Link href="#contact" aria-label="Store Location" className="flex items-center justify-center -mt-8 w-16 h-16 rounded-full bg-black text-white shadow-[0_10px_20px_rgba(0,0,0,0.2)] border-[4px] border-[var(--background)] focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]">
              <MapPin size={24} className="text-[var(--color-brand-orange)]" aria-hidden="true" />
            </Link>

            <Link href={site.mapsDirectionsUrl} aria-label="Get Directions" target="_blank" className="flex flex-col items-center gap-1 text-black/60 hover:text-blue-500 transition-colors">
              <Navigation size={20} aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Route</span>
            </Link>

            <button onClick={openCart} aria-label={`Open cart (${cartCount} items)`} className="flex flex-col items-center gap-1 text-black/60 hover:text-black transition-colors relative">
              <ShoppingBag size={20} aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-[var(--color-brand-orange)] text-white text-[9px] font-bold flex items-center justify-center">{cartCount}</span>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
