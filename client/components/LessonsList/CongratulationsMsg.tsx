'use client'

import { useAppSelector } from '@/lib/hooks'
import Button from '@/ui/Button'
import { CheckCircle } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import * as motion from 'motion/react-client'
import Image from 'next/image'
import './CongrationsMsg.css'

const CongratulationsMsg = ({ handleNext }: { handleNext: () => void }) => {
  const {i, progsCount, isShowMsg} = useAppSelector(
    state => ({
      i: state.programmes.i,
      progsCount: state.programmes.codes.length,
      isShowMsg: state.programmes.congrationMessage
    })
  )

  return (
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
  )
}

export default CongratulationsMsg