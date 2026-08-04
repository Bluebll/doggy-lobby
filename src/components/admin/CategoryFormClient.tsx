"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Save, Trash2 } from "lucide-react"
import ImageUploader from "@/components/admin/ImageUploader"
import type { Category } from "@/types/domain"

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")

export default function CategoryFormClient({ category }: { category?: Category }) {
  const router = useRouter()
  const editing = !!category
  const [name, setName] = useState(category?.name ?? "")
  const [slug, setSlug] = useState(category?.slug ?? "")
  const [description, setDescription] = useState(category?.description ?? "")
  const [image, setImage] = useState<string[]>(category?.image_url ? [category.image_url] : [])
  const [sortOrder, setSortOrder] = useState<string>(category ? String(category.sort_order) : "0")
  const [isActive, setIsActive] = useState(category?.is_active ?? true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const inputCls = "w-full px-4 py-3 rounded-2xl bg-[var(--color-brand-gray)] focus:bg-white focus:ring-2 focus:ring-black outline-none text-sm"

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true); setError(null)
    const body = {
      name: name.trim(),
      slug: (slug || slugify(name)).trim(),
      description: description.trim() || null,
      image_url: image[0] ?? null,
      sort_order: Number(sortOrder) || 0,
      is_active: isActive,
    }
    try {
      const url = editing ? `/api/admin/categories/${category!.id}` : `/api/admin/categories`
      const method = editing ? "PATCH" : "POST"
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Save failed")
      router.push("/admin/categories"); router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed")
    } finally { setSaving(false) }
  }

  const remove = async () => {
    if (!category) return
    if (!confirm(`Delete "${category.name}"?`)) return
    setDeleting(true); setError(null)
    try {
      const res = await fetch(`/api/admin/categories/${category.id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Delete failed")
      router.push("/admin/categories"); router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed")
      setDeleting(false)
    }
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-[var(--radius-3xl)] p-6 shadow-sm border border-black/5 space-y-4">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 inline-block">Name <span className="text-[var(--color-brand-orange)]">*</span></span>
            <input required value={name} onChange={(e) => { setName(e.target.value); if (!editing) setSlug(slugify(e.target.value)) }} className={inputCls} />
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 inline-block">Slug <span className="text-[var(--color-brand-orange)]">*</span></span>
            <input required value={slug} onChange={(e) => setSlug(slugify(e.target.value))} className={inputCls} />
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 inline-block">Description</span>
            <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className={inputCls + " resize-y"} />
          </label>
        </div>

        <div className="bg-white rounded-[var(--radius-3xl)] p-6 shadow-sm border border-black/5">
          <h3 className="font-heading text-lg font-extrabold text-black mb-4">Image</h3>
          <ImageUploader bucket="category-images" value={image} onChange={setImage} />
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-[var(--radius-3xl)] p-6 shadow-sm border border-black/5 space-y-4">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 inline-block">Sort order</span>
            <input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className={inputCls} />
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <span className={`relative w-10 h-6 rounded-full transition-colors ${isActive ? "bg-black" : "bg-gray-300"}`}>
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${isActive ? "translate-x-4" : "translate-x-0.5"}`} />
            </span>
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="sr-only" />
            <span className="text-sm">Active</span>
          </label>
        </div>

        {error && <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-2xl">{error}</p>}

        <div className="space-y-2">
          <button type="submit" disabled={saving} className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-black text-white font-semibold hover:bg-[var(--color-brand-orange)] transition-colors disabled:opacity-70">
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {editing ? "Save changes" : "Create category"}
          </button>
          {editing && (
            <button type="button" onClick={remove} disabled={deleting} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-red-50 text-red-700 font-semibold hover:bg-red-100 transition-colors disabled:opacity-70">
              {deleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
              Delete
            </button>
          )}
        </div>
      </div>
    </form>
  )
}
