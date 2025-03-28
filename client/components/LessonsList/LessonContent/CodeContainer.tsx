import { TextareaAutosize } from "@mui/material"
import SyntaxHighlighter from "react-syntax-highlighter"
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs"

const CodeSnippet = ({ language, code, edit, endEditing }: {language: string, code: string, edit?: boolean, endEditing?: (newCode: string) => void}) => {
  return (
    <div className="code-snippet" style={style}>
      {edit ?
        <TextareaAutosize style={{
            padding: "1rem",
            background: "transparent",
            margin: 0,
            color: 'white'
          }}
          className="without-border"
          onBlur={e => endEditing && endEditing(e.target.value)}
          autoFocus
          defaultValue={code}
        />
      :
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
      }
    </div>
  )
}

const style: any = {
  width: '100%',
  maxWidth: '800px',
  background: "#282c34",
  margin: '5px auto',
  borderRadius: '10px',
  boxShadow: '0 0 20px #757379',
}

export default CodeSnippet