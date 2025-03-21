'use client'

import * as motion from 'motion/react-client'
import Button from "@/ui/Button"
import { MouseEvent, useState } from "react"
import ReactMarkdown from 'react-markdown'

import './LessonPreviewStyle.css'
import { AnimatePresence } from "motion/react"
import Link from 'next/link'
import { useAppDispatch } from '@/lib/hooks'
import { setCongrationMsg, setProgrammes } from '@/lib/features/programmes'
import { useRouter } from 'next/navigation'
import useHotkeys from '@/lib/useHotkeys'
import CongratulationsMsg from './CongratulationsMsg'
import { useAfterComplete } from '@/lib/utils'

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

const LessonPreview = ({ lesson }: {lesson: LessonArg}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const afterComplete = useAfterComplete(lesson.id)

  useHotkeys(
    [{key: 'ArrowLeft'}],
    () => changeSlide('decrease')()
  )

  useHotkeys(
    [{key: 'ArrowRight'}],
    () => changeSlide('increase')()
  )

  useHotkeys(
    [{key: 'enter'}],
    () => changeSlide('increase')()
  )

  const changeSlide = (type: 'increase' | 'decrease') => () => {
    if (type == 'decrease' && currentSlide == 0) return
    if (type == 'increase' && currentSlide == lesson.data.lesson.length-1) return goToProgramming()
    setCurrentSlide(prev => type == 'increase' ? (prev+1) : (prev-1))
  }

  const goToProgramming = (e?: MouseEvent<HTMLAnchorElement>) => {
    e?.preventDefault()
    if (lesson.programmes.length == 0) {
      dispatch(setCongrationMsg(true))
      return
    }

    dispatch(setProgrammes(lesson.programmes))
    router.push(`/lessons/${lesson.id}/programming-space`)
  }

  return (
    <>
      <div className="slide">
        <div className="lesson">
          <AnimatePresence mode='popLayout'>
            {lesson.data.lesson[currentSlide].map((content, i) => (
              <motion.div key={content.key || currentSlide + '-' + i} layout variants={slideVariant} initial='hidden' animate='show' exit='exit' transition={{delay: i/15}}>
                {content.type == 'markdown' ? <ReactMarkdown>{content.markdown}</ReactMarkdown> : content.list.join(' | ')}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="actions">
          <Button onClick={changeSlide('decrease')} disabled={currentSlide == 0} transparent>{'<'} Previous</Button>
          {lesson.data.lesson.length == currentSlide+1 ?
            <Link href={`/lessons/${lesson.id}/programming-space`} onClick={goToProgramming}>
              <Button>Go to programming</Button>
            </Link>
          :
            <Button onClick={changeSlide('increase')}>Next {'>'}</Button>
          }
        </div>
      </div>
      <div className="lesson-progress">
        <span style={{width: (currentSlide + 1) / lesson.data.lesson.length * 100 + '%'}}></span>
      </div>

      <CongratulationsMsg handleNext={afterComplete} />
    </>
  )
}

export default LessonPreview