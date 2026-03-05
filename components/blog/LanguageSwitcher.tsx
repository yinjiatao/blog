'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'

interface LangOptionsProps {
  languages: { code: string; label: string; flag: string }[]
  locale: string
  onSwitch: (code: string) => void
}

function LangOptions({ languages, locale, onSwitch }: LangOptionsProps) {
  return (
    <div className="space-y-1 p-4">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onSwitch(lang.code)}
          className={`flex w-full items-center gap-3 rounded-sm px-4 py-3 text-sm transition-colors hover:bg-gray-50 ${
            locale === lang.code ? 'bg-gray-50 font-medium text-gray-900' : 'text-gray-600'
          }`}
        >
          <span>{lang.flag}</span>
          {lang.label}
        </button>
      ))}
    </div>
  )
}

export function LanguageSwitcher() {
  const t = useTranslations('language')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleSwitch = (newLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  const languages = [
    { code: 'zh', label: t('zh'), flag: '🇨🇳' },
    { code: 'en', label: t('en'), flag: '🇺🇸' },
  ]

  const currentLang = languages.find((l) => l.code === locale)

  const triggerBtn = (
    <button
      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
      aria-label={t('switch')}
    >
      <span>{currentLang?.flag}</span>
      <span className="text-xs">{currentLang?.label}</span>
    </button>
  )

  return (
    <>
      {/* Desktop: hover dropdown */}
      <div className="group relative hidden md:block">
        {triggerBtn}
        <div className="invisible absolute top-full right-0 z-50 mt-1 w-32 rounded-sm border border-gray-200 bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
          <LangOptions languages={languages} locale={locale} onSwitch={handleSwitch} />
        </div>
      </div>

      {/* Mobile: shadcn Drawer */}
      <Drawer>
        <DrawerTrigger asChild className="md:hidden">
          {triggerBtn}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t('switch')}</DrawerTitle>
          </DrawerHeader>
          <LangOptions languages={languages} locale={locale} onSwitch={handleSwitch} />
        </DrawerContent>
      </Drawer>
    </>
  )
}
