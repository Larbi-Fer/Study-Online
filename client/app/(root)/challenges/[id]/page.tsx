import { getChallenge } from "@/actions/challenges.action";
import ChallengeSpace from "@/components/Challenges/ChallengeSpace";
import { getUserData } from "@/lib/serverUtils";
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

  const user = await getUserData()
  if (!user) return ''

  let isAdmin = false
  if (user.role == 'admin') isAdmin = true

  return (
    <ChallengeSpace programme={data.payload} progId={progId} edit={isAdmin} />
  )
}

export default Challenge