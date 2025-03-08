'use client'

import { TerminalIcon, TextIcon } from 'lucide-react'
import EditorPanel from './EditorPanel'
import Workspace from './Workspace'
import './style.css'

const CodingSapce = () => {

  return (
    <div className='coding-space'>
      <div>
        <EditorPanel />
      </div>

      <div className='part-2'>
        <div>
          <Workspace header={
            <div className='text-icon'>
              <TextIcon color='#59ff7c' />
              <div>Description</div>
            </div>
          }>Description will be displayed here</Workspace>
        </div>

        <div>
          <Workspace header={
            <div className='text-icon'>
              <TerminalIcon color='#59ff7c' />
              <div className="text">Outputs</div>
            </div>
          }>Run your code to see the output</Workspace>
        </div>
      </div>
    </div>
  )
}

export default CodingSapce