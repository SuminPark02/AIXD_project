import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    education: '',
    experience: '',
    skills: [],
    preferredLocation: '',
    preferredSalary: '',
    careerGoal: ''
  });

  const [currentSkill, setCurrentSkill] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSkill = () => {
    if (currentSkill && !formData.skills.includes(currentSkill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill]
      }));
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 데이터를 저장하고 추천 페이지로 이동
    navigate('/job-recommendations', { state: { userData: formData } });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          프로필 정보 입력
        </Typography>
        <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="이름"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
              />

              <TextField
                label="나이"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
                fullWidth
              />

              <FormControl fullWidth>
                <InputLabel>최종 학력</InputLabel>
                <Select
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="고등학교">고등학교</MenuItem>
                  <MenuItem value="전문대학">전문대학</MenuItem>
                  <MenuItem value="대학교">대학교</MenuItem>
                  <MenuItem value="대학원">대학원</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="경력 (년)"
                name="experience"
                type="number"
                value={formData.experience}
                onChange={handleChange}
                required
                fullWidth
              />

              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  보유 기술
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <TextField
                    label="기술 추가"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    onClick={handleAddSkill}
                    sx={{ minWidth: '100px' }}
                  >
                    추가
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {formData.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      onDelete={() => handleRemoveSkill(skill)}
                    />
                  ))}
                </Box>
              </Box>

              <TextField
                label="희망 근무지"
                name="preferredLocation"
                value={formData.preferredLocation}
                onChange={handleChange}
                required
                fullWidth
              />

              <TextField
                label="희망 연봉 (만원)"
                name="preferredSalary"
                type="number"
                value={formData.preferredSalary}
                onChange={handleChange}
                required
                fullWidth
              />

              <TextField
                label="희망 직무/목표"
                name="careerGoal"
                value={formData.careerGoal}
                onChange={handleChange}
                multiline
                rows={3}
                required
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 2 }}
              >
                맞춤 구직 공고 보기
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default UserProfile; 