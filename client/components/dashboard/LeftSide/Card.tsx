import Progress from "@/ui/Progress"
import { Grid2 as Grid, Skeleton, Typography } from "@mui/material"
import { useContext } from 'react'
import { LoadingContext } from '../index'

type CardProps = {
  name: string,
  description: string,
  progress: number,
  total: number
}

const Card = ({ name, description, progress, total }: CardProps) => {
  const isLoading = useContext(LoadingContext)
  
  return (
    <Grid container className='card'>
      <Grid size={8} className='card-details'>
        {isLoading ? (
          <>
            <Skeleton variant="text" sx={{ fontSize: '1rem', maxWidth: '130px' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          </>
        ) : (
          <>
            <Typography variant="h6" fontWeight="bold">{name}</Typography>
            <Typography variant="body2" color="textSecondary">{description}</Typography>
          </>
        )}
      </Grid>

      <Grid size={4}>
        <Progress progress={isLoading ? 0 : progress} total={total} />
      </Grid>
    </Grid>
  )
}

export default Card