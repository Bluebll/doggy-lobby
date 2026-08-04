"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Save, Trash2 } from "lucide-react"
import ImageUploader from "@/components/admin/ImageUploader"
import type { Category, Product } from "@/types/domain"

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")

export default function ProductFormClient({
  product,
  categories,
}: {
  product?: Product
  categories: Category[]
}) {
  const router = useRouter()
  const editing = !!product

  const [name, setName] = useState(product?.name ?? "")
  const [slug, setSlug] = useState(product?.slug ?? "")
  const [description, setDescription] = useState(product?.description ?? "")
  const [price, setPrice] = useState<string>(product ? String(product.price) : "")
  const [comparePrice, setComparePrice] = useState<string>(product?.compare_at_price ? String(product.compare_at_price) : "")
  const [stock, setStock] = useState<string>(product ? String(product.stock) : "0")
  const [sku, setSku] = useState(product?.sku ?? "")
  const [categoryId, setCategoryId] = useState(product?.category_id ?? categories[0]?.id ?? "")
  const [brand, setBrand] = useState((product?.attributes as { brand?: string } | null)?.brand ?? "")
  const [images, setImages] = useState<string[]>(product?.images ?? [])
  const [isFeatured, setIsFeatured] = useState(product?.is_featured ?? false)
  const [isBestSeller, setIsBestSeller] = useState(product?.is_best_seller ?? false)
  const [isOnOffer, setIsOnOffer] = useState(product?.is_on_offer ?? false)
  const [isActive, setIsActive] = useState(product?.is_active ?? true)

  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true); setError(null)
    const body = {
      name: name.trim(),
      slug: (slug || slugify(name)).trim(),
      description: description.trim() || null,
      price: Number(price) || 0,
      compare_at_price: comparePrice ? Number(comparePrice) : null,
      stock: Math.max(0, Math.floor(Number(stock) || 0)),
      sku: sku.trim() || null,
      category_id: categoryId || null,
      attributes: brand.trim() ? { brand: brand.trim() } : {},
      images,
      is_featured: isFeatured,
      is_best_seller: isBestSeller,
      is_on_offer: isOnOffer,
      is_active: isActive,
    }
    try {
      const url = editing ? `/api/admin/products/${product!.id}` : `/api/admin/products`
      const method = editing ? "PATCH" : "POST"
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Save failed")
      router.push("/admin/products"); router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed")
    } finally { setSaving(false) }
  }

  const remove = async () => {
    if (!product) return
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return
    setDeleting(true); setError(null)
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Delete failed")
      router.push("/admin/products"); router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed")
      setDeleting(false)
    }
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <h3 className="font-heading text-lg font-extrabold text-black mb-4">Basic info</h3>
          <div className="space-y-4">
            <Field label="Name" required>
              <input required value={name} onChange={(e) => { setName(e.target.value); if (!editing) setSlug(slugify(e.target.value)) }} className={inputCls} />
            </Field>
            <Field label="Slug" required>
              <input required value={slug} onChange={(e) => setSlug(slugify(e.target.value))} className={inputCls} />
            </Field>
            <Field label="Description">
              <textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} className={inputCls + " resize-y"} />
            </Field>
          </div>
        </Card>

        <Card>
          <h3 className="font-heading text-lg font-extrabold text-black mb-4">Images</h3>
          <ImageUploader bucket="product-images" value={images} onChange={setImages} multiple />
        </Card>

        <Card>
          <h3 className="font-heading text-lg font-extrabold text-black mb-4">Pricing & inventory</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Price" required>
              <input required type="number" min={0} step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className={inputCls} />
            </Field>
            <Field label="Compare-at price">
              <input type="number" min={0} step="0.01" value={comparePrice} onChange={(e) => setComparePrice(e.target.value)} className={inputCls} />
            </Field>
            <Field label="Stock" required>
              <input required type="number" min={0} value={stock} onChange={(e) => setStock(e.target.value)} className={inputCls} />
            </Field>
            <Field label="SKU">
              <input value={sku} onChange={(e) => setSku(e.target.value)} className={inputCls} />
            </Field>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <h3 className="font-heading text-lg font-extrabold text-black mb-4">Organization</h3>
          <div className="space-y-4">
            <Field label="Category">
              <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={inputCls}>
                <option value="">— None —</option>
                {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
              </select>
            </Field>
            <Field label="Brand">
              <input value={brand} onChange={(e) => setBrand(e.target.value)} className={inputCls} />
            </Field>
          </div>
        </Card>

        <Card>
          <h3 className="font-heading text-lg font-extrabold text-black mb-4">Flags</h3>
          <div className="space-y-2">
            <Toggle checked={isActive} onChange={setIsActive} label="Active (visible in store)" />
            <Toggle checked={isFeatured} onChange={setIsFeatured} label="Featured" />
            <Toggle checked={isBestSeller} onChange={setIsBestSeller} label="Best seller" />
            <Toggle checked={isOnOffer} onChange={setIsOnOffer} label="On offer" />
          </div>
        </Card>

        {error && <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-2xl">{error}</p>}

        <div className="space-y-2">
          <button type="submit" disabled={saving} className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-black text-white font-semibold hover:bg-[var(--color-brand-orange)] transition-colors disabled:opacity-70">
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {editing ? "Save changes" : "Create product"}
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

const inputCls = "w-full px-4 py-3 rounded-2xl bg-[var(--color-brand-gray)] focus:bg-white focus:ring-2 focus:ring-black outline-none text-sm"

function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-white rounded-[var(--radius-3xl)] p-6 shadow-sm border border-black/5">{children}</div>
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 inline-block">{label}{required && <span className="text-[var(--color-brand-orange)]"> *</span>}</span>
      {children}
    </label>
  )
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (b: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer py-1">
      <span className={`relative w-10 h-6 rounded-full transition-colors ${checked ? "bg-black" : "bg-gray-300"}`}>
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${checked ? "translate-x-4" : "translate-x-0.5"}`} />
      </span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
      <span className="text-sm">{label}</span>
    </label>
  )
}
