import { getChallengesData } from "@/actions/challenges.action";
import ChallengesList from "@/components/Challenges";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

const Challenges = async() => {
  const userData = (await cookies()).get('user')?.value

  if (!userData) return redirect('/login')
  const user = JSON.parse(userData)
  const userLvl = Math.floor(user.lesson.number / 3) + 1
  /*if (userLvl < 2) return (
    <div>
      <h2>Complete level 1 first</h2>
    </div>
  )*/

  // Get chellenges & points
  const data = await getChallengesData(user.id, user.lesson.topicId)
  if (data.message != 'SUCCESS') return (
    <h3>Something wrong</h3>
  )

  return (
    <ChallengesList points={data.payload.points} level={userLvl} challenges={data.payload.challenges} />
  )
}

export default Challenges