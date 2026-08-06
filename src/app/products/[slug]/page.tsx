'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/stores/cart-store'
import type { Product } from '@/lib/queries/products'

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const addToCart = useCart((state) => state.addToCart)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${slug}`)
        const data = await res.json()
        setProduct(data)
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
          <img src={product.image_urls[0]} alt={product.name} className="w-full h-96 object-cover rounded mb-8 bg-gray-100" />
        ) : (
          <div className="bg-gray-100 h-96 rounded mb-8 flex items-center justify-center text-gray-400">No image</div>
        )}
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-2xl text-orange-600 font-bold mb-4">₹{product.price}</p>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-sm text-gray-500 mb-8">{product.stock} in stock</p>
        <button onClick={() => {
          addToCart({ id: product.id, name: product.name, price: product.price, image: product.image_urls?.[0] || '', quantity: 1 })
          alert('Added to cart!')
        }} className="bg-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 w-full">
          Add to Cart
        </button>
      </div>
    </div>
  )
}
