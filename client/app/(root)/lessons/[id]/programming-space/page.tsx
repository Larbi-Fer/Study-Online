'use client'

import { nextLesson } from '@/actions/user.action'
import CodingSapce from '@/components/CodingSpace'
import { useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation'

const ProgrammingSpace = () => {
  const router = useRouter()
  const id = useAppSelector(state => state.user?.id)

  const afterComplete = async() => {
    // update lesson field in user
    await nextLesson(id!)

    // go to dashboard
    router.push('/dashboard')
  }

  return (
    <CodingSapce afterComplete={afterComplete} />
  )
}

export default ProgrammingSpace