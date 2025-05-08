import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  Rating,
  IconButton,
  Tooltip,
  Paper,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Work as WorkIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { jobService } from '../services/jobService';
import { useProfile } from '../contexts/ProfileContext';

const Recommendations = () => {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const [favorites, setFavorites] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const jobs = await jobService.getRecommendedJobs(profile);
        setRecommendations(jobs);
      } catch (error) {
        console.error('Error loading recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [profile]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id]
    );
  };

  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id)
        ? prev.filter((bookmarkId) => bookmarkId !== id)
        : [...prev, id]
    );
  };

  if (loading) {
    return (
      <Container>
        <LinearProgress />
      </Container>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      py: 8
    }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{
              background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Personalized Job Recommendations
          </Typography>
          <Button
            variant="outlined"
            startIcon={<InfoIcon />}
            onClick={() => navigate('/explainability')}
            sx={{
              borderColor: '#2563eb',
              color: '#2563eb',
              '&:hover': {
                borderColor: '#1d4ed8',
                backgroundColor: 'rgba(37, 99, 235, 0.04)',
              },
            }}
          >
            View Recommendation Details
          </Button>
        </Box>

        <Grid container spacing={3}>
          {recommendations.map((job) => (
            <Grid item xs={12} key={job.id}>
              <Paper
                elevation={0}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {job.title}
                    </Typography>
                    <Box>
                      <Tooltip title={favorites.includes(job.id) ? "Remove from favorites" : "Add to favorites"}>
                        <IconButton onClick={() => toggleFavorite(job.id)} size="small">
                          {favorites.includes(job.id) ? <StarIcon color="warning" /> : <StarBorderIcon />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={bookmarks.includes(job.id) ? "Remove bookmark" : "Add bookmark"}>
                        <IconButton onClick={() => toggleBookmark(job.id)} size="small">
                          {bookmarks.includes(job.id) ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>

                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    {job.company}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <LocationIcon color="action" fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      {job.location}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <MoneyIcon color="action" fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      {job.salary}
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {job.description}
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {job.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{
                          background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                          color: 'white',
                        }}
                      />
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Rating
                      value={job.rating}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <Typography variant="body2" color="text.secondary">
                      ({job.rating})
                    </Typography>
                  </Box>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Why this job matches you</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {job.explanations.map((explanation, index) => (
                        <Box key={index} mb={2}>
                          <Typography variant="subtitle1" color="primary">
                            {explanation.title}
                          </Typography>
                          <Typography variant="body2">
                            {explanation.description}
                          </Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={explanation.score * 100} 
                            style={{ marginTop: 8 }}
                          />
                        </Box>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1d4ed8 30%, #5b21b6 90%)',
                      }
                    }}
                  >
                    Apply Now
                  </Button>
                </CardActions>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Recommendations; 