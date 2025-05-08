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
      title: "맞춤형 직업 추천",
      description: "당신의 경력과 기술을 분석하여 최적의 직업을 추천해드립니다."
    },
    {
      icon: <SearchIcon sx={{ fontSize: 40 }} />,
      title: "실시간 채용 정보",
      description: "최신 구인구직 정보를 실시간으로 확인하실 수 있습니다."
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: "커리어 성장",
      description: "필요한 역량과 기술을 파악하여 커리어 성장을 도와드립니다."
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
            당신의 꿈을 현실로
          </Typography>
          <Typography 
            variant="h4" 
            color="text.secondary" 
            paragraph
            sx={{ mb: 4 }}
          >
            AI 기반 맞춤형 직업 추천 시스템으로<br />
            당신에게 가장 적합한 기회를 찾아보세요
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
            시작하기
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