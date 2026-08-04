import Link from "next/link"
import { getCategories } from "@/lib/queries/categories"
import ProductFormClient from "@/components/admin/ProductFormClient"
import { ArrowLeft } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function NewProductPage() {
  const categories = await getCategories()
  return (
    <div className="space-y-6">
      <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black">
        <ArrowLeft size={14} /> Back to products
      </Link>
      <div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-black">New product</h1>
        <p className="text-gray-500 text-sm mt-1">Add a product to your catalog.</p>
      </div>
      <ProductFormClient categories={categories} />
    </div>
  )
}
