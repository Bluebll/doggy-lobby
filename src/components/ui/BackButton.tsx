"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function BackButton({ fallback = '/' }: { fallback?: string }) {
  const router = useRouter()
  const [canGoBack, setCanGoBack] = useState(false)

  useEffect(() => {
    const pagesViewed = parseInt(sessionStorage.getItem('pages_viewed') || '0', 10)
    if (pagesViewed === 0) {
      sessionStorage.setItem('pages_viewed', '1')
    } else {
      sessionStorage.setItem('pages_viewed', (pagesViewed + 1).toString())
    }
    
    // If they have viewed more than 1 page in this session, or the referrer is our site, we can safely go back
    if (pagesViewed > 0 || document.referrer.includes(window.location.host)) {
      setCanGoBack(true)
    }
  }, [])

  return (
    <button 
      onClick={() => {
        if (canGoBack) {
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
