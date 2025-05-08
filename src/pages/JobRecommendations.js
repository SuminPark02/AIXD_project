import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Chip,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Rating
} from '@mui/material';
import {
  Work as WorkIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  Star as StarIcon,
  Business as CompanyIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';

// Sample job listings with more diverse data
const jobListings = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    location: "San Francisco, CA",
    salary: "$120,000-150,000",
    requirements: ["React", "TypeScript", "JavaScript", "5+ years experience"],
    description: "We are looking for a Senior Frontend Developer to join our team and help build innovative web applications.",
    benefits: ["Remote Work", "Flexible Hours", "Health Insurance", "401k"]
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "StartupX",
    location: "New York, NY",
    salary: "$100,000-130,000",
    requirements: ["Node.js", "Python", "AWS", "3+ years experience"],
    description: "Join our fast-growing startup as a Backend Developer to build scalable systems.",
    benefits: ["Stock Options", "Unlimited PTO", "Learning Budget"]
  },
  {
    id: 3,
    title: "Data Engineer",
    company: "AI Solutions",
    location: "Seattle, WA",
    salary: "$130,000-160,000",
    requirements: ["Python", "SQL", "Big Data", "Machine Learning"],
    description: "Looking for a Data Engineer to build and maintain large-scale data pipelines.",
    benefits: ["Remote Work", "Flexible Hours", "Performance Bonus"]
  },
  {
    id: 4,
    title: "Full Stack Developer",
    company: "Digital Innovations",
    location: "Austin, TX",
    salary: "$110,000-140,000",
    requirements: ["React", "Node.js", "MongoDB", "AWS"],
    description: "Join our team as a Full Stack Developer to work on exciting projects.",
    benefits: ["Health Insurance", "401k", "Gym Membership"]
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "Cloud Systems",
    location: "Boston, MA",
    salary: "$125,000-155,000",
    requirements: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    description: "We need a DevOps Engineer to help us scale our infrastructure.",
    benefits: ["Remote Work", "Flexible Hours", "Learning Budget"]
  },
  {
    id: 6,
    title: "Machine Learning Engineer",
    company: "AI Research Lab",
    location: "San Francisco, CA",
    salary: "$140,000-170,000",
    requirements: ["Python", "TensorFlow", "PyTorch", "Deep Learning"],
    description: "Join our AI Research Lab to work on cutting-edge machine learning projects.",
    benefits: ["Research Budget", "Conference Attendance", "Health Insurance"]
  }
];

// AI-based matching score calculation
const calculateMatchScore = (job, profile) => {
  let score = 0;
  const maxScore = 100;

  // Skill matching (40 points)
  if (profile.skills?.length > 0) {
    const skillMatches = job.requirements.filter(req =>
      profile.skills.some(skill => 
        req.toLowerCase().includes(skill.toLowerCase())
      )
    ).length;
    score += (skillMatches / job.requirements.length) * 40;
  }

  // Location matching (20 points)
  if (profile.preferredLocation) {
    if (job.location.toLowerCase().includes(profile.preferredLocation.toLowerCase())) {
      score += 20;
    }
  }

  // Experience level matching (20 points)
  const experienceLevels = {
    'Entry Level': 0,
    'Junior': 1,
    'Mid Level': 2,
    'Senior': 3,
    'Lead': 4,
    'Manager': 5,
    'Director': 6,
    'Executive': 7
  };

  const jobLevel = job.requirements.find(req => 
    Object.keys(experienceLevels).some(level => 
      req.toLowerCase().includes(level.toLowerCase())
    )
  );

  if (jobLevel) {
    const jobLevelValue = experienceLevels[
      Object.keys(experienceLevels).find(level => 
        jobLevel.toLowerCase().includes(level.toLowerCase())
      )
    ];
    const profileLevelValue = experienceLevels[profile.experience];
    
    if (jobLevelValue <= profileLevelValue) {
      score += 20;
    } else {
      score += Math.max(0, 20 - (jobLevelValue - profileLevelValue) * 5);
    }
  }

  // Salary matching (20 points)
  const jobSalary = parseInt(job.salary.replace(/[^0-9]/g, ''));
  if (jobSalary >= profile.minSalary) {
    score += 20;
  } else {
    score += Math.max(0, 20 - (profile.minSalary - jobSalary) / 10000);
  }

  return Math.min(maxScore, Math.round(score));
};

function JobRecommendations() {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  // Redirect to profile if no profile data
  useEffect(() => {
    if (!profile) {
      navigate('/profile');
    }
  }, [profile, navigate]);

  // Filter and sort jobs based on AI matching score
  useEffect(() => {
    if (profile) {
      const recommendedJobs = jobListings
        .map(job => ({
          ...job,
          matchScore: calculateMatchScore(job, profile)
        }))
        .filter(job => job.matchScore > 0)
        .sort((a, b) => b.matchScore - a.matchScore);
      setJobs(recommendedJobs);
      setLoading(false);
    }
  }, [profile]);

  if (!profile) {
    return null;
  }

  if (loading) {
    return (
      <Container>
        <Box sx={{ mt: 4 }}>
          <LinearProgress />
          <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
            Finding the best matches for you...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Recommended Jobs
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Jobs are sorted by how well they match your profile
        </Typography>

        <List>
          {jobs.map((job, index) => (
            <React.Fragment key={job.id}>
              <Paper 
                elevation={2} 
                sx={{ 
                  mb: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <WorkIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h6" component="div">
                          {job.title}
                        </Typography>
                        <Chip 
                          label={`${job.matchScore}% Match`}
                          color="primary"
                          size="small"
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <CompanyIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {job.company}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <LocationIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {job.location}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <MoneyIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {job.salary}
                          </Typography>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Requirements:
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {job.requirements.map((req, idx) => (
                              <Chip
                                key={idx}
                                label={req}
                                size="small"
                                variant="outlined"
                              />
                            ))}
                          </Box>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Benefits:
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {job.benefits.map((benefit, idx) => (
                              <Chip
                                key={idx}
                                label={benefit}
                                size="small"
                                color="success"
                                variant="outlined"
                              />
                            ))}
                          </Box>
                        </Box>
                        <Typography variant="body2" sx={{ mt: 2 }}>
                          {job.description}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              </Paper>
              {index < jobs.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/profile')}
        >
          Edit Profile
        </Button>
      </Box>
    </Container>
  );
}

export default JobRecommendations; 