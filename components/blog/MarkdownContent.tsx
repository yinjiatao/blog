import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

interface MarkdownContentProps {
  content: string
}

const LANGUAGE_ALIASES: Record<string, string> = {
  jsonc: 'json',
  md: 'markdown',
  plaintext: 'text',
  shell: 'bash',
  sh: 'bash',
  txt: 'text',
  yml: 'yaml',
  zsh: 'bash',
}

function normalizeLanguage(language?: string) {
  if (!language) return 'text'

  return LANGUAGE_ALIASES[language] ?? language
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        pre: ({ children }) => <>{children}</>,
        code: ({ children, className }) => {
          const codeText = String(children).replace(/\n$/, '')
          const languageMatch = /language-([\w-]+)/.exec(className ?? '')
          const isBlock = Boolean(languageMatch) || codeText.includes('\n')

          if (isBlock) {
            const language = normalizeLanguage(languageMatch?.[1])

            return (
              <SyntaxHighlighter
                language={language}
                useInlineStyles={false}
                codeTagProps={{
                  className: `language-${language}`,
                  style: {},
                }}
              >
                {codeText}
              </SyntaxHighlighter>
            )
          }

          return <code>{children}</code>
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
