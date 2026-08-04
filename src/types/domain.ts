// Domain types mirrored from the Supabase schema.

export type OrderStatus = 'pending' | 'confirmed' | 'delivered' | 'cancelled'

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  category_id: string | null
  name: string
  slug: string
  description: string | null
  price: number
  compare_at_price: number | null
  stock: number
  sku: string | null
  images: string[]
  attributes: Record<string, unknown>
  is_featured: boolean
  is_best_seller: boolean
  is_on_offer: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  product_id: string
  name: string
  price: number
  qty: number
  image?: string
  slug?: string
}

export interface OrderItemSnapshot {
  product_id: string
  name: string
  price: number
  qty: number
  image?: string
}

export interface Order {
  id: string
  order_number: string
  customer_name: string
  customer_phone: string
  customer_address: string
  notes: string | null
  items: OrderItemSnapshot[]
  subtotal: number
  total: number
  status: OrderStatus
  whatsapp_sent: boolean
  created_at: string
  updated_at: string
}
