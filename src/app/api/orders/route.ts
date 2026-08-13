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

    const p_items = body.items.map(item => ({
      product_id: Number(item.id),
      quantity: Math.floor(Number(item.quantity))
    }))

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
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ order })
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
