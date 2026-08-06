"use client"

export default function BackButton() {
  return (
    <button 
      onClick={() => window.history.back()} 
      className="text-orange-600 mb-4 inline-block relative z-10 hover:underline cursor-pointer"
    >
      ← Back Home
    </button>
  )
}
