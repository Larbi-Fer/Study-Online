import { AnimatePresence } from "motion/react"
import Button from "../Button"
import { Dispatch, SetStateAction } from "react"
import './style.css'

type SlidesProps = {
  slides: number
  currentSlide: number,
  setCurrentSlide: Dispatch<SetStateAction<number>>
  lastSlide: () => void,
  lastSlideBtn?: string,
  animationMode?: "popLayout" | "sync" | "wait",
  children: Readonly<React.ReactNode>
}

const Slides = ({ slides, currentSlide, setCurrentSlide, lastSlide, lastSlideBtn='Complete', children, animationMode }: SlidesProps) => {
  const changeSlide = (type: 'increase' | 'decrease') => () => {
    if (type == 'decrease' && currentSlide == 0) return
    if (type == 'increase' && currentSlide == slides-1) return lastSlide()
    setCurrentSlide(prev => type == 'increase' ? (prev + 1) : (prev - 1))
  }

  return (
    <div className="slide">
      <div className="slide-lesson">
        <AnimatePresence mode={animationMode}>
          {children}
        </AnimatePresence>
      </div>

      <div className="slide-actions">
        <Button onClick={changeSlide('decrease')} disabled={currentSlide == 0} transparent>{'<'} Previous</Button>
        <Button onClick={changeSlide('increase')}>{currentSlide+1 == slides ? lastSlideBtn : 'Next >'}</Button>
      </div>
    </div>
  )
}

export default Slides