'use client'
import { Card, CardContent, Typography, Box, Chip, Grid2 as Grid, Button } from '@mui/material';
import { setSelectedTopic } from '@/actions/user.action';
import { useRouter } from 'next/navigation';
import { setUser } from '@/lib/features/user';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Image from 'next/image';
import { CheckCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client'

interface TopicEnrollmentsProps {
  enrollments: TopicEnrollment[];
  loadTopicData: (topicId: string) => void
}

const TopicEnrollments: React.FC<TopicEnrollmentsProps> = ({ enrollments, loadTopicData }) => {
  const user = useAppSelector(state => state.user)!
  const dispatch = useAppDispatch()
  const [filter, setFilter] = useState<{req: boolean, com: boolean, opt: boolean | null}>({req: false, opt: true, com: false})
  const [filterEnrollments, setFilterEnrollments] = useState(enrollments)

  useEffect(() => {
    const optionalEnrollments = enrollments.filter(enrollment => enrollment.topic.type === 'optional');
    let prev = filter;
    if (optionalEnrollments.length == 0) {
      prev = ({...prev, opt: null, req: true})
      setFilter(prev)
    }

    const res = (enrollments.filter(enrollment => {
      if (!prev.com && enrollment.completed) return false
      return (prev.opt && enrollment.topic.type === 'optional') ||
      (prev.req && enrollment.topic.type === 'required') ||
      (prev.com && enrollment.completed);
    }));
    setFilterEnrollments(res)
  }, [])

  if (enrollments.length == 1) return

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
    document.body.style.setProperty('--topic-pramiry-color', enroll.topic.color);
  }

  const selectFilter = (fld: 'req' | 'opt' | 'com') => () => {
    let prev = filter;
    prev = ({...prev, [fld]: !prev[fld]})
    setFilter(prev)
    const res = (enrollments.filter(enrollment => {
      if (!prev.com && enrollment.completed) return false
      return (prev.opt && enrollment.topic.type === 'optional') ||
      (prev.req && enrollment.topic.type === 'required') ||
      (prev.com && enrollment.completed);
    }));

    setFilterEnrollments(res)
  }

  return (
    <div className="dash-details">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h2 style={{marginBottom: '10px'}}>Your Enrolled Topics</h2>
        <div className="filter-sort-options">
          <h3>Filter: </h3>
          {filter.opt !== null && <div className={"filter-sort-option" + (filter.opt ? ' selected' : '')} onClick={selectFilter('opt')}>Optional</div>}
          <div className={"filter-sort-option" + (filter.req ? ' selected' : '')} onClick={selectFilter('req')}>Required</div>
          <div className={"filter-sort-option" + (filter.com ? ' selected' : '')} onClick={selectFilter('com')}>Completed</div>
        </div>
      </div>

        {filterEnrollments.length == 0 && (
            <div style={{textAlign: 'center', fontSize: '15px', color: '#3339'}}>
               No topics match this filter
            </div>
        )}
        <Grid sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <AnimatePresence mode='sync'>
            {filterEnrollments.map((enrollment, i) => (
              <motion.div key={i} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                <Card 
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
              </motion.div>
            ))}
          </AnimatePresence>
        </Grid>
    </div>
  );
};

export default TopicEnrollments; 