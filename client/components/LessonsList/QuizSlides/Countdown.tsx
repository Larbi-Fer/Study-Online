import { useEffect, useState } from "react"

const Countdown = ({ seconds, stop }: { seconds: number, stop: boolean }) => {
  const [percent, setPercent] = useState(100)
  const [animation, setAnimation] = useState<NodeJS.Timeout>()

  useEffect(() => {
    if (animation) clearTimeout(animation)
    if(stop) return

    setPercent(100)
    const newAnimation = setInterval(() => {
      setPercent(prev => {
        if (prev <= 0) {
          clearInterval(newAnimation)
          return 0
        }
        return prev - 1
      })

    }, 100)
    
    setAnimation(newAnimation)
    
    return () => {
      clearInterval(newAnimation)
    }
  }, [stop])
  
  
  return (
    <div className="countdown" style={{width: percent + '%'}}>
      <span></span>
    </div>
  )
}

export default Countdown