"use client"

import { useEffect } from "react"
import { useRecentlyViewed } from "@/stores/recently-viewed-store"
import type { Product } from "@/types/domain"

export default function TrackRecentlyViewed({ product }: { product: Product }) {
  const add = useRecentlyViewed((s) => s.add)
  useEffect(() => {
    add(product)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id])
  return null
}
