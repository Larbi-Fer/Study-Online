import { useDispatch } from "react-redux"
import { nextLessonUser } from "./features/user"
import { nextLesson } from "@/actions/user.action"
import Toast from "@/ui/Toast"
import { useRouter } from "next/navigation"
import { useAppSelector } from "./hooks"
import { setCongrationMsg } from "./features/programmes"

export const useAfterComplete = (currentLessonId: string) => {
  const dispatch = useDispatch()
  const {id, lessonId} = useAppSelector(state => ({id: state.user?.id, lessonId: state.user?.lessonId}))
  const router = useRouter()

  return (async() => {
    if (lessonId != currentLessonId) {
      dispatch(setCongrationMsg(false))
      router.push('/dashboard')
      return
    }
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
      dispatch(setCongrationMsg(false))
    
      // go to dashboard
      router.push('/dashboard')
  })
}