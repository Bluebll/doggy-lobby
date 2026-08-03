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
          <div className="rounded-2xl overflow-hidden h-64"><img src="https://images.unsplash.com/photo-1552053831-71594a27c62d?w=600&fit=crop" alt="dogs" className="w-full h-full object-cover" /></div>
          <div className="rounded-2xl overflow-hidden h-64"><img src="https://images.unsplash.com/photo-1583511655857-d19db992cb74?w=400&fit=crop" alt="cat" className="w-full h-full object-cover" /></div>
          <div className="rounded-2xl overflow-hidden h-64"><img src="https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&fit=crop" alt="puppy" className="w-full h-full object-cover" /></div>
          <div className="rounded-2xl overflow-hidden h-64"><img src="https://images.unsplash.com/photo-1567881623793-cf719e34f002?w=400&fit=crop" alt="kitten" className="w-full h-full object-cover" /></div>
        </div>
      </div>
    </section>
  )
}
