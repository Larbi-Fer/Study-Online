import { getChallenge } from "@/actions/challenges.action";
import ChallengeSpace from "@/components/Challenges/ChallengeSpace";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: {params: Promise<{ id: string }>}) {
  const data = await getChallenge((await params).id)

  return {
    title: data.payload.title,
  }
}

const Challenge = async({ params }: { params: Promise<{id: string}> }) => {
  const progId = (await params).id
  const data = await getChallenge(progId)

  if (data.message != 'SUCCESS') return (
    <h3>SomeThing wrong</h3>
  )

  if (!data.payload) return notFound()

  return (
    <ChallengeSpace programme={data.payload} progId={progId} />
  )
}

export default Challenge