"use client"
import { useState, useEffect } from "react"
import { reviewsContent } from "@/config/content"

const reviews = reviewsContent

export default function Reviews() {
  const [index, setIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    if (!mounted) return
    const timer = setInterval(() => { setIndex(p => (p + 1) % 15) }, 5000)
    return () => clearInterval(timer)
  }, [mounted])

  if (!mounted) return null

  return (
    <section className="py-32 bg-gray-50">
      <div className="container mx-auto px-6 text-center mb-12">
        <h3 className="text-5xl font-bold text-black mb-2">Google Reviews</h3>
        <p className="text-gray-600">4.9/5 from 70+ customers</p>
      </div>
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-lg">
          <p className="text-xl text-black mb-4">{reviews[index].text}</p>
          <h4 className="font-bold text-black">{reviews[index].name}</h4>
          <p className="text-gray-600 text-sm">{reviews[index].date}</p>
          <div className="flex gap-2 justify-center mt-6">
            {reviews.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} className={i === index ? "h-2 w-6 bg-orange-500 rounded-full" : "h-2 w-2 bg-gray-300 rounded-full"} />
            ))}
          </div>
          <p className="text-center text-gray-500 text-xs mt-4">{index + 1} of 15</p>
        </div>
      </div>
    </section>
  )
}
