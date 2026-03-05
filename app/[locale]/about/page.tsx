import { getTranslations } from 'next-intl/server'
import { getAllCategories } from '@/lib/posts'
import { SidebarWrapper } from '@/components/blog/SidebarWrapper'
import { NewsletterForm } from '@/components/blog/NewsletterForm'
import { Mail, BookOpen, Sparkles, TrendingUp } from 'lucide-react'

interface AboutPageProps {
  params: Promise<{ locale: string }>
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  const t = await getTranslations()
  const categories = getAllCategories(locale)

  const timeline = ['2023', '2024', '2025', '2026'] as const

  const services = [
    { icon: BookOpen, titleKey: 'about.content.title', descKey: 'about.content.desc' },
    { icon: Sparkles, titleKey: 'about.product.title', descKey: 'about.product.desc' },
    { icon: TrendingUp, titleKey: 'about.consulting.title', descKey: 'about.consulting.desc' },
    { icon: Mail, titleKey: 'about.newsletterDesc.title', descKey: 'about.newsletterDesc.desc' },
  ] as const

  return (
    <div className="min-h-screen bg-white">
      <SidebarWrapper categories={categories} />

      <main className="min-h-screen pt-16 lg:ml-[200px] lg:pt-0">
        <div className="mx-auto max-w-3xl px-6 py-12 lg:px-16 lg:py-16">
          <div className="animate-fade-in-up">
            <header className="mb-12 border-b border-gray-200 pb-8">
              <h1 className="mb-3 font-serif text-2xl font-semibold text-gray-900">{t('about.title')}</h1>
            </header>

            {/* Profile */}
            <section className="mb-16">
              <div className="mb-8 flex flex-col items-start gap-8 sm:flex-row">
                <div className="shrink-0">
                  <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-sm bg-gray-200">
                    <span className="font-serif text-3xl text-gray-500">韬</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="mb-4 font-serif text-xl font-semibold text-gray-900">{t('about.role')}</h2>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">{t('about.bio1')}</p>
                  <p className="text-sm leading-relaxed text-gray-600">{t('about.bio2')}</p>
                </div>
              </div>
            </section>

            {/* What I Do */}
            <section className="mb-16">
              <h2 className="mb-6 font-serif text-lg font-semibold text-gray-900">{t('about.whatIDo')}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="rounded-sm border border-gray-200 p-4 transition-colors hover:border-gray-400"
                  >
                    <service.icon size={20} className="mb-3 text-gray-400" />
                    <h3 className="mb-2 font-medium text-gray-900">{t(service.titleKey)}</h3>
                    <p className="text-xs leading-relaxed text-gray-500">{t(service.descKey)}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Timeline */}
            <section className="mb-16">
              <h2 className="mb-6 font-serif text-lg font-semibold text-gray-900">{t('about.timeline.title')}</h2>
              <div className="relative ml-2 space-y-8 border-l border-gray-200">
                {timeline.map((year) => (
                  <div key={year} className="group relative pl-6">
                    <div className="absolute top-1.5 left-[-5px] h-2.5 w-2.5 rounded-full bg-gray-300 transition-colors group-hover:bg-gray-900" />
                    <div className="mb-1 font-mono text-xs text-gray-400">{year}</div>
                    <h3 className="mb-1 font-medium text-gray-900">{t(`about.timeline.${year}.title`)}</h3>
                    <p className="text-sm leading-relaxed text-gray-500">{t(`about.timeline.${year}.desc`)}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact */}
            <section className="mb-16">
              <h2 className="mb-6 font-serif text-lg font-semibold text-gray-900">{t('about.contact.title')}</h2>
              <p className="mb-6 text-sm leading-relaxed text-gray-600">{t('about.contact.desc')}</p>
              <div className="flex items-center gap-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-gray-900"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-gray-900"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="mailto:hello@example.com" className="text-gray-400 transition-colors hover:text-gray-900">
                  <Mail size={20} />
                </a>
              </div>
            </section>

            {/* Newsletter */}
            <section className="rounded-sm bg-gray-50 p-6">
              <h2 className="mb-3 font-serif text-lg font-semibold text-gray-900">{t('newsletter.title')}</h2>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">{t('newsletter.description')}</p>
              <NewsletterForm />
            </section>

            <footer className="mt-16 border-t border-gray-200 pt-8 text-center">
              <p className="font-mono text-xs text-gray-400">{t('footer.copyright')}</p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  )
}
