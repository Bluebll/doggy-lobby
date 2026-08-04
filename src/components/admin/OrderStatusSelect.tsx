"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import type { OrderStatus } from "@/types/domain"

const OPTIONS: OrderStatus[] = ["pending", "confirmed", "delivered", "cancelled"]

export default function OrderStatusSelect({ orderId, initial }: { orderId: string; initial: OrderStatus }) {
  const router = useRouter()
  const [status, setStatus] = useState<OrderStatus>(initial)
  const [saving, setSaving] = useState(false)

  const update = async (next: OrderStatus) => {
    setStatus(next); setSaving(true)
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      })
      if (!res.ok) throw new Error("Failed")
      router.refresh()
    } catch {
      setStatus(initial)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="inline-flex items-center gap-2 bg-white rounded-full border border-black/10 pl-4 pr-2 py-2 shadow-sm">
      <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Status</span>
      <select
        value={status}
        onChange={(e) => update(e.target.value as OrderStatus)}
        disabled={saving}
        className="bg-transparent text-sm font-semibold outline-none cursor-pointer capitalize pr-2"
      >
        {OPTIONS.map((s) => (<option key={s} value={s} className="capitalize">{s}</option>))}
      </select>
      {saving && <Loader2 size={14} className="animate-spin text-gray-400" />}
    </div>
  )
}
