import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  Psychology as PsychologyIcon,
  EmojiObjects as EmojiObjectsIcon,
} from '@mui/icons-material';

function Explainability() {
  const explanations = [
    {
      title: "Skills Match",
      description: "We've analyzed your skills against the job requirements to find the optimal match.",
      details: [
        "Your experience with React and TypeScript aligns well with the requirements.",
        "Your Next.js framework experience matches the preferred qualifications.",
        "Your 3+ years of frontend development experience meets the requirements."
      ]
    },
    {
      title: "Career Fit",
      description: "We've compared your career experience with the job requirements.",
      details: [
        "You have senior-level project leadership experience.",
        "Your large-scale project experience matches the requirements.",
        "Your team leadership experience aligns with the preferred qualifications."
      ]
    },
    {
      title: "Growth Potential",
      description: "Your interests align with the company's development direction.",
      details: [
        "Your interest in cloud technologies matches the company's tech stack.",
        "Your microservices architecture experience will be valuable for future projects.",
        "Your performance optimization experience can contribute to solving technical challenges."
      ]
    },
    {
      title: "Cultural Fit",
      description: "Your values align well with the company culture.",
      details: [
        "Your collaborative work style matches the company culture.",
        "You show passion for continuous learning and growth.",
        "Your innovative problem-solving abilities align with the company's values."
      ]
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      py: 8
    }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{
            background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 6
          }}
        >
          Recommendation Explanation
        </Typography>

        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary" 
          paragraph
          sx={{ mb: 6 }}
        >
          Explore the detailed reasons behind your personalized job recommendations
        </Typography>

        <Grid container spacing={4}>
          {explanations.map((explanation, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  {index === 0 && <PsychologyIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />}
                  {index === 1 && <TrendingUpIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />}
                  {index === 2 && <EmojiObjectsIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />}
                  {index === 3 && <CheckCircleIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />}
                  <Typography variant="h5" component="h2">
                    {explanation.title}
                  </Typography>
                </Box>

                <Typography color="text.secondary" paragraph>
                  {explanation.description}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <List>
                  {explanation.details.map((detail, detailIndex) => (
                    <ListItem key={detailIndex} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={detail} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            These recommendations are based on the analysis of your profile and hundreds of job postings.
            <br />
            Update your profile to get more detailed analysis or recommendations for different positions.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Explainability; 