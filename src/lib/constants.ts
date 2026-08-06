// Env-driven store constants. Never hardcode brand/currency/phone.

export const STORE_NAME =
  process.env.NEXT_PUBLIC_STORE_NAME || 'Doggy Lobby'

export const CURRENCY =
  process.env.NEXT_PUBLIC_STORE_CURRENCY || 'INR'

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''

/** Format a numeric price using the configured currency (Indian locale by default). */
export function formatPrice(value: number | string | null | undefined): string {
  const n = typeof value === 'number' ? value : Number(value ?? 0)
  if (!Number.isFinite(n)) return ''
  try {
    const locale = CURRENCY === 'INR' ? 'en-IN' : undefined
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: CURRENCY,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(n)
  } catch {
    const val = Number.isInteger(n) ? n.toString() : n.toFixed(2).replace(/\.?0+$/, '')
    return `${CURRENCY} ${val}`
  }
}
