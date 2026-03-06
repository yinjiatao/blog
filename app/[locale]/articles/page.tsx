import { getTranslations, getFormatter } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllPosts, getAllCategories } from '@/lib/posts'
import { SidebarWrapper } from '@/components/blog/SidebarWrapper'
import { routing } from '@/i18n/routing'

interface ArticlesPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function ArticlesPage({ params, searchParams }: ArticlesPageProps) {
  const { locale } = await params
  const { category: selectedCategory } = await searchParams
  const t = await getTranslations()
  const format = await getFormatter()

  const allPosts = getAllPosts(locale)
  const allCategories = getAllCategories(locale)

  // Filter posts by category if selected
  const posts = selectedCategory
    ? allPosts.filter((post) => post.category === selectedCategory)
    : allPosts

  return (
    <div className="bg-background min-h-screen">
      <SidebarWrapper categories={allCategories} />

      <main className="min-h-screen pt-16 lg:ml-[200px] lg:pt-0">
        <div className="mx-auto max-w-3xl px-6 py-12 lg:px-16 lg:py-16">
          <div className="animate-fade-in-up">
            <header className="border-border mb-8 border-b pb-8">
              <h1 className="text-foreground mb-3 font-serif text-3xl font-semibold">
                {t('allArticles')}
              </h1>
              <p className="text-muted-foreground text-sm">
                {posts.length} {t('categories.articles')}
              </p>
            </header>

            {/* Category Filter */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/${locale}/articles`}
                  className={`rounded-full px-3 py-1.5 font-mono text-xs tracking-wider uppercase transition-colors ${
                    !selectedCategory
                      ? 'bg-foreground text-background'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {t('filterAll')}
                </Link>
                {allCategories.map((category) => (
                  <Link
                    key={category}
                    href={`/${locale}/articles?category=${encodeURIComponent(category)}`}
                    className={`rounded-full px-3 py-1.5 font-mono text-xs tracking-wider uppercase transition-colors ${
                      selectedCategory === category
                        ? 'bg-foreground text-background'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {t(`categoryNames.${category}`)}
                  </Link>
                ))}
              </div>
            </div>

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

                      <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>

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
