'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPending(true)
    setError('')
    setSuccess(false)

    if (!email) {
      setError('Email is required')
      setIsPending(false)
      return
    }

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      })

      if (resetError) {
        setError(resetError.message)
      } else {
        setSuccess(true)
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Forgot Password</h1>
          <p className="text-sm text-gray-500 mt-2">Enter your email to receive a reset link</p>
        </div>

        {success ? (
          <div className="text-center">
            <div className="p-4 bg-green-50 text-green-800 rounded-xl border border-green-200 mb-6">
              <h3 className="font-bold text-lg mb-1">Check your email</h3>
              <p className="text-sm">We&apos;ve sent a password reset link to {email}.</p>
            </div>
            <a href="/admin/login" className="inline-block text-black font-semibold hover:underline">
              ← Back to Login
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-black"
                placeholder="admin@doggylobby.com"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-black text-white font-bold py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors focus:ring-4 focus:ring-gray-200 disabled:opacity-50"
            >
              {isPending ? 'Sending...' : 'Send Reset Link'}
            </button>
            
            <div className="text-center mt-4">
              <a href="/admin/login" className="text-sm font-semibold text-gray-500 hover:text-black transition-colors">
                ← Back to Login
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
