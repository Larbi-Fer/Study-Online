import { Grid2 as Grid } from "@mui/material"
import Card from "./LeftSide/Card"
import WhatNaxt from "./LeftSide/WhatNaxt"
import RecomChallenges from "./LeftSide/RecomChallenges"
import LevelCard from "./RightSide/LevelCard"
import StreakCalendar from "./RightSide/StreakCalendar"

import './style.css'

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="left">
        <Grid container spacing={4} className="cards">
          <Grid size={6}>
            <Card />
          </Grid>
          <Grid size={6}>
            <Card />
          </Grid>
        </Grid>

        <WhatNaxt />

        <RecomChallenges />
      </div>

      <div className="right">
        <LevelCard />

        <StreakCalendar />
      </div>
    </div>
  )
}

export default Dashboard