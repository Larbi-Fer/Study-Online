'use client'

import { Tooltip } from "@mui/material"
import { formatDistanceToNowStrict } from "date-fns"
import { ArrowUpIcon, MessageSquareIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import './discStyle.css'

type DiscussionProps = {
  discussion: DiscussionArgs,
  userId?: string,
  vote: (discId: string) => (e: any) => void,
  searchByTag: (tag: string) => (e: any) => void
}

const Discussion = ({discussion, userId, vote, searchByTag}: DiscussionProps) => {
  const router = useRouter()

  return (
    <div className="discussion" onClick={() => router.push(`/community/discussion/${discussion.id}`)}>
      <div>
        <div className="discussion-header">
          <Tooltip title={userId ? 'vote' : 'You must be logged in'}>
            <span
              className={"vote-count" + (discussion.votes.length ? ' voted' : '')}
              onClick={vote(discussion.id)}
              style={{ cursor: userId ? 'pointer' : 'default' }}
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
          <span>
            {formatDistanceToNowStrict(discussion.createdAt, { addSuffix: true })}
          </span>
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
  )
}

export default Discussion
