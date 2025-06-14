import { getReviews } from '@/actions/reviews.actions'
import { getUserData } from '@/lib/serverUtils'
import Reviews from '@/components/Reviews'

export const metadata = {
  title: 'Reviews'
}

const ReviewsPage = async() => {
  const user = (await getUserData())!

  const reviews = await getReviews(user.id!, user.role, user.role === 'code_reviewer' ? 'reviews' : undefined)

  return (
    <Reviews reviews={reviews.payload} userId={user.id!} role={user.role} />
  )
}

export default ReviewsPage