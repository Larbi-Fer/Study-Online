'use client'

import { animate, useMotionValue, useTransform } from "motion/react"
import * as motion from 'motion/react-client'
import { useEffect } from "react"

type ProgressProps = {
  progress: number,
  total: number
}

const Progress = ({ progress, total }: ProgressProps) => {
  const count = useMotionValue(0)
  const rounded = useTransform(() => Math.round(count.get()))

  useEffect(() => {
      const controls = animate(count, progress, { duration: 1 })
      return () => controls.stop()
  }, [])

  const radius = 55;
  const strokeWidth = 7;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / total) * circumference;

  return (
    <div style={{position: 'relative', width: 'fit-content'}} >
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#cbc8c8"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Foreground circle for the percent with animation */}
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          stroke='#3fe2ff'
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)" // Rotate to make it start from top
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </svg>

      <div style={numberStyle}>
        <motion.div>{rounded}</motion.div>
        <div style={{fontSize: '15px', marginBottom: '7px', color: '#2229'}}>
          /{total}
        </div>
      </div>
    </div>
  )
}

const numberStyle: any = {
  position: 'absolute', top: 'calc(50% - 3px)', left: 'calc(50% + 3px)', transform: 'translate(-50%, -50%)',
  display: 'flex',
  alignItems: 'end',
  gap: '5px',
  fontWeight: '600',
  fontSize: '30px'
}

export default Progress