'use client'

import { useState, useMemo } from 'react'
import { useTranslations, useLocale, useFormatter } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

import Link from 'next/link'
import Image from 'next/image'

import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

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

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  categories: string[]
}

export function Sidebar({ isOpen, onToggle, categories }: SidebarProps) {
  const t = useTranslations()
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const format = useFormatter()
  const [showCategories, setShowCategories] = useState(() => pathname.includes('/category/'))

  const currentDate = useMemo(
    () => format.dateTime(new Date(), { month: 'short', day: 'numeric', year: 'numeric' }),
    [format],
  )

  const handleSwitchLocale = (newLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  const languages = [
    { code: 'zh', label: t('language.zh'), flag: '🇨🇳' },
    { code: 'en', label: t('language.en'), flag: '🇺🇸' },
  ]

  const currentLang = languages.find((l) => l.code === locale)

  const navLinks = [
    { href: `/${locale}`, label: t('nav.home') },
    { href: `/${locale}/subscribe`, label: t('nav.subscribe') },
    { href: `/${locale}/about`, label: t('nav.about') },
  ]

  return (
    <>
      {/* Mobile top header */}
      <header className="border-border bg-background fixed top-0 right-0 left-0 z-40 border-b lg:hidden">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href={`/${locale}`} className="text-foreground font-serif text-xl font-bold">
            {t('siteTitle')}
          </Link>
          <button
            onClick={onToggle}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/20 lg:hidden" onClick={onToggle} />}

      {/* Sidebar panel */}
      <aside
        className={`border-border bg-background fixed top-0 right-0 z-50 flex h-screen w-50 flex-col border-l transition-transform duration-300 ease-in-out lg:right-auto lg:left-0 lg:translate-x-0 lg:border-r lg:border-l-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'} `}
      >
        {/* Site title */}
        <div className="p-6">
          <Link href={`/${locale}`} className="block" onClick={onToggle}>
            <h1 className="text-foreground font-serif text-xl font-bold tracking-wide">{t('siteTitle')}</h1>
          </Link>
          <p className="text-muted-foreground mt-2 font-mono text-xs tracking-wider">( {currentDate} )</p>
        </div>

        {/* Social links: X / GitHub / WeChat */}
        <div className="px-6 pb-5">
          <div className="flex items-center gap-4">
            {/* X (Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="X / Twitter"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/yinjiatao"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            {/* WeChat — opens dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="微信 / WeChat"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-3.898-6.348-7.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.927a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zm-3.74 2.558c.532 0 .963.441.963.983a.963.963 0 0 1-.963.983.963.963 0 0 1-.963-.983c0-.542.431-.983.963-.983zm7.48 0c.532 0 .963.441.963.983a.963.963 0 0 1-.963.983.963.963 0 0 1-.963-.983c0-.542.431-.983.963-.983z" />
                  </svg>
                </button>
              </DialogTrigger>
              <DialogContent className="px-8 py-6 sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="font-serif text-lg">{t('wechat.title')}</DialogTitle>
                  <DialogDescription>
                    {t('wechat.role')}
                    <br />
                    {t('wechat.desc')}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-2">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                      <Image
                        width={1280}
                        height={1280}
                        src="/wechat-qrcode.jpg"
                        alt={t('wechat.wechatQR')}
                        className="border-border mb-2 aspect-square w-full rounded-sm border object-cover"
                      />
                      <p className="text-muted-foreground text-xs">{t('wechat.wechatLabel')}</p>
                    </div>
                    <div className="text-center">
                      <Image
                        width={1280}
                        height={1280}
                        src="/wechat-official-qrcode.jpg"
                        alt={t('wechat.officialAccountQR')}
                        className="border-border mb-2 aspect-square w-full rounded-sm border object-cover"
                      />
                      <p className="text-muted-foreground text-xs">{t('wechat.officialAccount')}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground text-xs">{t('wechat.scanNote')}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="border-border mx-6 border-t" />

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-6 py-4">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onToggle}
                  className={`hover:text-foreground block py-2 text-sm transition-colors ${
                    pathname === link.href ? 'text-foreground font-medium' : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Categories */}
            <li className="pt-2">
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="text-muted-foreground hover:text-foreground flex w-full items-center justify-between py-2 text-sm transition-colors"
              >
                <span>{t('nav.categories')}</span>
                {showCategories ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {showCategories && (
                <ul className="border-border mt-1 ml-3 space-y-1 border-l">
                  {categories.map((category) => {
                    const href = `/${locale}/category/${encodeURIComponent(category)}`
                    const isActive = pathname === href
                    return (
                      <li key={category}>
                        <Link
                          href={href}
                          onClick={onToggle}
                          className={`hover:text-foreground block py-1.5 pl-3 text-xs transition-colors ${
                            isActive
                              ? 'text-foreground border-foreground -ml-px border-l-2 font-medium'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {t(`categoryNames.${category}`)}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          </ul>
        </nav>

        {/* Language switcher — bottom */}
        <div className="border-border border-t">
          {/* Desktop: shadcn DropdownMenu */}
          <div className="hidden lg:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="text-muted-foreground hover:text-foreground hover:bg-accent flex w-full items-center gap-2 px-6 py-4 text-sm transition-colors"
                  aria-label={t('language.switch')}
                >
                  <span>{currentLang?.flag}</span>
                  <span className="text-xs">{currentLang?.label}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <LangDropdownItems languages={languages} locale={locale} onSwitch={handleSwitchLocale} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile: shadcn Drawer */}
          <Drawer>
            <DrawerTrigger asChild>
              <button
                className="text-muted-foreground hover:text-foreground flex items-center gap-2 px-6 py-4 text-sm transition-colors lg:hidden"
                aria-label={t('language.switch')}
              >
                <span>{currentLang?.flag}</span>
                <span className="text-xs">{currentLang?.label}</span>
              </button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{t('language.switch')}</DrawerTitle>
                <DrawerDescription>{t('language.description')}</DrawerDescription>
              </DrawerHeader>
              <div className="space-y-1 p-4">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleSwitchLocale(lang.code)}
                    className={`hover:bg-muted flex w-full items-center gap-3 rounded-sm px-4 py-3 text-sm transition-colors ${
                      locale === lang.code ? 'text-foreground bg-muted font-medium' : 'text-muted-foreground'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    {lang.label}
                  </button>
                ))}
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </aside>
    </>
  )
}
