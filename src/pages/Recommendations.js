import React, { useState } from 'react';
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

function Recommendations() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  // 임시 데이터
  const recommendations = [
    {
      id: 1,
      title: '시니어 프론트엔드 개발자',
      company: '테크 컴퍼니',
      location: '서울 강남구',
      salary: '연봉 8,000만원 ~ 1억원',
      description: 'React, TypeScript 경험이 풍부한 시니어 프론트엔드 개발자를 모집합니다.',
      skills: ['React', 'TypeScript', 'Next.js'],
      rating: 4.5,
    },
    {
      id: 2,
      title: '백엔드 개발자',
      company: '스타트업',
      location: '서울 서초구',
      salary: '연봉 6,000만원 ~ 8,000만원',
      description: 'Node.js와 Python을 활용한 백엔드 개발자를 모집합니다.',
      skills: ['Node.js', 'Python', 'AWS'],
      rating: 4.2,
    },
    {
      id: 3,
      title: '풀스택 개발자',
      company: 'IT 기업',
      location: '서울 마포구',
      salary: '연봉 7,000만원 ~ 9,000만원',
      description: '프론트엔드와 백엔드 개발이 가능한 풀스택 개발자를 모집합니다.',
      skills: ['React', 'Node.js', 'MongoDB'],
      rating: 4.0,
    },
  ];

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
            맞춤형 직업 추천
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
            추천 이유 보기
          </Button>
        </Box>

        <Grid container spacing={3}>
          {recommendations.map((job) => (
            <Grid item xs={12} md={6} lg={4} key={job.id}>
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
                      <Tooltip title={favorites.includes(job.id) ? "즐겨찾기 제거" : "즐겨찾기 추가"}>
                        <IconButton onClick={() => toggleFavorite(job.id)} size="small">
                          {favorites.includes(job.id) ? <StarIcon color="warning" /> : <StarBorderIcon />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={bookmarks.includes(job.id) ? "북마크 제거" : "북마크 추가"}>
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
                    지원하기
                  </Button>
                </CardActions>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Recommendations; 