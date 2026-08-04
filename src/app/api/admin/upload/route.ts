import { NextResponse } from "next/server"
import { isAdminRequest } from "@/lib/admin-auth"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

const ALLOWED_BUCKETS = new Set(["product-images", "category-images"])
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(req: Request) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const form = await req.formData()
    const file = form.get("file") as File | null
    const bucket = String(form.get("bucket") || "")
    if (!file) return NextResponse.json({ error: "Missing file" }, { status: 400 })
    if (!ALLOWED_BUCKETS.has(bucket)) return NextResponse.json({ error: "Invalid bucket" }, { status: 400 })
    if (file.size > MAX_SIZE) return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 })
    if (!file.type.startsWith("image/")) return NextResponse.json({ error: "Only images allowed" }, { status: 400 })

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg"
    const key = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

    const supabase = getSupabaseAdmin()
    const arrayBuf = await file.arrayBuffer()
    const { error: upErr } = await supabase.storage
      .from(bucket)
      .upload(key, arrayBuf, { contentType: file.type, upsert: false })
    if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 })

    const { data: pub } = supabase.storage.from(bucket).getPublicUrl(key)
    return NextResponse.json({ url: pub.publicUrl, key })
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Upload failed"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
