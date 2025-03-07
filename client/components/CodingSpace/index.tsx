'use client'

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
          <Workspace header={'Description'}>Description will be displayed here</Workspace>
        </div>

        <div>
          <Workspace header={'Outputs'}>Run your code to see the output</Workspace>
        </div>
      </div>
    </div>
  )
}

export default CodingSapce