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
    const idempotencyKey = req.headers.get("Idempotency-Key")

    if (!idempotencyKey || idempotencyKey.length < 16 || idempotencyKey.length > 200) {
      return NextResponse.json({ error: "Invalid or missing Idempotency-Key" }, { status: 400 })
    }

    const body = (await req.json()) as CreateOrderBody

    if (!body.customer_name || !body.customer_phone || !body.customer_address) {
      return NextResponse.json({ error: "Missing customer details" }, { status: 400 })
    }
    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }

    const p_items = []
    for (const item of body.items) {
      const pid = Number(item.id)
      const qty = Number(item.quantity)

      if (
        !Number.isInteger(pid) || pid <= 0 ||
        !Number.isInteger(qty) || qty <= 0
      ) {
        return NextResponse.json({ error: "Invalid product ID or quantity" }, { status: 400 })
      }
      p_items.push({ product_id: pid, quantity: qty })
    }

    const supabase = getSupabaseAdmin()

    const { data: order, error } = await supabase.rpc("create_order_atomic", {
      p_customer_name: body.customer_name,
      p_customer_phone: body.customer_phone,
      p_customer_address: body.customer_address,
      p_notes: body.notes || null,
      p_items,
      p_idempotency_key: idempotencyKey
    })

    if (error) {
      console.error('Order creation RPC error:', error)
      const msg = error.message || ""
      const isExpected = msg.includes('Invalid') || msg.includes('stock') || msg.includes('unavailable') || msg.includes('Could not create') || msg.includes('greater than zero')
      return NextResponse.json({ error: isExpected ? msg : "Failed to process order. Please try again later." }, { status: isExpected ? 400 : 500 })
    }

    // Fetch authoritative order items to return to client
    const { data: orderItems, error: itemsError } = await supabase
      .from('order_items')
      .select('product_id, quantity, price, products(name)')
      .eq('order_id', order.id)

    if (itemsError || !orderItems || orderItems.length === 0) {
      console.error('Failed to fetch authoritative order items:', itemsError)
      return NextResponse.json({ error: "Failed to retrieve complete order details." }, { status: 500 })
    }

    order.items = orderItems.map((item) => {
      const prod = item.products as unknown as { name: string } | { name: string }[] | null
      const name = Array.isArray(prod) ? prod[0]?.name : prod?.name
      return {
        id: item.product_id,
        name: name || "Product",
        price: Number(item.price),
        quantity: item.quantity
      }
    })

    return NextResponse.json({ order })
  } catch (e) {
    console.error('Order API exception:', e)
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 })
  }
}
