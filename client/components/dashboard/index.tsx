'use client'

import { Grid2 as Grid } from "@mui/material"
import Card from "./LeftSide/Card"
import WhatNaxt from "./LeftSide/WhatNaxt"
import RecomChallenges from "./LeftSide/RecomChallenges"
import LevelCard from "./RightSide/LevelCard"
import StreakCalendar from "./RightSide/StreakCalendar"
import TopicEnrollments from "./LeftSide/TopicEnrollments"
import * as motion from 'motion/react-client'

import './style.css'
import { format } from "date-fns"
import { CHALLENGES_PONTS_REQUIRED } from "@/lib/constant"
import { createContext, useEffect, useRef, useState } from "react"
import { useAppSelector } from "@/lib/hooks"
import api from "@/actions/api"
import { getDashboardData } from "@/actions/dashboard.actions"

// Create a loading context
export const LoadingContext = createContext<boolean>(false);

const animation = {
  hidden: { y: 5, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { staggerChildren: 0.15 } },
}

const Dashboard = ({ data: dashData, level }: { data: DashboardArgs, level: number }) => {
  const [data, setData] = useState(dashData)
  const [loading, setLoading] = useState(false)
  const isFirstRender = useRef(true)

  const user = useAppSelector(state => state.user)
  const selectedTopic = user?.selectedTopic

  const loadTopicData = async(topicId: string) => {
    if (!selectedTopic) return
    setLoading(true)
    try {
      const data = await getDashboardData(user?.id!, topicId)
      setData(data.payload)
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoadingContext.Provider value={loading}>
      <div className="dashboard-container">
        <motion.div className="left" variants={animation} initial='hidden' animate='show'>
          <motion.div variants={animation}>
            <Grid container spacing={4} className="cards">
              <Grid size={6}>
                <Card name={data.lessonOrQuiz.lesson?.topic.title || 'Lessons'} description="You should complete all lessons" progress={data.lessonsC} total={data.lessonsN}/>
              </Grid>
              <Grid size={6}>
                <Card name="Points" description="You should collect 50 points from the Challenges section." progress={data.points} total={CHALLENGES_PONTS_REQUIRED}/>
              </Grid>
            </Grid>
          </motion.div>

          <motion.div variants={animation}>
            <TopicEnrollments loadTopicData={loadTopicData} enrollments={data.topicEnrollments} />
          </motion.div>

          <motion.div variants={animation}>
            <WhatNaxt 
              lesson={data.lessonOrQuiz.lesson} 
              quiz={data.lessonOrQuiz.quiz} 
              quizLocked={data.lessonOrQuiz.quizLocked}
              unlockTime={data.lessonOrQuiz.unlockTime}
            />
          </motion.div>

          <motion.div variants={animation}>
            <RecomChallenges challenges={data.challenges} />
          </motion.div>
        </motion.div>

        <motion.div className="right" variants={animation} initial='hidden' animate='show'>
          <motion.div variants={animation}>
            <LevelCard level={level} />
          </motion.div>

          <motion.div variants={animation}>
            <StreakCalendar streaks={data.streaks.map(s => format(s.createdAt, 'yyyy-MM-dd'))} />
          </motion.div>
        </motion.div>
      </div>
    </LoadingContext.Provider>
  )
}

export default Dashboard