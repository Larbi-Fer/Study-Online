import React from 'react'
import MarkdownReact from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import CodeSnippetWithOp from './CodeSnippetWithOp'
import remarkBreaks from 'remark-breaks'

const Markdown = ({children}: {children: string}) => {
  return (
    <MarkdownReact
      remarkPlugins={[remarkGfm, remarkBreaks]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return match ? (
            <CodeSnippetWithOp
            language={match[1]}
            code={String(children).replace(/\n$/, '')}
            />
          ) : (
            <code className={'html-code'} {...props}>
              {children}
            </code>
          )
        }
      }}
    >
      {children}
    </MarkdownReact>
  )
}

export default Markdown
