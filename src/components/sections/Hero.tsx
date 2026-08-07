"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, MessageCircle, Star, ShieldCheck, Award } from "lucide-react"
import { WHATSAPP_NUMBER } from "@/lib/constants"
import MagneticButton from "@/components/ui/MagneticButton"
import { useCursor } from "@/components/ui/CursorProvider"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { setCursorVariant, setCursorText } = useCursor()

  const handleMouseEnter = (text: string, variant: "visit" | "explore") => {
    setCursorVariant(variant)
    setCursorText(text)
  }

  const handleMouseLeave = () => {
    setCursorVariant("default")
    setCursorText("")
  }

  const headline = "Faridabad's Premium Destination For Happy Pets"
  const words = headline.split(" ")

  return (
    <section ref={containerRef} className="relative min-h-screen h-auto md:h-screen md:min-h-[800px] flex items-center justify-center overflow-hidden bg-black py-24 md:py-0">
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[var(--color-brand-orange)]/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none will-change-transform"></div>
      
      {/* Background Image - static, brightened slightly */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1, filter: "blur(10px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2669&auto=format&fit=crop"
          alt="Happy dogs"
          className="w-full h-[120%] object-cover object-center absolute top-[-10%] opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/60 md:via-black/40 to-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 md:from-black/80 via-black/60 md:via-black/30 to-transparent"></div>
        <div className="absolute inset-0 bg-black/40 md:bg-black/10 backdrop-brightness-90"></div>
      </div>

      {/* Floating Glass Card (Rating) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute top-1/3 right-[10%] md:right-[15%] z-20 hidden xl:flex items-center gap-3 p-5 glass-dark rounded-3xl transform rotate-3 shadow-xl border border-white/20"
      >
        <div className="flex gap-1 bg-white/10 p-2 rounded-full">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className="fill-current text-yellow-400" />
          ))}
        </div>
        <div className="flex flex-col pr-2">
          <span className="text-white font-bold text-base leading-tight">4.9 Google Rating</span>
          <span className="text-white/60 text-xs font-medium uppercase tracking-wider mt-1">Trusted locally</span>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center md:items-start text-center md:text-left pt-32 md:pt-24 mt-10">
        
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6.5rem] font-extrabold text-white leading-[1.1] md:leading-[1.05] mb-6 max-w-5xl flex flex-wrap justify-center md:justify-start">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.05, ease: "easeOut" }}
              className="mr-2 sm:mr-3 md:mr-4 lg:mr-6 mb-2"
            >
              {word === "Happy" || word === "Pets" ? <span className="text-gradient">{word}</span> : word}
            </motion.span>
          ))}
        </h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium"
        >
          The finest nutrition, curated accessories, and premium care for Faridabad&apos;s most discerning pet parents.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center w-full sm:w-auto mb-16"
        >
          <div onMouseEnter={() => handleMouseEnter("Visit", "visit")} onMouseLeave={handleMouseLeave} className="w-full sm:w-auto">
            <a href="https://maps.app.goo.gl/dffERvGwauzXstLk6?g_st=ic" target="_blank" rel="noreferrer" className="block w-full sm:w-auto">
              <MagneticButton className="group w-full sm:w-auto bg-[var(--color-brand-orange)] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[var(--color-brand-orange-hover)] shadow-lg justify-center">
                Visit Store
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
            </a>
          </div>
          
          <div onMouseEnter={() => handleMouseEnter("Chat", "visit")} onMouseLeave={handleMouseLeave} className="w-full sm:w-auto">
            <MagneticButton href={`https://wa.me/${WHATSAPP_NUMBER}`} className="group w-full sm:w-auto glass-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all justify-center">
              <MessageCircle size={20} className="text-[#25D366] group-hover:scale-110 transition-transform" />
              WhatsApp
            </MagneticButton>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 md:gap-10 text-white text-sm font-semibold tracking-wider uppercase bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20"
        >
          <div className="flex items-center gap-2">
            <Star size={16} className="text-[var(--color-brand-orange)]" /> 4.9 Google Rating
          </div>
          <div className="flex items-center gap-2">
            <Award size={16} className="text-[var(--color-brand-orange)]" /> Imported Brands
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[var(--color-brand-orange)]" /> Premium Products
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-2 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 pointer-events-none"
      >
        <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-1/2 bg-[var(--color-brand-orange)] absolute top-0"
          />
        </div>
      </motion.div>
    </section>
  )
}
