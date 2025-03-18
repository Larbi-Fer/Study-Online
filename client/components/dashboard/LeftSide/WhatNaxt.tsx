import Button from "@/ui/Button"
import Link from "next/link"

type WhatNextProps = {
  quiz?: boolean
}

const WhatNaxt = ({ quiz }: WhatNextProps) => {
  return (
    <div className="dash-details">
      <h2>What next</h2>
      {quiz ?
        <div className="lesson">
          <div className="level">
            <div className="num">02</div>
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
            <div className="num">03</div>
            <div className='level-name'>Lesson</div>
          </div>

          <div className="details">
            <div className="title">lesson title</div>
            <div className="info">
              <div>
                <span>Slides: </span>
                <span>10</span>
              </div>
              <div>
                <span>Programmes: </span>
                <span>02</span>
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