import { getProfile } from "@/actions/user.action"
import Profile from "@/components/Profile"
import EditProfiel from "@/components/Profile/Edit"
import { getUserData } from "@/lib/serverUtils"
import { notFound, redirect } from "next/navigation"


const ProfilePage = async ({params}: {params: Promise<{id: string}>}) => {
  const id = (await params).id
  const user = await getUserData()

  if (!user) return redirect('/login')

  return (
    <EditProfiel user={user} />
  )
}

export default ProfilePage
