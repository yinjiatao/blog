'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export function NewsletterForm() {
  const t = useTranslations('newsletter')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setMessage(t('invalidEmail'))
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setMessage(t('success'))
        setEmail('')
      } else {
        setStatus('error')
        setMessage(t('error'))
      }
    } catch {
      setStatus('error')
      setMessage(t('error'))
    }
  }

  return (
    <div>
      <form className="flex gap-3" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('placeholder')}
          disabled={status === 'loading' || status === 'success'}
          className="flex-1 rounded-sm border border-gray-200 px-4 py-2 text-sm transition-colors focus:border-gray-400 focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="rounded-sm bg-gray-900 px-6 py-2 text-sm text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === 'loading' ? '...' : t('button')}
        </button>
      </form>
      {message && (
        <p className={`mt-2 text-xs ${status === 'success' ? 'text-green-600' : 'text-red-500'}`}>{message}</p>
      )}
    </div>
  )
}
