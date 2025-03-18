import Progress from "@/ui/Progress"
import { Grid2 as Grid, Typography } from "@mui/material"

type CardProps = {

}

const Card = ({  }) => {
  return (
    <Grid container className='card'>
      <Grid size={8} className='card-details'>
        <Typography variant="h6" fontWeight="bold">Name</Typography>
        <Typography variant="body2" color="textSecondary">Description</Typography>
      </Grid>

      <Grid size={4}>
        <Progress progress={40} total={100} />
      </Grid>
    </Grid>
  )
}

export default Card