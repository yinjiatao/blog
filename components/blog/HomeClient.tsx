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
      <header className="border-border bg-background/80 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href={`/${locale}`} className="text-foreground font-serif text-xl font-bold">
            {t('siteTitle')}
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative flex h-screen items-center justify-center overflow-hidden">
        <div className="from-background via-muted/50 to-background absolute inset-0 bg-linear-to-b" />

        {/* Vertical Text - Left (cycling titles) */}
        <div
          ref={verticalTextRef}
          className="absolute top-1/2 left-2 flex -translate-y-1/2 flex-col items-center gap-1 lg:left-16 lg:gap-2"
        >
          <div ref={zhCharsRef} className="flex flex-col items-center gap-1 lg:gap-2">
            {currentTitle.zh.split('').map((char, i) => (
              <span
                key={`zh-${titleIndex}-${i}`}
                className="vchar vchar-zh writing-vertical text-foreground font-serif text-sm lg:text-4xl"
              >
                {char}
              </span>
            ))}
          </div>
          <div className="bg-border my-2 h-8 w-px lg:h-12" />
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
            <div className="bg-border h-px w-12" />
            <span className="text-muted-foreground font-mono text-xs tracking-widest">{t('hero.est')}</span>
            <div className="bg-border h-px w-12" />
          </div>

          <h1
            ref={titleRef}
            className="text-foreground mb-6 font-serif text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl"
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
              href={`/${locale}/articles`}
              className="group bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-medium transition-all duration-300"
            >
              {t('hero.ctaPrimary')}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={`/${locale}/about`}
              className="border-input text-foreground hover:border-ring hover:text-foreground rounded-sm border px-6 py-3 text-sm font-medium transition-all duration-300"
            >
              {t('hero.ctaSecondary')}
            </Link>
          </div>
        </div>

        {/* Vertical Text - Right */}
        <div className="absolute top-1/2 right-8 hidden -translate-y-1/2 flex-col items-center gap-1 md:flex lg:right-16">
          <span className="writing-vertical text-muted font-mono text-sm tracking-widest">BLOG</span>
          <div className="bg-border my-2 h-8 w-px" />
          <span className="writing-vertical text-muted font-mono text-sm tracking-widest">2026</span>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-muted-foreground font-mono text-xs tracking-wider">{t('hero.scroll')}</span>
          <ArrowDown size={20} className="text-muted-foreground" />
        </div>

        <div className="bg-muted absolute top-20 right-20 hidden h-2 w-2 rounded-full lg:block" />
        <div className="border-border absolute bottom-32 left-20 hidden h-3 w-3 rounded-full border lg:block" />
        <div className="bg-muted-foreground absolute top-1/3 right-1/4 hidden h-1 w-1 rounded-full lg:block" />
      </section>

      {/* Featured Articles */}
      <section className="px-6 py-24 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="border-border mb-16 flex items-end justify-between border-b pb-6">
            <div>
              <span className="text-muted-foreground mb-2 block font-mono text-xs tracking-widest">
                {t('featured.label')}
              </span>
              <h2 className="text-foreground font-serif text-3xl font-semibold lg:text-4xl">{t('featured.title')}</h2>
            </div>
            <Link
              href={`/${locale}/articles`}
              className="group text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
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
                    <span className="text-muted group-hover:text-foreground font-mono text-4xl font-bold transition-colors duration-500">
                      0{index + 1}
                    </span>
                    <div className="bg-border group-hover:bg-foreground h-px flex-1 transition-colors duration-500" />
                  </div>

                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
                      {t(`categoryNames.${post.category}`)}
                    </span>
                    <span className="text-muted">·</span>
                    <span className="text-muted-foreground text-xs">
                      {t('article.readTime', { count: post.readTime })}
                    </span>
                  </div>

                  <h3 className="text-foreground group-hover:text-muted-foreground mb-3 line-clamp-2 font-serif text-xl font-semibold transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">{post.excerpt}</p>

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
      <section className="bg-muted py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-16">
          <div className="mb-16 text-center">
            <span className="text-muted-foreground mb-2 block font-mono text-xs tracking-widest">
              {t('categories.label')}
            </span>
            <h2 className="text-foreground mb-4 font-serif text-3xl font-semibold lg:text-4xl">
              {t('categories.title')}
            </h2>
            <p className="text-muted-foreground">{t('categories.subtitle')}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((cat, index) => (
              <Link
                key={cat.slug}
                href={`/${locale}/category/${encodeURIComponent(cat.slug)}`}
                className="group border-border bg-card hover:border-ring relative rounded-sm border p-6 transition-all duration-300"
              >
                <span className="text-muted group-hover:text-foreground absolute top-3 right-3 font-mono text-xs transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-card-foreground mb-1 font-medium">{t(`categoryNames.${cat.slug}`)}</h3>
                <span className="text-muted-foreground text-xs">
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
              <h2 className="text-foreground font-serif text-3xl font-semibold lg:text-4xl">
                {t('moreArticles.title')}
              </h2>
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
                          <span className="text-muted">·</span>
                          <span className="text-muted-foreground text-xs">
                            {format.dateTime(new Date(post.date), {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>

                        <h3 className="text-foreground group-hover:text-muted-foreground mb-2 font-serif text-xl font-semibold transition-colors lg:text-2xl">
                          {post.title}
                        </h3>

                        <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">{post.excerpt}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-muted-foreground font-mono text-xs whitespace-nowrap">
                          {t('article.readTime', { count: post.readTime })}
                        </span>
                        <span className="text-muted-foreground group-hover:text-foreground transition-all duration-200 group-hover:translate-x-1">
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
      <section className="bg-foreground text-background py-24 lg:py-32">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-16">
          <span className="text-muted-foreground mb-4 block font-mono text-xs tracking-widest">
            {t('newsletter.label')}
          </span>
          <h2 className="mb-4 font-serif text-3xl font-semibold lg:text-4xl">{t('newsletter.title')}</h2>
          <p className="text-background/70 mb-8 leading-relaxed">{t('newsletter.description')}</p>
          <div className="[&_p]:text-background/70 [&_button]:bg-background [&_button]:text-foreground [&_button]:hover:bg-background/90 [&_input]:bg-background/20 [&_input]:text-background [&_input]:placeholder:text-background/50 [&_input]:focus:ring-background/20 mx-auto max-w-md [&_input]:border-0 [&_input]:focus:ring-2">
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
