import { getUserData } from "@/lib/serverUtils"
import { redirect } from "next/navigation"

const Page = async () => {
  const user = await getUserData()
  if (!user) return redirect('/login')
  redirect('/profile/' + user.id)
}

export default Page
