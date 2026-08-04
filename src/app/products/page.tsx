import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { getProducts } from "@/lib/queries/products"
import { formatPrice } from "@/lib/constants"
import type { Product } from "@/types/domain"

export const revalidate = 60

export const metadata = {
  title: "All Products | Doggy Lobby",
  description: "Browse every product available at Doggy Lobby.",
}

const FALLBACK =
  "https://images.unsplash.com/photo-1601758260908-9dd6c47ffbfe?q=80&w=800&auto=format&fit=crop"

function Card({ product }: { product: Product }) {
  const image = product.images?.[0] || FALLBACK
  const tag = product.is_best_seller
    ? "Bestseller"
    : product.is_on_offer
    ? "Offer"
    : product.is_featured
    ? "Featured"
    : ""

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col bg-white rounded-[var(--radius-3xl)] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-black/5"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        {tag && (
          <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-black shadow-sm">
            {tag}
          </div>
        )}
        <img
          src={image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover z-10 group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="flex flex-col flex-1 p-6">
        <h4 className="font-heading font-extrabold text-lg md:text-xl text-black leading-snug mb-2 line-clamp-2">
          {product.name}
        </h4>
        {product.description && (
          <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
        )}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="font-heading font-extrabold text-lg text-black">{formatPrice(product.price)}</span>
          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-[var(--color-brand-orange)] transition-all">
            <ShoppingBag size={16} />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default async function AllProductsPage() {
  const products = await getProducts(48)

  return (
    <section className="pt-32 md:pt-40 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">All Products</span>
        </nav>

        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[2px] bg-[var(--color-brand-orange)]"></div>
            <h2 className="text-[var(--color-brand-orange)] font-bold tracking-widest uppercase text-xs">Shop All</h2>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight">
            All products.
          </h1>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-500 text-center py-20">No products yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <Card key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
