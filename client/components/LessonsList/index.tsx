import * as motion from "motion/react-client"
import List from "./List"

import './style.css'

type LessonsProps = {
  list: any[][]
}

const LessonsList = ({ list }: LessonsProps) => {
  // console.log(list);

  return (
    <motion.div
      variants={{ hidden: {opacity: 0, y: 5}, show: {opacity: 1, y: 0, transition: { staggerChildren: 0.20 }} }}
      initial='hidden'
      animate='show'
    >
      {list.map((lessons, i) => (
        <List list={lessons} key={'lessons-group' + i} />
      ))}
    </motion.div>
  )
}

export default LessonsList