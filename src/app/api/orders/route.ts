import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

interface CartItem {
  id: number | string
  name: string
  price: number
  image?: string
  quantity: number
}

interface CreateOrderBody {
  customer_name: string
  customer_phone: string
  customer_address: string
  notes?: string | null
  items: CartItem[]
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CreateOrderBody

    if (!body.customer_name || !body.customer_phone || !body.customer_address) {
      return NextResponse.json({ error: "Missing customer details" }, { status: 400 })
    }
    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()

    // Re-price from DB to prevent client tampering
    const ids = body.items.map((i) => Number(i.id))
    const { data: rows, error: prodErr } = await supabase
      .from("products")
      .select("id,name,price,image_urls,slug,is_active,stock")
      .in("id", ids)

    if (prodErr) return NextResponse.json({ error: prodErr.message }, { status: 500 })

    const byId = new Map((rows ?? []).map((r) => [Number(r.id), r]))
    const snapshot = body.items
      .map((i) => {
        const p = byId.get(Number(i.id))
        if (!p || !p.is_active) return null
        return {
          id: p.id,
          name: p.name,
          price: Number(p.price),
          quantity: Math.max(1, Math.floor(i.quantity)),
          image: (p.image_urls && p.image_urls[0]) || undefined,
        }
      })
      .filter(Boolean) as Array<{ id: number; name: string; price: number; quantity: number; image?: string }>

    if (snapshot.length === 0) {
      return NextResponse.json({ error: "No valid products in cart" }, { status: 400 })
    }

    const total = snapshot.reduce((n, i) => n + i.price * i.quantity, 0)

    // Generate order number manually
    const orderNumber = `DL-${Date.now()}`

    // Insert into 'orders'
    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_name: body.customer_name.trim(),
        customer_phone: body.customer_phone.trim(),
        // Cannot insert address or notes because columns do not exist in current schema
        total_price: total,
        status: "pending",
      })
      .select("id,order_number")
      .single()

    if (orderErr) return NextResponse.json({ error: orderErr.message }, { status: 500 })

    // Insert into 'order_items'
    const orderItems = snapshot.map((i) => ({
      order_id: order.id,
      product_id: i.id,
      quantity: i.quantity,
      price: i.price,
    }))

    const { error: itemsErr } = await supabase.from("order_items").insert(orderItems)
    
    if (itemsErr) return NextResponse.json({ error: itemsErr.message }, { status: 500 })

    return NextResponse.json({ order })
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
