'use client'

import CodingSapce from '@/components/CodingSpace'
import { useAppSelector } from '@/lib/hooks'
import { useAfterComplete } from '@/lib/customHooks'

const ProgrammingSpace = () => {
  const {lessonId, codes} = useAppSelector(state => ({lessonId: state.user?.lessonId, codes: state.programmes.codes}))
  

  const afterComplete = useAfterComplete(lessonId!)

  return (
    codes.length ?
      <CodingSapce afterComplete={afterComplete} />
    : (
      <div style={{textAlign: 'center'}}>
        <h2>You have to pass the lesson in order.</h2>
      </div>
    )
  )
}

export default ProgrammingSpace