'use client'
import { getLesson } from "@/actions/lessons.actions"
import { clearLesson } from "@/lib/features/lesson"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import Loading from "@/ui/Loading"
import SidePeek from "@/ui/SidePeek"
import Toast from "@/ui/Toast"
import { useEffect, useState } from "react"
import LessonContant from "./LessonContent"
import useHotkeys from "@/lib/useHotkeys"

const LessonSidePeek = () => {
  const lessonId = useAppSelector(state => state.lesson.lessonId)
  const dispatch = useAppDispatch()
  const [lesson, setLesson] = useState<LessonArg>()

  useEffect(() => {
    if (!lessonId) return

    (async() => {
      const lsn = await getLesson(lessonId)
      if (lsn.message != 'SUCCESS') return Toast('Something went wrong', 'error')
      setLesson(lsn.payload)
    })()
  }, [lessonId])

  useHotkeys([{key: 'Escape'}], () => handleClose())

  const handleClose = () => {
    dispatch(clearLesson())
    setLesson(undefined)
  }


  return (
    <SidePeek isActive={lessonId != null} close={handleClose}>
      {lesson ? (
        <div className="lesson-side-peek">
          <h1>{lesson.title}</h1>
          {lesson.data.lesson.map((section, i) =>
            <div className="lesson-section">
              {section.map((element, i) => (
                <div key={'section' + i} className="lesson-element">
                  <LessonContant content={element} />
                </div>
              ))}
            </div>
            )
          }
        </div>
      ) : <Loading />}
    </SidePeek>
  )
}

export default LessonSidePeek