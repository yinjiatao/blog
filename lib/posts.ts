import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface PostFrontmatter {
  title: string
  excerpt: string
  date: string
  category: string
  readTime: number
  slug: string
}

export interface Post extends PostFrontmatter {
  content: string
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

export function getAllPosts(locale: string): PostFrontmatter[] {
  const localeDir = path.join(postsDirectory, locale)

  if (!fs.existsSync(localeDir)) return []

  const filenames = fs.readdirSync(localeDir)

  const posts = filenames
    .filter((name) => name.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(localeDir, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      return data as PostFrontmatter
    })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string, locale: string): Post | null {
  const localeDir = path.join(postsDirectory, locale)
  const filePath = path.join(localeDir, `${slug}.md`)

  if (!fs.existsSync(filePath)) return null

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    ...(data as PostFrontmatter),
    content,
  }
}

export function getAllSlugs(locale: string): string[] {
  const localeDir = path.join(postsDirectory, locale)

  if (!fs.existsSync(localeDir)) return []

  return fs
    .readdirSync(localeDir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''))
}

export function getPostsByCategory(category: string, locale: string): PostFrontmatter[] {
  return getAllPosts(locale).filter((post) => post.category === category)
}

const CATEGORY_ORDER = [
  'self-improvement',
  'super-individual',
  'one-person-company',
  'tools',
]

export function getAllCategories(locale: string): string[] {
  const posts = getAllPosts(locale)
  const categories = [...new Set(posts.map((post) => post.category))]
  // Sort categories by predefined order
  return categories.sort((a, b) => {
    const indexA = CATEGORY_ORDER.indexOf(a)
    const indexB = CATEGORY_ORDER.indexOf(b)
    return indexA - indexB
  })
}

export function getCategoriesWithCount(locale: string): { slug: string; count: number }[] {
  const posts = getAllPosts(locale)
  const countMap: Record<string, number> = {}

  for (const post of posts) {
    countMap[post.category] = (countMap[post.category] ?? 0) + 1
  }

  return Object.entries(countMap)
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => {
      const indexA = CATEGORY_ORDER.indexOf(a.slug)
      const indexB = CATEGORY_ORDER.indexOf(b.slug)
      return indexA - indexB
    })
}
