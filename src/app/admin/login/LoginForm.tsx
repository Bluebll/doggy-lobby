'use client'

import { useActionState, useEffect, useState } from 'react'
import { loginAction } from '../actions'

const initialState = {
  error: ''
}

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('reset') === 'success') {
        setShowSuccess(true)
        window.history.replaceState({}, document.title, window.location.pathname)
      }
    }
  }, [])

  return (
    <form action={formAction} className="space-y-6">
      {showSuccess && (
        <div className="p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg text-center font-medium mb-4">
          Password updated successfully. Please sign in.
        </div>
      )}
      {state?.error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
          {state.error}
        </div>
      )}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
        <input
          name="email"
          type="email"
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-black"
          placeholder="admin@doggylobby.com"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-gray-700">Password</label>
          <a href="/admin/forgot-password" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">Forgot Password?</a>
        </div>
        <input
          name="password"
          type="password"
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-black"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-black text-white font-bold py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors focus:ring-4 focus:ring-gray-200 disabled:opacity-50"
      >
        {isPending ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  )
}
