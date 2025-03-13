'use client'

import Button from "@/ui/Button"
import { AnimatePresence } from "motion/react"
import * as motion from 'motion/react-client'
import { useEffect, useState } from "react"
import '../LessonPreviewStyle.css'
import './style.css'
import Countdown from "./Countdown"

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
  const [currentSlide, setCurrentSlide] = useState({ slide: 0, selected: -1, stop: false })
  const qst = quiz.questions[currentSlide.slide]
  const [isTimeOut, setIsTimeOut] = useState(false)
  const [timeoutVal, setTimeoutVal] = useState<NodeJS.Timeout>()
  const [statistics, setStatistics] = useState<userQuizStatistics>({})

  useEffect(() => {
    if (!qst.time) return
    setTimeoutVal(setTimeout(() => setIsTimeOut(true), qst.time * 1000))
  }, [currentSlide])
  

  const changeSlide = () => {
    if (timeoutVal) {
      clearTimeout(timeoutVal)
      setIsTimeOut(false)
      setTimeoutVal(undefined)
    }
    setCurrentSlide(prev => ({ slide: prev.slide+1, selected: -1, stop: false }))
  }

  const onChoose = (i: number) => () => {
    if (currentSlide.selected !== -1) return
    setCurrentSlide(prev => ({...prev, selected: i, stop: true}))

    const prev = statistics
    qst.tags.forEach(tag => {
      const type = isTimeOut ? 'timeOut' : (i == qst.correct ? 'correct' : 'wrong')
      if (!prev[tag]) prev[tag] = {
        correct: 0, wrong: 0, timeOut: 0
      }
      prev[tag][type] += 1
    })

    console.log(prev);
    setStatistics(prev)
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
      {qst.time &&
        <Countdown  seconds={qst.time} stop={currentSlide.stop} />
      }
    </div>
  )
}

export default QuizSlides