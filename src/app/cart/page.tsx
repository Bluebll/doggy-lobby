"use client"

import React, { useState, FormEvent, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, Trash2, ShoppingBag, MessageCircle, Loader2, ArrowLeft } from "lucide-react"
import { useCart } from "@/stores/cart-store"
import { formatPrice } from "@/lib/constants"
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp"
import SafeImage from "@/components/ui/SafeImage"

type CartItem = ReturnType<typeof useCart.getState>["items"][number]
type Step = "cart" | "checkout" | "success"

export default function CartPage() {
  const items = useCart((s) => s.items)
  const removeFromCart = useCart((s) => s.removeFromCart)
  const decreaseQuantity = useCart((s) => s.decreaseQuantity)
  const clearCart = useCart((s) => s.clearCart)
  const addToCart = useCart((s) => s.addToCart)
  const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0)

  const [step, setStep] = useState<Step>("cart")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [notes, setNotes] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [orderNumber, setOrderNumber] = useState<string>("")
  const [waUrl, setWaUrl] = useState<string>("")

  // Prevent hydration mismatch
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const router = useRouter()
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault()
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setError(null); setSubmitting(true)
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: name,
          customer_phone: phone,
          customer_address: address,
          notes: notes || null,
          items,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to place order")

      const orderNum = data.order.order_number as string
      const msg = buildOrderMessage({
        orderNumber: orderNum,
        items,
        subtotal,
        total: subtotal,
        customer: { name, phone, address, notes },
      })
      const url = buildWhatsAppUrl(msg)

      setOrderNumber(orderNum)
      setWaUrl(url)
      setStep("success")
      clearCart()

      if (typeof window !== "undefined") window.open(url, "_blank")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  if (!mounted) {
    return <main className="min-h-[100dvh] bg-[var(--color-brand-gray)]" />
  }

  if (step === "success") {
    return (
      <main className="min-h-[100dvh] bg-[var(--color-brand-gray)] pt-32 pb-24 px-6 md:px-12 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full p-8 md:p-12 flex flex-col items-center text-center border border-black/5">
          <div className="w-24 h-24 rounded-full bg-[#25D366]/15 flex items-center justify-center mb-6">
            <MessageCircle size={36} className="text-[#25D366]" />
          </div>
          <h1 className="font-heading text-4xl font-extrabold text-black mb-4">Order Placed!</h1>
          <p className="text-lg text-gray-500 mb-8">
            Your order <span className="font-bold text-black">{orderNumber}</span> was saved.
            If WhatsApp didn’t open automatically, use the button below to confirm your delivery.
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-[#25D366] text-white font-bold text-lg hover:bg-[#1ebe57] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#25D366]/20"
          >
            <MessageCircle size={22} />
            Open WhatsApp to Confirm
          </a>
          <Link href="/collections/all" className="mt-8 text-black font-semibold hover:underline">
            ← Back to Shop
          </Link>
        </div>
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main className="min-h-[100dvh] bg-[var(--color-brand-gray)] pt-32 pb-24 px-6 md:px-12 flex items-center justify-center">
        <div className="flex flex-col items-center text-center max-w-md w-full">
          <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center mb-8 shadow-sm border border-black/5">
            <ShoppingBag size={40} className="text-black/30" />
          </div>
          <h1 className="font-heading text-4xl font-extrabold text-black mb-4">Your cart is empty</h1>
          <p className="text-gray-500 text-lg mb-10">Browse our shelves and add your pet’s favourites before checking out.</p>
          <Link
            href="/collections/all"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-black text-white font-bold hover:bg-[var(--color-brand-orange)] transition-colors hover:scale-105 active:scale-95"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-[100dvh] bg-[var(--color-brand-gray)] pt-40 md:pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8 md:mb-12">
          <button onClick={handleBack} className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors border border-black/5 shadow-sm">
            <ArrowLeft size={18} />
          </button>
          <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-black">
            {step === "cart" ? "Your Cart" : "Checkout"}
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:items-start">
          {/* LEFT COLUMN: ITEMS */}
          <div className="flex-1 bg-white rounded-[var(--radius-3xl)] p-4 md:p-8 shadow-sm border border-black/5">
            <ul className="divide-y divide-black/5">
              {items.map((i) => (
                <MemoizedCartItem key={i.id} i={i} addToCart={addToCart} removeFromCart={removeFromCart} decreaseQuantity={decreaseQuantity} />
              ))}
            </ul>
          </div>

          {/* RIGHT COLUMN: SUMMARY / CHECKOUT */}
          <div className="w-full lg:w-[440px] shrink-0 bg-white rounded-[var(--radius-3xl)] p-6 md:p-8 shadow-sm border border-black/5 sticky top-32">
            <h2 className="font-heading text-2xl font-extrabold text-black mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Subtotal ({items.length} items)</span>
                <span className="font-heading text-xl font-extrabold text-black">{formatPrice(subtotal)}</span>
              </div>
              
              <div className="text-sm font-medium text-gray-700 bg-[var(--color-brand-gray)] rounded-2xl px-5 py-4 flex items-center gap-3">
                {subtotal >= 1499 ? (
                  <><span>✅</span> Free delivery available!</>
                ) : (
                  <><span>🚚</span> Delivery available above ₹1499</>
                )}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === "cart" ? (
                <motion.div
                  key="cart-actions"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <button
                    onClick={() => setStep("checkout")}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-5 rounded-full bg-black text-white font-bold text-lg hover:bg-[var(--color-brand-orange)] transition-colors hover:scale-105 active:scale-95 shadow-md"
                  >
                    Continue to checkout
                    <ShoppingBag size={20} />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="checkout-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <form id="page-checkout-form" onSubmit={submit} className="space-y-4">
                    <Field label="Full name" required>
                      <input
                        required value={name} onChange={(e) => setName(e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl bg-[var(--color-brand-gray)] focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                        placeholder="Your name"
                      />
                    </Field>
                    <Field label="WhatsApp / phone" required>
                      <input
                        required value={phone} onChange={(e) => setPhone(e.target.value)}
                        type="tel" inputMode="tel"
                        className="w-full px-5 py-4 rounded-2xl bg-[var(--color-brand-gray)] focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </Field>
                    <Field label="Delivery address" required>
                      <textarea
                        required value={address} onChange={(e) => setAddress(e.target.value)}
                        rows={3}
                        className="w-full px-5 py-4 rounded-2xl bg-[var(--color-brand-gray)] focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all resize-none"
                        placeholder="House / flat, street, sector, city, pincode"
                      />
                    </Field>
                    <Field label="Notes (optional)">
                      <textarea
                        value={notes} onChange={(e) => setNotes(e.target.value)}
                        rows={2}
                        className="w-full px-5 py-4 rounded-2xl bg-[var(--color-brand-gray)] focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all resize-none"
                        placeholder="Preferred delivery time, gate code, etc."
                      />
                    </Field>
                  </form>

                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 px-5 py-4 rounded-2xl">{error}</p>
                  )}

                  <div className="pt-2">
                    <button
                      form="page-checkout-form"
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-5 rounded-full bg-[#25D366] text-white font-bold text-lg hover:bg-[#1ebe57] transition-colors hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-[#25D366]/20 disabled:opacity-70 disabled:pointer-events-none"
                    >
                      {submitting ? <Loader2 size={20} className="animate-spin" /> : <MessageCircle size={20} />}
                      {submitting ? "Placing order..." : "Place order via WhatsApp"}
                    </button>
                    
                    <button
                      onClick={() => setStep("cart")}
                      className="w-full mt-4 py-3 text-gray-500 font-semibold hover:text-black transition-colors"
                    >
                      ← Back to Cart Items
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </main>
  )
}

const CartItemRow = ({
  i, addToCart, removeFromCart, decreaseQuantity
}: {
  i: CartItem
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  decreaseQuantity: (id: number) => void
}) => {
  return (
    <li className="py-6 first:pt-2 last:pb-2 flex gap-6 md:gap-8 group">
      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-[var(--color-brand-gray)] shrink-0 group-hover:scale-[1.02] transition-transform duration-300">
        {i.image && (
          <SafeImage src={i.image} alt={i.name} className="absolute inset-0 w-full h-full object-contain p-2" />
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-heading font-bold text-base md:text-lg text-black">{i.name}</p>
            <p className="text-[var(--color-brand-orange)] font-extrabold text-lg mt-1">{formatPrice(i.price)}</p>
          </div>
          <button
            onClick={() => removeFromCart(i.id)}
            className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors md:opacity-0 md:group-hover:opacity-100"
            aria-label="Remove item"
          >
            <Trash2 size={20} />
          </button>
        </div>

        <div className="mt-4 md:mt-6 inline-flex items-center rounded-full bg-[var(--color-brand-gray)] p-1.5 w-fit border border-black/5">
          <button
            onClick={() => decreaseQuantity(i.id)}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm hover:bg-black hover:text-white transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="px-5 text-base font-bold tabular-nums">{i.quantity}</span>
          <button
            onClick={() => addToCart({ ...i, quantity: 1 })}
            disabled={i.quantity >= (i.stock ?? 999)}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </li>
  )
}

const MemoizedCartItem = React.memo(CartItemRow, (prev, next) => {
  return prev.i === next.i && prev.i.quantity === next.i.quantity;
})

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2.5 inline-block ml-2">
        {label}{required && <span className="text-[var(--color-brand-orange)] ml-1">*</span>}
      </span>
      {children}
    </label>
  )
}
