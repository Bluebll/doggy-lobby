import { NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const idsParam = (searchParams.get("ids") || "").trim()

  const supabase = await getSupabaseServer()
  if (!supabase) return NextResponse.json({ products: [] })

  if (idsParam) {
    const ids = idsParam.split(",").filter(Boolean).slice(0, 60)
    if (ids.length === 0) return NextResponse.json({ products: [] })
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .in("id", ids)
      .eq("is_active", true)
    if (error) return NextResponse.json({ products: [], error: error.message }, { status: 500 })
    return NextResponse.json({ products: data ?? [] })
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(48)
  if (error) return NextResponse.json({ products: [], error: error.message }, { status: 500 })
  return NextResponse.json({ products: data ?? [] })
}
