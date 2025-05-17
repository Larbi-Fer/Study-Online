'use client'

import { setCongrationMsg, setEditingProgramme, setProgrammes } from "@/lib/features/programmes";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import CodingSapce from "../CodingSpace";
import { useRouter } from "next/navigation";
import { challengeDone } from "@/actions/challenges.action";
import Loading from "@/ui/Loading";

const CreateSpace = () => {
  const dispatch = useAppDispatch()
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    dispatch(setProgrammes([{code: '', description: 'Description here', goal: '', title: 'Untitled', points: 10, requiredLvl: 1}]))
    dispatch(setEditingProgramme(true))
    setIsDone(true)

    return () => {
      dispatch(setProgrammes([]))
      dispatch(setEditingProgramme(false))
      dispatch(setCongrationMsg(false))
    }
  }, [])

  return (
    isDone ?
      <CodingSapce afterComplete={() => {}} edit />
    :
      <Loading />
  )
}

export default CreateSpace