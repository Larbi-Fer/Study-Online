import Discussion from "@/components/Community/Discussion"
import { getDiscussionDetails } from "@/actions/community.actions"
import { getUserData } from "@/lib/serverUtils"
import { Metadata } from "next"

export const generateMetadata = async ({params}: {params: Promise<{id: string}>}): Promise<Metadata> => {
  const discId = (await params).id
  const {payload} = await getDiscussionDetails(discId)

  return {
    title: payload.title
  }
}

const DiscussionPage = async({params}: {params: Promise<{id: string}>}) => {
  const discId = (await params).id
  const user = await getUserData()
  
  // fetch details
  const {payload: discussionDetails, message} = await getDiscussionDetails(discId, user?.id)

  if (message !== 'SUCCESS' || !discussionDetails) {
    return <div>Discussion not found</div>
  }

  return (
    <Discussion discussion={discussionDetails} />
  )
}

export default DiscussionPage
