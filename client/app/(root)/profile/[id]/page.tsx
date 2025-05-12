import { getProfile } from "@/actions/user.action"
import Profile from "@/components/Profile"
import { getUserData } from "@/lib/serverUtils"
import { notFound } from "next/navigation"


const ProfilePage = async ({params}: {params: Promise<{id: string}>}) => {
  const id = (await params).id
  const user = await getUserData()
  const profile = await getProfile(id, user?.id)

  if (profile.message == 'NOT_FOUND') return notFound()

  return (
    <Profile profile={profile.payload} />
  )
}

export default ProfilePage
