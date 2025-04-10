'use client'
import { Box, Card, CardContent, CardHeader, CardMedia, Grid2 as Grid, Typography } from "@mui/material";
import * as motion from 'motion/react-client'
import './style.css'
import { useRouter } from "next/navigation";
import TopicCard from "./TopicCard";

const TopicsList = ({topics, isAdmin}: {topics: Topic[], isAdmin?: boolean}) => {
  const router = useRouter()
  if (!topics || topics.length === 0) {
    return (
      <Grid container spacing={3} padding={2} className="topics-list">
        <Grid size={12}>
          <Typography variant="h5" fontWeight="bold">No Topics Available</Typography>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container spacing={3} padding={2} className="topics-list">
      <Grid size={12}>
        <Typography variant="h5" fontWeight="bold">Topics</Typography>
        <Typography variant="body2" color="textSecondary">
          Explore various topics to enhance your coding skills.
        </Typography>
      </Grid>
      {topics.map((topic, i) => (
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={topic.id} className="topic-card">
          <TopicCard topic={topic} i={i} edit={isAdmin} />
        </Grid>
      ))}
      {isAdmin && (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} className="add-topic">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: topics.length * 0.1 }}
          >
            <Card className="add-topic-card" elevation={3} onClick={() => router.push('/topics/create')}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">Add New Topic</Typography>
                <Typography variant="body2" color="textSecondary">
                  Click here to add a new topic.
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      )}
    </Grid>
  )
}

export default TopicsList