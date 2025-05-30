import { intToString } from "@/lib/utils"
import Button from "@/ui/Button"
import { Box, Card, CardContent, Container, Grid2 as Grid, Typography } from "@mui/material"
import * as motion from 'motion/react-client'
import Link from "next/link"
import './style.css'
import ChallengesPreviw from "./ChallengesPreviw"

type ChallengesListProps = {
  points?: number,
  level?: number,
  challenges: ChallengesArgs[]
  admin?: boolean
}

const ChallengesList = ({ points, level, challenges, admin }: ChallengesListProps) => {

  return (
    <Container maxWidth="md" className="challenges-container">
      {admin  ? (
        <Box className="header-box" display="flex" justifyContent="space-between" alignItems="center" p={2}>
          <Link href='/challenges/create'>
            <Button>Create challenge</Button>
          </Link>
        </Box>
      ) :
        <Box className="header-box" display="flex" justifyContent="space-between" alignItems="center" p={2}>
          <Typography variant="h5" fontWeight="bold">Level {intToString(level!)}</Typography>
          <Typography variant="h5" fontWeight="bold">Points {intToString(points!)}</Typography>
        </Box>
      }

      <ChallengesPreviw challenges={challenges} isAdmin={admin} />
    </Container>
  )
}

export default ChallengesList