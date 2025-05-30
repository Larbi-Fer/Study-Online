import CreateOrUpdateTopic from "@/components/Topics/CreateTopic"
import { getUserData } from "@/lib/serverUtils"
import { notFound } from "next/navigation"

export const metadata = {
  title: 'Create topic'
}

const CreateTopicPage = async () => {
  // admin check
  const user = await getUserData()
  if (user?.role !== "admin") return notFound();

  return (
    <CreateOrUpdateTopic />
  )
}

export default CreateTopicPage