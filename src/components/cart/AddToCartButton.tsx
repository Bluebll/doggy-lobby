"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "@/stores/cart-store"
import type { Product } from "@/types/domain"

export default function AddToCartButton({
  product,
  size = "md",
  variant = "solid",
  label = "Add to cart",
}: {
  product: Product
  size?: "sm" | "md"
  variant?: "solid" | "icon"
  label?: string
}) {
  const add = useCart((s) => s.addItem)
  const disabled = product.stock <= 0

  const handle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (disabled) return
    add(product, 1)
  }

  if (variant === "icon") {
    const dim = size === "sm" ? "w-10 h-10" : "w-12 h-12"
    return (
      <button
        onClick={handle}
        disabled={disabled}
        aria-label={disabled ? "Out of stock" : `Add ${product.name} to cart`}
        className={`${dim} rounded-full bg-black text-white flex items-center justify-center hover:bg-[var(--color-brand-orange)] transition-all duration-300 hover:scale-110 disabled:opacity-40 disabled:hover:bg-black disabled:hover:scale-100`}
      >
        <ShoppingBag size={size === "sm" ? 16 : 18} />
      </button>
    )
  }

  return (
    <button
      onClick={handle}
      disabled={disabled}
      className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-black text-white font-semibold text-base hover:bg-[var(--color-brand-orange)] transition-colors disabled:opacity-60"
    >
      <ShoppingBag size={18} />
      {disabled ? "Out of stock" : label}
    </button>
  )
}
