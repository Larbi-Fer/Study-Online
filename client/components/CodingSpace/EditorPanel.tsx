'use client'

import { Editor, MonacoDiffEditor } from '@monaco-editor/react'
import React, { useRef, useState } from 'react'
import Workspace from './Workspace'
import Button from '@/ui/Button'
import Image from 'next/image'
import { RotateCcwIcon } from 'lucide-react'
import { useAppDispatch } from '@/lib/hooks'
import { setOutput } from '@/lib/features/programmes'
import api from '@/actions/api'

const EditorPanel = ({ code }: {code: string}) => {
  const editorRef = useRef<MonacoDiffEditor>(null);

  const handleEditorDidMount = (editor: MonacoDiffEditor) => {
    editorRef.current = editor;
  }

  const reset = () => {
    editorRef.current.setValue(code)
  }

  return (
    <Workspace header={<Header reset={reset} editor={editorRef} />}>
      <div style={{overflow: 'hidden'}}>
        <Editor
          defaultLanguage='python'
          defaultValue={code}
          theme='vs-dark'
          height='calc(100vh - 70px)'
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            cursorBlinking: "smooth",
            smoothScrolling: true,
            padding: { top: 10 }
          }}
        />
      </div>
    </Workspace>
  )
}

const Header = ({reset, editor}: {reset: () => void, editor: React.RefObject<MonacoDiffEditor>}) => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  const executeProgramme = async() => {
    setLoading(true)
    const data = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          language: 'python',
          version: '3.10.0',
          files: [{
            content: editor.current.getValue()
          }]
        })
      })

    const res = await data.json()

    const container = document.getElementById("coding-container");
    container?.scrollTo({ top: container.scrollHeight, behavior: "smooth" });

    dispatch(setOutput({ type: res.run.stderr ? 'error' : 'success', content: res.run.output }))
    setLoading(false)
  }

  return (
    <div className='code-header'>
      <div className="left">
        <div className='left-img'>
          <Image src='/images/py-icon.png' alt='py' width={23} height={23} />
        </div>
        <div className='left-content'>
          <h4>Python</h4>
          <p>Write and execute your code</p>
        </div>
      </div>


      <div className="right">
        <div className="action reset">
          <Button transparent onClick={reset}> <RotateCcwIcon size={20} /> </Button>
        </div>
        <div className="action run">
          <Button background='green' onClick={executeProgramme} loading={loading}>Run</Button>
        </div>
      </div>
    </div>
  )
}

export default EditorPanel