import { getLessons } from "@/actions/lessons.actions";
import LessonsList from "@/components/LessonsList";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: 'Lessons'
};

const Lessons = async () => {
  const data = (await cookies()).get('user')?.value

  if(!data) return (
    <div>
      <h3>You have to login first</h3>
    </div>
  )

  const user = JSON.parse(data)
  const jsonLessons = (await getLessons(user.lesson.topicId)).payload

  const lessons: any[] = []

  for (let i = 0; i < jsonLessons.length; i += 3) {
    lessons.push(jsonLessons.slice(i, i + 3));
  }

  return (
    <div>
      <LessonsList list={lessons} />
    </div>
  )
}

export default Lessons