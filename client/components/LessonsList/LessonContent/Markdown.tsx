import ReactMarkdown from 'react-markdown'

const Markdown = ({ children }: {children: React.ReactNode}) => {
  return (
    <ReactMarkdown>
      {children as string}
    </ReactMarkdown>
  )
}

export default Markdown