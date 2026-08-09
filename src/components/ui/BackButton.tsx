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
      className="inline-flex items-center justify-center gap-2 relative z-10 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 transition-colors cursor-pointer px-4 py-2 rounded-full border border-gray-200 shadow-sm bg-white"
    >
      ← Back
    </button>
  )
}
