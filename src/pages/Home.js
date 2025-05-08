import React from 'react';
import { Container, Typography, Button, Box, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <WorkIcon sx={{ fontSize: 40 }} />,
      title: "Personalized Job Recommendations",
      description: "We analyze your career and skills to recommend the best job opportunities for you."
    },
    {
      icon: <SearchIcon sx={{ fontSize: 40 }} />,
      title: "Real-time Job Listings",
      description: "Access the latest job opportunities in real-time."
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: "Career Growth",
      description: "Identify required competencies and skills to help you grow in your career."
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      pt: 8,
      pb: 12
    }}>
      <Container maxWidth="lg">
        <Box sx={{ 
          textAlign: 'center',
          mb: 8
        }}>
          <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom
            sx={{
              background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3
            }}
          >
            Turn Your Dreams Into Reality
          </Typography>
          <Typography 
            variant="h4" 
            color="text.secondary" 
            paragraph
            sx={{ mb: 4 }}
          >
            Find the perfect opportunity for you<br />
            with our AI-powered job recommendation system
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/profile')}
            sx={{
              py: 2,
              px: 4,
              fontSize: '1.1rem',
              background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1d4ed8 30%, #5b21b6 90%)',
              }
            }}
          >
            Get Started
          </Button>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                    color: 'white',
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h5" component="h2" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home; 