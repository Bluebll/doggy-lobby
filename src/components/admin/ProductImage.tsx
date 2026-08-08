'use client'

import { useState } from 'react'

export default function ProductImage({ src, alt }: { src: string; alt?: string }) {
  const [error, setError] = useState(false)

  if (error || !src) {
    return (
      <div className="h-full w-full flex items-center justify-center text-gray-400 bg-gray-100">
        No Img
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt || ''}
      onError={() => setError(true)}
      className="h-full w-full object-cover"
    />
  )
}
