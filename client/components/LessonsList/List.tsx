'use client'

import { useAppSelector } from '@/lib/hooks'
import Button from '@/ui/Button'
import { CheckCircleIcon } from 'lucide-react'
import * as motion from 'motion/react-client'
import Link from 'next/link'
import React from 'react'

type ListProps = {
  list: LessonArg[],
  // key: React.Key
}

const listVariant = {
  hidden: {opacity: 0, y: 5},
  show: {opacity: 1, y: 0}
}

const List = ({ list }: ListProps) => {
  const user = useAppSelector(state => state.user)
  console.log(list);
  

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
                  <span>10</span>
                </div>
                <div>
                  <span>Programmes: </span>
                  <span>{lesson._count.programmes}</span>
                </div>
              </div>
            </div>

            <div className="action">
              <Link href={`/lessons/${lesson.id}`}>
                {user?.lesson?.number! < lesson.number ?
                  <Button disabled>Start</Button>
                  : ( user?.lesson?.number! == lesson.number ?
                      <Button>Start</Button>
                    :
                      <Button>Retake</Button>
                )
                }
              </Link>
            </div>
          </motion.div>

          {((i+1) % 3 == 0) && (
            <motion.div key={'quiz-' + i} className='element'>
              <div className="level">
                <div className="num">{(i+1)/3}</div>
                <div className='level-name'>&nbsp;&nbsp;Quiz&nbsp;&nbsp;</div>
              </div>

              <div className="details">
                <div className="title">Quiz</div>
                <div className="info">
                  <div>
                    <span>Slides: </span>
                    <span>10</span>
                  </div>
                </div>
              </div>

              <div className="action">
                <Link href={`/quiz/${lesson.quiz?.id}`}>
                  <Button>Start quiz</Button>
                </Link>
              </div>
            </motion.div>
          )}
        </React.Fragment>
      ))}
    </motion.div>
  )
}

export default List