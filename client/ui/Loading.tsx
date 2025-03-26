import { MotionStyle, TargetAndTransition } from 'motion/react'
import * as motion from 'motion/react-client'
import { CSSProperties } from 'react'

const Loading = () => {
  return (
    <div style={globalStyle}>
      <motion.div style={style} initial={initial} animate={animate} transition={{duration: 0.5, repeat: Infinity, repeatType: 'reverse', ease: 'linear'}} />
      <motion.div style={style} initial={initial} animate={animate} transition={{delay: 0.2, duration: 0.5, repeat: Infinity, repeatType: 'reverse', ease: 'linear'}} />
      <motion.div style={style} initial={initial} animate={animate} transition={{delay: 0.4, duration: 0.5, repeat: Infinity, repeatType: 'reverse', ease: 'linear'}} />
    </div>
  )
}

const globalStyle: CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  gap: '5px'
}

const style: MotionStyle = {
  width: '10px',
  height: '10px',
  borderRadius: '100%',
  background: '#ccc',
}

const initial: TargetAndTransition = {
  opacity: 0, scale: 0.8
}

const animate: TargetAndTransition = {
  opacity: 1, scale: 1
}

export default Loading