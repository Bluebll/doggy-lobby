import Link from "next/link"
import { notFound } from "next/navigation"
import { Package, Truck, Shield } from "lucide-react"
import { getProductBySlug, getRelatedProducts } from "@/lib/queries/products"
import { getSupabaseServer } from "@/lib/supabase/server"
import { formatPrice } from "@/lib/constants"
import AddToCartButton from "@/components/cart/AddToCartButton"
import WishlistButton from "@/components/wishlist/WishlistButton"
import ProductGallery from "@/components/products/ProductGallery"
import TrackRecentlyViewed from "@/components/products/TrackRecentlyViewed"
import RecentlyViewed from "@/components/products/RecentlyViewed"
import { site } from "@/config/site"
import type { Category, Product } from "@/types/domain"

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: `Product | ${site.name}` }
  return {
    title: `${product.name} | ${site.name}`,
    description: product.description ?? `Shop ${product.name} at ${site.name}.`,
    openGraph: {
      title: product.name,
      description: product.description ?? "",
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  }
}

async function getCategoryById(id: string | null): Promise<Category | null> {
  if (!id) return null
  const supabase = await getSupabaseServer()
  if (!supabase) return null
  const { data } = await supabase.from("categories").select("*").eq("id", id).maybeSingle()
  return (data as Category) ?? null
}

const FALLBACK =
  "https://images.unsplash.com/photo-1601758260908-9dd6c47ffbfe?q=80&w=800&auto=format&fit=crop"

function RelatedCard({ product }: { product: Product }) {
  const image = product.images?.[0] || FALLBACK
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col bg-white rounded-[var(--radius-3xl)] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-black/5"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={product.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>
      <div className="p-5">
        <h4 className="font-heading font-extrabold text-base md:text-lg text-black line-clamp-2 mb-1">{product.name}</h4>
        <span className="font-heading font-extrabold text-base text-black">{formatPrice(product.price)}</span>
      </div>
    </Link>
  )
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const [category, related] = await Promise.all([
    getCategoryById(product.category_id),
    getRelatedProducts(product, 4),
  ])

  const images = product.images && product.images.length > 0 ? product.images : [FALLBACK]
  const attrs = product.attributes as Record<string, unknown>
  const brand = (attrs?.brand as string) || site.name
  const onOffer = product.compare_at_price && product.compare_at_price > product.price
  const discountPct = onOffer
    ? Math.round(((product.compare_at_price! - product.price) / product.compare_at_price!) * 100)
    : 0

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? "",
    image: images,
    sku: product.sku ?? undefined,
    brand: { "@type": "Brand", name: brand },
    offers: {
      "@type": "Offer",
      priceCurrency: process.env.NEXT_PUBLIC_STORE_CURRENCY || "INR",
      price: product.price,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  }

  return (
    <section className="pt-32 md:pt-40 pb-24 bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TrackRecentlyViewed product={product} />

      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span className="mx-2">/</span>
          {category ? (
            <>
              <Link href={`/categories/${category.slug}`} className="hover:text-black transition-colors">{category.name}</Link>
              <span className="mx-2">/</span>
            </>
          ) : (
            <>
              <Link href="/products" className="hover:text-black transition-colors">Products</Link>
              <span className="mx-2">/</span>
            </>
          )}
          <span className="text-black font-medium line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="relative">
            <ProductGallery images={images} name={product.name} />
            {onOffer && (
              <div className="absolute top-6 left-6 z-10 bg-[var(--color-brand-orange)] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                {discountPct}% OFF
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4 mb-3">
              <p className="text-[var(--color-brand-orange)] text-xs font-bold tracking-widest uppercase">{brand}</p>
              <WishlistButton product={product} size="md" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-black leading-tight mb-6">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-heading text-3xl md:text-4xl font-extrabold text-black">{formatPrice(product.price)}</span>
              {onOffer && (
                <span className="text-gray-400 text-lg line-through">{formatPrice(product.compare_at_price!)}</span>
              )}
            </div>

            <div className="mb-8">
              {product.stock > 0 ? (
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-green-700">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  In stock — {product.stock} available
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-red-700">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  Out of stock
                </span>
              )}
            </div>

            {product.description && (
              <p className="text-gray-600 leading-relaxed mb-8 whitespace-pre-line">{product.description}</p>
            )}

            <AddToCartButton product={product} />
            <p className="text-xs text-gray-400 mt-3">Tapping <b>Add to cart</b> opens your cart drawer. Checkout is sent via WhatsApp.</p>

            <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-gray-100">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck size={20} className="text-[var(--color-brand-orange)]" />
                <span className="text-xs text-gray-600 font-medium">Fast local delivery</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Package size={20} className="text-[var(--color-brand-orange)]" />
                <span className="text-xs text-gray-600 font-medium">Premium packaging</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Shield size={20} className="text-[var(--color-brand-orange)]" />
                <span className="text-xs text-gray-600 font-medium">Authenticity guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-[var(--color-brand-orange)]"></div>
              <h2 className="text-[var(--color-brand-orange)] font-bold tracking-widest uppercase text-xs">You may also like</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((r) => (
                <RelatedCard key={r.id} product={r} />
              ))}
            </div>
          </div>
        )}

        <RecentlyViewed excludeId={product.id} />
      </div>
    </section>
  )
}
