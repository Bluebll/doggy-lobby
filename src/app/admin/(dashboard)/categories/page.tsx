import Link from "next/link"
import { getSupabaseServer } from "@/lib/supabase/server"
import { Plus, Pencil } from "lucide-react"

export const dynamic = "force-dynamic"

async function loadCategories() {
  const supabase = await getSupabaseServer()
  if (!supabase) return []
  const { data } = await supabase
    .from("categories")
    .select("id,name,slug,image_url,sort_order,is_active,updated_at")
    .order("sort_order", { ascending: true })
  return data ?? []
}

export default async function AdminCategoriesPage() {
  const categories = await loadCategories()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-black">Categories</h1>
          <p className="text-gray-500 text-sm mt-1">{categories.length} categor{categories.length === 1 ? "y" : "ies"}</p>
        </div>
        <Link href="/admin/categories/new" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-[var(--color-brand-orange)] transition-colors">
          <Plus size={16} /> New category
        </Link>
      </div>

      <div className="bg-white rounded-[var(--radius-3xl)] shadow-sm border border-black/5 overflow-hidden">
        {categories.length === 0 ? (
          <p className="text-gray-500 text-sm p-10 text-center">No categories yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-black/5 bg-[var(--color-brand-gray)]">
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Order</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c.id} className="border-b border-black/5 last:border-0 hover:bg-[var(--color-brand-gray)]/40">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[var(--color-brand-gray)] shrink-0">
                          {c.image_url && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={c.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-black">{c.name}</p>
                          <p className="text-xs text-gray-400">/{c.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{c.sort_order}</td>
                    <td className="py-3 px-4">
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${c.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {c.is_active ? "Active" : "Draft"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link href={`/admin/categories/${c.id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-black hover:text-[var(--color-brand-orange)]">
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
