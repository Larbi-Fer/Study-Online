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

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <motion.div className="left" variants={animation} initial='hidden' animate='show'>
        <motion.div variants={animation}>
          <Grid container spacing={4} className="cards">
            <Grid size={6}>
              <Card />
            </Grid>
            <Grid size={6}>
              <Card />
            </Grid>
          </Grid>
        </motion.div>

        <motion.div variants={animation}>
          <WhatNaxt />
        </motion.div>

        <motion.div variants={animation}>
          <RecomChallenges />
        </motion.div>
      </motion.div>

      <motion.div className="right" variants={animation} initial='hidden' animate='show'>
        <motion.div variants={animation}>
          <LevelCard />
        </motion.div>

        <motion.div variants={animation}>
          <StreakCalendar />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Dashboard