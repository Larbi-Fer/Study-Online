import { getChallengesData } from "@/actions/challenges.action";
import ChallengesList from "@/components/Challenges";
import { getUserData } from "@/lib/serverUtils";
import Image from "next/image";

const Challenges = async() => {
  const user = (await getUserData())!

  const userLvl = user.selectedTopic?.level!
  if (userLvl < 2) return (
    <div style={{textAlign: 'center', marginTop: '60px'}}>
      <Image src='/icons/challenge.jpg' alt="challenge" width={100} height={100} />
      <h2>Finish the first level to start taking on challenges!</h2>
    </div>
  )

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