'use client'

import Button from "@/ui/Button"
import { AnimatePresence } from "motion/react"
import * as motion from 'motion/react-client'
import { useState } from "react"
import '../LessonPreviewStyle.css'
import './style.css'

const slideVariant = {
  hidden: {
    opacity: 0,
    x: 10
  },
  show: {
    opacity: 1,
    x: 0
  },
  exit: {
    opacity: 0,
    x: -10
  }
}

const QuizSlides = ({ quiz }: { quiz: QuizArgs }) => {
  const [currentSlide, setCurrentSlide] = useState({ slide: 0, selected: -1 })
  const qst = quiz.questions[currentSlide.slide]
  

  const changeSlide = () => {
    setCurrentSlide(prev => ({ slide: prev.slide+1, selected: -1 }))
  }

  const onChoose = (i: number) => () => {
    if (currentSlide.selected !== -1) return
    setCurrentSlide(prev => ({...prev, selected: i}))
  }

  const choseClass = (i: number) => {
    if (currentSlide.selected === -1) return ''
    if (currentSlide.selected == i) {
      if (qst.correct == i) return ' correct'
      return ' wrong'
    }
    if (qst.correct == i) return ' correct'
    return ''
  }

  return (
    <div>
      <div className="slide quiz-slide">
        <div className="lesson">
          <AnimatePresence mode='wait'>
            
              <motion.div key={qst.id} variants={slideVariant} initial='hidden' animate='show' exit='exit'>
                <h2>{qst.question}</h2>
                <div className="choices">
                  {qst.choices.map((choice, i) => (
                    <div className={"choice" + choseClass(i)} key={'choice-' + i} onClick={onChoose(i)}>
                      <div className="text">{choice}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            
          </AnimatePresence>
        </div>

        <div className="actions">

          {currentSlide.selected !== -1 && (
            quiz.questions.length == currentSlide.slide+1 ?
              <Button>Finish</Button>
            :
              <Button onClick={changeSlide}>Next {'>'}</Button>
            )
          }
        </div>
      </div>
      <div className="countdown">
        <span></span>
      </div>
    </div>
  )
}

export default QuizSlides