import Discussion from "@/components/Community/Discussion"
import { getDiscussionDetails } from "@/actions/community.actions"
import { getUserData } from "@/lib/serverUtils"

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
