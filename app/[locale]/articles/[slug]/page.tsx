import { notFound } from 'next/navigation'
import { getTranslations, getFormatter } from 'next-intl/server'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getPostBySlug, getAllPosts, getAllSlugs, getAllCategories } from '@/lib/posts'
import { SidebarWrapper } from '@/components/blog/SidebarWrapper'
import { CopyButton } from '@/components/blog/CopyButton'
import { MarkdownContent } from '@/components/blog/MarkdownContent'
import { routing } from '@/i18n/routing'

interface ArticlePageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const params = []
  for (const locale of routing.locales) {
    const slugs = getAllSlugs(locale)
    for (const slug of slugs) {
      params.push({ locale, slug })
    }
  }
  return params
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params
  const t = await getTranslations()
  const format = await getFormatter()
  const categories = getAllCategories(locale)

  const post = getPostBySlug(slug, locale)
  if (!post) notFound()

  const allPosts = getAllPosts(locale)
  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  const formattedDate = format.dateTime(new Date(post.date), {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="min-h-screen bg-white">
      <SidebarWrapper categories={categories} />

      <main className="min-h-screen pt-16 lg:ml-[200px] lg:pt-0">
        <div className="mx-auto max-w-3xl px-6 py-12 lg:px-16 lg:py-16">
          <article className="animate-fade-in-up">
            <Link
              href={`/${locale}`}
              className="group mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              {t('article.back')}
            </Link>

            <header className="mb-10 border-b border-gray-200 pb-8">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs tracking-wider text-gray-400 uppercase">
                  {t(`categoryNames.${post.category}`)}
                </span>
                <span className="text-xs text-gray-300">|</span>
                <span className="text-xs text-gray-400">{formattedDate}</span>
                <span className="text-xs text-gray-300">|</span>
                <span className="text-xs text-gray-400">{t('article.readTime', { count: post.readTime })}</span>
              </div>

              <h1 className="mb-6 font-serif text-2xl leading-tight font-semibold text-gray-900 md:text-3xl">
                {post.title}
              </h1>

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{t('article.tags')}:</span>
                  <span className="rounded-sm bg-gray-100 px-2 py-1 text-xs text-gray-600">
                    {t(`categoryNames.${post.category}`)}
                  </span>
                </div>
                <CopyButton post={post} />
              </div>
            </header>

            <div className="article-content">
              <p className="mb-8 font-serif text-lg leading-relaxed text-gray-600">{post.excerpt}</p>
              <MarkdownContent content={post.content} />
            </div>

            <footer className="mt-16 border-t border-gray-200 pt-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {prevPost ? (
                  <Link
                    href={`/${locale}/articles/${prevPost.slug}`}
                    className="group flex items-start gap-3 text-left"
                  >
                    <ArrowLeft
                      size={18}
                      className="mt-0.5 hidden text-gray-400 transition-all group-hover:-translate-x-1 group-hover:text-gray-900 sm:inline-flex"
                    />
                    <div>
                      <span className="mb-1 block text-xs text-gray-400">{t('article.prev')}</span>
                      <span className="line-clamp-1 text-sm text-gray-700 transition-colors group-hover:text-gray-900">
                        {prevPost.title}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}

                {nextPost ? (
                  <Link
                    href={`/${locale}/articles/${nextPost.slug}`}
                    className="group flex items-start gap-3 sm:flex-row-reverse sm:text-right"
                  >
                    <ArrowRight
                      size={18}
                      className="mt-0.5 hidden text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-gray-900 sm:inline-flex"
                    />
                    <div>
                      <span className="mb-1 block text-xs text-gray-400">{t('article.next')}</span>
                      <span className="line-clamp-1 text-sm text-gray-700 transition-colors group-hover:text-gray-900">
                        {nextPost.title}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </footer>
          </article>
        </div>
      </main>
    </div>
  )
}
