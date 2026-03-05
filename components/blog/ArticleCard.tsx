'use client'

import Link from 'next/link'
import { useLocale, useTranslations, useFormatter } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import type { PostFrontmatter } from '@/lib/posts'

interface ArticleCardProps {
  post: PostFrontmatter
  index?: number
}

export function ArticleCard({ post, index = 0 }: ArticleCardProps) {
  const locale = useLocale()
  const t = useTranslations()
  const format = useFormatter()

  const formattedDate = format.dateTime(new Date(post.date), {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <article
      className="group animate-fade-in-up border-b border-gray-200 py-8 last:border-b-0"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Link href={`/${locale}/articles/${post.slug}`} className="block">
        <div className="mb-3 flex items-center gap-4">
          <span className="font-mono text-xs tracking-wider text-gray-400 uppercase">
            {t(`categoryNames.${post.category}`)}
          </span>
          <span className="text-xs text-gray-300">|</span>
          <span className="text-xs text-gray-400">{formattedDate}</span>
        </div>

        <h2 className="mb-3 font-serif text-xl leading-snug font-semibold text-gray-900 transition-colors duration-200 group-hover:text-gray-700">
          {post.title}
        </h2>

        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">{t('article.readTime', { count: post.readTime })}</span>
          <span className="text-gray-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-gray-900">
            <ArrowRight size={16} />
          </span>
        </div>
      </Link>
    </article>
  )
}
