'use client'

import { useAppSelector } from '@/lib/hooks'
import Button from '@/ui/Button'
import * as motion from 'motion/react-client'
import Link from 'next/link'

type ListProps = {
  list: any[],
  key: React.Key
}

const listVariant = {
  hidden: {opacity: 0, y: 5},
  show: {opacity: 1, y: 0}
}

const List = ({ list, key }: ListProps) => {
  const user = useAppSelector(state => state.user)

  return (
    <motion.div key={key} variants={listVariant} className='list'>
      {list.map((lesson, i) => (
        <motion.div key={'lesson-' + i} className='element'>
          <div className="level">
            <div className="num">{lesson.number}</div>
            <div className='level-name'>Level</div>
          </div>

          <div className="details">
            <div className="title">{lesson.title}</div>
            <div className="info">
              <div>
                <span>Slides: </span>
                <span>10</span>
              </div>
              <div>
                <span>Programmes: </span>
                <span>{lesson._count.programmes}</span>
              </div>
            </div>
          </div>

          <div className="action">
            <Link href={`/lessons/${lesson.id}`}>
              <Button disabled={user?.lesson?.number! < lesson.number}>Start</Button>
            </Link>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default List