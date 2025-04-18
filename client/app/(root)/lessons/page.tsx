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

  
  const lessons = (await getLessons(user.selectedTopic?.id!, user.id!)).payload

  return (
    <div>
      <LessonsList list={lessons} />
    </div>
  )
}

export default Lessons