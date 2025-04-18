import * as motion from "motion/react-client"
import List from "./List"

import './style.css'
import LessonSidePeek from "./LessonSidePeek"

type LessonsProps = {
  list: any[]
}

const LessonsList = ({ list }: LessonsProps) => {
  console.log(list)
  return (
    <>
      <LessonSidePeek />
      {/* @ts-ignore */}
      <div style={{maxWidth: '900px', margin: 'auto', '--primary-topic-bg': 'var(--primary-bg)'}}>
        {list.map((lessons, i) => (
          <List lesson={lessons} key={'lessons-group' + i} next={i < list.length-1} />
        ))}
      </div>
    </>
  )
}

export default LessonsList