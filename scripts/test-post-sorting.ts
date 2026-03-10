import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import matter from 'gray-matter'

const workspace = mkdtempSync(path.join(tmpdir(), 'blog-post-sort-'))
const postsDir = path.join(workspace, 'content/posts/test')

mkdirSync(postsDir, { recursive: true })

writeFileSync(
  path.join(postsDir, 'morning.md'),
  `---
title: 'Morning Post'
excerpt: 'Published in the morning'
date: '2026-03-08 09:15'
category: 'tools'
readTime: 3
slug: 'morning'
---
Morning.
`
)

writeFileSync(
  path.join(postsDir, 'evening.md'),
  `---
title: 'Evening Post'
excerpt: 'Published in the evening'
date: '2026-03-08 18:45'
category: 'tools'
readTime: 3
slug: 'evening'
---
Evening.
`
)

async function main() {
  process.chdir(workspace)

  const { getAllPosts, parsePostDate, getPostDateFormatOptions } = await import('../lib/posts')

  const posts = getAllPosts('test')

  assert.equal(posts[0]?.slug, 'evening', 'Expected later HH:mm posts to sort ahead on the same date.')
  assert.equal(posts[1]?.slug, 'morning', 'Expected earlier HH:mm posts to sort after later ones.')

  const parsed = parsePostDate('2026-03-08 18:45')
  assert.equal(parsed.getFullYear(), 2026)
  assert.equal(parsed.getMonth(), 2)
  assert.equal(parsed.getDate(), 8)
  assert.equal(parsed.getHours(), 18)
  assert.equal(parsed.getMinutes(), 45)

  assert.deepEqual(getPostDateFormatOptions(), {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  assert.deepEqual(getPostDateFormatOptions(), {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const zhSeriesDir = path.join(__dirname, '../content/posts/zh')
  const zhSeriesFiles = [
    'openclaw-introduction.md',
    'openclaw-first-conversation.md',
    'openclaw-feishu-integration-guide.md',
    'openclaw-from-ai-to-assistant.md',
    'openclaw-skills-guide.md',
    'openclaw-memory-and-automation.md',
    'openclaw-advanced-guide.md',
  ]

  const zhEpisodes = zhSeriesFiles.map((filename) => {
    const filePath = path.join(zhSeriesDir, filename)
    const { data } = matter(readFileSync(filePath, 'utf8'))
    const title = String(data.title)
    const date = String(data.date)
    const match = /第\s*(\d+)\s*集/.exec(title)

    assert.ok(match, `Expected episode number in title for ${filename}.`)

    return {
      filename,
      episode: Number(match[1]),
      date,
    }
  })

  const sortedEpisodes = [...zhEpisodes].sort(
    (a, b) => parsePostDate(b.date).getTime() - parsePostDate(a.date).getTime()
  )

  assert.deepEqual(
    sortedEpisodes.map((item) => item.episode),
    [7, 6, 5, 4, 3, 2, 1],
    'Expected OpenClaw numbered episodes to sort by episode number descending via hidden time.'
  )

  console.log('Post sorting regression test passed.')
}

main()
