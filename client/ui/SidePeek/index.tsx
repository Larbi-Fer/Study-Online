import { AnimatePresence } from 'motion/react'
import * as motion from 'motion/react-client'
import './style.css'
import { XIcon } from 'lucide-react'

type SidePeekProps = {
  children: React.ReactNode,
  isActive: boolean,
  close?: () => void
}

const animatoinVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
}

const SidePeek = ({ children, isActive, close }: SidePeekProps) => {

  return (
    <AnimatePresence>
      {isActive &&
        <div key='side-peek' className="side-peek">
          <motion.div
            className='back'
            onClick={close}
            variants={animatoinVariants}
            initial='hidden'
            animate='show'
            exit='exit'
          ></motion.div>
          <motion.div className='content' initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.2 }}>
            <div className="close-btn" onClick={close}>
              <XIcon />
            </div>
            {children}
          </motion.div>
        </div>
        }
    </AnimatePresence>
  )
}

/*
<div className={"side-peek" + (isActive ? " active" : "")}>
      <div className="back" onClick={close}></div>
      <div className="content">
        {children}
      </div>
    </div>
*/

export default SidePeek