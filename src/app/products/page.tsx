import Link from "next/link"
import { queryProducts, getBrands, getPriceRange } from "@/lib/queries/products"
import { formatPrice } from "@/lib/constants"
import AddToCartButton from "@/components/cart/AddToCartButton"
import WishlistButton from "@/components/wishlist/WishlistButton"
import FilterBar from "@/components/filters/FilterBar"
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
    <div className="group flex flex-col bg-white rounded-[var(--radius-3xl)] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-black/5">
      <Link href={`/products/${product.slug}`} className="relative aspect-square w-full overflow-hidden bg-gray-100 block">
        {tag && (
          <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-black shadow-sm">
            {tag}
          </div>
        )}
        <div className="absolute top-4 right-4 z-20">
          <WishlistButton product={product} />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover z-10 group-hover:scale-105 transition-transform duration-700"
        />
      </Link>
      <div className="flex flex-col flex-1 p-6">
        <Link href={`/products/${product.slug}`} className="font-heading font-extrabold text-lg md:text-xl text-black leading-snug mb-2 line-clamp-2">
          {product.name}
        </Link>
        {product.description && (
          <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
        )}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="font-heading font-extrabold text-lg text-black">{formatPrice(product.price)}</span>
          <AddToCartButton product={product} size="sm" variant="icon" />
        </div>
      </div>
    </div>
  )
}

export default async function AllProductsPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams
  const filter = {
    q: sp.q,
    brand: sp.brand,
    min: sp.min ? Number(sp.min) : undefined,
    max: sp.max ? Number(sp.max) : undefined,
    sort: (sp.sort as "new" | "price_asc" | "price_desc" | "name_asc") || "new",
    limit: 48,
  }
  const [products, brands, range] = await Promise.all([
    queryProducts(filter),
    getBrands(),
    getPriceRange(),
  ])

  return (
    <section className="pt-32 md:pt-40 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">All Products</span>
        </nav>

        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[2px] bg-[var(--color-brand-orange)]"></div>
            <h2 className="text-[var(--color-brand-orange)] font-bold tracking-widest uppercase text-xs">Shop All</h2>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight">
            {filter.q ? `Results for “${filter.q}”` : "All products."}
          </h1>
          <p className="text-gray-500 mt-2">{products.length} product{products.length === 1 ? "" : "s"}</p>
        </div>

        <FilterBar brands={brands} minPrice={range.min} maxPrice={range.max} />

        {products.length === 0 ? (
          <p className="text-gray-500 text-center py-20">No products match these filters.</p>
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
