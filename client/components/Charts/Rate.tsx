import * as motion from 'motion/react-client'
import { animate, useMotionValue, useTransform } from "motion/react"
import { useEffect } from "react"

const Rate = ({ percent }: {percent: number}) => {
  const count = useMotionValue(0)
  const rounded = useTransform(() => Math.round(count.get()))

  useEffect(() => {
      const controls = animate(count, percent, { duration: 1 })
      return () => controls.stop()
  }, [])

  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

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
          stroke={percent < 50 ? '#ff5b5b' : (percent < 80 ? '#3fe2ff' : "#00ff7e")}
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
          %
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

export default Rate