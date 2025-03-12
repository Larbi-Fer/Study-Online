'use client'

import CodingSapce from '@/components/CodingSpace'
import { useAppSelector } from '@/lib/hooks'
import { useAfterComplete } from '@/lib/utils'

const ProgrammingSpace = () => {
  const lessonId = useAppSelector(state => state.user?.lessonId)

  const afterComplete = useAfterComplete(lessonId!)

  return (
    <CodingSapce afterComplete={afterComplete} />
  )
}

export default ProgrammingSpace