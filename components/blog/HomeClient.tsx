'use client'

import type { PostFrontmatter } from '@/lib/posts'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Link from 'next/link'

import { ArrowDown, ArrowRight } from 'lucide-react'
import { useTranslations, useLocale, useFormatter } from 'next-intl'
import { LanguageSwitcher } from './LanguageSwitcher'
import { NewsletterForm } from './NewsletterForm'

gsap.registerPlugin(ScrollTrigger)

const TITLES = [
  { zh: '创作者', en: 'CREATOR' },
  { zh: '写作者', en: 'WRITER' },
  { zh: '思考者', en: 'THINKER' },
  { zh: '建造者', en: 'BUILDER' },
]

const CYCLE_INTERVAL = 3500

interface HomeClientProps {
  posts: PostFrontmatter[]
  categories: { slug: string; count: number }[]
}

export function HomeClient({ posts, categories }: HomeClientProps) {
  const t = useTranslations()
  const locale = useLocale()
  const format = useFormatter()

  const [titleIndex, setTitleIndex] = useState(0)
  const titleIndexRef = useRef(0)
  const isFirstRender = useRef(true)

  const heroRef = useRef<HTMLDivElement>(null)
  const verticalTextRef = useRef<HTMLDivElement>(null)
  const zhCharsRef = useRef<HTMLDivElement>(null)
  const enCharsRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const articleCardsRef = useRef<(HTMLDivElement | null)[]>([])

  const featuredPosts = posts.slice(0, 3)
  const remainingPosts = posts.slice(3)

  // Hero entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ delay: 0.3 })

      const verticalChars = verticalTextRef.current?.querySelectorAll('.vchar')
      if (verticalChars) {
        heroTl.fromTo(
          verticalChars,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
        )
      }

      heroTl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.4',
      )

      heroTl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6',
      )

      heroTl.fromTo(scrollIndicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.3')

      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })

      gsap.to(verticalTextRef.current, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      articleCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              delay: index * 0.1,
            },
          )
        }
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Title cycling animation
  useEffect(() => {
    const timer = setInterval(() => {
      const zhChars = zhCharsRef.current?.querySelectorAll('.vchar-zh')
      const enChars = enCharsRef.current?.querySelectorAll('.vchar-en')
      if (!zhChars || !enChars) return

      gsap.to([...zhChars, ...enChars], {
        opacity: 0,
        y: -16,
        duration: 0.35,
        stagger: 0.04,
        ease: 'power2.in',
        onComplete: () => {
          titleIndexRef.current = (titleIndexRef.current + 1) % TITLES.length
          setTitleIndex(titleIndexRef.current)
        },
      })
    }, CYCLE_INTERVAL)

    return () => clearInterval(timer)
  }, [])

  // Animate in new title after index changes (skip first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const zhChars = zhCharsRef.current?.querySelectorAll('.vchar-zh')
    const enChars = enCharsRef.current?.querySelectorAll('.vchar-en')
    if (!zhChars || !enChars) return

    gsap.fromTo(
      [...zhChars, ...enChars],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' },
    )
  }, [titleIndex])

  const currentTitle = TITLES[titleIndex]

  return (
    <div className="min-h-screen">
      {/* Fixed Header */}
      <header className="fixed top-0 right-0 left-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href={`/${locale}`} className="font-serif text-xl font-bold text-gray-900">
            {t('siteTitle')}
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative flex h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-white via-gray-50/50 to-white" />

        {/* Vertical Text - Left (cycling titles) */}
        <div
          ref={verticalTextRef}
          className="absolute top-1/2 left-2 flex -translate-y-1/2 flex-col items-center gap-1 lg:left-16 lg:gap-2"
        >
          <div ref={zhCharsRef} className="flex flex-col items-center gap-1 lg:gap-2">
            {currentTitle.zh.split('').map((char, i) => (
              <span
                key={`zh-${titleIndex}-${i}`}
                className="vchar vchar-zh writing-vertical font-serif text-sm text-gray-900 lg:text-4xl"
              >
                {char}
              </span>
            ))}
          </div>
          <div className="my-2 h-8 w-px bg-gray-300 lg:h-12" />
          <div ref={enCharsRef} className="flex flex-col items-center gap-1">
            {currentTitle.en.split('').map((char, i) => (
              <span
                key={`en-${titleIndex}-${i}`}
                className="vchar vchar-en text-muted-foreground writing-vertical font-serif text-xs lg:text-2xl"
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 mx-auto max-w-3xl px-8 text-center">
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gray-300" />
            <span className="text-muted-foreground font-mono text-xs tracking-widest">{t('hero.est')}</span>
            <div className="h-px w-12 bg-gray-300" />
          </div>

          <h1
            ref={titleRef}
            className="mb-6 font-serif text-5xl font-bold tracking-tight text-gray-900 md:text-7xl lg:text-8xl"
          >
            {t('siteTitle')}
          </h1>

          <p
            ref={subtitleRef}
            className="text-muted-foreground mx-auto max-w-xl text-base leading-relaxed font-light md:text-xl"
          >
            {t('hero.subtitle')}
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href={`/${locale}/category/self-improvement`}
              className="group flex items-center gap-2 rounded-sm bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-gray-800"
            >
              {t('hero.ctaPrimary')}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={`/${locale}/about`}
              className="rounded-sm border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-gray-900 hover:text-gray-900"
            >
              {t('hero.ctaSecondary')}
            </Link>
          </div>
        </div>

        {/* Vertical Text - Right */}
        <div className="absolute top-1/2 right-8 hidden -translate-y-1/2 flex-col items-center gap-1 md:flex lg:right-16">
          <span className="writing-vertical font-mono text-sm tracking-widest text-gray-300">BLOG</span>
          <div className="my-2 h-8 w-px bg-gray-200" />
          <span className="writing-vertical font-mono text-sm tracking-widest text-gray-300">2026</span>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-muted-foreground font-mono text-xs tracking-wider">{t('hero.scroll')}</span>
          <ArrowDown size={20} className="text-muted-foreground" />
        </div>

        <div className="absolute top-20 right-20 hidden h-2 w-2 rounded-full bg-gray-300 lg:block" />
        <div className="border-border absolute bottom-32 left-20 hidden h-3 w-3 rounded-full border lg:block" />
        <div className="absolute top-1/3 right-1/4 hidden h-1 w-1 rounded-full bg-gray-400 lg:block" />
      </section>

      {/* Featured Articles */}
      <section className="px-6 py-24 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="border-border mb-16 flex items-end justify-between border-b pb-6">
            <div>
              <span className="text-muted-foreground mb-2 block font-mono text-xs tracking-widest">
                {t('featured.label')}
              </span>
              <h2 className="font-serif text-3xl font-semibold text-gray-900 lg:text-4xl">{t('featured.title')}</h2>
            </div>
            <Link
              href={`/${locale}/category/self-improvement`}
              className="group flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900"
            >
              {t('featured.viewAll')}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {featuredPosts.map((post, index) => (
              <div
                key={post.slug}
                ref={(el) => {
                  articleCardsRef.current[index] = el
                }}
                className="group"
              >
                <Link href={`/${locale}/articles/${post.slug}`}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-mono text-4xl font-bold text-gray-200 transition-colors duration-500 group-hover:text-gray-900">
                      0{index + 1}
                    </span>
                    <div className="h-px flex-1 bg-gray-200 transition-colors duration-500 group-hover:bg-gray-900" />
                  </div>

                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
                      {t(`categoryNames.${post.category}`)}
                    </span>
                    <span className="text-gray-300">·</span>
                    <span className="text-muted-foreground text-xs">
                      {t('article.readTime', { count: post.readTime })}
                    </span>
                  </div>

                  <h3 className="mb-3 line-clamp-2 font-serif text-xl font-semibold text-gray-900 transition-colors group-hover:text-gray-600">
                    {post.title}
                  </h3>

                  <p className="line-clamp-3 text-sm leading-relaxed text-gray-500">{post.excerpt}</p>

                  <p className="text-muted-foreground mt-4 font-mono text-xs">
                    {format.dateTime(new Date(post.date), {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-16">
          <div className="mb-16 text-center">
            <span className="text-muted-foreground mb-2 block font-mono text-xs tracking-widest">
              {t('categories.label')}
            </span>
            <h2 className="mb-4 font-serif text-3xl font-semibold text-gray-900 lg:text-4xl">
              {t('categories.title')}
            </h2>
            <p className="text-gray-500">{t('categories.subtitle')}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {categories.map((cat, index) => (
              <Link
                key={cat.slug}
                href={`/${locale}/category/${encodeURIComponent(cat.slug)}`}
                className="group border-border relative rounded-sm border bg-white p-6 transition-all duration-300 hover:border-gray-900"
              >
                <span className="absolute top-3 right-3 font-mono text-xs text-gray-300 transition-colors group-hover:text-gray-900">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-1 font-medium text-gray-900">{t(`categoryNames.${cat.slug}`)}</h3>
                <span className="text-xs text-gray-500">
                  {cat.count} {t('categories.articles')}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* More Articles */}
      {remainingPosts.length > 0 && (
        <section className="px-6 py-24 lg:px-16 lg:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16">
              <span className="text-muted-foreground mb-2 block font-mono text-xs tracking-widest">
                {t('moreArticles.label')}
              </span>
              <h2 className="font-serif text-3xl font-semibold text-gray-900 lg:text-4xl">{t('moreArticles.title')}</h2>
            </div>

            <div className="space-y-0">
              {remainingPosts.map((post, index) => (
                <div
                  key={post.slug}
                  ref={(el) => {
                    articleCardsRef.current[index + 3] = el
                  }}
                  className="group border-border border-b py-8 last:border-b-0"
                >
                  <Link href={`/${locale}/articles/${post.slug}`} className="block">
                    <div className="flex items-start justify-between gap-8">
                      <div className="flex-1">
                        <div className="mb-3 flex items-center gap-3">
                          <span className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
                            {t(`categoryNames.${post.category}`)}
                          </span>
                          <span className="text-gray-300">·</span>
                          <span className="text-muted-foreground text-xs">
                            {format.dateTime(new Date(post.date), {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>

                        <h3 className="mb-2 font-serif text-xl font-semibold text-gray-900 transition-colors group-hover:text-gray-600 lg:text-2xl">
                          {post.title}
                        </h3>

                        <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">{post.excerpt}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-muted-foreground font-mono text-xs whitespace-nowrap">
                          {t('article.readTime', { count: post.readTime })}
                        </span>
                        <span className="text-muted-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:text-gray-900">
                          <ArrowRight size={18} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="bg-gray-900 py-24 text-white lg:py-32">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-16">
          <span className="mb-4 block font-mono text-xs tracking-widest text-gray-500">{t('newsletter.label')}</span>
          <h2 className="mb-4 font-serif text-3xl font-semibold lg:text-4xl">{t('newsletter.title')}</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">{t('newsletter.description')}</p>
          <div className="[&_p]:text-muted-foreground mx-auto max-w-md [&_button]:bg-white [&_button]:text-gray-900 [&_button]:hover:bg-gray-100 [&_input]:border-0 [&_input]:bg-gray-800 [&_input]:text-white [&_input]:placeholder:text-gray-500 [&_input]:focus:ring-2 [&_input]:focus:ring-white/20">
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-border border-t px-6 py-12 lg:px-16">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-muted-foreground font-mono text-xs">{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  )
}
