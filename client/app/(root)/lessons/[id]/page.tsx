import { getLesson } from "@/actions/lessons.actions"

export async function generateMetadata({ params }: {params: Promise<{ id: string }>}) {
  const lesson = await getLesson((await params).id)

  return {
    title: lesson.payload ? lesson.payload.title : '404 - page not fonud',
  }
}

const Lesson = () => {
  return (
    <div>Lesson</div>
  )
}

export default Lesson