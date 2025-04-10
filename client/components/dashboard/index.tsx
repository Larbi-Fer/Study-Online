import { Grid2 as Grid } from "@mui/material"
import Card from "./LeftSide/Card"
import WhatNaxt from "./LeftSide/WhatNaxt"
import RecomChallenges from "./LeftSide/RecomChallenges"
import LevelCard from "./RightSide/LevelCard"
import StreakCalendar from "./RightSide/StreakCalendar"
import * as motion from 'motion/react-client'

import './style.css'
import { format } from "date-fns"
import { CHALLENGES_PONTS_REQUIRED } from "@/lib/constant"

const animation = {
  hidden: { y: 5, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { staggerChildren: 0.15 } },
}

const Dashboard = ({ data }: { data: DashboardArgs }) => {
  return (
    <div className="dashboard-container">
      <motion.div className="left" variants={animation} initial='hidden' animate='show'>
        <motion.div variants={animation}>
          <Grid container spacing={4} className="cards">
            <Grid size={6}>
              <Card name="Lessons" description="You should complete all lessons" progress={data.lessonsC} total={data.lessonsN}/>
            </Grid>
            <Grid size={6}>
              <Card name="Points" description="You should collect 50 points from the Challenges section." progress={data.points} total={CHALLENGES_PONTS_REQUIRED}/>
            </Grid>
          </Grid>
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
          <LevelCard level={Math.floor(data.lessonsC / 3) + 1} />
        </motion.div>

        <motion.div variants={animation}>
          <StreakCalendar streaks={data.streaks.map(s => format(s.createdAt, 'yyyy-MM-dd'))} />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Dashboard