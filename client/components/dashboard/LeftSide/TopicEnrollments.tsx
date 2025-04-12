import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Grid2 as Grid } from '@mui/material';

interface TopicEnrollmentsProps {
  enrollments: TopicEnrollment[];
}

const TopicEnrollments: React.FC<TopicEnrollmentsProps> = ({ enrollments }) => {
  const optionalEnrollments = enrollments.filter(enrollment => enrollment.topic.type === 'optional');

  if (optionalEnrollments.length === 0) return null;

  return (
    <div className="dash-details">
      <h2>Your Enrolled Topics</h2>
        <Grid sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {enrollments.map((enrollment, i) => (
            // cards
            <Card key={i}>
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