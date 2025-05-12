'use client'
import { enrollInTopic } from '@/actions/topics.actions'
import { REQUIRED_TOPICS_NUMBER } from '@/lib/constant'
import { enrollInATopic } from '@/lib/features/user'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import Button from '@/ui/Button'
import Toast from '@/ui/Toast'
import { Tooltip } from '@mui/material'
import { useState } from 'react'

type EnrollProps = {
  topic: Topic
  id: string
}

const EnrollButton = ({topic, id}: EnrollProps) => {
  const {userId, enrollments} = useAppSelector(state => ({userId: state.user?.id, enrollments: state.user?.topicEnrollments}))
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()

  const enroll = async() => {
    if (!userId) return
    setLoading(true)
    const lesson = await enrollInTopic(id, userId)
    console.log(lesson);

    dispatch(enrollInATopic({
      completed: false,
      level: 0,
      topic: {
        color: topic.color,
        icon: topic.icon,
        id: topic.id,
        title: topic.title,
        type: topic.type
      },
      currentLesson: {
        id: lesson.payload.lessonId,
        number: 1
      }
    }))
    setLoading(false)
    Toast('Enrolled successful', 'success')
  }

  const currentTopic = enrollments?.find(e => e.topic.id == topic.id)


  return currentTopic ? (
    currentTopic.completed ? <div>You've completed this topic</div> :
    <div>You have been enrolled in this topic.</div>
  )
  : (
    enrollments?.length! < REQUIRED_TOPICS_NUMBER ?
    <Tooltip title='You should complete all required topics'>
      <Button background={topic.color} disabled>Enroll</Button>
    </Tooltip>
    :
    topic.type == 'optional' && <Button background={topic.color} onClick={enroll} loading={loading}>Enroll</Button>
  )
}

export default EnrollButton
