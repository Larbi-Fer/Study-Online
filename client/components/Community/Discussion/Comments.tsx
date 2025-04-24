'use client'

import Markdown from "@/ui/Markdown"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import Image from "next/image"

const Comments = ({comments}: {comments: CommentArgs[]}) => {
  return (
    <div>
      {comments.map(comment => (
        <div key={comment.id} className="comment border">
          <div className="comment-header">
            <Link className="username" href={`/profile/${comment.user.id}`}>
              <Image src={comment.user.icon.path} alt="icon" className="user-icon" width={25} height={25} />
              {comment.user.fullname}
            </Link>
            <div className="timestamp">
              {formatDate(comment.createdAt)}
            </div>
          </div>
          <Markdown>{comment.content}</Markdown>
        </div>
      ))}
    </div>
  )
}

export default Comments
