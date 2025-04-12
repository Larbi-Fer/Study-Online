import { getLessons } from "@/actions/lessons.actions";
import LessonsList from "@/components/LessonsList";
import { getUserData } from "@/lib/serverUtils";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: 'Lessons'
};

const Lessons = async () => {
  const user = (await getUserData())!

  
  const jsonLessons = (await getLessons(user.selectedTopic?.id!, user.id!)).payload

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