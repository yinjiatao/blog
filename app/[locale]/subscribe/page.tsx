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
    <div className="bg-background min-h-screen">
      <SidebarWrapper categories={categories} />

      <main className="min-h-screen pt-16 lg:ml-[200px] lg:pt-0">
        <div className="mx-auto max-w-2xl px-6 py-12 lg:px-16 lg:py-24">
          <div className="animate-fade-in-up">
            <div className="mb-12">
              <span className="text-muted-foreground mb-3 block font-mono text-xs tracking-widest">
                {t('newsletter.label')}
              </span>
              <h1 className="text-foreground mb-4 font-serif text-3xl font-semibold lg:text-4xl">
                {t('newsletter.title')}
              </h1>
              <p className="text-muted-foreground leading-relaxed">{t('newsletter.description')}</p>
            </div>

            {/* Benefits */}
            <div className="mb-12 space-y-4">
              {['每周一封，不多不少', '深度内容，拒绝信息噪音', '随时退订，无任何套路'].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="bg-primary mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full">
                    <svg
                      className="text-primary-foreground h-2.5 w-2.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-muted-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="border-border bg-muted rounded-sm border p-8">
              <h2 className="text-foreground mb-6 font-serif text-lg font-semibold">
                {locale === 'zh' ? '立即订阅' : 'Subscribe Now'}
              </h2>
              <NewsletterForm />
              <p className="text-muted-foreground mt-4 text-xs">
                {locale === 'zh'
                  ? '你的邮箱仅用于发送通讯，不会被分享给第三方。'
                  : 'Your email is used only for the newsletter and will never be shared.'}
              </p>
            </div>

            <footer className="border-border mt-16 border-t pt-8 text-center">
              <p className="text-muted-foreground font-mono text-xs">{t('footer.copyright')}</p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  )
}
