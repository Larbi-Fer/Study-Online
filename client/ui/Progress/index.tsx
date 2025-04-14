'use client'

import { animate, useMotionValue, useTransform } from "motion/react"
import * as motion from 'motion/react-client'
import { useEffect } from "react"

type ProgressProps = {
  progress: number,
  total?: number,
  small?: boolean,
  color?: string
}

const Progress = ({ progress, total, small, color }: ProgressProps) => {
  const count = useMotionValue(0)
  const rounded = useTransform(() => Math.round(count.get()))

  useEffect(() => {
      const controls = animate(count, progress, { duration: 1 })
      return () => controls.stop()
  }, [progress])

    const radius = 55;
    const strokeWidth = 7;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progress / (total || 100)) * circumference;
    
  return (
    <div style={{position: 'relative', width: 'fit-content'}} >
      <svg width={small ? "60" : "100"} height={small ? "60" : "100"} viewBox="0 0 120 120">
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
          stroke={color || '#3fe2ff'}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </svg>

      <div style={{...numberStyle, fontSize: small ? '20px' : '30px'}}>
        <motion.div>{rounded}</motion.div>
        <div style={{fontSize: small ? '10px' : '15px', marginBottom: '7px', color: '#2229'}}>
          {total ? '/'+total : '%'}
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
  fontWeight: '600'
}

export default Progress