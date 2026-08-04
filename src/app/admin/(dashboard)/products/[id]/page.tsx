import Link from "next/link"
import { getSupabaseServer } from "@/lib/supabase/server"
import { getCategories } from "@/lib/queries/categories"
import ProductFormClient from "@/components/admin/ProductFormClient"
import { ArrowLeft } from "lucide-react"
import type { Product } from "@/types/domain"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

async function loadProduct(id: string): Promise<Product | null> {
  const supabase = await getSupabaseServer()
  if (!supabase) return null
  const { data } = await supabase.from("products").select("*").eq("id", id).maybeSingle()
  return (data as Product) ?? null
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [product, categories] = await Promise.all([loadProduct(id), getCategories()])
  if (!product) notFound()

  return (
    <div className="space-y-6">
      <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black">
        <ArrowLeft size={14} /> Back to products
      </Link>
      <div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-black">Edit product</h1>
        <p className="text-gray-500 text-sm mt-1">{product.name}</p>
      </div>
      <ProductFormClient product={product} categories={categories} />
    </div>
  )
}
