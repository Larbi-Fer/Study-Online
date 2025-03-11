import { getLesson } from "@/actions/lessons.actions"
import LessonPreview from "@/components/LessonsList/LessonPreview"


const Lesson = async({ params }: {params: Promise<{ id: string }>}) => {
  const lesson = await getLesson((await params).id)
  // console.log(lesson);
  

  return (
    <LessonPreview lesson={lesson.payload} />
    // 'Hello'
  )
}

export default Lesson