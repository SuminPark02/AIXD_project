import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Work as WorkIcon,
  School as SchoolIcon,
  Business as BusinessIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { sampleProfiles } from '../data/sampleProfiles';

const Explainability = () => {
  const [selectedProfile, setSelectedProfile] = useState(sampleProfiles[0]);

  const handleProfileChange = (event) => {
    const profile = sampleProfiles.find(p => p.id === event.target.value);
    setSelectedProfile(profile);
  };

  // Simulated AI explanation for job recommendations
  const getAIExplanation = (profile) => {
    return {
      skillMatch: {
        score: 85,
        explanation: `Strong match with required technical skills. ${profile.skills.length} out of 4 key skills match the job requirements.`,
        details: profile.skills.map(skill => ({
          skill,
          relevance: "High",
          matchScore: 90
        }))
      },
      experienceMatch: {
        score: 90,
        explanation: `${profile.yearsOfExperience} years of experience aligns well with the role requirements.`,
        details: [
          {
            factor: "Years of Experience",
            value: profile.yearsOfExperience,
            relevance: "High"
          },
          {
            factor: "Previous Companies",
            value: profile.previousCompanies.join(", "),
            relevance: "High"
          }
        ]
      },
      locationMatch: {
        score: 100,
        explanation: "Perfect location match with preferred work location.",
        details: [
          {
            factor: "Preferred Location",
            value: profile.preferredLocation,
            relevance: "High"
          }
        ]
      },
      salaryMatch: {
        score: 75,
        explanation: "Salary expectations align with market rates for the role.",
        details: [
          {
            factor: "Minimum Salary",
            value: `$${profile.minSalary.toLocaleString()}`,
            relevance: "Medium"
          }
        ]
      }
    };
  };

  const explanation = getAIExplanation(selectedProfile);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          AI Recommendation Explanation
        </Typography>
        
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel>Select Profile</InputLabel>
          <Select
            value={selectedProfile.id}
            label="Select Profile"
            onChange={handleProfileChange}
          >
            {sampleProfiles.map((profile) => (
              <MenuItem key={profile.id} value={profile.id}>
                {profile.name} - {profile.currentRole}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid container spacing={3}>
          {/* Profile Information */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Profile Information
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <WorkIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Current Role"
                      secondary={selectedProfile.currentRole}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Education"
                      secondary={selectedProfile.education}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <BusinessIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Previous Companies"
                      secondary={selectedProfile.previousCompanies.join(", ")}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Skills"
                      secondary={
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                          {selectedProfile.skills.map((skill) => (
                            <Chip key={skill} label={skill} size="small" />
                          ))}
                        </Box>
                      }
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* AI Explanation */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  AI Recommendation Analysis
                </Typography>
                
                {/* Skill Match */}
                <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Skill Match ({explanation.skillMatch.score}%)
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {explanation.skillMatch.explanation}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {explanation.skillMatch.details.map((detail) => (
                      <Chip
                        key={detail.skill}
                        label={`${detail.skill} (${detail.matchScore}%)`}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Paper>

                {/* Experience Match */}
                <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Experience Match ({explanation.experienceMatch.score}%)
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {explanation.experienceMatch.explanation}
                  </Typography>
                  <List dense>
                    {explanation.experienceMatch.details.map((detail, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={detail.factor}
                          secondary={detail.value}
                        />
                        <Chip
                          label={detail.relevance}
                          size="small"
                          color={detail.relevance === "High" ? "success" : "default"}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>

                {/* Location Match */}
                <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Location Match ({explanation.locationMatch.score}%)
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {explanation.locationMatch.explanation}
                  </Typography>
                  <List dense>
                    {explanation.locationMatch.details.map((detail, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={detail.factor}
                          secondary={detail.value}
                        />
                        <Chip
                          label={detail.relevance}
                          size="small"
                          color={detail.relevance === "High" ? "success" : "default"}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>

                {/* Salary Match */}
                <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Salary Match ({explanation.salaryMatch.score}%)
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {explanation.salaryMatch.explanation}
                  </Typography>
                  <List dense>
                    {explanation.salaryMatch.details.map((detail, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={detail.factor}
                          secondary={detail.value}
                        />
                        <Chip
                          label={detail.relevance}
                          size="small"
                          color={detail.relevance === "High" ? "success" : "default"}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Explainability; 