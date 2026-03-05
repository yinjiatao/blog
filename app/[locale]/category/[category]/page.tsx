import { notFound } from 'next/navigation'
import { getTranslations, getFormatter } from 'next-intl/server'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getPostsByCategory, getAllCategories } from '@/lib/posts'
import { SidebarWrapper } from '@/components/blog/SidebarWrapper'
import { routing } from '@/i18n/routing'

interface CategoryPageProps {
  params: Promise<{ locale: string; category: string }>
}

export async function generateStaticParams() {
  const params = []
  for (const locale of routing.locales) {
    const categories = getAllCategories(locale)
    for (const category of categories) {
      params.push({ locale, category: encodeURIComponent(category) })
    }
  }
  return params
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, category: encodedCategory } = await params
  const category = decodeURIComponent(encodedCategory)
  const t = await getTranslations()
  const format = await getFormatter()
  const allCategories = getAllCategories(locale)

  if (!allCategories.includes(category)) notFound()

  const posts = getPostsByCategory(category, locale)

  return (
    <div className="min-h-screen bg-white">
      <SidebarWrapper categories={allCategories} />

      <main className="min-h-screen pt-16 lg:ml-[200px] lg:pt-0">
        <div className="mx-auto max-w-3xl px-6 py-12 lg:px-16 lg:py-16">
          <div className="animate-fade-in-up">
            <Link
              href={`/${locale}`}
              className="group mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              {t('article.back')}
            </Link>

            <header className="mb-12 border-b border-gray-200 pb-8">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-sm text-gray-400">{t('nav.categories')}</span>
                <span className="text-gray-300">/</span>
                <span className="font-mono text-xs tracking-wider text-gray-400 uppercase">{category}</span>
              </div>
              <h1 className="mb-3 font-serif text-3xl font-semibold text-gray-900">{t(`categoryNames.${category}`)}</h1>
              <p className="text-sm text-gray-500">
                {posts.length} {t('categories.articles')}
              </p>
            </header>

            {posts.length > 0 ? (
              <div className="space-y-0">
                {posts.map((post) => (
                  <article key={post.slug} className="group border-b border-gray-200 py-8 last:border-b-0">
                    <Link href={`/${locale}/articles/${post.slug}`} className="block">
                      <div className="mb-3 flex items-center gap-4">
                        <span className="font-mono text-xs tracking-wider text-gray-400 uppercase">
                          {t(`categoryNames.${post.category}`)}
                        </span>
                        <span className="text-xs text-gray-300">|</span>
                        <span className="text-xs text-gray-400">
                          {format.dateTime(new Date(post.date), {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
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
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="text-gray-400">{t('noArticles')}</p>
              </div>
            )}

            <footer className="mt-16 border-t border-gray-200 pt-8 text-center">
              <p className="font-mono text-xs text-gray-400">{t('footer.copyright')}</p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  )
}
