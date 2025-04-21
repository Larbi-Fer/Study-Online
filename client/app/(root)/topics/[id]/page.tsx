import { getLessons } from "@/actions/lessons.actions"
import { getTopic } from "@/actions/topics.actions"
import LessonsSide from "@/components/Topics/TopicDetails/LessonsSide"
import TopicSide from "@/components/Topics/TopicDetails/TopicSide"
import { getUserData } from "@/lib/serverUtils"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const generateMetadata = async ({params}: {params: Promise<{id: string}>}): Promise<Metadata> => {
  const topicId = (await params).id

  const topic = (await getTopic(topicId)).payload

  return {
    title: topic.title,
    description: topic.description,
    openGraph: {
      type: 'website',
      title: topic.title,
      description: topic.description,
      images: [
        {
          url: topic.image.path,
        },
      ],
    },
    icons: [{
      url: topic.icon.path
    }]
  }
}

const TopicPage = async ({params}: {params: Promise<{id: string}>}) => {
  const topicId = (await params).id
  const user = (await getUserData())!

  const topic = (await getTopic(topicId)).payload
  if (!topic) return notFound()
  const lessons = (await getLessons(topicId, null)).payload

  return (
    <div className="topic-page">
      <TopicSide topic={topic} />
      <LessonsSide lessons={lessons} color={topic.color} />
    </div>
  )
}

export default TopicPage
