import Link from "next/link"
import CategoryFormClient from "@/components/admin/CategoryFormClient"
import { ArrowLeft } from "lucide-react"

export const dynamic = "force-dynamic"

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/categories" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black">
        <ArrowLeft size={14} /> Back to categories
      </Link>
      <div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-black">New category</h1>
      </div>
      <CategoryFormClient />
    </div>
  )
}
