"use client"

import { useState } from "react"

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const safeImages = images.length > 0 ? images : []
  const [active, setActive] = useState(0)

  if (safeImages.length === 0) {
    return (
      <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-3xl)] bg-[var(--color-brand-gray)]" />
    )
  }

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-3xl)] bg-[var(--color-brand-gray)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={safeImages[active]} alt={name} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" />
      </div>
      {safeImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3 mt-4">
          {safeImages.slice(0, 8).map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative aspect-square rounded-xl overflow-hidden bg-[var(--color-brand-gray)] transition-all ${
                i === active ? "ring-2 ring-black" : "opacity-70 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={`${name} ${i + 1}`} className="absolute inset-0 w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
