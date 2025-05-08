import React from 'react';
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
  LinearProgress
} from '@mui/material';
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

  // Redirect to profile if no profile data
  React.useEffect(() => {
    if (!profile) {
      navigate('/profile');
    }
  }, [profile, navigate]);

  // Filter and sort jobs based on AI matching score
  const recommendedJobs = React.useMemo(() => {
    if (!profile) return [];

    return jobListings
      .map(job => ({
        ...job,
        matchScore: calculateMatchScore(job, profile)
      }))
      .filter(job => job.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [profile]);

  if (!profile) {
    return null;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          AI-Powered Job Recommendations
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Jobs recommended for {profile.name} based on AI matching
        </Typography>

        {recommendedJobs.length === 0 ? (
          <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 4 }}>
            No jobs found matching your profile. Try updating your skills or preferences.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {recommendedJobs.map((job) => (
              <Grid key={job.id} xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h5" component="h2">
                        {job.title}
                      </Typography>
                      <Chip
                        label={`${job.matchScore}% Match`}
                        color={job.matchScore > 70 ? "success" : job.matchScore > 40 ? "warning" : "error"}
                      />
                    </Box>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {job.company}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <Typography variant="body1">
                        📍 {job.location}
                      </Typography>
                      <Typography variant="body1">
                        💰 {job.salary}
                      </Typography>
                    </Box>

                    <Typography variant="body1" paragraph>
                      {job.description}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle1" gutterBottom>
                      Required Skills
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {job.requirements.map((req, index) => (
                        <Chip
                          key={index}
                          label={req}
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>

                    <Typography variant="subtitle1" gutterBottom>
                      Benefits
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {job.benefits.map((benefit, index) => (
                        <Chip
                          key={index}
                          label={benefit}
                          color="secondary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View Details
                    </Button>
                    <Button size="small" color="primary">
                      Apply
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/profile')}
          >
            Edit Profile
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default JobRecommendations; 