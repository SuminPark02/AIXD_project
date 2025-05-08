import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Chip,
  Autocomplete,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useProfile } from '../contexts/ProfileContext';

const skills = [
  'React', 'TypeScript', 'JavaScript', 'Python', 'Java', 'Node.js', 'AWS',
  'Docker', 'Kubernetes', 'SQL', 'MongoDB', 'GraphQL', 'REST', 'CI/CD', 'Git',
  'Angular', 'Vue.js', 'PHP', 'Ruby', 'Go', 'C#', '.NET', 'Spring Boot',
  'TensorFlow', 'PyTorch', 'Data Analysis', 'Machine Learning', 'Deep Learning',
  'Cloud Computing', 'Microservices', 'System Design', 'Agile', 'Scrum'
];

const locations = [
  'San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX', 'Boston, MA',
  'Chicago, IL', 'Denver, CO', 'Los Angeles, CA', 'Portland, OR', 'Washington, DC',
  'Atlanta, GA', 'Dallas, TX', 'Miami, FL', 'Phoenix, AZ', 'San Diego, CA'
];

const experienceLevels = [
  'Entry Level',
  'Junior',
  'Mid Level',
  'Senior',
  'Lead',
  'Manager',
  'Director',
  'Executive'
];

const Profile = () => {
  const navigate = useNavigate();
  const { profile, updateProfile, clearProfile } = useProfile();
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    skills: profile?.skills || [],
    experience: profile?.experience || 'Mid Level',
    preferredLocation: profile?.preferredLocation || '',
    minSalary: profile?.minSalary || 50000,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.experience) {
      return;
    }
    updateProfile(formData);
    navigate('/recommendations');
  };

  const handleReset = () => {
    clearProfile();
    setFormData({
      name: '',
      skills: [],
      experience: 'Mid Level',
      preferredLocation: '',
      minSalary: 50000,
    });
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      py: 8
    }}>
      <Container maxWidth="md">
        <Paper 
          elevation={0}
          sx={{ 
            p: 4,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
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
              Create Your Profile
            </Typography>
            {profile && (
              <Button
                variant="outlined"
                color="error"
                onClick={handleReset}
                sx={{
                  borderColor: '#ef4444',
                  color: '#ef4444',
                  '&:hover': {
                    borderColor: '#dc2626',
                    backgroundColor: 'rgba(239, 68, 68, 0.04)',
                  },
                }}
              >
                Reset Profile
              </Button>
            )}
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="normal"
              required
            />

            <Autocomplete
              multiple
              options={skills}
              value={formData.skills}
              onChange={(_, newValue) => setFormData({ ...formData, skills: newValue })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Skills"
                  margin="normal"
                  helperText="Select your skills (optional)"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  const { key, ...chipProps } = getTagProps({ index });
                  return (
                    <Chip
                      key={key}
                      label={option}
                      {...chipProps}
                      sx={{
                        background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                        color: 'white',
                      }}
                    />
                  );
                })
              }
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Experience Level</InputLabel>
              <Select
                value={formData.experience}
                label="Experience Level"
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                required
              >
                {experienceLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Autocomplete
              options={locations}
              value={formData.preferredLocation}
              onChange={(_, newValue) => setFormData({ ...formData, preferredLocation: newValue })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Preferred Location"
                  margin="normal"
                  helperText="Select your preferred location (optional)"
                />
              )}
            />

            <Box sx={{ mt: 3, mb: 2 }}>
              <Typography gutterBottom>
                Minimum Salary: ${formData.minSalary.toLocaleString()}
              </Typography>
              <Slider
                value={formData.minSalary}
                onChange={(_, value) => setFormData({ ...formData, minSalary: value })}
                min={30000}
                max={200000}
                step={10000}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `$${value.toLocaleString()}`}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                  color: 'white',
                  py: 1.5,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1d4ed8 30%, #5b21b6 90%)',
                  }
                }}
              >
                {profile ? 'Update Profile' : 'Create Profile'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile; 