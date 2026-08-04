import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/admin"
import type { CartItem } from "@/types/domain"

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
    const ids = body.items.map((i) => i.product_id)
    const { data: rows, error: prodErr } = await supabase
      .from("products")
      .select("id,name,price,images,slug,is_active,stock")
      .in("id", ids)

    if (prodErr) return NextResponse.json({ error: prodErr.message }, { status: 500 })

    const byId = new Map((rows ?? []).map((r) => [r.id as string, r]))
    const snapshot = body.items
      .map((i) => {
        const p = byId.get(i.product_id)
        if (!p || !p.is_active) return null
        return {
          product_id: p.id,
          name: p.name,
          price: Number(p.price),
          qty: Math.max(1, Math.floor(i.qty)),
          image: (p.images && p.images[0]) || undefined,
        }
      })
      .filter(Boolean) as Array<{ product_id: string; name: string; price: number; qty: number; image?: string }>

    if (snapshot.length === 0) {
      return NextResponse.json({ error: "No valid products in cart" }, { status: 400 })
    }

    const subtotal = snapshot.reduce((n, i) => n + i.price * i.qty, 0)
    const total = subtotal // no shipping/tax in MVP

    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert({
        customer_name: body.customer_name.trim(),
        customer_phone: body.customer_phone.trim(),
        customer_address: body.customer_address.trim(),
        notes: body.notes?.trim() || null,
        items: snapshot,
        subtotal,
        total,
        whatsapp_sent: true,
      })
      .select("id,order_number,items,subtotal,total,created_at")
      .single()

    if (orderErr) return NextResponse.json({ error: orderErr.message }, { status: 500 })

    return NextResponse.json({ order })
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
