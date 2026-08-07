"use client"

const images = [
  {
    src: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop",
    alt: "Happy dog"
  },
  {
    src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop",
    alt: "Happy cat"
  },
  {
    src: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=800&auto=format&fit=crop",
    alt: "Premium pet care"
  },
  {
    src: "https://images.unsplash.com/photo-1585559700398-1385b3a8aeb6?q=80&w=800&auto=format&fit=crop",
    alt: "Pet products"
  },
  {
    src: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=800&auto=format&fit=crop",
    alt: "Pets with owners"
  },
  {
    src: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800&auto=format&fit=crop",
    alt: "Luxury pet lifestyle"
  }
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-32 md:py-40 bg-[#0a0a0a] relative overflow-hidden">
      
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-brand-orange)]/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 z-0"></div>

      <div className="container mx-auto px-6 md:px-12 text-center mb-24 relative z-10">
        <h2 className="text-[var(--color-brand-orange)] font-bold tracking-widest uppercase text-sm mb-4 flex items-center justify-center gap-2">
          <span className="w-6 h-[2px] bg-[var(--color-brand-orange)]"></span>
          Gallery
          <span className="w-6 h-[2px] bg-[var(--color-brand-orange)]"></span>
        </h2>
        <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-2xl mx-auto">
          Happy Pets,<br />Happy People.
        </h3>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {images.map((img, i) => (
            <div 
              key={i} 
              className="rounded-3xl overflow-hidden aspect-[4/5] bg-white/5 border border-white/10 group cursor-pointer"
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-out" 
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
