import { formatPrice, STORE_NAME, WHATSAPP_NUMBER } from "@/lib/constants"

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export interface CustomerDetails {
  name: string
  phone: string
  address: string
  notes?: string
}

export function buildOrderMessage(params: {
  orderNumber: string
  items: CartItem[]
  subtotal: number
  total: number
  customer: CustomerDetails
}): string {
  const { orderNumber, items, subtotal, total, customer } = params
  const lines: string[] = []
  lines.push(`🛒 *New Order — ${STORE_NAME}*`)
  lines.push(`Order #: *${orderNumber}*`)
  lines.push("")
  lines.push("*Items:*")
  items.forEach((i, idx) => {
    lines.push(`${idx + 1}. ${i.name}`)
    lines.push(`   ${i.quantity} × ${formatPrice(i.price)}  =  ${formatPrice(i.price * i.quantity)}`)
  })
  lines.push("")
  lines.push(`Subtotal: ${formatPrice(subtotal)}`)
  lines.push(`*Total:* *${formatPrice(total)}*`)
  lines.push("")
  lines.push("*Customer:*")
  lines.push(`Name: ${customer.name}`)
  lines.push(`Phone: ${customer.phone}`)
  lines.push(`Address: ${customer.address}`)
  if (customer.notes) lines.push(`Notes: ${customer.notes}`)
  lines.push("")
  lines.push("Please confirm this order. Thank you! 🐾")
  return lines.join("\n")
}

export function buildWhatsAppUrl(message: string, phoneOverride?: string): string {
  const phone = (phoneOverride || WHATSAPP_NUMBER).replace(/[^\d]/g, "")
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${phone}?text=${encoded}`
}
