'use client'

import { addComment } from "@/actions/reviews.actions"
import Button from "@/ui/Button"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import './style.css'
import Toast from "@/ui/Toast"
import Link from "next/link"
import CodeSnippet from "@/components/LessonsList/LessonContent/CodeContainer"
import CommentContent from "./CommentContent"
import { useSocket } from "@/contexts/SocketContext"

interface Comment {
  sender: 'student' | 'reviewer'
  message: string
  timestamp?: Date
}

interface User {
  id: string
  email: string
  fullname: string
}

interface TopicEnrollment {
  topicId: string
  topic: {
    title: string
  }
}

interface CodeReview {
  id: string
  subject: string
  explication: string
  code: string
  reviewerId: string | null
  comments: Comment[]
  createdAt: string
  user: {
    id: string
    fullname: string
    email: string
    topicEnrollments?: TopicEnrollment[]
  }
  challenge?: {
    id: string
    title: string
    topic: {
      title: string
    }
  }
}

const ReviewDetails = ({ review: reviewData, reviewId, userId, role }: { review: CodeReview, reviewId: string, role: UserRole, userId: string }) => {
  const [review, setReview] = useState<CodeReview>(reviewData)
  const [newComment, setNewComment] = useState('')
  const [isSending, setIsSending] = useState(false)
  const router = useRouter()
  const commentsRef = useRef<HTMLDivElement | null>(null)
  const socket = useSocket();

  const isCodeReviewer = role == 'code_reviewer'

  useEffect(() => {
    if (socket) {
      socket.on('review-message-' + review.id, (msg: string, sender: 'student' | 'reviewer') => {
        console.log('client: ', msg, sender);

        setReview(prev => ({ ...prev, comments: [...prev.comments, { message: msg, sender, timestamp: new Date() }] }))
        setTimeout(() => {
          commentsRef.current && commentsRef.current.scrollTo({ behavior: 'smooth', top: commentsRef.current.scrollHeight })
        }, 200)
      });

      return () => {
        socket.off('review-message-' + review.id);
      };
    }
  }, [socket]);

  useEffect(() => {
    commentsRef.current && commentsRef.current.scrollTo({ behavior: 'smooth', top: commentsRef.current.scrollHeight })
  }, [commentsRef.current])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSending(true)

    try {
      const sender = isCodeReviewer ? 'reviewer' : 'student'
      const result = await addComment(reviewId, newComment, sender, userId!, role!)

      if (result.message !== 'SUCCESS') {
        throw new Error(`Failed to add comment: ${result.message}`)
      }

      setNewComment('')
    } catch (err) {
      Toast(err instanceof Error ? err.message : 'An error occurred while adding comment', 'error')
    } finally {
      setIsSending(false)
    }
  }

  // Find the most recent topic enrollment
  const lastEnrolledTopic = review.user.topicEnrollments && review.user.topicEnrollments[0]

  return (
    <div className="review-details-container">
      <div className="review-header">
        <h1 className="review-title">Code Review: {review.subject}</h1>
        <Button onClick={() => router.push('/reviews')}>
          Back to Reviews
        </Button>
      </div>

      <div className="review-grid">
        <div className="review-left-column">
          <div className="review-card">
            <h2 className="card-title">Student Information</h2>
            <div className="card-content">
              <p className="student-name">{review.user.fullname}</p>
              <p>{review.user.email}</p>
              {lastEnrolledTopic && (
                <Link href={'/topics/' + lastEnrolledTopic.topicId}>
                  {lastEnrolledTopic.topic.title}
                </Link>
              )}
            </div>
          </div>

          {review.challenge && (
            <Link href={'/challenges/' + review.challenge.id} style={{ textDecoration: 'none', color: 'inherit' }} target="_blank">
              <div className="review-card">
                <h2 className="card-title">Challenge</h2>
                <div className="card-content">
                  <p>{review.challenge.title} | {review.challenge.topic.title}</p>
                </div>
              </div>
            </Link>
          )}

          <div className="review-card">
            <h2 className="card-title">Question</h2>
            <div className="question-text">{review.explication.split('\n').map((e, i) => <p key={i}>{e}</p>)}</div>
            <h3 className="code-title">Code</h3>
            <div>
              <CodeSnippet
                code={review.code}
                language="python"
              />
            </div>
          </div>
        </div>

        <div className="review-right-column">
          <div className="review-card discussion">
            <div className="discussion-header">
              <h2 className="card-title">Discussion</h2>
              <div className="comments-list" ref={commentsRef}>
                {review.comments && review.comments.length > 0 ? (
                  review.comments.map((comment, index) => (
                    <div
                      key={index}
                      className='comment-item'
                      style={comment.sender == 'student' ? { display: 'flex', justifyContent: 'right' } : {}}
                    >
                      <div className={`${comment.sender === 'student' ? 'student-comment' : 'reviewer-comment'}`}>
                        <div className="comment-header">
                          {comment.timestamp && (
                            <span className="comment-time">
                              {new Date(comment.timestamp).toLocaleString()}
                            </span>
                          )}
                        </div>
                        {/* <div className="comment-message">{comment.message.split('\n').map((m, i) => <p key={i}>{m}</p>)}</div> */}
                        <div className="comment-message"><CommentContent content={comment.message} /></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-comments">No comments yet</div>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmitComment} className="comment-form">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="comment-input"
                rows={3}
                placeholder="Type your message here..."
                required
              />
              <div className="form-actions">
                <Button type="submit" disabled={!newComment.trim()} loading={isSending}>
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ReviewDetails