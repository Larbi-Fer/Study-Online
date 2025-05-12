import { getDiscussions } from "@/actions/community.actions"
import Discussions from "@/components/Community/Discussions"
import { getUserData } from "@/lib/serverUtils"

export const metadata = {
  title: 'Community'
}

const CommunityPage = async({searchParams}: {searchParams: Promise<{[key: string]: string | string[] | undefined}>}) => {
  const params = await searchParams; // tag or q

  const user = await getUserData()
  // fetch discussions
  const discussions = await getDiscussions(user?.id, {
    q: params.q as string,
    tag: params.tag as string 
  })
  console.log(params);
  

  return (
    <div>
      <Discussions defaultDisc={discussions.payload} />
    </div>
  )
}

export default CommunityPage
