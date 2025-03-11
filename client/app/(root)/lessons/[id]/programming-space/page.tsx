'use client'

import CodingSapce from '@/components/CodingSpace'
import { useRouter } from 'next/navigation'

const ProgrammingSpace = () => {
  const router = useRouter()
  const afterComplete = async() => {
    // update lesson field in user

    // go to dashboard
    router.push('/dashboard')
  }

  return (
    <CodingSapce afterComplete={afterComplete} />
  )
}

export default ProgrammingSpace