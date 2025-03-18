import Progress from "@/ui/Progress"
import { Grid2 as Grid, Typography } from "@mui/material"

type CardProps = {
  name: string,
  description: string,
  progress: number,
  total: number
}

const Card = ({ name, description, progress, total }: CardProps) => {
  return (
    <Grid container className='card'>
      <Grid size={8} className='card-details'>
        <Typography variant="h6" fontWeight="bold">{name}</Typography>
        <Typography variant="body2" color="textSecondary">{description}</Typography>
      </Grid>

      <Grid size={4}>
        <Progress progress={progress} total={total} />
      </Grid>
    </Grid>
  )
}

export default Card