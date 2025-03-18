import { Grid2 as Grid } from "@mui/material"
import Card from "./LeftSide/Card"
import WhatNaxt from "./LeftSide/WhatNaxt"
import RecomChallenges from "./LeftSide/RecomChallenges"
import LevelCard from "./RightSide/LevelCard"
import StreakCalendar from "./RightSide/StreakCalendar"
import * as motion from 'motion/react-client'

import './style.css'

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
              <Card name="Points" description="You should collect 50 points from challenges part" progress={data.points} total={50}/>
            </Grid>
          </Grid>
        </motion.div>

        <motion.div variants={animation}>
          <WhatNaxt quiz />
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
          <StreakCalendar />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Dashboard