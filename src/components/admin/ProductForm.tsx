'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { uploadImageAction, createProductAction, updateProductAction, deactivateProductAction } from '@/app/admin/actions'
import { X, Upload, Loader2 } from 'lucide-react'

type Product = {
  id?: string
  name?: string
  description?: string
  price?: number
  stock?: number
  collection?: string
  image_urls?: string[]
  is_active?: boolean
}

export default function ProductForm({ product, isEdit }: { product?: Product, isEdit?: boolean }) {
  const router = useRouter()
  const [images, setImages] = useState<string[]>(product?.image_urls || [])
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    setError(null)
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const formData = new FormData()
        formData.append('file', file)
        
        const res = await uploadImageAction(formData)
        if (res.error) {
          setError(res.error)
        } else if (res.url) {
          setImages(prev => [...prev, res.url!])
        }
      }
    } catch (err: unknown) {
      const e = err as Error
      setError(e.message || 'Error uploading images')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    // Add all current images to formData
    images.forEach(url => formData.append('image_urls', url))

    try {
      let res
      if (isEdit && product?.id) {
        res = await updateProductAction(product.id, formData)
      } else {
        res = await createProductAction(formData)
      }

      if (res?.error) {
        setError(res.error)
      } else {
        router.refresh() // Actually, the action redirects, so we might not hit this if successful
      }
    } catch (err: unknown) {
      const e = err as Error
      setError(e.message || 'Error saving product')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeactivate = async () => {
    if (!product?.id || !confirm('Are you sure you want to deactivate this product?')) return
    setIsSubmitting(true)
    const res = await deactivateProductAction(product.id)
    if (res?.error) {
      setError(res.error)
      setIsSubmitting(false)
    } else {
      router.push('/admin/products')
      router.refresh()
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              defaultValue={product?.name}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-black"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              defaultValue={product?.description}
              rows={4}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-black resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
            <input
              type="number"
              name="price"
              defaultValue={product?.price}
              min="0"
              step="0.01"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Level</label>
            <input
              type="number"
              name="stock"
              defaultValue={product?.stock ?? 10}
              min="0"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Collection</label>
            <select
              name="collection"
              defaultValue={product?.collection || "toys"}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-black bg-white"
            >
              <option value="toys">Toys</option>
              <option value="food">Food</option>
              <option value="accessories">Accessories</option>
              <option value="grooming">Grooming</option>
              <option value="beds">Beds</option>
            </select>
          </div>

          <div className="flex items-center mt-8">
            <input
              type="checkbox"
              name="is_active"
              id="is_active"
              defaultChecked={product?.is_active ?? true}
              className="h-5 w-5 text-black border-gray-300 rounded focus:ring-black"
            />
            <label htmlFor="is_active" className="ml-3 text-sm font-medium text-gray-700">
              Active (Visible to customers)
            </label>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Image Upload Section */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-4">Product Images (Max 5MB per image)</label>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
            {images.map((url, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group bg-gray-50">
                <img src={url} alt="Product" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-red-50 hover:text-red-600 rounded-full shadow-sm text-gray-700 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-black hover:bg-gray-50 flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  <Upload size={24} />
                  <span className="text-xs font-medium">Add Image</span>
                </>
              )}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              multiple
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="hidden"
            />
          </div>
        </div>

        <div className="pt-6 flex items-center justify-end gap-4 border-t border-gray-200">
          {isEdit && product?.is_active && (
            <button
              type="button"
              onClick={handleDeactivate}
              className="mr-auto px-6 py-3 text-sm font-bold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
            >
              Deactivate
            </button>
          )}
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="px-8 py-3 text-sm font-bold text-white bg-black hover:bg-gray-800 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <><Loader2 className="animate-spin" size={16} /> Saving...</>
            ) : (
              'Save Product'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
