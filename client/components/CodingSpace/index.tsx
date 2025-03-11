'use client'

import { TerminalIcon, TextIcon } from 'lucide-react'
import EditorPanel from './EditorPanel'
import Workspace from './Workspace'
import './style.css'
import { useAppSelector } from '@/lib/hooks'
import Output from './Output'

const CodingSapce = () => {
  const programme = useAppSelector(state => state.programmes.codes[state.programmes.i])

  return (
    <div id='coding-container' style={{ position: 'fixed', top: '0', left: '0', overflow: 'auto', width: '100%', height: '100%', paddingTop: 'var(--nav-pd)', background: '#363d45' }}>
      <div className='coding-space'>
        <div>
          <EditorPanel code={programme.code} />
        </div>

        <div className='part-2'>
          <div>
            <Workspace header={
              <div className='text-icon'>
                <TextIcon color='#59ff7c' />
                <div>{programme.title}</div>
              </div>
            }>
              <div style={{padding: '10px 20px'}}>
                {programme.description}
              </div>
            </Workspace>
          </div>

          <div>
            <Output />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodingSapce