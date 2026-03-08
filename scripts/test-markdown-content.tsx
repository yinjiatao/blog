import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { renderToStaticMarkup } from 'react-dom/server'
import { MarkdownContent } from '../components/blog/MarkdownContent'

const markdown = `
| Column A | Column B |
| --- | --- |
| Alpha | Beta |
`

const html = renderToStaticMarkup(<MarkdownContent content={markdown} />)

assert.match(
  html,
  /<table><thead><tr><th>Column A<\/th><th>Column B<\/th><\/tr><\/thead><tbody><tr><td>Alpha<\/td><td>Beta<\/td><\/tr><\/tbody><\/table>/,
  'Expected Markdown tables to render semantic table markup.'
)

const codeMarkdown = `
Use \`pnpm build\` here.

\`\`\`bash
echo "$HOME"
\`\`\`
`

const codeHtml = renderToStaticMarkup(<MarkdownContent content={codeMarkdown} />)

assert.match(
  codeHtml,
  /<p>Use <code>pnpm build<\/code> here\.<\/p>/,
  'Expected inline code to keep default prose-compatible code markup.'
)

assert.match(
  codeHtml,
  /<pre class="prismjs"><code class="language-bash" style="white-space:pre">/,
  'Expected fenced bash code blocks to keep standard pre/code markup for typography.'
)

assert.match(
  codeHtml,
  /<span class="token string environment constant">\$HOME<\/span>/,
  'Expected bash variables to be tokenized with Prism classes.'
)

const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8')

assert.match(
  css,
  /\.prose pre\.prismjs\s*\{\s*background-color:\s*#1e2939;/,
  'Expected light mode prose code blocks to use the requested dark slate background.'
)

assert.match(
  css,
  /\.dark \.prose pre\.prismjs\s*\{\s*background-color:\s*#00000080;/,
  'Expected dark mode prose code blocks to use the requested translucent black background.'
)

console.log('Markdown content regression test passed.')
