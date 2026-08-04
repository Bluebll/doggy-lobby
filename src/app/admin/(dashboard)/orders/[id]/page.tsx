import Link from "next/link"
import { notFound } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase/server"
import { formatPrice } from "@/lib/constants"
import OrderStatusSelect from "@/components/admin/OrderStatusSelect"
import { ArrowLeft, User, Phone, MapPin, MessageSquare } from "lucide-react"
import type { Order } from "@/types/domain"

export const dynamic = "force-dynamic"

async function loadOrder(id: string): Promise<Order | null> {
  const supabase = await getSupabaseServer()
  if (!supabase) return null
  const { data } = await supabase.from("orders").select("*").eq("id", id).maybeSingle()
  return (data as Order) ?? null
}

export default async function AdminOrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = await loadOrder(id)
  if (!order) notFound()

  return (
    <div className="space-y-6">
      <Link href="/admin/orders" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black">
        <ArrowLeft size={14} /> Back to orders
      </Link>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Order</p>
          <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-black">{order.order_number}</h1>
          <p className="text-gray-500 text-sm mt-1">Placed {new Date(order.created_at).toLocaleString()}</p>
        </div>
        <OrderStatusSelect orderId={order.id} initial={order.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-[var(--radius-3xl)] p-6 shadow-sm border border-black/5">
          <h3 className="font-heading text-lg font-extrabold text-black mb-4">Items</h3>
          <ul className="divide-y divide-black/5">
            {order.items.map((i, idx) => (
              <li key={idx} className="py-3 flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[var(--color-brand-gray)] shrink-0">
                  {i.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={i.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-black text-sm truncate">{i.name}</p>
                  <p className="text-xs text-gray-500">{i.qty} × {formatPrice(i.price)}</p>
                </div>
                <span className="font-heading font-extrabold text-sm text-black">{formatPrice(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-black/10 flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">Total</span>
            <span className="font-heading text-2xl font-extrabold text-black">{formatPrice(order.total)}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[var(--radius-3xl)] p-6 shadow-sm border border-black/5">
            <h3 className="font-heading text-lg font-extrabold text-black mb-4">Customer</h3>
            <div className="space-y-3 text-sm">
              <p className="flex items-start gap-2"><User size={14} className="mt-0.5 text-gray-400" /> <span>{order.customer_name}</span></p>
              <p className="flex items-start gap-2"><Phone size={14} className="mt-0.5 text-gray-400" /> <a href={`tel:${order.customer_phone}`} className="hover:underline">{order.customer_phone}</a></p>
              <p className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 text-gray-400" /> <span className="whitespace-pre-line">{order.customer_address}</span></p>
              {order.notes && <p className="flex items-start gap-2"><MessageSquare size={14} className="mt-0.5 text-gray-400" /> <span className="whitespace-pre-line text-gray-600">{order.notes}</span></p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
