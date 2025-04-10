'use client'

import Button from "@/ui/Button"
import Link from "next/link"
import { useEffect, useState } from "react"

type WhatNextProps = {
  lesson?: LessonArg,
  quiz?: QuizArgs & { number: number }
  quizLocked?: boolean
  unlockTime?: Date
}

const formatTimeLeft = (unlockTime: Date) => {
  const now = new Date()
  const diff = new Date(unlockTime).getTime() - now.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  if (hours > 0) {
    return `Wait ${hours}h${minutes}m`
  }
  return `Wait ${minutes}m`
}

const WhatNaxt = ({ lesson, quiz, quizLocked, unlockTime }: WhatNextProps) => {
  const [now, setNow] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="dash-details">
      <h2>What next</h2>
      {quiz ?
        <div className="lesson">
          <div className="level">
            <div className="num">{quiz.number}</div>
            <div className='level-name'>&nbsp;&nbsp;Quiz&nbsp;&nbsp;</div>
          </div>

          <div className="details">
            <div className="title">Quiz</div>
            <div className="info">
              <div>
                <span>Questions: </span>
                <span>10</span>
              </div>
            </div>
          </div>

          <div className="action">
            {quizLocked ? (
              <>
                <Button disabled>{formatTimeLeft(unlockTime!)}</Button>
                <Link href={`/quiz/${quiz.id}/statistics`}>
                  <Button>Statistics</Button>
                </Link>
              </>
            ) : (
              <Link href={`/quiz/${quiz.id}`}>
                <Button>Start quiz</Button>
              </Link>
            )}
          </div>
        </div>
      :
        <div className="lesson">
          <div className="level">
            <div className="num">{lesson?.number}</div>
            <div className='level-name'>Lesson</div>
          </div>

          <div className="details">
            <div className="title">{lesson?.title}</div>
            <div className="info">
              <div>
                <span>Slides: </span>
                <span>10</span>
              </div>
              <div>
                <span>Programmes: </span>
                <span>{lesson?._count.programmes}</span>
              </div>
            </div>
          </div>

          <div className="action">
            <Link href={`/lessons/${lesson?.id}`}>
              <Button>Start</Button>
            </Link>
          </div>

        </div>
      }
    </div>
  )
}

export default WhatNaxt