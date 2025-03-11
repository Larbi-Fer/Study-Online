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

const CodingSapce = ({ afterComplete }: {afterComplete: () => void}) => {
  const {programme, i, progsCount, isShowMsg} = useAppSelector(
    state => ({
      programme: state.programmes.codes[state.programmes.i],
      i: state.programmes.i,
      progsCount: state.programmes.codes.length,
      isShowMsg: state.programmes.congrationMessage
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

      <AnimatePresence>
        {isShowMsg &&
          <motion.div
            className="congration-message"
          >
            <motion.div
              className="bg"
              initial={{ backdropFilter: 'blur(0)' }}
              animate={{ backdropFilter: 'blur(3px)' }}
            ></motion.div>
            <motion.div className="msg"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              {progsCount > i+1 ?
                <div className="text-icon">
                  <CheckCircle color='#1f1' size={27} />
                  <h3>Correct outputs, let's go to next code</h3>
                </div>
              :
                <div>
                  <Image src='/images/congratulations.png' alt='congratulations' width={50} height={50} />
                  <h2>Congratulations</h2>
                  <h4>You've completed the lesson</h4>
                </div>
              }
              <div className="actions">
                <Button onClick={handleNext}>Next</Button>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </>
  )
}

export default CodingSapce