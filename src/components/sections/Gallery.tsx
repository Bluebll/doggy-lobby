"use client"

export default function Gallery() {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 text-center mb-20">
        <h2 className="text-orange-500 font-bold text-sm mb-4">GALLERY</h2>
        <h3 className="text-5xl font-bold text-black">Happy Pets, Happy People</h3>
      </div>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl overflow-hidden h-64"><img src="https://images.unsplash.com/photo-1752721045922-a908a00c1629?q=80&w=800&auto=format&fit=crop" alt="dogs" className="w-full h-full object-cover" /></div>
          <div className="rounded-2xl overflow-hidden h-64"><img src="https://images.unsplash.com/photo-1670001620401-d33b2d19477c?q=80&w=800&auto=format&fit=crop" alt="cat" className="w-full h-full object-cover" /></div>
          <div className="rounded-2xl overflow-hidden h-64"><img src="https://images.unsplash.com/photo-1521673461164-de300ebcfb17?q=80&w=800&auto=format&fit=crop" alt="puppy" className="w-full h-full object-cover" /></div>
          <div className="rounded-2xl overflow-hidden h-64"><img src="https://images.unsplash.com/photo-1610123172037-c970be4d24d7?q=80&w=800&auto=format&fit=crop" alt="kitten" className="w-full h-full object-cover" /></div>
          <div className="rounded-2xl overflow-hidden h-64"><img src="https://images.pexels.com/photos/4119784/pexels-photo-4119784.jpeg?auto=compress&cs=tinysrgb&w=800" alt="dog portrait" className="w-full h-full object-cover" /></div>
          <div className="rounded-2xl overflow-hidden h-64"><img src="https://images.unsplash.com/photo-1591946614720-90a587da4a36?q=80&w=800&auto=format&fit=crop" alt="happy dog" className="w-full h-full object-cover" /></div>
        </div>
      </div>
    </section>
  )
}
