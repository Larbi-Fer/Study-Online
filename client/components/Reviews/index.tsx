'use client'

import { assignReviewer } from "@/actions/reviews.actions"
import Button from "@/ui/Button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import './style.css'
import { formatDistanceToNowStrict } from "date-fns"

const Reviews = ({reviews, userId, role}: {reviews: CodeReviewArgs[], role: UserRole, userId: string}) => {

  const isCodeReviewer = role == 'code_reviewer'
  const router = useRouter()

  const handleReviewerAssignment = async (reviewId: string) => {
    try {
      const result = await assignReviewer(reviewId, userId!)
      
      if (result.message !== 'SUCCESS') {
        console.error('Failed to assign reviewer:', result.message)
        return
      }
      
      router.push(`/reviews/${reviewId}`)
    } catch (error) {
      console.error('Error assigning reviewer:', error)
    }
  }

  const getReviewStatus = (review: CodeReviewArgs) => {
    if (!review.reviewerId) return 'Waiting'
    if (review.comments && JSON.parse(JSON.stringify(review.comments)).some(
      (comment: { sender: string }) => comment.sender === 'reviewer'
    )) {
      return 'Done'
    }
    return 'Replying'
  }

  return (
    <div className="reviews">
      <div className="revs-header">
        <h1 className="text-2xl font-bold">Code Reviews</h1>
        {!isCodeReviewer && (
          <Link href="/reviews/add">
            <Button>Submit New Code Review</Button>
          </Link>
        )}
      </div>

      <div className="reviews-grid">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div>
                  <div style={{display: 'flex', gap: '25px', alignItems: 'center'}}>
                    <h2 className="review-title">{review.subject}</h2>
                    <p className="review-date">
                      {formatDistanceToNowStrict(review.createdAt, { addSuffix: true })}
                    </p>
                  </div>
                  <p className="review-explication">
                    {review.explication.length > 8
                      ? `${review.explication.split(' ').slice(0, 8).join(' ')}...`
                      : review.explication}
                  </p>
                </div>
                {isCodeReviewer ? (
                  !review.reviewerId ? (
                    <Button onClick={() => handleReviewerAssignment(review.id)}>
                      Reply
                    </Button>
                  ) : (
                    <Link href={`/reviews/${review.id}`}>
                      <Button>View</Button>
                    </Link>
                  )
                ) : (
                  <div className="review-status-container">
                    <span className={`review-status ${getReviewStatus(review).toLowerCase()}`}>
                      {getReviewStatus(review)}
                    </span>
                    <Link href={`/reviews/${review.id}`} className="review-view-link">
                      <Button>View</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-reviews">
            No code reviews found
          </div>
        )}
      </div>

    </div>
  )
}

export default Reviews
