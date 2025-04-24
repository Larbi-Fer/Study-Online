'use client'

import Markdown from "@/ui/Markdown"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { Edit3 } from "lucide-react"
import { useAppSelector } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { Tooltip } from "@mui/material"
import Image from "next/image"

const Details = ({discussion}: {discussion: DiscussionDetailsArgs}) => {
  const userId = useAppSelector(state => state.user?.id)
  const router = useRouter()

  return (
    <div className="comment border">
      <div className="comment-header">
        <Link className="username" href={`/profile/${discussion.user.id}`}>
          <Image src={discussion.user.icon?.path!} alt="icon" className="user-icon" width={25} height={25} />
          {discussion.user.fullname}
        </Link>
        <div className="right">
          {discussion.userId === userId ? (
            <Tooltip title="Edit">
              <div className="edit-icon" onClick={() => router.push(`/community/discussion/${discussion.id}/edit`)}>
                <Edit3 />
              </div>
            </Tooltip>
          ) :
            discussion.isUpdated && (
              <div className="edited">
                Edited
              </div>
            )
          }
          <div className="timestamp">
            {formatDate(discussion.createdAt)}
          </div>
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

