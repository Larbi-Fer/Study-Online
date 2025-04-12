import { getChallengesData } from "@/actions/challenges.action";
import ChallengesList from "@/components/Challenges";
import { getUserData } from "@/lib/serverUtils";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

const Challenges = async() => {
  const user = (await getUserData())!
  const userLvl = Math.floor(user.lesson?.number! / 3) + 1
  /*if (userLvl < 2) return (
    <div>
      <h2>Complete level 1 first</h2>
    </div>
  )*/

  // Get chellenges & points
  const data = await getChallengesData(user.id!, user.selectedTopic?.id!)
  if (data.message != 'SUCCESS') return (
    <h3>Something wrong</h3>
  )

  return (
    <ChallengesList points={data.payload.points} level={userLvl} challenges={data.payload.challenges} />
  )
}

export default Challenges