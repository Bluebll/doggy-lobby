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

    // Map fades in smoothly
    tl.fromTo(maskRef.current, 
      { opacity: 1 }, 
      { opacity: 0, duration: 1.5, ease: "power2.inOut" }
    )

    tl.fromTo(mapRef.current,
      { opacity: 0, scale: 1.05, filter: "blur(10px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 2, ease: "power3.out" },
      "-=1.2"
    )

    // Card slides in from left with opacity
    tl.fromTo(cardRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" },
      "-=1.5"
    )

    // Address items appear with slight stagger
    tl.fromTo(".contact-item", 
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.8"
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="relative min-h-screen h-auto md:h-screen md:min-h-[800px] bg-black overflow-hidden z-20 py-24 md:py-0">
      
      {/* Background Map & Reveal Mask */}
      <div className="absolute inset-0 z-0">
        <div ref={maskRef} className="absolute inset-0 bg-black z-10 w-full h-full"></div>
        <iframe 
          ref={mapRef}
          src="https://maps.google.com/maps?q=Greenfields,Faridabad&t=&z=13&ie=UTF8&iwloc=&output=embed" 
          className="absolute inset-0 w-full h-[120%] -top-[10%] border-0 opacity-60 grayscale invert contrast-125 pointer-events-none" 
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Smooth Transition Overlays & Ambience */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 md:from-black via-black/80 md:via-black/70 to-transparent z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 md:via-transparent to-[#0a0a0a]/30 z-0"></div>
      
      {/* Subtle Brand Ambience */}
      <div className="absolute top-[20%] left-[-10%] w-[800px] h-[800px] bg-[var(--color-brand-orange)]/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 md:px-12 h-full flex items-center relative z-10 pt-20 md:pt-0">
        
        <div ref={cardRef} className="bg-black/60 md:bg-black/40 backdrop-blur-2xl p-6 md:p-8 rounded-[var(--radius-3xl)] max-w-sm w-full relative overflow-hidden shadow-2xl border border-white/10" style={{ transformStyle: "preserve-3d" }}>
          {/* Internal Glow */}
          <div className="absolute -top-[20%] -right-[20%] w-[250px] h-[250px] bg-[var(--color-brand-orange)] opacity-[0.15] blur-[80px] rounded-full pointer-events-none"></div>

          <h2 className="contact-item text-[var(--color-brand-orange)] font-bold tracking-widest uppercase text-xs mb-2 flex items-center gap-2">
            <span className="w-6 h-[2px] bg-[var(--color-brand-orange)]"></span>
            Visit Us
          </h2>
          <h3 className="contact-item font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8 text-white leading-tight">
            Let&apos;s meet.
          </h3>
          
          <div className="space-y-5 mb-8">
            <div className="contact-item flex gap-4 items-start group">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-white/10 transition-colors">
                <MapPin className="text-[var(--color-brand-orange)]" size={18} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-white mb-0.5">Greenfields</h4>
                <p className="text-white/70 text-sm leading-relaxed">2467 Street No 12,<br />Greenfields, Faridabad,<br />Haryana 121010</p>
              </div>
            </div>

            <div className="contact-item flex gap-4 items-start group">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-white/10 transition-colors">
                <MapPin className="text-[var(--color-brand-orange)]" size={18} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-white mb-0.5">Charmwood Branch</h4>
                <p className="text-white/70 text-sm leading-relaxed">Eros Indian Oil, Ibiza Town,<br />Shiv Durga Vihar,<br />Faridabad, Haryana 121009</p>
              </div>
            </div>
            
            <div className="contact-item flex gap-4 items-start group">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-white/10 transition-colors">
                <Clock className="text-[var(--color-brand-orange)]" size={18} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-white mb-0.5">Business Hours</h4>
                <p className="text-white/70 text-sm leading-relaxed">Mon - Fri: 10AM - 9PM<br />Sat - Sun: 9AM - 10PM</p>
              </div>
            </div>

            <div className="contact-item flex gap-4 items-start group">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-white/10 transition-colors">
                <Mail className="text-[var(--color-brand-orange)]" size={18} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-white mb-0.5">Email Us</h4>
                <a href="mailto:hello@doggylobby.in" className="text-white/70 text-sm hover:text-white transition-colors leading-relaxed">hello@doggylobby.in</a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <a href="https://maps.app.goo.gl/dffERvGwauzXstLk6?g_st=ic" target="_blank" rel="noreferrer" className="contact-item interactive w-full flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-[var(--color-brand-orange)] hover:text-white transition-all duration-300 shadow-[0_5px_15px_rgba(255,255,255,0.1)] hover:shadow-[0_5px_20px_rgba(255,138,61,0.4)] group">
              <Navigation size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              Greenfields Directions
            </a>

            <a href="https://maps.app.goo.gl/jxdg4P4s2ekirZnQ7?g_st=ic" target="_blank" rel="noreferrer" className="contact-item interactive w-full flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-[var(--color-brand-orange)] hover:text-white transition-all duration-300 shadow-[0_5px_15px_rgba(255,255,255,0.1)] hover:shadow-[0_5px_20px_rgba(255,138,61,0.4)] group">
              <Navigation size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              Charmwood Directions
            </a>
            
            <a href="tel:+919876543210" className="contact-item interactive w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-white/10 transition-colors">
              <Phone size={16} />
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
