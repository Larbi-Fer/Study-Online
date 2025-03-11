import { getLesson } from "@/actions/lessons.actions"
import LessonPreview from "@/components/LessonsList/LessonPreview"

export async function generateMetadata({ params }: {params: Promise<{ id: string }>}) {
  const lesson = await getLesson((await params).id)

  return {
    title: lesson.payload ? lesson.payload.title : '404 - page not fonud',
  }
}

const Lesson = async({ params }: {params: Promise<{ id: string }>}) => {
  const lesson = await getLesson((await params).id)
  // console.log(lesson);
  

  return (
    <LessonPreview lesson={lesson.payload} />
    // 'Hello'
  )
}

export default Lesson