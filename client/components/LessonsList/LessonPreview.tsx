'use client'

import * as motion from 'motion/react-client'
import Button from "@/ui/Button"
import { MouseEvent, useRef, useState } from "react"
import ReactMarkdown from 'react-markdown'

import './LessonPreviewStyle.css'
import { AnimatePresence } from "motion/react"
import Link from 'next/link'
import { useAppDispatch } from '@/lib/hooks'
import { setCongrationMsg, setProgrammes } from '@/lib/features/programmes'
import { useRouter } from 'next/navigation'
import useHotkeys from '@/lib/useHotkeys'
import CongratulationsMsg from './CongratulationsMsg'
import { useAfterComplete } from '@/lib/customHooks'
import CustomCursor from '@/ui/CustomCursor'
import LessonContant from './LessonContent'

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

const LessonPreview = ({ lesson }: { lesson: LessonArg }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const afterComplete = useAfterComplete(lesson.id)
  const slideRef = useRef<HTMLDivElement>(null)

  useHotkeys(
    [{ key: 'ArrowLeft' }],
    () => changeSlide('decrease')()
  )

  useHotkeys(
    [{ key: 'ArrowRight' }],
    () => changeSlide('increase')()
  )

  useHotkeys(
    [{ key: 'enter' }],
    () => changeSlide('increase')()
  )

  const changeSlide = (type: 'increase' | 'decrease') => () => {
    if (type == 'decrease' && currentSlide == 0) return
    if (type == 'increase' && currentSlide == lesson.data.lesson.length - 1) return goToProgramming()
    setCurrentSlide(prev => type == 'increase' ? (prev + 1) : (prev - 1))
  }

  const goToProgramming = (e?: MouseEvent<HTMLButtonElement>) => {
    if (lesson.programmes.length == 0) {
      dispatch(setCongrationMsg(true))
      return
    }

    dispatch(setProgrammes(lesson.programmes))
    router.push(`/lessons/${lesson.id}/programming-space`)
  }

  return (
    <>
        <CustomCursor objectRef={slideRef} />
      <div className="slide" ref={slideRef}>
        <div className="slide-lesson" ref={slideRef}>
          <AnimatePresence mode='popLayout'>
            {lesson.data.lesson[currentSlide].map((content, i) => (
              <motion.div key={content.key || currentSlide + '-' + i}
                    style={{ width: '100%' }}
                    layout={content.key ? 'preserve-aspect' : false} variants={slideVariant} initial='hidden' animate='show' exit='exit' transition={{ delay: i / 15 }}>
                <LessonContant content={content} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="slide-actions">
          <Button onClick={changeSlide('decrease')} disabled={currentSlide == 0} transparent>{'<'} Previous</Button>
          {lesson.data.lesson.length == currentSlide + 1 ?
            <Button onClick={goToProgramming}>{lesson.programmes.length == 0 ? 'Complete' : 'Go to programming'}</Button>
            :
            <Button onClick={changeSlide('increase')}>Next {'>'}</Button>
          }
        </div>
      </div>
      <div className="lesson-progress">
        <span style={{ width: (currentSlide + 1) / lesson.data.lesson.length * 100 + '%' }}></span>
      </div>

      <CongratulationsMsg handleNext={afterComplete} />
    </>
  )
}

export default LessonPreview