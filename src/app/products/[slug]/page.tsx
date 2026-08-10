'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import SafeImage from '@/components/ui/SafeImage'
import BackButton from '@/components/ui/BackButton'
import HomeButton from '@/components/ui/HomeButton'
import { toast } from 'sonner'
import { useCart } from '@/stores/cart-store'
import { createClient } from '@supabase/supabase-js'
import type { Product } from '@/lib/queries/products'

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIdx, setSelectedImageIdx] = useState(0)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [quantity, setQuantity] = useState(1)
  const addToCart = useCart((state) => state.addToCart)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${slug}`)
        const data = await res.json()
        setProduct(data)
        setSelectedImageIdx(0)

        if (data && data.id) {
          const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
          )

          let relatedData: Product[] = []
          const coll = data.collection || ''

          const { data: sameCollection } = await supabase
            .from('products')
            .select('*')
            .eq('is_active', true)
            .eq('collection', coll)
            .neq('id', data.id)
            .limit(4)

          relatedData = sameCollection || []

          if (relatedData.length < 4) {
            const { data: fallback } = await supabase
              .from('products')
              .select('*')
              .eq('is_active', true)
              .neq('id', data.id)
              .neq('collection', coll)
              .limit(4 - relatedData.length)

            if (fallback) {
              relatedData = [...relatedData, ...fallback]
            }
          }

          setRelatedProducts(relatedData)
        }
      } catch (err) {
        console.error('Error:', err)
      }
      setLoading(false)
    }
    fetchProduct()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-[100dvh] pt-40 px-4 md:px-8 pb-8 flex flex-col items-center justify-start bg-white">
        <div className="w-12 h-12 rounded-full border-[3px] border-gray-100 border-t-[var(--color-brand-orange)] animate-spin mb-6" />
        <h2 className="font-heading font-extrabold text-gray-400 tracking-[0.2em] uppercase text-xs">Doggy Lobby</h2>
      </div>
    )
  }
  if (!product || !product.id) return <div className="min-h-screen pt-40 px-4 md:px-8 pb-8"><div className="flex gap-2 mb-4"><BackButton /><HomeButton /></div><p className="mt-4">Product not found</p></div>

  return (
    <div className="min-h-screen bg-white pt-40 px-4 md:px-8 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-2 mb-4 relative z-10">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <BackButton fallback={(product as any).collection ? `/collections/${(product as any).collection}` : '/'} />
          <HomeButton />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
          {/* LEFT: Image Showcase */}
          <div>
        {product.image_urls && product.image_urls.length > 0 ? (
          <div className="mb-8">
            <div className="w-full aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm group p-6 sm:p-10 flex items-center justify-center">
              <div className="relative w-full h-full">
                <SafeImage
                  isNextImage
                  src={product.image_urls[selectedImageIdx] || product.image_urls[0]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 42rem"
                  className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </div>
            {product.image_urls.length > 1 && (
              <div className="flex gap-4 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.image_urls.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                      selectedImageIdx === idx
                        ? 'border-gray-900 shadow-md'
                        : 'border-transparent hover:border-gray-300 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="relative w-full h-full bg-gray-50">
                      <SafeImage
                        isNextImage
                        src={url}
                        alt={`${product.name} - ${idx + 1}`}
                        fill
                        sizes="6rem"
                        className="object-contain bg-white"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full aspect-square rounded-3xl mb-8 flex items-center justify-center text-gray-400 bg-gray-50 border border-gray-100 shadow-sm">No image</div>
        )}
          </div>

          {/* RIGHT: Product Details */}
          <div className="flex flex-col justify-start">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              {product.sale_price && product.sale_price < product.price ? (
                <>
                  <p className="text-3xl text-orange-600 font-extrabold">₹{product.sale_price}</p>
                  <p className="text-xl text-gray-400 font-bold line-through">₹{product.price}</p>
                  <span className="bg-red-100 text-red-700 font-bold px-3 py-1 rounded-full text-sm">
                    {Math.round(((product.price - product.sale_price) / product.price) * 100)}% OFF
                  </span>
                </>
              ) : (
                <p className="text-3xl text-orange-600 font-extrabold">₹{product.price}</p>
              )}
            </div>

            {product.structured_info && Object.keys(product.structured_info).length > 0 && (
              <div className="mb-6 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-xs">Product Information</h3>
                <ul className="space-y-2">
                  {Object.entries(product.structured_info).map(([k, v]) => (
                    <li key={k} className="flex text-sm">
                      <span className="text-gray-500 w-1/3 font-medium">{k}:</span>
                      <span className="text-gray-900 w-2/3 font-semibold">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="text-gray-600 mb-6 whitespace-pre-wrap leading-relaxed">{product.description}</div>

        <p className="text-sm text-gray-500 mb-4">{product.stock} in stock</p>

        <div className="flex gap-4 items-center">
          <div className="flex items-center bg-gray-100 rounded-full h-14 border border-gray-200">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-14 h-full flex items-center justify-center font-bold text-gray-600 hover:text-black transition-colors disabled:opacity-50"
            >
              −
            </button>
            <span className="w-10 text-center font-bold text-gray-900">{quantity}</span>
            <button
              onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
              disabled={quantity >= product.stock}
              className="w-14 h-full flex items-center justify-center font-bold text-gray-600 hover:text-black transition-colors disabled:opacity-50"
            >
              +
            </button>
          </div>

          <button
            onClick={() => {
              if (product.stock > 0) {
                const authoritativePrice = (product.sale_price && product.sale_price < product.price)
                  ? product.sale_price
                  : product.price;

                addToCart({
                  id: product.id,
                  name: product.name,
                  price: authoritativePrice,
                  image: product.image_urls?.[0] || '',
                  quantity: quantity,
                  stock: product.stock
                })
                toast.success('Added to cart')
                setQuantity(1)
              }
            }}
            disabled={product.stock === 0}
            className="flex-1 bg-black text-white h-14 rounded-full font-bold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-start text-sm text-gray-600 border-t border-gray-100 pt-6">
            <div className="flex items-center gap-2">
              <span>🚚</span> Free delivery in 3-5 days
            </div>
            <div className="flex items-center gap-2">
              <span>↩</span> Easy returns
            </div>
          </div>
        </div>
      </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-gray-100 pt-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">You might also like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`} className="group block">
                  <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square mb-4 relative">
                    {p.sale_price && p.sale_price < p.price && (
                      <div className="absolute top-2 left-2 z-10 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {Math.round(((p.price - p.sale_price) / p.price) * 100)}% OFF
                      </div>
                    )}
                    {p.image_urls?.[0] ? (
                      <SafeImage
                        isNextImage
                        src={p.image_urls[0]}
                        alt={p.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors truncate text-sm sm:text-base">{p.name}</h3>

                  <div className="flex items-center gap-2 mt-1">
                    {p.sale_price && p.sale_price < p.price ? (
                      <>
                        <p className="text-orange-600 font-semibold text-sm sm:text-base">₹{p.sale_price}</p>
                        <p className="text-gray-400 font-semibold text-xs sm:text-sm line-through">₹{p.price}</p>
                      </>
                    ) : (
                      <p className="text-orange-600 font-semibold text-sm sm:text-base">₹{p.price}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
