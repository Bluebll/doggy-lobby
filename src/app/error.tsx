"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-6 py-24">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={28} />
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-black mb-3">Something went wrong.</h1>
        <p className="text-gray-500 mb-8">An unexpected error occurred. Please try again.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={reset} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-[var(--color-brand-orange)] transition-colors">
            <RefreshCw size={16} /> Try again
          </button>
          <Link href="/" className="inline-flex items-center px-6 py-3 rounded-full bg-[var(--color-brand-gray)] text-black font-semibold hover:bg-black hover:text-white transition-colors">Back home</Link>
        </div>
      </div>
    </section>
  )
}
