import { getReviewById } from '@/actions/reviews.actions'
import { getUserData } from '@/lib/serverUtils'
import ReviewDetails from '@/components/Reviews/ReviewDetails'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: {params: Promise<{ id: string }>}) {
  const id = (await params).id
  const user = (await getUserData())!

  const review = await getReviewById(id, user?.id!, user.role)

  return {
    title: 'Review: ' + review.payload.subject,
  }
}

const ReviewDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id
  const user = (await getUserData())!

  const review = await getReviewById(id, user?.id!, user.role)

  if (!review) return notFound()

  return (
    <ReviewDetails review={review.payload} reviewId={id} userId={user.id!} role={user.role} />
  )
} 

export default ReviewDetailPage