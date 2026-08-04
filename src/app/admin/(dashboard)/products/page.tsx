import Link from "next/link"
import { getSupabaseServer } from "@/lib/supabase/server"
import { formatPrice } from "@/lib/constants"
import { Plus, Pencil } from "lucide-react"

export const dynamic = "force-dynamic"

async function loadProducts() {
  const supabase = await getSupabaseServer()
  if (!supabase) return []
  const { data } = await supabase
    .from("products")
    .select("id,name,slug,price,stock,is_active,images,category_id,updated_at")
    .order("updated_at", { ascending: false })
    .limit(200)
  return data ?? []
}

export default async function AdminProductsPage() {
  const products = await loadProducts()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-black">Products</h1>
          <p className="text-gray-500 text-sm mt-1">{products.length} product{products.length === 1 ? "" : "s"}</p>
        </div>
        <Link href="/admin/products/new" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-[var(--color-brand-orange)] transition-colors">
          <Plus size={16} /> New product
        </Link>
      </div>

      <div className="bg-white rounded-[var(--radius-3xl)] shadow-sm border border-black/5 overflow-hidden">
        {products.length === 0 ? (
          <p className="text-gray-500 text-sm p-10 text-center">No products yet. Create your first one.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-black/5 bg-[var(--color-brand-gray)]">
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-black/5 last:border-0 hover:bg-[var(--color-brand-gray)]/40">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[var(--color-brand-gray)] shrink-0">
                          {p.images?.[0] && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={p.images[0]} alt="" className="absolute inset-0 w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-black truncate">{p.name}</p>
                          <p className="text-xs text-gray-400 truncate">/{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold">{formatPrice(p.price)}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.stock === 0 ? "bg-red-100 text-red-700" : p.stock < 5 ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${p.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {p.is_active ? "Active" : "Draft"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link href={`/admin/products/${p.id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-black hover:text-[var(--color-brand-orange)]">
                        <Pencil size={14} /> Edit
                      </Link>
                    </td>
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
