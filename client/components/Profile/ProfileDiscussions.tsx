'use client'

import { useState } from "react"
import Discussion from "../Community/Discussions/Discussion"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/lib/hooks"
import { voteDiscussion } from "@/actions/community.actions"

const ProfileDiscussions = ({discussions: defaultDisc}: {discussions: DiscussionArgs[]}) => {
  const [discussions, setDiscussions] = useState(defaultDisc)
  const router = useRouter()
  const userId = useAppSelector(state => state.user?.id)

  const searchByTag = (tag: string) => (e: React.FormEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    router.push('/community/?tag=' + tag)
  }

  const vote = (discussionId: string) => async (e: React.FormEvent<HTMLSpanElement>) => {
    console.log(discussionId);
    
    e.stopPropagation()
    if (!userId) return

    try {
      const result = await voteDiscussion(discussionId, userId)
      if (result.message === 'SUCCESS') {
        setDiscussions(prev => prev.map(d =>
          d.id === discussionId ? {
            ...d,
            _count: {
              ...d._count,
              votes: d.votes.length == 0
                ? d._count.votes + 1
                : d._count.votes - 1
            },
            votes: d.votes.some(v => v.userId === userId)
              ? d.votes.filter(v => v.userId !== userId)
              : [...d.votes, { userId }]
          } : d
        ))
      }
    } catch (error) {
      console.error('Error voting:', error)
    }
  }

  return discussions.map((discussion, index) => (
    <Discussion key={discussion.id} discussion={discussion} searchByTag={searchByTag} vote={vote} userId={userId} />
  ))
}

export default ProfileDiscussions
