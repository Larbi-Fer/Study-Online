import { useDispatch } from "react-redux"
import { nextLessonUser } from "./features/user"
import { nextLesson } from "@/actions/user.action"
import Toast from "@/ui/Toast"
import { useRouter } from "next/navigation"
import { useAppSelector } from "./hooks"
import { setCongrationMsg } from "./features/programmes"

export const useAfterComplete = (currentLessonId: string) => {
  const dispatch = useDispatch()
  const {id, lessonId, topicId} = useAppSelector(state => ({id: state.user?.id, lessonId: state.user?.selectedTopic?.currentLesson.id, topicId: state.user?.selectedTopic?.id}))
  const router = useRouter()

  return (async() => {
    if (lessonId != currentLessonId) {
      dispatch(setCongrationMsg(false))
      router.push('/dashboard')
      return
    }
      // update lesson field in user
      const newLesson = await nextLesson(id!, topicId!)
      if (newLesson.message != 'SUCCESS') return Toast('There is something wrong', 'error')
    
      //// dispatch(nextLessonUser({
      ////   id: newLesson.payload.id,
      ////   number: newLesson.payload.number
      //// }))
      dispatch(setCongrationMsg(false))
    
      // go to dashboard
      router.push('/dashboard')
  })
}