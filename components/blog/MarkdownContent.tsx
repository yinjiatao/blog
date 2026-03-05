import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => <h2 className="mt-10 mb-4 font-serif text-xl font-semibold text-gray-900">{children}</h2>,
        h3: ({ children }) => <h3 className="mt-8 mb-3 font-serif text-lg font-semibold text-gray-900">{children}</h3>,
        p: ({ children }) => <p className="mb-6 leading-relaxed text-gray-700">{children}</p>,
        ul: ({ children }) => <ul className="mb-6 list-disc space-y-2 pl-6">{children}</ul>,
        ol: ({ children }) => <ol className="mb-6 list-decimal space-y-2 pl-6">{children}</ol>,
        li: ({ children }) => <li className="leading-relaxed text-gray-700">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="my-6 border-l-4 border-gray-900 pl-6 text-gray-600 italic">{children}</blockquote>
        ),
        code: ({ children, className }) => {
          const isBlock = className?.includes('language-')
          if (isBlock) {
            return (
              <pre className="mb-6 overflow-x-auto rounded-sm bg-gray-50 p-4">
                <code className="font-mono text-sm text-gray-800">{children}</code>
              </pre>
            )
          }
          return <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800">{children}</code>
        },
        strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-gray-900 underline underline-offset-2 transition-colors hover:text-gray-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        hr: () => <hr className="my-8 border-gray-200" />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
