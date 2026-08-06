"use client"



const categories = [
  { name: "Dog Food", image: "https://images.unsplash.com/photo-1587300411515-2f66f43a3117?w=500&h=600&fit=crop", color: "from-blue-500/60" },
  { name: "Cat Food", image: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=500&h=600&fit=crop", color: "from-green-500/60" },
  { name: "Toys", image: "https://images.unsplash.com/photo-1633722715463-d30628519ca0?w=500&h=600&fit=crop", color: "from-amber-500/60" },
  { name: "Treats", image: "https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?w=500&h=600&fit=crop", color: "from-red-500/60" },
]

function CategoryCard({ category }: { category: typeof categories[0] }) {
  return (
    <div className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer">
      <img 
        src={category.image} 
        alt={category.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className={`absolute inset-0 bg-gradient-to-t ${category.color} to-transparent opacity-70`}></div>
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="absolute inset-0 flex items-end p-6">
        <h4 className="text-white font-bold text-2xl">{category.name}</h4>
      </div>
    </div>
  )
}

export default function Categories() {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 text-center mb-20">
        <h2 className="text-orange-500 font-bold text-sm mb-4">SHOP BY CATEGORY</h2>
        <h3 className="text-5xl font-bold text-black">Curated for your best friend.</h3>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, i) => (
            <CategoryCard key={i} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}
