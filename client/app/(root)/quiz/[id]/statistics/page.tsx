import { GetQuizResult } from "@/actions/user.action"
import QuizCharts from "@/components/Charts/QuizCharts"
import { cookies } from "next/headers"

const Statistics = async({ params }: { params: Promise<{id: string}> }) => {
  const userId = JSON.parse((await cookies()).get('user')?.value!)?.id
  const quiz = await GetQuizResult(userId, (await params).id)

  return (
    <QuizCharts result={quiz.payload} />
  )
}

export default Statistics