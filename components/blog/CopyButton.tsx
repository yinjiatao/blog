'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Copy, Check } from 'lucide-react'
import type { Post } from '@/lib/posts'

interface CopyButtonProps {
  post: Post
}

export function CopyButton({ post }: CopyButtonProps) {
  const t = useTranslations('article')
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      const text = `${post.title}\n\n${post.excerpt}\n\n${post.content}`
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      alert(t('copyError'))
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-sm px-2 py-1 text-xs text-gray-500 ring ring-gray-200 transition-all hover:text-gray-700 hover:ring-gray-400"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? t('copied') : t('copy')}
    </button>
  )
}
