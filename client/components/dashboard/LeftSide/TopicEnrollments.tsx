'use client'
import { Card, CardContent, Typography, Box, Chip, Grid2 as Grid } from '@mui/material';
import { setSelectedTopic } from '@/actions/user.action';
import { useRouter } from 'next/navigation';
import { setUser } from '@/lib/features/user';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

interface TopicEnrollmentsProps {
  enrollments: TopicEnrollment[];
}

const TopicEnrollments: React.FC<TopicEnrollmentsProps> = ({ enrollments }) => {
  const user = useAppSelector(state => state.user)!
  const dispatch = useAppDispatch()
  // const optionalEnrollments = enrollments.filter(enrollment => enrollment.topic.type === 'optional');

  // if (optionalEnrollments.length === 0) return null;

  const selectNewTopic = (enroll: TopicEnrollment) => async() => {
    if (enroll.topic.id == user.selectedTopic?.id) return
    await setSelectedTopic(enroll.topic.id);
    dispatch(setUser({
      ...user,
      selectedTopic: {
        currentLesson: {
          id: enroll.currentLesson.id,
          number: enroll.currentLesson.number
        },
        color: enroll.topic.color,
        id: enroll.topic.id,
        level: enroll.level
      }
    }))
  }

  return (
    <div className="dash-details">
      <h2>Your Enrolled Topics</h2>
        <Grid sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {enrollments.map((enrollment, i) => (
            // cards
            <Card key={i} onClick={selectNewTopic(enrollment)}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {enrollment.topic.title}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
    </div>
  );
};

export default TopicEnrollments; 