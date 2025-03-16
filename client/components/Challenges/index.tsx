import { intToString } from "@/lib/utils"
import Button from "@/ui/Button"
import { Grid2 as Grid } from "@mui/material"
import Link from "next/link"

type ChallengesListProps = {
  points: number,
  level: number,
  challenges: ChallengesArgs[]
}

const ChallengesList = ({ points, level, challenges }: ChallengesListProps) => {

  return (
    <div>
      <div>
        <h4>Level {intToString(level)}</h4>
        <h4>Points {intToString(points)}</h4>
      </div>

      {/* Display the challenges */}
      <Grid container>
        {challenges.map(ch => (
          <Grid size={12} container key={ch.id}>
            <Grid size={4}>
              <div>{ch.title}</div>
              <div> {ch.points} points | required level: {ch.requiredLvl} </div>
            </Grid>

            <Grid size={6}></Grid>

            <Grid size={2}>
              <Link href={`/challenges/${ch.id}`}>
                <Button>Start</Button>
              </Link>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default ChallengesList