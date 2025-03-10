
type LessonsProps = {
  list: any[]
}

const LessonsList = ({ list }: LessonsProps) => {
  console.log(list);
  
  return (
    <div>
      {list.map((lesson, i) => (
        <div key={i}>
          {lesson.title}
          {lesson._count.programmes}
        </div>
      ))}
    </div>
  )
}

export default LessonsList