'use client'

import { QUIZ_PASS_PERCENTAGE } from '@/lib/constant'
import { setLesson } from '@/lib/features/lesson'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { intToString } from '@/lib/utils'
import Button from '@/ui/Button'
import Progress from '@/ui/Progress'
import { CheckCircleIcon, XCircleIcon } from 'lucide-react'
import * as motion from 'motion/react-client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

type ListProps = {
  lesson: LessonArg,
  next: boolean
  // key: React.Key
}

const listVariant = {
  hidden: {opacity: 0, x: -10},
  show: {opacity: 1, x: 0}
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

const List = ({ lesson, next }: ListProps) => {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [now, setNow] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    console.log(lesson.quiz)
    const interval = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(interval)
  }, [])


  // Calculate current level based on the first lesson in the list
  const currentLevel = Math.ceil(lesson.number / 3)

  const setReview = (id: string) => {
    dispatch(setLesson({ lessonId: id }))
  }

  const disabledLesson = currentLevel > (user?.selectedTopic?.level || 1) || lesson.number > (user?.selectedTopic?.currentLesson.number || 1);
  const disabledQuiz = lesson.completed.length == 0;

  const goToLesson = (e: React.MouseEvent<HTMLDivElement>) => {
    if (lesson.completed.length) setReview(lesson.id)
    else if (!disabledLesson) router.push(`/lessons/${lesson.id}`)
  }

  const goToQuiz = (e: React.MouseEvent<HTMLDivElement>) => {
    // if (lesson.quiz?.quizResults.length !== 0 && lesson.quiz?.quizResults[0].percent! < QUIZ_PASS_PERCENTAGE && !lesson.quiz?.locked) router.push(`/quiz/${lesson.quiz?.id!}`)
    if (lesson.quiz?.quizResults.length! > 0) router.push(`/quiz/${lesson.quiz?.id!}/statistics`)
    else if (!disabledQuiz) router.push(`/quiz/${lesson.quiz?.id!}`)
  }

  const retakeQuiz = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    router.push(`/quiz/${lesson.quiz?.id!}`)
  }

  const waitTime = (lesson.number + currentLevel - 1) * 0.4
  
  return (
    <>
      <div className={'lesson-details' + (disabledLesson ? ' disabled' : '')}>
        <Circle wait={waitTime} content={intToString(lesson.number)} />
        <motion.div variants={listVariant} initial='hidden' animate='show' transition={{delay: waitTime + 0.3}} style={{width: '100%'}}>
          <div onClick={goToLesson} className='lesson-title'>
            <h2>{lesson.title}</h2>
            <div>
              {lesson.completed.length !== 0 && <i>
                <CheckCircleIcon color='#4f4' />
              </i>}
            </div>
          </div>
        </motion.div>
        <Line wait={waitTime} />
      </div>

      {lesson.quiz && (
        <div className={'lesson-details quiz' + (disabledQuiz ? ' disabled' : '')}>
        <Circle wait={waitTime + 0.4} content={intToString(currentLevel)} />
        <motion.div variants={listVariant} initial='hidden' animate='show' transition={{delay: waitTime + 0.7}} style={{width: '100%'}}>
          <div onClick={goToQuiz} className='lesson-title'>
            <h2>Quiz</h2>
            <div>
              {lesson.quiz.quizResults.length !== 0 && lesson.quiz.quizResults[0].percent >= QUIZ_PASS_PERCENTAGE && <i>
                <CheckCircleIcon color='#4f4' />
              </i>}
              {lesson.quiz.quizResults.length !== 0 && lesson.quiz.quizResults[0].percent < QUIZ_PASS_PERCENTAGE && <i>
                <XCircleIcon color='#f44' />
              </i>}
              {!lesson.quiz.unlockTime && lesson.quiz.quizResults.length !== 0 && lesson.quiz.quizResults[0].percent < QUIZ_PASS_PERCENTAGE &&
                <Button onClick={retakeQuiz} >Retake quiz</Button>
              }
              {lesson.quiz.quizResults.length !== 0 && <LinePercentage percentage={lesson.quiz.quizResults[0].percent} wait={waitTime + 1} />}
              {lesson.quiz.unlockTime &&
                <div className='quiz-pass'>{formatTimeLeft(lesson.quiz.unlockTime)}</div>
              }
            </div>
          </div>
        </motion.div>
        {next && <Line wait={waitTime + 0.4} />}
      </div>
      )}
    </>
    /*<motion.div variants={listVariant} className='list'>
      <Circle wait={0.3} content='02' />
      {list.map((lesson, i) => (
        <React.Fragment key={i}>
          <motion.div key={'lesson-' + i} id={'lesson-' + i} className='element'>
            {lesson.completed.length ?
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
                {lesson.completed.length ?
                  <Button onClick={setReview(lesson.id)}>Review</Button>
                :
                  <Link href={`/lessons/${lesson.id}`}>
                    {lesson.number == user?.selectedTopic?.currentLesson.number ?
                      <Button disabled={currentLevel > (user?.selectedTopic?.level || 1)}>Start</Button>
                    :
                      <Button disabled>Start</Button>
                    }
                  </Link>
                }
            </div>
          </motion.div>

          {lesson.quiz?.id && (
            <motion.div key={'quiz-' + i} className='element'>
              {lesson.quiz.quizResults.length ?
                <div className='level'>
                  <Progress progress={lesson.quiz.quizResults[0].percent} small color={lesson.quiz.quizResults[0].percent > 50 ? undefined : '#f44'} />
                </div>
              : <div className="level">
                <div className="num">{intToString(currentLevel)}</div>
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
                  lesson.quiz.locked ? (
                    <>
                      <Button disabled>{formatTimeLeft(lesson.quiz.unlockTime!)}</Button>
                      <Link href={`/quiz/${lesson.quiz.id}/statistics`}>
                        <Button>Statistics</Button>
                      </Link>
                    </>
                  ) : (
                    lesson.quiz.quizResults[0].percent >= 80 ? (
                      <Link href={`/quiz/${lesson.quiz.id}/statistics`}>
                        <Button>Statistics</Button>
                      </Link>
                    ) : (
                      <Link href={`/quiz/${lesson.quiz.id}`}>
                        <Button>Retake</Button>
                      </Link>
                    )
                  )
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
    </motion.div>*/
  )
}

export default List

const Circle = ({wait=0, content}: {wait?: number, content: string}) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  const numberStyle: any = {
    position: 'absolute', top: 'calc(50% - 4px)', left: '50%', transform: 'translate(-50%, -50%)',
    fontSize: '18px',
    fontWeight: '600'
  }

  return (
    <div style={{position: 'relative', width: 'fit-content', marginTop: '7px'}}>
      <svg width="45" height="45" viewBox="0 0 120 120">
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          stroke='var(--primary-topic-bg)'
          strokeWidth={5}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={0}
          transform="rotate(-90 60 60)"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut', delay: wait }}
        />
      </svg>
      <motion.div style={numberStyle} initial={{opacity: 0}} animate={{opacity: 1}} transition={{ duration: 0.6, ease: 'easeInOut', delay: wait }}>
        {content}
      </motion.div>
    </div>
  )
}

const Line = ({wait}: {wait: number}) => {
  return (
    <svg width="10" height="30" style={{position: 'absolute', top: 'calc(100% - 5px)', left: '21px'}}>
      <motion.line
        x1={0}
        y1={0}
        x2={0}
        y2={30}
        stroke='var(--primary-topic-bg)'
        strokeWidth={5}
        initial={{ y2: 0 }}
        animate={{ y2: 30 }}
        transition={{ duration: 0.6, delay: wait + 0.4 }}
      />
    </svg>
  )
}

const LinePercentage = ({percentage, wait}: {percentage: number, wait: number}) => {
  return (
    <div style={{position: 'relative', transform: 'translateY(7px)', marginTop: '10px'}} className='line-percentage'>
      <svg width="100" height="10">
        <line x1={0} y1={0} x2={100} y2={0} stroke='#ddd' strokeWidth={5} />
        <motion.line
          x1={0}
          y1={0}
          x2={percentage}
          y2={0}
          stroke='#4f4'
          strokeWidth={5}
          initial={{ x2: 0 }}
          animate={{ x2: percentage }}
          transition={{ duration: 0.6, delay: wait }}
      />
    </svg>
      <motion.div style={{position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)'}}>
        {percentage}%
      </motion.div>
    </div>
  )
}