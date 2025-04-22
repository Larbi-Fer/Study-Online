'use client'

import { addComment } from "@/actions/community.actions"
import { useAppSelector } from "@/lib/hooks"
import Button from "@/ui/Button"
import Markdown from "@/ui/Markdown"
import { TextareaAutosize } from "@mui/material"
import { SendIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

const CommentSpace = ({discussionId}: {discussionId: string}) => {
  const [isPreview, setIsPreview] = useState(false)
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const userId = useAppSelector(state => state.user?.id)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      const result = await addComment(discussionId, content, userId!)
      if (result.message === 'SUCCESS') {
        if (isPreview) setIsPreview(false)
        setContent('')
        router.refresh()
      }
    } catch (error) {
      console.error('Error posting comment:', error)
    }
    setIsSubmitting(false)
  }

  return userId ? (
    <form className="comment-space border" onSubmit={handleSubmit}>
      <div className="group">
        <Button type='button' transparent={isPreview} onClick={() => setIsPreview(prev => false)}>Type</Button>
        <Button type='button' transparent={!isPreview} onClick={() => setIsPreview(prev => true)}>Preview</Button>
      </div>
      {isPreview ?
        <div style={{textAlign: 'left'}}>
          <Markdown>{content}</Markdown>
        </div>
      :
        <TextareaAutosize minRows={4} value={content} onChange={e => setContent(e.target.value)}/>
      }
      <div className="actions">
        <Button disabled={!content.trim()} loading={isSubmitting}>
          Comment <SendIcon />
        </Button>
      </div>
    </form>
  ) : (
    <div className="comment-space-login border">
      <p>You have to be logged in</p>
      <Link href='/login'>
        <Button>Login</Button>
      </Link>
    </div>
  )
}

export default CommentSpace
