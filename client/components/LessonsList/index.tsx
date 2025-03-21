import * as motion from "motion/react-client"
import List from "./List"

import './style.css'
import { QUIZ_PASS_PERCENTAGE } from "@/lib/constant"

type LessonsProps = {
  list: any[][]
}

const LessonsList = ({ list }: LessonsProps) => {
  const quizzes = list.flat()
    .filter(lesson => lesson.quiz?.id)
    .map(lesson => !!lesson.quiz?.quizResults.length
                  && lesson.quiz?.quizResults[0].percent > QUIZ_PASS_PERCENTAGE);
  console.log(quizzes);

  return (
    <motion.div
      variants={{ hidden: {opacity: 0, y: 5}, show: {opacity: 1, y: 0, transition: { staggerChildren: 0.20 }} }}
      initial='hidden'
      animate='show'
    >
      {list.map((lessons, i) => (
        <List list={lessons} key={'lessons-group' + i} next={i < 1 ? true : quizzes[i-1]} />
      ))}
    </motion.div>
  )
}

export default LessonsList