import Link from "next/link"
import { getSupabaseServer } from "@/lib/supabase/server"
import { formatPrice } from "@/lib/constants"

export const dynamic = "force-dynamic"

const STATUSES = ["all", "pending", "confirmed", "delivered", "cancelled"] as const

async function loadOrders(status?: string) {
  const supabase = await getSupabaseServer()
  if (!supabase) return []
  let q = supabase.from("orders").select("id,order_number,customer_name,customer_phone,total,status,created_at").order("created_at", { ascending: false }).limit(200)
  if (status && status !== "all") q = q.eq("status", status)
  const { data } = await q
  return data ?? []
}

export default async function AdminOrdersPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams
  const status = sp.status || "all"
  const orders = await loadOrders(status)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-black">Orders</h1>
        <p className="text-gray-500 text-sm mt-1">{orders.length} order{orders.length === 1 ? "" : "s"}</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {STATUSES.map((s) => (
          <Link
            key={s}
            href={s === "all" ? "/admin/orders" : `/admin/orders?status=${s}`}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold capitalize transition-colors ${
              status === s ? "bg-black text-white" : "bg-white text-black border border-black/10 hover:bg-black hover:text-white"
            }`}
          >
            {s}
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-[var(--radius-3xl)] shadow-sm border border-black/5 overflow-hidden">
        {orders.length === 0 ? (
          <p className="text-gray-500 text-sm p-10 text-center">No orders match this filter.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-black/5 bg-[var(--color-brand-gray)]">
                  <th className="py-3 px-4">Order</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-black/5 last:border-0 hover:bg-[var(--color-brand-gray)]/40">
                    <td className="py-3 px-4">
                      <Link href={`/admin/orders/${o.id}`} className="font-semibold text-black hover:text-[var(--color-brand-orange)]">{o.order_number}</Link>
                    </td>
                    <td className="py-3 px-4">{o.customer_name}</td>
                    <td className="py-3 px-4 text-gray-500">{o.customer_phone}</td>
                    <td className="py-3 px-4 font-semibold">{formatPrice(o.total)}</td>
                    <td className="py-3 px-4"><StatusPill status={o.status as string} /></td>
                    <td className="py-3 px-4 text-gray-500">{new Date(o.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    confirmed: "bg-blue-100 text-blue-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-gray-100 text-gray-600",
  }
  return <span className={`inline-block text-[10px] font-bold uppercase px-2 py-1 rounded-full ${map[status] || "bg-gray-100 text-gray-600"}`}>{status}</span>
}
