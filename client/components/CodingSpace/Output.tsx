'use client'

import { CheckCircleIcon, FileWarningIcon, PlayCircleIcon, TerminalIcon } from "lucide-react"
import Workspace from "./Workspace"
import { useAppSelector } from "@/lib/hooks"

const Output = () => {
  const output = useAppSelector(state => state.programmes.codes[state.programmes.i].output)

  return (
    <Workspace header={
      <div className='text-icon'>
        <TerminalIcon color='#59ff7c' />
        <div className="text">Outputs</div>
      </div>
    }>
      <div style={{padding: '10px 20px'}}>
        { output?.type == 'success' &&
          <div className="execute-status text-icon">
            <CheckCircleIcon size={25} color="#0f0" />
            <div style={{color: '#0f0'}}>Execute Successfully</div>
          </div>
        }
        { output?.type == 'error' &&
          <div className="execute-status text-icon">
            <FileWarningIcon size={25} color="#f00" />
            <div style={{color: '#f00'}}>Execute failed</div>
          </div>
        }
        {!output && 
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px', color: '#ddd6'}}>
            <PlayCircleIcon size={30} />
            <div>Execute the programme to see the result</div>
          </div>
        }

        <div className="output">
          {output?.content.split('\n').map((res, i) => <div key={'output-' + i}>{res}</div>)}
        </div>
      </div>
    </Workspace>
  )
}

export default Output