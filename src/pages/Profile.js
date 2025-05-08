import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';

function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    education: '',
    experience: '',
    skills: [],
    interests: [],
  });

  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
      setNewSkill('');
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToDelete),
    }));
  };

  const handleAddInterest = () => {
    if (newInterest && !formData.interests.includes(newInterest)) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, newInterest],
      }));
      setNewInterest('');
    }
  };

  const handleDeleteInterest = (interestToDelete) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((interest) => interest !== interestToDelete),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 프로필 데이터 저장 로직 추가
    navigate('/recommendations');
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
              mb: 4
            }}
          >
            프로필 작성
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="이름"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#2563eb',
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="나이"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>학력</InputLabel>
                  <Select
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    label="학력"
                  >
                    <MenuItem value="고등학교">고등학교</MenuItem>
                    <MenuItem value="전문대학">전문대학</MenuItem>
                    <MenuItem value="대학교">대학교</MenuItem>
                    <MenuItem value="대학원">대학원</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="경력"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  placeholder="주요 경력 사항을 입력해주세요"
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CodeIcon color="primary" /> 보유 기술
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <TextField
                      size="small"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="기술 입력"
                      sx={{ flexGrow: 1 }}
                    />
                    <Button
                      variant="contained"
                      onClick={handleAddSkill}
                      startIcon={<AddIcon />}
                      sx={{
                        background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1d4ed8 30%, #5b21b6 90%)',
                        }
                      }}
                    >
                      추가
                    </Button>
                  </Stack>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {formData.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        onDelete={() => handleDeleteSkill(skill)}
                        sx={{
                          background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                          color: 'white',
                          '& .MuiChip-deleteIcon': {
                            color: 'white',
                            '&:hover': {
                              color: '#e0f2fe',
                            },
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <WorkIcon color="primary" /> 관심 분야
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <TextField
                      size="small"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      placeholder="관심 분야 입력"
                      sx={{ flexGrow: 1 }}
                    />
                    <Button
                      variant="contained"
                      onClick={handleAddInterest}
                      startIcon={<AddIcon />}
                      sx={{
                        background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1d4ed8 30%, #5b21b6 90%)',
                        }
                      }}
                    >
                      추가
                    </Button>
                  </Stack>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {formData.interests.map((interest) => (
                      <Chip
                        key={interest}
                        label={interest}
                        onDelete={() => handleDeleteInterest(interest)}
                        sx={{
                          background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                          color: 'white',
                          '& .MuiChip-deleteIcon': {
                            color: 'white',
                            '&:hover': {
                              color: '#e0f2fe',
                            },
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      py: 1.5,
                      px: 4,
                      fontSize: '1.1rem',
                      background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1d4ed8 30%, #5b21b6 90%)',
                      }
                    }}
                  >
                    추천 받기
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default Profile; 