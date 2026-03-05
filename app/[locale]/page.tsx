import { getAllPosts, getCategoriesWithCount } from '@/lib/posts'
import { HomeClient } from '@/components/blog/HomeClient'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params

  const posts = getAllPosts(locale)
  const categories = getCategoriesWithCount(locale)

  return <HomeClient posts={posts} categories={categories} />
}
