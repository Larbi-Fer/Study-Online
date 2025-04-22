import React from 'react'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { CopyIcon } from 'lucide-react'
import { Tooltip } from '@mui/material'
import CopyButton from './CopyButton'
type CodeSnippetWithOpProps = {
  language: string
  code: string
}

const CodeSnippetWithOp = ({language, code}: CodeSnippetWithOpProps) => {
  return (
    <div style={style}>
      <div style={headerStyle}>
        <h4>{language}</h4>
        <CopyButton text={code} />
      </div>
      <SyntaxHighlighter language={language} style={atomOneDark} customStyle={{
            padding: "1rem",
            background: "transparent",
            margin: 0,
          }}
          showLineNumbers={true}
          wrapLines={true}
          lineNumberStyle={{
            padding: '0 1rem 0 0.5rem',
            margin: '0',
            color: '#666',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            textAlign: 'right',
            width: '2rem',
            
          }}
      >
        {code}
      </SyntaxHighlighter>
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

const headerStyle: any = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.5rem 1rem',
  color: '#ddd',
  background: '#333',
  borderRadius: '10px 10px 0 0',
  borderBottom: '1px solid #666',
}


export default CodeSnippetWithOp
