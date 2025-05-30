import EditProfiel from "@/components/Profile/Edit"
import { getUserData } from "@/lib/serverUtils"
import { redirect } from "next/navigation"

export const metadata = {
  title: 'Edit Profile',
}

const ProfilePage = async ({params}: {params: Promise<{id: string}>}) => {
  const id = (await params).id
  const user = await getUserData()

  if (!user) return redirect('/login')

  return (
    <EditProfiel user={user} />
  )
}

export default ProfilePage
