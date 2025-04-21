import List from "@/components/LessonsList/List"
import '../../LessonsList/style.css'
import './style.css'

const LessonsSide = ({lessons, color}: {lessons: LessonArg[], color: string}) => {
  return (
    <div className="lesson-side">
      {/* @ts-ignore */}
      <div style={{maxWidth: '900px', margin: 'auto', '--primary-topic-bg': color}}>
        {lessons.map((lesson: LessonArg, i: number) => (
          <List lesson={lesson} key={'lessons-group' + i} next={i < lessons.length-1} justRepresent />
        ))}
      </div>
    </div>
  )
}

export default LessonsSide
