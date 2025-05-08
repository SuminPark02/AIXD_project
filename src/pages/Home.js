import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          당신에게 맞는 구직 공고를 찾아보세요
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          프로필을 작성하고 당신의 경력과 기술에 맞는 최적의 구직 공고를 추천받으세요.
          다양한 기업의 채용 정보를 한눈에 확인하고 원하는 포지션에 지원해보세요.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/profile')}
          sx={{ mt: 4 }}
        >
          프로필 작성하기
        </Button>
      </Box>
    </Container>
  );
}

export default Home; 