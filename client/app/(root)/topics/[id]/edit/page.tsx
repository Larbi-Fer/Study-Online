import { getTopic } from "@/actions/topics.actions"
import CreateOrUpdateTopic from "@/components/Topics/CreateTopic"
import { getUserData } from "@/lib/serverUtils"
import { notFound } from "next/navigation"

const EditTopicPage = async ({ params }: {params: Promise<{ id: string }>}) => {
  const id = (await params).id

  const user = await getUserData()
  if (user?.role !== "admin") return notFound();
  // get topic
  const { payload: topic } = await getTopic(id)
  if(!topic) return notFound()

  return (
    <CreateOrUpdateTopic id={id} defaultTopic={topic} />
  )
}

export default EditTopicPage