import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import * as motion from 'motion/react-client'

const TopicCard = ({ topic, i }: {topic: Topic, i: number}) => {
  return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: i * 0.1 }}
        style={{height: '100%'}}
      >
        <Card className="challenge-card" elevation={3} sx={{borderRadius: 5, height: '100%'}}>
          <CardMedia
            component="img"
            height="194"
            image={topic.image.path}
            alt={topic.title}
          />
          <CardContent>
            <Typography variant="h6" fontWeight="bold">{topic.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {topic.description}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
  )
}

export default TopicCard