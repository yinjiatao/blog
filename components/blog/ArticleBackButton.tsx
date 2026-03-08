'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ArticleBackButtonProps {
  locale: string
  label: string
}

export function ArticleBackButton({ locale, label }: ArticleBackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (window.history.length > 1) {
      router.back()
      return
    }

    router.push(`/${locale}/articles`)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors"
    >
      <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
      {label}
    </button>
  )
}
