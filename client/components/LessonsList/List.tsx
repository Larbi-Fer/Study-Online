'use client'

import { useAppSelector } from '@/lib/hooks'
import { intToString } from '@/lib/utils'
import Button from '@/ui/Button'
import Progress from '@/ui/Progress'
import { CheckCircleIcon } from 'lucide-react'
import * as motion from 'motion/react-client'
import Link from 'next/link'
import React, { useState } from 'react'

type ListProps = {
  list: LessonArg[],
  next: boolean
  // key: React.Key
}

const listVariant = {
  hidden: {opacity: 0, y: 5},
  show: {opacity: 1, y: 0}
}

const List = ({ list, next }: ListProps) => {
  console.log(list);
  
  const user = useAppSelector(state => state.user)

  return (
    <motion.div variants={listVariant} className='list'>
      {list.map((lesson, i) => (
        <React.Fragment key={i}>
          <motion.div key={'lesson-' + i} id={'lesson-' + i} className='element'>
            {user?.lesson?.number! > lesson.number ?
              <div className='level complete-icon'>
                <div><CheckCircleIcon size={30} color='#1f1' /></div>
              </div>
            :
              <div className="level">
                <div className="num">{lesson.number}</div>
                <div className='level-name'>Lesson</div>
              </div>
            }

            <div className="details">
              <div className="title">{lesson.title}</div>
              <div className="info">
                <div>
                  <span>Slides: </span>
                  <span>{lesson.data?.lesson?.length || 0}</span>
                </div>
                <div>
                  <span>Programmes: </span>
                  <span>{lesson._count.programmes}</span>
                </div>
              </div>
            </div>

            <div className="action">
              <Link href={`/lessons/${lesson.id}`}>
                {lesson.completed.length ?
                    <Button>Retake</Button>
                  :
                    (lesson.number == user?.lesson?.number ?
                      <Button disabled={!next}>Start</Button>
                    :
                      <Button disabled>Start</Button>
                    )
                }
              </Link>
            </div>
          </motion.div>

          {lesson.quiz?.id && (
            <motion.div key={'quiz-' + i} className='element'>
              {lesson.quiz.quizResults.length ?
                <div className='level'>
                  <Progress progress={lesson.quiz.quizResults[0].percent} small color={lesson.quiz.quizResults[0].percent > 50 ? undefined : '#f44'} />
                </div>
              : <div className="level">
                <div className="num">{intToString((i+1)/3)}</div>
                <div className='level-name'>&nbsp;&nbsp;Quiz&nbsp;&nbsp;</div>
              </div>}

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
                {lesson.quiz.quizResults.length > 0 ? (
                  <Link href={`/quiz/${lesson.quiz.id}/statistics`}>
                    <Button>Statistics</Button>
                  </Link>
                ) : (
                  <Link href={`/quiz/${lesson.quiz.id}`}>
                    <Button disabled={lesson.completed.length == 0}>Start quiz</Button>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </React.Fragment>
      ))}
    </motion.div>
  )
}

export default List