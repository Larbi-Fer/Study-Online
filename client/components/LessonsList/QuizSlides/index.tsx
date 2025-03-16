'use client'

import Button from "@/ui/Button"
import { AnimatePresence } from "motion/react"
import * as motion from 'motion/react-client'
import { useEffect, useState } from "react"
import '../LessonPreviewStyle.css'
import './style.css'
import Countdown from "./Countdown"
import { setQuizResult } from "@/actions/user.action"
import { useAppSelector } from "@/lib/hooks"
import Toast from "@/ui/Toast"
import { useRouter } from "next/navigation"

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

const initalGeneralStatistics: QuizGeneralResults[] = [
  { label: 'correct', value: 0 },
  { label: 'incorrect', value: 0 },
  { label: 'timeout', value: 0 }
]

const QuizSlides = ({ quiz }: { quiz: QuizArgs }) => {
  const [currentSlide, setCurrentSlide] = useState({ slide: 0, selected: -1, stop: false })
  const qst = quiz.questions[currentSlide.slide]
  const [isTimeOut, setIsTimeOut] = useState(false)
  const [timeoutVal, setTimeoutVal] = useState<NodeJS.Timeout>()
  const [statistics, setStatistics] = useState<{byField: userQuizStatistics, general: QuizGeneralResults[]}>({byField: {}, general: initalGeneralStatistics})
  const [rate, setRate] = useState(0)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const userId = useAppSelector(state => state.user?.id)

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

    if (i == qst.correct) setRate(prevRate => prevRate + Math.round( 1 / quiz.questions.length * ( isTimeOut ? 50 : 100 ) ))

    const prev = statistics
    // by field
    const type = isTimeOut ? 'timeout' : (i == qst.correct ? 'correct' : 'incorrect')
    qst.tags.forEach(tag => {
      if (!prev.byField[tag]) prev.byField[tag] = {
        correct: 0, incorrect: 0, timeout: 0
      }
      prev.byField[tag][type] += 1
    })

    // general
    statistics.general[type == 'correct' ? 0 : (type == 'incorrect' ? 1 : 2)].value++

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

  const uploadAnswers = async() => {
    setLoading(true)
    const answers: QuizStatistics[] = []
    for (const field in statistics.byField) {
      if (Object.prototype.hasOwnProperty.call(statistics.byField, field)) {
        answers.push({ ...statistics.byField[field] as any, label: field })
      }
    }

    const res = await setQuizResult(userId!, quiz.id, {byField: answers, general: statistics.general}, rate)

    if (res.message != 'SUCCESS') return Toast('Something went wrong', 'error')

    router.push(`/quiz/${quiz.id}/statistics`)
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
              <Button onClick={uploadAnswers} loading={loading}>Finish</Button>
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