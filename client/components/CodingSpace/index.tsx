'use client'

import { CheckCircle, TextIcon } from 'lucide-react'
import * as motion from 'motion/react-client'
import EditorPanel from './EditorPanel'
import Workspace from './Workspace'
import './style.css'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import Output from './Output'
import { AnimatePresence } from 'motion/react'
import Button from '@/ui/Button'
import Image from 'next/image'
import { nextProgramme } from '@/lib/features/programmes'
import CongratulationsMsg from '../LessonsList/CongratulationsMsg'

const CodingSapce = ({ afterComplete }: {afterComplete: () => void}) => {
  const {programme, i, progsCount} = useAppSelector(
    state => ({
      programme: state.programmes.codes[state.programmes.i],
      i: state.programmes.i,
      progsCount: state.programmes.codes.length,
    })
  )
  const dispatch = useAppDispatch()

  const handleNext = () => {
    if (progsCount > i+1) dispatch(nextProgramme())
    else afterComplete()

  }

  return (
    <>
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

      <CongratulationsMsg handleNext={handleNext} />
    </>
  )
}

export default CodingSapce