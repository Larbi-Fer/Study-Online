import { TextareaAutosize } from "@mui/material"
import { useState } from "react"
import CodeSnippet from "../../LessonContent/CodeContainer"

const EditItem = ({ content: realContent, onEndEditing: endEditing }: {content: LessonSlideAndIdProps, onEndEditing: (content: LessonSlideAndIdProps) => void}) => {
  const [content, setContent] = useState(realContent)

  switch (content.type) {
    case 'markdown':
      return <TextareaAutosize
                className="without-border"
                value={content.markdown}
                onChange={e => setContent({...realContent, type: 'markdown', markdown: e.target.value})}
                onBlur={() => endEditing(content)}
                autoFocus
              />
    case 'code':
      return <CodeSnippet code={content.code} language="python" edit endEditing={(newCode: string) => endEditing({...realContent, type: 'code', code: newCode, language: 'python'})} />
    case 'img':
      return <div>Not supported yet</div>
    case 'list':
      return <div>Not supported yet</div>
    case 'question':
      return <div>Not supported yet</div>

  }
}

export default EditItem