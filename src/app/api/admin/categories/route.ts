import { NextResponse } from "next/server"
import { isAdminRequest } from "@/lib/admin-auth"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

export async function GET() {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase.from("categories").select("*").order("sort_order", { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ categories: data ?? [] })
}

export async function POST(req: Request) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const body = await req.json()
  if (!body.name || !body.slug) return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase.from("categories").insert(body).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ category: data })
}
