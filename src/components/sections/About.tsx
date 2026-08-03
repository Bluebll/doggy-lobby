"use client"

import { motion } from "framer-motion"

export default function About() {
  return (
    <section id="about" className="bg-black text-white relative z-20">
      <div className="flex flex-col lg:flex-row relative">
        
        {/* Left Column (Sticky Image) */}
        <div className="lg:w-1/2 h-screen lg:sticky top-0 left-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1200&auto=format&fit=crop" 
            alt="Happy dog owner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black z-10 hidden lg:block"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 lg:hidden"></div>
          
          <div className="absolute bottom-12 left-12 z-20">
            <h2 className="text-[var(--color-brand-orange)] font-bold tracking-widest uppercase text-sm mb-4">Origin Story</h2>
            <h3 className="font-heading text-4xl lg:text-6xl font-extrabold leading-tight mb-2">
              Born from<br />pure love.
            </h3>
          </div>
        </div>

        {/* Right Column (Scrolling Timeline) */}
        <div className="lg:w-1/2 relative py-24 px-6 md:px-16 lg:px-24">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-16 lg:left-24 top-24 bottom-24 w-[1px] bg-white/10 hidden md:block"></div>

          <div className="space-y-32">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -left-12 top-2 w-3 h-3 rounded-full bg-[var(--color-brand-orange)] hidden md:block shadow-[0_0_15px_rgba(255,138,61,0.5)]"></div>
              <h4 className="font-heading text-3xl font-bold mb-6">2020: The Vision</h4>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                It began with a simple realization: Faridabad&apos;s most devoted pet parents were settling for less. Generic kibble, plastic toys, and uninspired accessories dominated the shelves. We believed our companions deserved the same standard of living we demand for ourselves—uncompromising quality and design.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -left-12 top-2 w-3 h-3 rounded-full bg-white hidden md:block"></div>
              <h4 className="font-heading text-3xl font-bold mb-6">Global Standards, Local Presence</h4>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                We spent our first year traveling and sourcing. Partnering with organic farms in Europe, bespoke toy makers in the US, and master groomers in Japan. Doggy Lobby was built to be the definitive bridge between global pet luxury and local accessibility in Haryana.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -left-12 top-2 w-3 h-3 rounded-full bg-[var(--color-brand-orange)] hidden md:block shadow-[0_0_15px_rgba(255,138,61,0.5)]"></div>
              <h4 className="font-heading text-3xl font-bold mb-6">More Than Retail</h4>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                Today, we are a destination for discerning pet parents. Every product on our shelves is rigorously vetted. If it isn&apos;t good enough for our own companions, it doesn&apos;t make the cut. We are elevating the standard of pet care, one family at a time.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-white/10">
                <div>
                  <h4 className="font-heading font-extrabold text-5xl text-white mb-2">500+</h4>
                  <p className="text-[var(--color-brand-orange)] font-bold tracking-widest uppercase text-xs">Curated Brands</p>
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-5xl text-white mb-2">10k+</h4>
                  <p className="text-[var(--color-brand-orange)] font-bold tracking-widest uppercase text-xs">Happy Pets</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
