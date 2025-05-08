import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import {
  Work as WorkIcon,
  Person as PersonIcon,
  Lightbulb as LightbulbIcon,
} from '@mui/icons-material';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      py: 8
    }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              mb: 2
            }}
          >
            Find Your Dream Job
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Get personalized job recommendations based on your skills and preferences
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/profile')}
            sx={{
              background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
              color: 'white',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                background: 'linear-gradient(45deg, #1d4ed8 30%, #5b21b6 90%)',
              }
            }}
          >
            Get Started
          </Button>
        </Box>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <WorkIcon sx={{ fontSize: 60, color: '#2563eb', mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Smart Recommendations
                </Typography>
                <Typography color="text.secondary">
                  Get personalized job recommendations based on your skills, experience, and preferences
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <PersonIcon sx={{ fontSize: 60, color: '#2563eb', mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Personalized Profile
                </Typography>
                <Typography color="text.secondary">
                  Create your profile and let our AI understand your career goals and preferences
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <LightbulbIcon sx={{ fontSize: 60, color: '#2563eb', mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Explainable AI
                </Typography>
                <Typography color="text.secondary">
                  Understand why each job is recommended to you with our explainable AI system
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 