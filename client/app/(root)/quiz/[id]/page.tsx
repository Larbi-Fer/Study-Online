import { getQuizById } from "@/actions/quiz.action"
import QuizSlides from "@/components/LessonsList/QuizSlides";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { QUIZ_PASS_PERCENTAGE } from "@/lib/constant";

const Quiz = async({params}: {params: Promise<{id: string}>}) => {
  const userData = (await cookies()).get('user')?.value
  if (!userData) return redirect('/login')
  const user = JSON.parse(userData)

  const data = await getQuizById((await params).id)

  if (data.message != 'SUCCESS') return notFound()

  // Get the lesson number and calculate its level
  const lessonLevel = Math.ceil(data.payload.lesson.number / 3)
  
  // Check if user's level matches the quiz level
  if (lessonLevel !== user.level) return redirect('/lessons')

  // Check if quiz is locked due to recent failure
  if (data.payload.quizResults?.length > 0) {
    const lastResult = data.payload.quizResults[0]
    if (lastResult.percent < QUIZ_PASS_PERCENTAGE) {
      const hoursSinceLastAttempt = Math.floor(
        (new Date().getTime() - new Date(lastResult.lastAttempt).getTime()) / (1000 * 60 * 60)
      )
      
      if (hoursSinceLastAttempt < 24) {
        return redirect(`/quiz/${(await params).id}/statistics`)
      }
    }
  }

  return (
    <>
      <QuizSlides quiz={data.payload} />
      <div className="navbar-hidden"></div>
    </>
  )
}

export default Quiz