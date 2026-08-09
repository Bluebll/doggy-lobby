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

function generateOrderNumber() {
  const date = new Date()
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, "0")
  const dd = String(date.getDate()).padStart(2, "0")
  
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let randomCode = ""
  for (let i = 0; i < 6; i++) {
    randomCode += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return `DL-${yyyy}${mm}${dd}-${randomCode}`
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
          stock: p.stock,
          image: (p.image_urls && p.image_urls[0]) || undefined,
        }
      })
      .filter(Boolean) as Array<{ id: number; name: string; price: number; quantity: number; stock: number; image?: string }>

    if (snapshot.length === 0) {
      return NextResponse.json({ error: "No valid products in cart" }, { status: 400 })
    }

    // Check for sufficient stock
    for (const item of snapshot) {
      if (item.stock < item.quantity) {
        return NextResponse.json({ error: `Not enough stock for ${item.name}. Only ${item.stock} left.` }, { status: 400 })
      }
    }

    const total = snapshot.reduce((n, i) => n + i.price * i.quantity, 0)

    const finalOrderNumber = generateOrderNumber()

    // Insert into 'orders'
    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert({
        order_number: finalOrderNumber,
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

    // Decrease stock using Optimistic Concurrency Control (OCC)
    for (const item of snapshot) {
      let success = false;
      let retries = 3;
      
      while (retries > 0 && !success) {
        // Fetch latest stock immediately before update
        const { data: latest } = await supabase
          .from("products")
          .select("stock")
          .eq("id", item.id)
          .single();
          
        if (!latest || latest.stock < item.quantity) {
          // Fallback if someone else bought the last item during our checkout process
          return NextResponse.json({ error: `Not enough stock for ${item.name}. Only ${latest?.stock || 0} left.` }, { status: 400 });
        }

        // Attempt OCC atomic update
        const { data: updated } = await supabase
          .from("products")
          .update({ stock: latest.stock - item.quantity })
          .eq("id", item.id)
          .eq("stock", latest.stock) // only update if stock matches our latest read
          .select("id");
          
        if (updated && updated.length > 0) {
          success = true;
        } else {
          retries--;
        }
      }
      
      if (!success) {
        // If we fail 3 times due to immense concurrent load on the exact same product, we fail gracefully
        return NextResponse.json({ error: `High traffic. Could not process ${item.name}. Please try again.` }, { status: 409 });
      }
    }

    return NextResponse.json({ order })
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
