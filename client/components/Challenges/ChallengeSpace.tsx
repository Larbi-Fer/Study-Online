'use client'

import { setProgrammes } from "@/lib/features/programmes";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect, useState } from "react";
import CodingSapce from "../CodingSpace";
import { useRouter } from "next/navigation";

const ChallengeSpace = ({ programme }: {programme: ProgrammeArgs}) => {
  const dispatch = useAppDispatch()
  const [isDone, setIsDone] = useState(false)
  const router = useRouter()

  useEffect(() => {
    dispatch(setProgrammes([programme]))
    setIsDone(true)
  }, [])
  
  const afterComplete = () => {
    router.push('/challenges')
  }
  
  return (
    isDone ?
      <CodingSapce afterComplete={afterComplete} />
    :
      <h3>Loading ...</h3>
  )
}

export default ChallengeSpace