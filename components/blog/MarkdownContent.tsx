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
        h2: ({ children }) => (
          <h2 className="text-foreground mt-10 mb-4 font-serif text-xl font-semibold">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-foreground mt-8 mb-3 font-serif text-lg font-semibold">{children}</h3>
        ),
        p: ({ children }) => <p className="text-foreground mb-6 leading-relaxed">{children}</p>,
        ul: ({ children }) => <ul className="mb-6 list-disc space-y-2 pl-6">{children}</ul>,
        ol: ({ children }) => <ol className="mb-6 list-decimal space-y-2 pl-6">{children}</ol>,
        li: ({ children }) => <li className="text-foreground leading-relaxed">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="border-foreground text-muted-foreground my-6 border-l-4 pl-6 italic">
            {children}
          </blockquote>
        ),
        code: ({ children, className }) => {
          const isBlock = className?.includes('language-')
          if (isBlock) {
            return (
              <pre className="bg-muted mb-6 overflow-x-auto rounded-sm p-4">
                <code className="text-foreground font-mono text-sm">{children}</code>
              </pre>
            )
          }
          return <code className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-sm">{children}</code>
        },
        strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-foreground hover:text-muted-foreground underline underline-offset-2 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        hr: () => <hr className="border-border my-8" />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
