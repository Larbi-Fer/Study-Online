import CreateLesson from "@/components/LessonsList/Create"
import { getUserData } from "@/lib/serverUtils"
import { redirect } from "next/navigation"

const Create = async () => {
  const user = await getUserData()
  if (!user) return redirect('/login')
  
  if (user.role != 'admin') redirect('/dashboard')

  return (
    <CreateLesson />
  )
}

export default Create