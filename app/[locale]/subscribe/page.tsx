import { getTranslations } from 'next-intl/server'
import { getAllCategories } from '@/lib/posts'
import { SidebarWrapper } from '@/components/blog/SidebarWrapper'
import { NewsletterForm } from '@/components/blog/NewsletterForm'

interface SubscribePageProps {
  params: Promise<{ locale: string }>
}

export default async function SubscribePage({ params }: SubscribePageProps) {
  const { locale } = await params
  const t = await getTranslations()
  const categories = getAllCategories(locale)

  return (
    <div className="min-h-screen bg-white">
      <SidebarWrapper categories={categories} />

      <main className="min-h-screen pt-16 lg:ml-[200px] lg:pt-0">
        <div className="mx-auto max-w-2xl px-6 py-12 lg:px-16 lg:py-24">
          <div className="animate-fade-in-up">
            <div className="mb-12">
              <span className="mb-3 block font-mono text-xs tracking-widest text-gray-400">
                {t('newsletter.label')}
              </span>
              <h1 className="mb-4 font-serif text-3xl font-semibold text-gray-900 lg:text-4xl">
                {t('newsletter.title')}
              </h1>
              <p className="leading-relaxed text-gray-500">{t('newsletter.description')}</p>
            </div>

            {/* Benefits */}
            <div className="mb-12 space-y-4">
              {['每周一封，不多不少', '深度内容，拒绝信息噪音', '随时退订，无任何套路'].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gray-900">
                    <svg className="h-2.5 w-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-600">{item}</span>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="rounded-sm border border-gray-200 bg-gray-50 p-8">
              <h2 className="mb-6 font-serif text-lg font-semibold text-gray-900">
                {locale === 'zh' ? '立即订阅' : 'Subscribe Now'}
              </h2>
              <NewsletterForm />
              <p className="mt-4 text-xs text-gray-400">
                {locale === 'zh'
                  ? '你的邮箱仅用于发送通讯，不会被分享给第三方。'
                  : 'Your email is used only for the newsletter and will never be shared.'}
              </p>
            </div>

            <footer className="mt-16 border-t border-gray-200 pt-8 text-center">
              <p className="font-mono text-xs text-gray-400">{t('footer.copyright')}</p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  )
}
