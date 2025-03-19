import Button from "@/ui/Button"
import Link from "next/link"

type WhatNextProps = {
  lesson?: LessonArg,
  quiz?: QuizArgs & { number: number }
}

const WhatNaxt = ({ lesson, quiz }: WhatNextProps) => {

  return (
    <div className="dash-details">
      <h2>What next</h2>
      {quiz ?
        <div className="lesson">
          <div className="level">
            <div className="num">{quiz.number}</div>
            <div className='level-name'>&nbsp;&nbsp;Quiz&nbsp;&nbsp;</div>
          </div>

          <div className="details">
            <div className="title">Quiz</div>
            <div className="info">
              <div>
                <span>Questions: </span>
                <span>10</span>
              </div>
            </div>
          </div>

          <div className="action">
            <Link href={`/quiz/${'id'}`}>
              <Button>Start quiz</Button>
            </Link>
          </div>
        </div>
      :
        <div className="lesson">
          <div className="level">
            <div className="num">{lesson?.number}</div>
            <div className='level-name'>Lesson</div>
          </div>

          <div className="details">
            <div className="title">{lesson?.title}</div>
            <div className="info">
              <div>
                <span>Slides: </span>
                <span>10</span>
              </div>
              <div>
                <span>Programmes: </span>
                <span>{lesson?._count.programmes}</span>
              </div>
            </div>
          </div>

          <div className="action">
            <Link href={`/lessons/${'id'}`}>
              <Button>Start</Button>
            </Link>
          </div>

        </div>
      }
    </div>
  )
}

export default WhatNaxt