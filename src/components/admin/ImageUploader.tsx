"use client"

import { useState } from "react"
import { Upload, X, Loader2 } from "lucide-react"

interface Props {
  bucket: "product-images" | "category-images"
  value: string[]
  onChange: (urls: string[]) => void
  multiple?: boolean
}

export default function ImageUploader({ bucket, value, onChange, multiple = false }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const upload = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setUploading(true); setError(null)
    const uploaded: string[] = []
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData()
        fd.append("file", file)
        fd.append("bucket", bucket)
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Upload failed")
        uploaded.push(data.url)
      }
      onChange(multiple ? [...value, ...uploaded] : uploaded.slice(0, 1))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const remove = (url: string) => onChange(value.filter((u) => u !== url))

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-3">
        {value.map((url) => (
          <div key={url} className="relative w-24 h-24 rounded-xl overflow-hidden bg-[var(--color-brand-gray)] group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <button type="button" onClick={() => remove(url)} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Remove image">
              <X size={12} />
            </button>
          </div>
        ))}
        <label className="w-24 h-24 rounded-xl bg-[var(--color-brand-gray)] hover:bg-black hover:text-white transition-colors flex flex-col items-center justify-center gap-1 cursor-pointer border-2 border-dashed border-black/10">
          {uploading ? <Loader2 size={20} className="animate-spin" /> : <Upload size={20} />}
          <span className="text-[10px] font-semibold">{uploading ? "Uploading" : multiple ? "Add" : "Upload"}</span>
          <input type="file" accept="image/*" multiple={multiple} disabled={uploading} onChange={(e) => upload(e.target.files)} className="hidden" />
        </label>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
