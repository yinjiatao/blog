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
    <div className="bg-background min-h-screen">
      <SidebarWrapper categories={allCategories} />

      <main className="min-h-screen pt-16 lg:ml-[200px] lg:pt-0">
        <div className="mx-auto max-w-3xl px-6 py-12 lg:px-16 lg:py-16">
          <div className="animate-fade-in-up">
            <Link
              href={`/${locale}`}
              className="group text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              {t('article.back')}
            </Link>

            <header className="border-border mb-12 border-b pb-8">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-muted-foreground text-sm">{t('nav.categories')}</span>
                <span className="text-muted">/</span>
                <span className="text-muted-foreground font-mono text-xs tracking-wider uppercase">{category}</span>
              </div>
              <h1 className="text-foreground mb-3 font-serif text-3xl font-semibold">
                {t(`categoryNames.${category}`)}
              </h1>
              <p className="text-muted-foreground text-sm">
                {posts.length} {t('categories.articles')}
              </p>
            </header>

            {posts.length > 0 ? (
              <div className="space-y-0">
                {posts.map((post) => (
                  <article key={post.slug} className="group border-border border-b py-8 last:border-b-0">
                    <Link href={`/${locale}/articles/${post.slug}`} className="block">
                      <div className="mb-3 flex items-center gap-4">
                        <span className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
                          {t(`categoryNames.${post.category}`)}
                        </span>
                        <span className="text-muted text-xs">|</span>
                        <span className="text-muted-foreground text-xs">
                          {format.dateTime(new Date(post.date), {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      <h2 className="text-foreground group-hover:text-muted-foreground mb-3 font-serif text-xl leading-snug font-semibold transition-colors duration-200">
                        {post.title}
                      </h2>

                      <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">{post.excerpt}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-xs">
                          {t('article.readTime', { count: post.readTime })}
                        </span>
                        <span className="text-muted-foreground group-hover:text-foreground transition-all duration-200 group-hover:translate-x-1">
                          <ArrowRight size={16} />
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="text-muted-foreground">{t('noArticles')}</p>
              </div>
            )}

            <footer className="border-border mt-16 border-t pt-8 text-center">
              <p className="text-muted-foreground font-mono text-xs">{t('footer.copyright')}</p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  )
}
