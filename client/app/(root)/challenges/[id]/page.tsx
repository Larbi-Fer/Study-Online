import { getChallenge } from "@/actions/challenges.action";
import ChallengeSpace from "@/components/Challenges/ChallengeSpace";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Add 2 nums'
};

const Challenge = async({ params }: { params: Promise<{id: string}> }) => {
  const data = await getChallenge((await params).id)

  if (data.message != 'SUCCESS') return (
    <h3>SomeThing wrong</h3>
  )

  return (
    <ChallengeSpace programme={data.payload} />
  )
}

export default Challenge