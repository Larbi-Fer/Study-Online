'use client'

import Markdown from "@/ui/Markdown"
import Link from "next/link"
import { formatDate } from "@/lib/utils"

const Details = ({discussion}: {discussion: DiscussionDetailsArgs}) => {
  return (
    <div className="comment border">
      <div className="comment-header">
        <Link className="username" href={`/profile/${discussion.user.id}`}>{discussion.user.fullname}</Link>
        <div className="timestamp">
          {formatDate(discussion.createdAt)}
        </div>
      </div>
      <Markdown>{discussion.content}</Markdown>
      <div className="discussion-tags">
        {discussion.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  )
}

export default Details

