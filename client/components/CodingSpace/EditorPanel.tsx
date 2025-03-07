import { Editor } from '@monaco-editor/react'
import React from 'react'
import Workspace from './Workspace'
import Button from '@/ui/Button'
import Image from 'next/image'
import { RotateCcwIcon } from 'lucide-react'

const EditorPanel = () => {
  return (
    <Workspace header={<Header />}>
      <div style={{overflow: 'hidden'}}>
        <Editor
          defaultLanguage='javascript'
          defaultValue={`// code is here`}
          theme='vs-dark'
          height={600}
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

const Header = () => {
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
          <Button transparent> <RotateCcwIcon size={20} /> </Button>
        </div>
        <div className="action run">
          <Button background='green'>Run</Button>
        </div>
      </div>
    </div>
  )
}

export default EditorPanel