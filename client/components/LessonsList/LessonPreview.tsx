'use client'

import * as motion from 'motion/react-client'
import Button from "@/ui/Button"
import { useState } from "react"
import ReactMarkdown from 'react-markdown'

import './LessonPreviewStyle.css'
import { AnimatePresence } from "motion/react"
import Link from 'next/link'

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

  const changeSlide = (callback: (prev: number) => number) => () => setCurrentSlide(callback)

  return (
    <>
      <div className="slide">
        <div className="lesson">
          <AnimatePresence mode='wait'>
            {lesson.data.lesson[currentSlide].map((content, i) => (
              <motion.div key={currentSlide + '-' + i} variants={slideVariant} initial='hidden' animate='show' exit='exit' transition={{delay: i/15}}>
                {content.type == 'markdown' ? <ReactMarkdown>{content.markdown}</ReactMarkdown> : content.list.join(' | ')}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="actions">
          <Button onClick={changeSlide(prev => prev - 1)} disabled={currentSlide == 0} transparent>{'<'} Previous</Button>
          {lesson.data.lesson.length == currentSlide+1 ?
            <Link href={`/lessons/${lesson.id}/programming-space`}>
              <Button>Go to programming</Button>
            </Link>
          :
            <Button onClick={changeSlide(prev => prev + 1)}>Next {'>'}</Button>
          }
        </div>
      </div>

      <div className="navbar-hidden"></div>
      <div className="lesson-progress">
        <span style={{width: (currentSlide + 1) / lesson.data.lesson.length * 100 + '%'}}></span>
      </div>
    </>
  )
}

export default LessonPreview