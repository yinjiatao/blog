import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

const pagePath = new URL('../app/[locale]/articles/[slug]/page.tsx', import.meta.url)
const backButtonPath = new URL('../components/blog/ArticleBackButton.tsx', import.meta.url)

const pageSource = readFileSync(pagePath, 'utf8')

assert.ok(
  existsSync(backButtonPath),
  'Expected a dedicated ArticleBackButton client component for history-based back navigation.'
)

assert.doesNotMatch(
  pageSource,
  /href=\{`\$\{locale\}`\}/,
  'Expected article page back control to stop hardcoding the locale home page.'
)

if (existsSync(backButtonPath)) {
  const backButtonSource = readFileSync(backButtonPath, 'utf8')

  assert.match(
    backButtonSource,
    /router\.back\(\)/,
    'Expected ArticleBackButton to use router.back() when browser history exists.'
  )

  assert.match(
    backButtonSource,
    /router\.push\(`\/\$\{locale\}\/articles`\)/,
    'Expected ArticleBackButton to fall back to the localized article list.'
  )
}

console.log('Article back button regression test passed.')
