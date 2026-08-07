'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useCart } from '@/stores/cart-store'
import type { Product } from '@/lib/queries/products'

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIdx, setSelectedImageIdx] = useState(0)
  const addToCart = useCart((state) => state.addToCart)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${slug}`)
        const data = await res.json()
        setProduct(data)
        setSelectedImageIdx(0)
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
      <Link href="/" className="text-orange-600 mb-4 inline-block">← Back Home</Link>
      <div className="max-w-2xl mx-auto mt-8">
        {product.image_urls && product.image_urls.length > 0 ? (
          <div className="mb-8">
            <img 
              src={product.image_urls[selectedImageIdx] || product.image_urls[0]} 
              alt={product.name} 
              className="w-full h-96 object-cover rounded bg-gray-100 transition-opacity duration-300" 
            />
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
                    <img src={url} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
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
          <div className="flex items-center gap-2 justify-center">
            <span>🔒</span> Secure payment
          </div>
        </div>
      </div>
    </div>
  )
}
