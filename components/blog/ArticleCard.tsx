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
      className="group animate-fade-in-up border-border border-b py-8 last:border-b-0"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Link href={`/${locale}/articles/${post.slug}`} className="block">
        <div className="mb-3 flex items-center gap-4">
          <span className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
            {t(`categoryNames.${post.category}`)}
          </span>
          <span className="text-muted text-xs">|</span>
          <span className="text-muted-foreground text-xs">{formattedDate}</span>
        </div>

        <h2 className="text-foreground group-hover:text-muted-foreground mb-3 font-serif text-xl leading-snug font-semibold transition-colors duration-200">
          {post.title}
        </h2>

        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs">{t('article.readTime', { count: post.readTime })}</span>
          <span className="text-muted-foreground group-hover:text-foreground transition-all duration-200 group-hover:translate-x-1">
            <ArrowRight size={16} />
          </span>
        </div>
      </Link>
    </article>
  )
}
