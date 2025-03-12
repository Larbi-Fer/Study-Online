'use client'

import { nextLesson } from '@/actions/user.action'
import CodingSapce from '@/components/CodingSpace'
import { nextLessonUser } from '@/lib/features/user'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import Toast from '@/ui/Toast'
import { useParams, useRouter } from 'next/navigation'

const ProgrammingSpace = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const {id, lessonId} = useAppSelector(state => ({id: state.user?.id, lessonId: state.user?.lessonId}))
  const {id: currentLessonId} = useParams<{ id: string }>()

  const afterComplete = async() => {
    if (lessonId != currentLessonId) return router.push('/dashboard')
    // update lesson field in user
    const newLesson = await nextLesson(id!)
    if (newLesson.message != 'SUCCESS') return Toast('There is something wrong', 'error')

    dispatch(nextLessonUser({
      lesson: {
        number: newLesson.payload.number,
        topicId: newLesson.payload.topicId
      },
      lessonId: newLesson.payload.id
    }))

    // go to dashboard
    router.push('/dashboard')
  }

  return (
    <CodingSapce afterComplete={afterComplete} />
  )
}

export default ProgrammingSpace