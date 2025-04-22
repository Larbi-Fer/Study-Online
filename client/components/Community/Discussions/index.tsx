'use client'

import { useState } from "react"
import './style.css'
import { ArrowUpIcon, MessageSquareIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/lib/hooks"
import { Tooltip } from "@mui/material"
import { voteDiscussion } from "@/actions/community.actions"

type DiscussionsProps = {
  defaultDisc: {
    discussions: DiscussionArgs[]
    total: number
    hasMore: boolean
  }
}

const Discussions = ({defaultDisc}: DiscussionsProps) => {
  const [discussions, setDiscussions] = useState(defaultDisc.discussions)
  const userId = useAppSelector(state => state.user?.id)
  const router = useRouter()
  
  const goToDiscussion = (id: string) => {
    router.push(`/community/discussion/${id}`)
  }

  const vote = (discussionId: string) => async (e: React.FormEvent<HTMLSpanElement>) => {
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
              votes: d.votes.some(v => v.userId === userId) 
                ? d._count.votes - 1 
                : d._count.votes + 1
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

  const searchByTag = (tag: string) => (e: React.FormEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    router.push('?tag=' + tag)
  }

  return (
    <div className="discussions">
      <div className="header">
        <h3>Filter: </h3>
        <div className="filter-option selected">vote</div>
        <div className="filter-option">newer</div>
      </div>

      <div className="list">
        {discussions.map(discussion => (
          <div key={discussion.id} className="discussion" onClick={() => goToDiscussion(discussion.id)}>
            <div>
              <div className="discussion-header">
                <Tooltip title={userId ? 'vote' : 'You must be logged in'}>
                  <span 
                    className={"vote-count" + (discussion.votes.length ? ' voted' : '') }
                    onClick={vote(discussion.id)} 
                    style={{cursor: userId ? 'pointer' : 'default'}}
                  >
                    <div className="vote-icon">
                      <ArrowUpIcon />
                      <ArrowUpIcon color={discussion.votes.some(v => v.userId === userId) ? "#007bff" : undefined} />
                    </div>
                    {discussion._count.votes}
                  </span>
                </Tooltip>
                <h4>{discussion.title}</h4>
                <span className="user">@{discussion.user.fullname || discussion.user.email.split('@')[0]}</span>
              </div>
              <div className="discussion-meta">
                <span className="comment-count">
                  <MessageSquareIcon /> {discussion._count.comments}
                </span>
              </div>
            </div>

            <div className="discussion-tags-list">
              {discussion.tags.map(tag => (
                <span key={tag} className="tag" onClick={searchByTag(tag)}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Discussions
