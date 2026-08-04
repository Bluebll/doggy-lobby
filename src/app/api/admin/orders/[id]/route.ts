import { NextResponse } from "next/server"
import { isAdminRequest } from "@/lib/admin-auth"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

const ALLOWED = new Set(["pending", "confirmed", "delivered", "cancelled"])

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  if (!ALLOWED.has(body.status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 })
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase.from("orders").update({ status: body.status }).eq("id", id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ order: data })
}
