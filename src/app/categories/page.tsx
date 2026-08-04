import Link from "next/link"
import { getCategories } from "@/lib/queries/categories"

export const revalidate = 60

export const metadata = {
  title: "Shop by Category | Doggy Lobby",
  description: "Browse premium pet food, toys, accessories and more — curated by category.",
}

const GRADIENTS = [
  "from-blue-500/60",
  "from-green-500/60",
  "from-amber-500/60",
  "from-red-500/60",
  "from-purple-500/60",
  "from-pink-500/60",
]

const FALLBACK =
  "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop"

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <section className="pt-32 md:pt-40 pb-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[2px] bg-[var(--color-brand-orange)]"></div>
            <h2 className="text-[var(--color-brand-orange)] font-bold tracking-widest uppercase text-xs">All Categories</h2>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight">
            Shop by category.
          </h1>
          <p className="text-gray-500 mt-4 max-w-xl">
            Everything your pet loves, thoughtfully organized.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((c, i) => (
            <Link
              key={c.id}
              href={`/categories/${c.slug}`}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer"
            >
              <img
                src={c.image_url || FALLBACK}
                alt={c.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${GRADIENTS[i % GRADIENTS.length]} to-transparent opacity-70`}></div>
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h4 className="text-white font-heading font-extrabold text-2xl md:text-3xl">{c.name}</h4>
                {c.description && (
                  <p className="text-white/80 text-sm mt-1 line-clamp-2">{c.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {categories.length === 0 && (
          <p className="text-gray-500 text-center py-20">No categories available yet.</p>
        )}
      </div>
    </section>
  )
}
