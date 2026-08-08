'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useCart } from '@/stores/cart-store'
import { createClient } from '@supabase/supabase-js'
import type { Product } from '@/lib/queries/products'

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter()
  const { slug } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIdx, setSelectedImageIdx] = useState(0)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
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

  if (loading) return <div className="min-h-screen p-8 text-center">Loading...</div>
  if (!product || !product.id) return <div className="min-h-screen p-8"><Link href="/">← Back Home</Link><p className="mt-4">Product not found</p></div>

  return (
    <div className="min-h-screen bg-white p-8">
      <button 
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'instant' })
          router.push('/')
        }}
        className="text-orange-600 mb-4 inline-block hover:underline"
      >
        ← Back Home
      </button>
      <div className="max-w-2xl mx-auto mt-8">
        {product.image_urls && product.image_urls.length > 0 ? (
          <div className="mb-8">
            <div className="relative w-full h-96 rounded overflow-hidden bg-gray-100">
              <Image 
                src={product.image_urls[selectedImageIdx] || product.image_urls[0]} 
                alt={product.name} 
                fill
                priority
                sizes="(max-width: 768px) 100vw, 42rem"
                className="object-cover transition-opacity duration-300" 
              />
            </div>
            {product.image_urls.length > 1 && (
              <div className="flex gap-4 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.image_urls.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`flex-shrink-0 w-24 h-24 rounded overflow-hidden border-2 transition-all ${
                      selectedImageIdx === idx 
                        ? 'border-orange-600' 
                        : 'border-transparent hover:border-gray-300 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image 
                        src={url} 
                        alt={`${product.name} thumbnail ${idx + 1}`} 
                        fill
                        sizes="96px"
                        className="object-cover" 
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-100 h-96 rounded mb-8 flex items-center justify-center text-gray-400">No image</div>
        )}
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-2xl text-orange-600 font-bold mb-4">₹{product.price}</p>
        <p className="text-gray-600 mb-6">{product.description}</p>
        
        <div className="mb-6 space-y-2 text-sm text-gray-700">
          <p className="flex items-center"><span className="text-green-500 mr-2 font-bold">✓</span> Ultra-soft premium fabric</p>
          <p className="flex items-center"><span className="text-green-500 mr-2 font-bold">✓</span> Comfortable cushioning</p>
          <p className="flex items-center"><span className="text-green-500 mr-2 font-bold">✓</span> Perfect for puppies and small dogs</p>
          <p className="flex items-center"><span className="text-green-500 mr-2 font-bold">✓</span> Easy to clean</p>
          <p className="flex items-center"><span className="text-green-500 mr-2 font-bold">✓</span> Durable everyday design</p>
        </div>

        <p className="text-sm text-gray-500 mb-6">{product.stock} in stock</p>
        
        <button onClick={() => {
          addToCart({ id: product.id, name: product.name, price: product.price, image: product.image_urls?.[0] || '', quantity: 1 })
          toast.success('Added to cart')
        }} className="bg-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 w-full transition-colors shadow-sm">
          Add to Cart
        </button>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center text-sm text-gray-600 border-t border-gray-100 pt-6">
          <div className="flex items-center gap-2 justify-center">
            <span>🚚</span> Free delivery in 3-5 days
          </div>
          <div className="flex items-center gap-2 justify-center">
            <span>↩</span> Easy returns
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
                    {p.image_urls?.[0] ? (
                      <Image 
                        src={p.image_urls[0]} 
                        alt={p.name} 
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors truncate text-sm sm:text-base">{p.name}</h3>
                  <p className="text-orange-600 font-semibold mt-1 text-sm sm:text-base">₹{p.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
