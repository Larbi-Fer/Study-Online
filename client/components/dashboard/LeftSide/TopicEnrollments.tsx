'use client'
import { Card, CardContent, Typography, Box, Chip, Grid2 as Grid, Button } from '@mui/material';
import { setSelectedTopic } from '@/actions/user.action';
import { useRouter } from 'next/navigation';
import { setUser } from '@/lib/features/user';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Image from 'next/image';
import { CheckCircleIcon } from 'lucide-react';

interface TopicEnrollmentsProps {
  enrollments: TopicEnrollment[];
  loadTopicData: (topicId: string) => void
}

const TopicEnrollments: React.FC<TopicEnrollmentsProps> = ({ enrollments, loadTopicData }) => {
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
    loadTopicData(enroll.topic.id)
  }

  return (
    <div className="dash-details">
      <h2>Your Enrolled Topics</h2>
        <Grid sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {enrollments.map((enrollment, i) => (
            <Card 
              key={i} 
              onClick={selectNewTopic(enrollment)} 
              sx={{ 
                width: 320, 
                cursor: 'pointer', 
                background: `linear-gradient(-135deg, ${enrollment.topic.color}80, #fff, #fff, #fff)`,
                // borderLeft: `4px solid ${enrollment.topic.color}`,
                boxShadow: `0 0 10px #3335`,
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 16px ${enrollment.topic.color}30`
                }
              }}
            >
              <CardContent sx={{ padding: 2, position: 'relative' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1, position: 'absolute', top: '5px', right: '5px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {enrollment.completed && (
                      <CheckCircleIcon color="green" size={20} />
                    )}
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  {enrollment.topic.icon?.path && (
                    <Box sx={{ width: 20, height: 20, position: 'relative' }}>
                      <Image 
                        src={enrollment.topic.icon.path} 
                        alt={enrollment.topic.title}
                        width={20}
                        height={20}
                      />
                    </Box>
                  )}
                  <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
                    {enrollment.topic.title}
                  </Typography>
                </Box>
                
                <Button 
                  variant="contained" 
                  size="small" 
                  disableElevation
                  sx={{ 
                    bgcolor: enrollment.topic.type === 'required' ? '#ff5722' : '#4caf50',
                    color: 'white',
                    fontSize: '0.7rem',
                    textTransform: 'capitalize',
                    mt: 1,
                    '&:hover': {
                      bgcolor: enrollment.topic.type === 'required' ? '#e64a19' : '#43a047',
                    }
                  }}
                >
                  {enrollment.topic.type}
                </Button>
              </CardContent>
            </Card>
          ))}
        </Grid>
    </div>
  );
};

export default TopicEnrollments; 