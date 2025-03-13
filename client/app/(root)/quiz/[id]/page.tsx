import { getQuizById } from "@/actions/quiz.action"
import QuizSlides from "@/components/LessonsList/QuizSlides";
import { notFound } from "next/navigation";

const Quiz = async({params}: {params: Promise<{id: string}>}) => {
  const data = await getQuizById((await params).id)

  if (data.message != 'SUCCESS') return notFound()

  return (
    <>
      <QuizSlides quiz={data.payload} />
      <div className="navbar-hidden"></div>
    </>
  )
}

export default Quiz