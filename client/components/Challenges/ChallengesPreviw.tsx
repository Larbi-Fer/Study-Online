import Button from "@/ui/Button"
import { Box, Card, CardContent, Grid2 as Grid, Typography } from "@mui/material"
import * as motion from 'motion/react-client'
import Link from "next/link"

type ChallengesListProps = {
  challenges: ChallengesArgs[],
  sm?: number
}

const ChallengesPreviw = ({ challenges, sm=6 }: ChallengesListProps) => {
  return (
    <Grid container spacing={3} className="challenges-list">
      {challenges.map((ch, index) => (
        <Grid size={{ xs: 12, sm }} key={ch.id}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="challenge-card" elevation={3}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">{ch.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {ch.points} points | Required Level: {ch.requiredLvl}
                </Typography>
                <Box mt={2} display="flex" justifyContent="flex-end">
                  <Link href={`/challenges/${ch.id}`} passHref>
                    <Button>Start</Button>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  )
}

export default ChallengesPreviw