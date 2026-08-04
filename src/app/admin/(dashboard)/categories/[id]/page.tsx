import Link from "next/link"
import { notFound } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase/server"
import CategoryFormClient from "@/components/admin/CategoryFormClient"
import { ArrowLeft } from "lucide-react"
import type { Category } from "@/types/domain"

export const dynamic = "force-dynamic"

async function loadCategory(id: string): Promise<Category | null> {
  const supabase = await getSupabaseServer()
  if (!supabase) return null
  const { data } = await supabase.from("categories").select("*").eq("id", id).maybeSingle()
  return (data as Category) ?? null
}

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const category = await loadCategory(id)
  if (!category) notFound()
  return (
    <div className="space-y-6">
      <Link href="/admin/categories" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black">
        <ArrowLeft size={14} /> Back to categories
      </Link>
      <div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-black">Edit category</h1>
        <p className="text-gray-500 text-sm mt-1">{category.name}</p>
      </div>
      <CategoryFormClient category={category} />
    </div>
  )
}
