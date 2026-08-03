"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MapPin, Phone, MessageCircle, Clock, Navigation, Mail } from "lucide-react"
import MagneticButton from "@/components/ui/MagneticButton"

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLIFrameElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    if (!sectionRef.current || !cardRef.current || !mapRef.current || !maskRef.current) return
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
      }
    })

    // Cinematic Map Reveal (Iris/Mask effect)
    tl.fromTo(maskRef.current, 
      { scaleY: 1 }, 
      { scaleY: 0, duration: 1.5, ease: "power4.inOut", transformOrigin: "top" }
    )

    tl.fromTo(mapRef.current,
      { scale: 1.2, filter: "blur(20px)" },
      { scale: 1, filter: "blur(0px)", duration: 2, ease: "power3.out" },
      "-=1.2"
    )

    tl.fromTo(cardRef.current,
      { opacity: 0, y: 100, rotateX: 10 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: "back.out(1.2)" },
      "-=1.5"
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="relative h-[900px] md:h-screen min-h-[800px] bg-black overflow-hidden z-20">
      
      {/* Background Map & Reveal Mask */}
      <div className="absolute inset-0 z-0">
        <div ref={maskRef} className="absolute inset-0 bg-black z-10 w-full h-full"></div>
        <iframe 
          ref={mapRef}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1s0x390cd18b5db586ad%3A0xc665b16f3ea83c07!2sSector%2015%2C%20Faridabad%2C%20Haryana%20121007!5e0!3m2!1sen!2sin!4v1689255678123!5m2!1sen!2sin" 
          className="absolute inset-0 w-full h-[120%] -top-[10%] border-0 opacity-40 grayscale invert contrast-125 pointer-events-none" 
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-0"></div>

      <div className="container mx-auto px-6 md:px-12 h-full flex items-center relative z-10 pt-20 md:pt-0">
        
        <div ref={cardRef} className="glass-card-dark p-8 md:p-12 lg:p-14 rounded-[var(--radius-3xl)] max-w-lg w-full relative overflow-hidden shadow-premium border border-white/20" style={{ transformStyle: "preserve-3d" }}>
          {/* Internal Glow */}
          <div className="absolute -top-[20%] -right-[20%] w-[250px] h-[250px] bg-[var(--color-brand-orange)] opacity-20 blur-[80px] rounded-full pointer-events-none"></div>

          <h2 className="text-[var(--color-brand-orange)] font-bold tracking-widest uppercase text-sm mb-2 flex items-center gap-2">
            <span className="w-6 h-[2px] bg-[var(--color-brand-orange)]"></span>
            Visit Us
          </h2>
          <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold mb-10 text-white leading-tight">
            Let&apos;s meet.
          </h3>
          
          <div className="space-y-8 mb-12">
            <div className="flex gap-5 items-start group">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1 group-hover:bg-white/10 transition-colors">
                <MapPin className="text-[var(--color-brand-orange)]" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-xl text-white mb-1">Sector 15 Market</h4>
                <p className="text-white/60 leading-relaxed">Next to Mother Dairy<br />Faridabad, HR 121007</p>
              </div>
            </div>
            
            <div className="flex gap-5 items-start group">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1 group-hover:bg-white/10 transition-colors">
                <Clock className="text-[var(--color-brand-orange)]" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-xl text-white mb-1">Business Hours</h4>
                <p className="text-white/60 leading-relaxed">Mon - Fri: 10AM - 9PM<br />Sat - Sun: 9AM - 10PM</p>
              </div>
            </div>

            <div className="flex gap-5 items-start group">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1 group-hover:bg-white/10 transition-colors">
                <Mail className="text-[var(--color-brand-orange)]" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-xl text-white mb-1">Email Us</h4>
                <a href="mailto:hello@doggylobby.in" className="text-white/60 hover:text-white transition-colors leading-relaxed">hello@doggylobby.in</a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <a href="https://goo.gl/maps/placeholder" target="_blank" rel="noreferrer" className="interactive w-full flex items-center justify-center gap-2 bg-white text-black px-6 py-5 rounded-full font-extrabold text-lg hover:bg-[var(--color-brand-orange)] hover:text-white transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_10px_40px_rgba(255,138,61,0.4)] group">
              <Navigation size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              Get Directions
            </a>
            
            <a href="tel:+919876543210" className="interactive w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-5 rounded-full font-bold hover:bg-white/10 transition-colors">
              <Phone size={20} />
              Call Store
            </a>
          </div>
        </div>

      </div>

      {/* Floating WhatsApp Button (Desktop) */}
      <div className="hidden md:block absolute bottom-12 right-12 z-50">
        <MagneticButton href="https://wa.me/919876543210">
          <div className="w-20 h-20 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(37,211,102,0.5)] relative">
            <MessageCircle size={32} className="text-white relative z-10" />
            <div className="absolute inset-0 border-[3px] border-[#25D366] rounded-full animate-ping opacity-60"></div>
          </div>
        </MagneticButton>
      </div>
      
    </section>
  )
}
