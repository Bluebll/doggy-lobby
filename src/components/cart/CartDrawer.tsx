"use client"

import React, { useState, FormEvent, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, Loader2 } from "lucide-react"
import { useCart } from "@/stores/cart-store"
import { formatPrice } from "@/lib/constants"
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp"

type CartItem = ReturnType<typeof useCart.getState>["items"][number]

import { create } from "zustand"
import SafeImage from "@/components/ui/SafeImage"
import Link from "next/link"

export const useCartUI = create<{ isOpen: boolean; openCart: () => void; closeCart: () => void }>((set) => ({
  isOpen: false,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false })
}))

type Step = "cart" | "checkout" | "success"

export default function CartDrawer() {
  const items = useCart((s) => s.items)
  const isOpen = useCartUI((s) => s.isOpen)
  const closeCart = useCartUI((s) => s.closeCart)
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
  const [idempotencyKey, setIdempotencyKey] = useState<string>("")

  useEffect(() => {
    setIdempotencyKey(
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `dl-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
    )
  }, [])

  const reset = () => {
    setStep("cart")
    setName(""); setPhone(""); setAddress(""); setNotes("")
    setError(null); setOrderNumber(""); setWaUrl("")
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.documentElement.style.overflow = "hidden"
      document.documentElement.style.overscrollBehavior = "none"
      document.body.style.overflow = "hidden"
      document.body.style.overscrollBehavior = "none"
      document.body.style.paddingRight = `${scrollbarWidth}px`

      let startY = 0

      const handleTouchStart = (e: TouchEvent) => {
        startY = e.touches[0].clientY
      }

      const handleTouchMove = (e: TouchEvent) => {
        const cartScroll = document.getElementById("cart-scroll-container")
        
        if (!cartScroll || !cartScroll.contains(e.target as Node)) {
          if (e.cancelable) e.preventDefault()
          return
        }

        const currentY = e.touches[0].clientY
        const isScrollingUp = currentY > startY
        const isScrollingDown = currentY < startY
        const scrollTop = cartScroll.scrollTop
        const maxScroll = cartScroll.scrollHeight - cartScroll.clientHeight

        if (scrollTop <= 0 && isScrollingUp) {
          if (e.cancelable) e.preventDefault()
        }

        if (scrollTop >= maxScroll - 1 && isScrollingDown) {
          if (e.cancelable) e.preventDefault()
        }
      }

      document.addEventListener("touchstart", handleTouchStart, { passive: true })
      document.addEventListener("touchmove", handleTouchMove, { passive: false })

      return () => {
        document.documentElement.style.overflow = ""
        document.documentElement.style.overscrollBehavior = ""
        document.body.style.overflow = ""
        document.body.style.overscrollBehavior = ""
        document.body.style.paddingRight = ""
        document.removeEventListener("touchstart", handleTouchStart)
        document.removeEventListener("touchmove", handleTouchMove)
      }
    }
  }, [isOpen])

  const handleClose = () => {
    closeCart()
    setTimeout(reset, 300)
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (submitting || !idempotencyKey) return
    setError(null); setSubmitting(true)
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey,
        },
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
      const authoritativeTotal = data.order.total_price
      const msg = buildOrderMessage({
        orderNumber: orderNum,
        items,
        subtotal: authoritativeTotal,
        total: authoritativeTotal,
        customer: { name, phone, address, notes },
      })
      const url = buildWhatsAppUrl(msg)

      setOrderNumber(orderNum)
      setWaUrl(url)
      setStep("success")
      clearCart()
      setIdempotencyKey(
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `dl-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
      )

      if (typeof window !== "undefined") window.open(url, "_blank")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm"
          />

          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed top-0 right-0 z-[201] h-full w-full sm:w-[440px] bg-white shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
              <h2 className="font-heading text-xl font-extrabold text-black">
                {step === "cart" && "Your Cart"}
                {step === "checkout" && "Checkout"}
                {step === "success" && "Order Placed ✨"}
              </h2>
              <button
                onClick={handleClose}
                className="w-9 h-9 rounded-full bg-[var(--color-brand-gray)] flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            <div id="cart-scroll-container" className="flex-1 min-h-0 overflow-y-auto overscroll-none" data-lenis-prevent="true">
              {step === "cart" && (
                <CartList items={items} addToCart={addToCart} removeFromCart={removeFromCart} decreaseQuantity={decreaseQuantity} />
              )}
              {step === "checkout" && (
                <CheckoutForm
                  name={name} setName={setName}
                  phone={phone} setPhone={setPhone}
                  address={address} setAddress={setAddress}
                  notes={notes} setNotes={setNotes}
                  error={error}
                />
              )}
              {step === "success" && (
                <SuccessView orderNumber={orderNumber} waUrl={waUrl} />
              )}
            </div>

            {step !== "success" && items.length > 0 && (
              <div className="border-t border-black/5 px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-medium">Subtotal</span>
                  <span className="font-heading text-2xl font-extrabold text-black">{formatPrice(subtotal)}</span>
                </div>
                
                <div className="text-sm font-medium text-gray-700 bg-[var(--color-brand-gray)] rounded-xl px-4 py-3 flex items-center gap-2">
                  {subtotal >= 1499 ? (
                    <><span>✅</span> Delivery available</>
                  ) : (
                    <><span>🚚</span> Delivery available above ₹1499</>
                  )}
                </div>

                {step === "cart" ? (
                  <>
                    <button
                      onClick={() => setStep("checkout")}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-black text-white font-semibold hover:bg-[var(--color-brand-orange)] transition-colors"
                    >
                      Continue to checkout
                      <ShoppingBag size={18} />
                    </button>
                    <Link
                      href="/cart"
                      onClick={handleClose}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-black/10 bg-transparent text-black font-semibold hover:bg-black hover:text-white transition-colors"
                    >
                      View Full Cart
                    </Link>
                  </>
                ) : (
                  <button
                    form="checkout-form"
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#1ebe57] transition-colors disabled:opacity-70"
                  >
                    {submitting ? <Loader2 size={18} className="animate-spin" /> : <MessageCircle size={18} />}
                    {submitting ? "Placing order..." : "Place order via WhatsApp"}
                  </button>
                )}

                {step === "checkout" && (
                  <button onClick={() => setStep("cart")} className="w-full text-sm text-gray-500 hover:text-black">
                    ← Back to cart
                  </button>
                )}
              </div>
            )}

            {step === "checkout" && (
              <form id="checkout-form" onSubmit={submit} className="hidden" />
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function CartList({
  items, addToCart, removeFromCart, decreaseQuantity
}: {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  decreaseQuantity: (id: number) => void
}) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-16">
        <div className="w-20 h-20 rounded-full bg-[var(--color-brand-gray)] flex items-center justify-center mb-5">
          <ShoppingBag size={28} className="text-black/40" />
        </div>
        <h3 className="font-heading text-2xl font-extrabold text-black mb-2">Your cart is empty</h3>
        <p className="text-gray-500 text-sm">Browse our shelves and add your pet’s favourites.</p>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-black/5">
      {items.map((i) => (
        <MemoizedCartItem key={i.id} i={i} addToCart={addToCart} removeFromCart={removeFromCart} decreaseQuantity={decreaseQuantity} />
      ))}
    </ul>
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
    <li className="px-6 py-4 flex gap-4">
      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white shrink-0">
        {i.image && (
          <SafeImage src={i.image} alt={i.name} className="absolute inset-0 w-full h-full object-contain" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-heading font-bold text-sm text-black line-clamp-2">{i.name}</p>
        <p className="text-[var(--color-brand-orange)] font-bold text-sm mt-1">{formatPrice(i.price)}</p>

        <div className="flex items-center justify-between mt-3">
          <div className="inline-flex items-center rounded-full bg-[var(--color-brand-gray)] p-1">
            <button
              onClick={() => decreaseQuantity(i.id)}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="px-3 text-sm font-bold">{i.quantity}</span>
            <button
              onClick={() => addToCart({ ...i, quantity: 1 })}
              disabled={i.quantity >= (i.stock ?? 999)}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
          <button
            onClick={() => removeFromCart(i.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </li>
  )
}

const MemoizedCartItem = React.memo(CartItemRow, (prev, next) => {
  return prev.i === next.i && prev.i.quantity === next.i.quantity;
})

function CheckoutForm(props: {
  name: string; setName: (v: string) => void
  phone: string; setPhone: (v: string) => void
  address: string; setAddress: (v: string) => void
  notes: string; setNotes: (v: string) => void
  error: string | null
}) {
  const { name, setName, phone, setPhone, address, setAddress, notes, setNotes, error } = props
  return (
    <div className="px-6 py-5 space-y-4">
      <Field label="Full name" required>
        <input
          form="checkout-form"
          required value={name} onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl bg-[var(--color-brand-gray)] focus:bg-white focus:ring-2 focus:ring-black outline-none text-sm"
          placeholder="Your name"
        />
      </Field>
      <Field label="WhatsApp / phone" required>
        <input
          form="checkout-form"
          required value={phone} onChange={(e) => setPhone(e.target.value)}
          type="tel" inputMode="tel"
          className="w-full px-4 py-3 rounded-2xl bg-[var(--color-brand-gray)] focus:bg-white focus:ring-2 focus:ring-black outline-none text-sm"
          placeholder="+91 98765 43210"
        />
      </Field>
      <Field label="Delivery address" required>
        <textarea
          form="checkout-form"
          required value={address} onChange={(e) => setAddress(e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-2xl bg-[var(--color-brand-gray)] focus:bg-white focus:ring-2 focus:ring-black outline-none text-sm resize-none"
          placeholder="House / flat, street, sector, city, pincode"
        />
      </Field>
      <Field label="Notes (optional)">
        <textarea
          form="checkout-form"
          value={notes} onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className="w-full px-4 py-3 rounded-2xl bg-[var(--color-brand-gray)] focus:bg-white focus:ring-2 focus:ring-black outline-none text-sm resize-none"
          placeholder="Preferred delivery time, gate code, etc."
        />
      </Field>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-2xl">{error}</p>
      )}

      <p className="text-xs text-gray-500">
        Tapping <b>Place order via WhatsApp</b> opens WhatsApp with your order details prefilled. The owner confirms and finalizes delivery.
      </p>
    </div>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 inline-block">
        {label}{required && <span className="text-[var(--color-brand-orange)]"> *</span>}
      </span>
      {children}
    </label>
  )
}

function SuccessView({ orderNumber, waUrl }: { orderNumber: string; waUrl: string }) {
  return (
    <div className="px-6 py-10 flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full bg-[#25D366]/15 flex items-center justify-center mb-5">
        <MessageCircle size={30} className="text-[#25D366]" />
      </div>
      <h3 className="font-heading text-2xl font-extrabold text-black mb-2">Order placed!</h3>
      <p className="text-sm text-gray-500 mb-6">
        Your order <span className="font-bold text-black">{orderNumber}</span> was saved.
        If WhatsApp didn’t open automatically, use the button below.
      </p>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener"
        className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#1ebe57] transition-colors"
      >
        <MessageCircle size={18} />
        Open WhatsApp
      </a>
    </div>
  )
}
