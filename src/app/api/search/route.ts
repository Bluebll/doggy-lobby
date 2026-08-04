import { NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get("q") || "").trim()
  const limit = Math.min(Number(searchParams.get("limit") || 8), 20)

  if (!q) return NextResponse.json({ products: [] })

  const supabase = await getSupabaseServer()
  if (!supabase) return NextResponse.json({ products: [] })

  const like = `%${q}%`
  const { data, error } = await supabase
    .from("products")
    .select("id,slug,name,price,images,attributes")
    .eq("is_active", true)
    .or(`name.ilike.${like},description.ilike.${like}`)
    .limit(limit)

  if (error) return NextResponse.json({ products: [], error: error.message }, { status: 500 })
  return NextResponse.json({ products: data ?? [] })
}
