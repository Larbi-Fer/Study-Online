import { getReviews } from "@/actions/reviews.actions"
import Reviews from "@/components/Reviews"
import { getUserData } from "@/lib/serverUtils"
import { redirect } from "next/navigation"

const OrderReviewsPage = async () => {
  const user = (await getUserData())!
  if (user.role !== 'code_reviewer') return redirect('/reviews')

  const reviews = await getReviews(user.id!, user.role, 'order')

  return (
    <Reviews reviews={reviews.payload} userId={user.id!} role={user.role} />
  )
}

export default OrderReviewsPage
