"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone } from "lucide-react"
import { WHATSAPP_NUMBER } from "@/lib/constants"
import CartIcon from "@/components/cart/CartIcon"
import ProductSearch from "@/components/layout/ProductSearch"

const navLinks = [
  { name: "Shop", href: "#collections" },
  { name: "Our Story", href: "#about" },
  { name: "Gallery", href: "#gallery" },
  { name: "FAQ", href: "#faq" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeHover, setActiveHover] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-[150] transition-all duration-700 ${
        isScrolled ? "py-4 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)]" : "py-8 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="text-2xl font-heading font-extrabold tracking-tighter relative group">
          <span className="relative z-10 transition-colors duration-300 text-black">Doggy</span>
          <span className="relative z-10 text-gradient">Lobby.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-2 p-1.5 rounded-full bg-white/40 backdrop-blur-md border border-white/40 shadow-sm max-lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative px-5 py-2 text-sm font-semibold text-black/70 hover:text-black transition-colors rounded-full"
              onMouseEnter={() => setActiveHover(link.name)}
              onMouseLeave={() => setActiveHover(null)}
            >
              <span className="relative z-10">{link.name}</span>
              {activeHover === link.name && (
                <motion.div
                  layoutId="navHover"
                  className="absolute inset-0 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] rounded-full z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6 max-lg:hidden">
          <ProductSearch className="w-48 lg:w-64" />
          <Link href={`tel:+${WHATSAPP_NUMBER}`} className="flex items-center gap-2 hover:text-[var(--color-brand-orange)] transition-colors group">
            <div className="w-8 h-8 rounded-full bg-white/50 border border-white/60 shadow-sm flex items-center justify-center group-hover:bg-white transition-colors">
              <Phone size={14} className="text-black" />
            </div>
            <span className="text-sm font-bold text-black/80 group-hover:text-black">Call Us</span>
          </Link>
          <CartIcon />
          <Link href="#contact" className="interactive relative px-6 py-2.5 rounded-full text-sm font-bold text-white bg-black overflow-hidden group">
            <span className="relative z-10">Visit Store</span>
            <div className="absolute inset-0 bg-[var(--color-brand-orange)] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0"></div>
          </Link>
        </div>

        {/* Mobile: menu button only */}
        <div className="flex lg:hidden items-center gap-2">
          <button aria-label="Toggle menu" aria-expanded={mobileMenuOpen} className="w-10 h-10 flex items-center justify-center bg-white/50 backdrop-blur-md rounded-full border border-white/60 focus-visible:ring-2 focus-visible:ring-black" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Search Row */}
      <div className="lg:hidden container mx-auto px-6 md:px-12 mt-4">
        <ProductSearch className="w-full" />
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-[calc(100%+1rem)] left-4 right-4 glass-card bg-white/80 rounded-3xl flex flex-col p-6 gap-2 lg:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="block p-4 text-xl font-heading font-bold rounded-2xl hover:bg-white/60 transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <hr className="my-4 border-black/10" />
            <Link href="#contact" onClick={() => setMobileMenuOpen(false)} className="bg-black text-white px-6 py-4 rounded-full text-center font-bold text-lg">
              Visit Store
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
