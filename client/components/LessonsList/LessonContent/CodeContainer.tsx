import SyntaxHighlighter from "react-syntax-highlighter"
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs"

const CodeSnippet = ({ language, code }: {language: string, code: string}) => {
  return (
    <div className="code-snippet" style={{ width: "100%", background: "#252525" }}>
      <SyntaxHighlighter
        language={language || 'plaintext'}
        style={atomOneDark}
        customStyle={{
          padding: "1rem",
          background: "transparent",
          margin: 0,
        }}
        showLineNumbers={true}
        wrapLines={true}
        lineNumberStyle={{
          display: 'none'
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeSnippet