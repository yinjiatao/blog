'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

interface LangOptionsProps {
  languages: { code: string; label: string; flag: string }[]
  locale: string
  onSwitch: (code: string) => void
}

function LangDropdownItems({ languages, locale, onSwitch }: LangOptionsProps) {
  return (
    <>
      {languages.map((lang) => (
        <DropdownMenuItem key={lang.code} onClick={() => onSwitch(lang.code)} className="cursor-pointer">
          <span>{lang.flag}</span>
          <span className={locale === lang.code ? 'font-medium' : ''}>{lang.label}</span>
        </DropdownMenuItem>
      ))}
    </>
  )
}

function LangDrawerItems({ languages, locale, onSwitch }: LangOptionsProps) {
  return (
    <div className="space-y-1 p-4">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onSwitch(lang.code)}
          className={`hover:bg-muted flex w-full items-center gap-3 rounded-sm px-4 py-3 text-sm transition-colors ${
            locale === lang.code ? 'bg-muted text-foreground font-medium' : 'text-muted-foreground'
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
      className="text-muted-foreground hover:text-foreground flex items-center gap-2 px-3 py-2 text-sm transition-colors"
      aria-label={t('switch')}
    >
      <span>{currentLang?.flag}</span>
      <span className="text-xs">{currentLang?.label}</span>
    </button>
  )

  return (
    <>
      {/* Desktop: shadcn DropdownMenu */}
      <div className="hidden md:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>{triggerBtn}</DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-32">
            <LangDropdownItems languages={languages} locale={locale} onSwitch={handleSwitch} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile: shadcn Drawer */}
      <Drawer>
        <DrawerTrigger asChild className="md:hidden">
          {triggerBtn}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t('switch')}</DrawerTitle>
            <DrawerDescription>{t('description')}</DrawerDescription>
          </DrawerHeader>
          <LangDrawerItems languages={languages} locale={locale} onSwitch={handleSwitch} />
        </DrawerContent>
      </Drawer>
    </>
  )
}
