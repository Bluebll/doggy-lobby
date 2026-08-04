import Link from "next/link"
import { getSupabaseServer } from "@/lib/supabase/server"
import { formatPrice } from "@/lib/constants"
import { Receipt, TrendingUp, Package, AlertTriangle } from "lucide-react"

export const dynamic = "force-dynamic"

async function loadStats() {
  const supabase = await getSupabaseServer()
  if (!supabase) return null

  const sinceIso = new Date(Date.now() - 7 * 86400_000).toISOString()

  const [ordersRes, weekRes, productsRes, lowStockRes, recentRes] = await Promise.all([
    supabase.from("orders").select("status,total", { count: "exact" }),
    supabase.from("orders").select("total,created_at").gte("created_at", sinceIso),
    supabase.from("products").select("id", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("products").select("id,name,stock,slug").lt("stock", 5).eq("is_active", true).order("stock", { ascending: true }).limit(6),
    supabase.from("orders").select("id,order_number,customer_name,total,status,created_at").order("created_at", { ascending: false }).limit(6),
  ])

  const total = (ordersRes.data ?? []).reduce((n, o) => n + Number(o.total), 0)
  const pending = (ordersRes.data ?? []).filter((o) => o.status === "pending").length
  const weekTotal = (weekRes.data ?? []).reduce((n, o) => n + Number(o.total), 0)

  return {
    totalOrders: ordersRes.count ?? 0,
    totalRevenue: total,
    pending,
    weekTotal,
    activeProducts: productsRes.count ?? 0,
    lowStock: lowStockRes.data ?? [],
    recent: recentRes.data ?? [],
  }
}

export default async function AdminDashboardPage() {
  const stats = await loadStats()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-black">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">A quick pulse of your store.</p>
      </div>

      {!stats ? (
        <p className="text-gray-500">Connect Supabase to see live stats.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total orders" value={String(stats.totalOrders)} icon={Receipt} />
            <StatCard label="Pending orders" value={String(stats.pending)} icon={AlertTriangle} accent />
            <StatCard label="Total revenue" value={formatPrice(stats.totalRevenue)} icon={TrendingUp} />
            <StatCard label="Active products" value={String(stats.activeProducts)} icon={Package} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent orders */}
            <div className="lg:col-span-2 bg-white rounded-[var(--radius-3xl)] p-6 shadow-sm border border-black/5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-xl font-extrabold text-black">Recent orders</h2>
                <Link href="/admin/orders" className="text-sm text-[var(--color-brand-orange)] font-semibold hover:underline">View all →</Link>
              </div>
              {stats.recent.length === 0 ? (
                <p className="text-gray-500 text-sm py-8 text-center">No orders yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 border-b border-black/5">
                        <th className="py-2 pr-4">Order</th>
                        <th className="py-2 pr-4">Customer</th>
                        <th className="py-2 pr-4">Total</th>
                        <th className="py-2 pr-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recent.map((o) => (
                        <tr key={o.id} className="border-b border-black/5 last:border-0">
                          <td className="py-3 pr-4">
                            <Link href={`/admin/orders/${o.id}`} className="font-semibold hover:underline">{o.order_number}</Link>
                          </td>
                          <td className="py-3 pr-4">{o.customer_name}</td>
                          <td className="py-3 pr-4">{formatPrice(o.total)}</td>
                          <td className="py-3 pr-4"><StatusPill status={o.status as string} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Low stock */}
            <div className="bg-white rounded-[var(--radius-3xl)] p-6 shadow-sm border border-black/5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-xl font-extrabold text-black">Low stock</h2>
                <Link href="/admin/products" className="text-sm text-[var(--color-brand-orange)] font-semibold hover:underline">Manage →</Link>
              </div>
              {stats.lowStock.length === 0 ? (
                <p className="text-gray-500 text-sm py-8 text-center">All products are healthy.</p>
              ) : (
                <ul className="space-y-3">
                  {stats.lowStock.map((p) => (
                    <li key={p.id} className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold truncate">{p.name}</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.stock === 0 ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                        {p.stock} left
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <p className="text-xs text-gray-400">Revenue in last 7 days: <b>{formatPrice(stats.weekTotal)}</b></p>
        </>
      )}
    </div>
  )
}

function StatCard({
  label, value, icon: Icon, accent,
}: {
  label: string
  value: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  accent?: boolean
}) {
  return (
    <div className={`bg-white rounded-[var(--radius-3xl)] p-5 shadow-sm border ${accent ? "border-[var(--color-brand-orange)]/30" : "border-black/5"}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{label}</span>
        <div className={`w-9 h-9 rounded-full flex items-center justify-center ${accent ? "bg-[var(--color-brand-orange)] text-white" : "bg-[var(--color-brand-gray)] text-black"}`}>
          <Icon size={16} />
        </div>
      </div>
      <p className="font-heading text-2xl md:text-3xl font-extrabold text-black">{value}</p>
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
