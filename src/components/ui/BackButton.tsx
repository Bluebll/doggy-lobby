"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function BackButton({ fallback = '/' }: { fallback?: string }) {
  const router = useRouter()
  const [canGoBack, setCanGoBack] = useState(false)

  useEffect(() => {
    // Basic check if there's history in the app
    setCanGoBack(window.history.length > 1)
  }, [])

  return (
    <button 
      onClick={() => {
        if (canGoBack && document.referrer.includes(window.location.host)) {
          router.back()
        } else {
          router.push(fallback)
        }
      }}
      className="text-orange-600 mb-4 inline-flex items-center gap-1 relative z-10 hover:underline cursor-pointer min-h-[44px] min-w-[44px] px-2 py-1 bg-white/50 backdrop-blur-sm rounded"
    >
      ← Back
    </button>
  )
}
