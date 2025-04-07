'use client'

import { setCongrationMsg, setProgrammes } from "@/lib/features/programmes";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import CodingSapce from "../CodingSpace";
import { useRouter } from "next/navigation";
import { challengeDone } from "@/actions/challenges.action";

const ChallengeSpace = ({ programme, progId, edit }: {programme: ProgrammeArgs, progId: string, edit?: boolean}) => {
  const dispatch = useAppDispatch()
  const [isDone, setIsDone] = useState(false)
  const userId = useAppSelector(state => state.user?.id)
  const router = useRouter()

  useEffect(() => {
    dispatch(setProgrammes([programme]))
    setIsDone(true)

    return () => {
      dispatch(setProgrammes([]))
      dispatch(setCongrationMsg(false))
    }
  }, [])
  
  const afterComplete = async() => {
    await challengeDone(userId!, progId)
    router.push('/challenges')
  }
  
  return (
    isDone ?
      <CodingSapce afterComplete={afterComplete} edit={edit} />
    :
      <h3>Loading ...</h3>
  )
}

export default ChallengeSpace