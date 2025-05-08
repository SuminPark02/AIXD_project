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
  Divider
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

// 임시 구직 공고 데이터
const jobListings = [
  {
    id: 1,
    title: "시니어 프론트엔드 개발자",
    company: "테크 컴퍼니",
    location: "서울 강남구",
    salary: "6,000-8,000",
    requirements: ["React", "TypeScript", "5년 이상 경력"],
    description: "혁신적인 웹 서비스를 개발하는 시니어 프론트엔드 개발자를 모집합니다.",
    benefits: ["유연근무제", "원격근무", "성과급"]
  },
  {
    id: 2,
    title: "백엔드 개발자",
    company: "스타트업 X",
    location: "서울 서초구",
    salary: "5,000-7,000",
    requirements: ["Node.js", "Python", "3년 이상 경력"],
    description: "확장 가능한 백엔드 시스템을 구축할 개발자를 찾습니다.",
    benefits: ["스톡옵션", "연차", "교육비 지원"]
  },
  {
    id: 3,
    title: "데이터 엔지니어",
    company: "AI 솔루션즈",
    location: "서울 마포구",
    salary: "7,000-9,000",
    requirements: ["Python", "SQL", "빅데이터 경험"],
    description: "대규모 데이터 파이프라인을 구축하고 관리할 데이터 엔지니어를 모집합니다.",
    benefits: ["유연근무제", "원격근무", "성과급"]
  }
];

function JobRecommendations() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = location.state || {};

  // 사용자 데이터가 없으면 프로필 페이지로 리다이렉트
  React.useEffect(() => {
    if (!userData) {
      navigate('/profile');
    }
  }, [userData, navigate]);

  // 실제로는 여기서 API를 호출하여 사용자 데이터 기반으로 구직 공고를 필터링하고 정렬합니다
  const recommendedJobs = jobListings;

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          맞춤 구직 공고
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          {userData?.name}님의 프로필을 기반으로 추천된 구직 공고입니다.
        </Typography>

        <Grid container spacing={3}>
          {recommendedJobs.map((job) => (
            <Grid key={job.id} xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {job.title}
                  </Typography>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {job.company}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Typography variant="body1">
                      📍 {job.location}
                    </Typography>
                    <Typography variant="body1">
                      💰 {job.salary}만원
                    </Typography>
                  </Box>

                  <Typography variant="body1" paragraph>
                    {job.description}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle1" gutterBottom>
                    필요 역량
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
                    복리후생
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
                    상세 정보 보기
                  </Button>
                  <Button size="small" color="primary">
                    지원하기
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/profile')}
          >
            프로필 수정하기
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default JobRecommendations; 