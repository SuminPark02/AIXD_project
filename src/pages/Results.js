import React from 'react';
import { Container, Typography, Box, Card, CardContent, Button, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const careerRecommendations = {
  "다른 사람들과 대화하고 협력하는 것": [
    {
      title: "인사 관리자",
      description: "직원 채용, 교육, 복리후생 등을 담당하며 조직의 인적 자원을 관리합니다.",
      skills: ["의사소통능력", "문제해결능력", "조직관리능력"]
    },
    {
      title: "영업 관리자",
      description: "제품이나 서비스를 판매하고 고객과의 관계를 관리합니다.",
      skills: ["협상능력", "고객관리", "목표달성능력"]
    }
  ],
  "혼자서 창의적인 작업을 하는 것": [
    {
      title: "UI/UX 디자이너",
      description: "사용자 경험을 개선하고 시각적으로 매력적인 인터페이스를 디자인합니다.",
      skills: ["창의력", "디자인툴 활용", "사용자 중심 사고"]
    },
    {
      title: "콘텐츠 크리에이터",
      description: "다양한 매체를 통해 창의적인 콘텐츠를 제작하고 공유합니다.",
      skills: ["창작능력", "미디어 제작", "스토리텔링"]
    }
  ],
  "문제를 분석하고 해결하는 것": [
    {
      title: "데이터 사이언티스트",
      description: "데이터를 분석하여 비즈니스 인사이트를 도출하고 의사결정을 지원합니다.",
      skills: ["데이터 분석", "통계", "프로그래밍"]
    },
    {
      title: "소프트웨어 엔지니어",
      description: "소프트웨어 시스템을 설계하고 개발하여 기술적 문제를 해결합니다.",
      skills: ["프로그래밍", "문제해결", "시스템 설계"]
    }
  ],
  "체계적으로 일을 관리하는 것": [
    {
      title: "프로젝트 매니저",
      description: "프로젝트의 계획, 실행, 모니터링을 통해 목표를 달성합니다.",
      skills: ["프로젝트 관리", "리더십", "위기관리"]
    },
    {
      title: "운영 관리자",
      description: "조직의 일상적인 운영을 관리하고 효율성을 개선합니다.",
      skills: ["프로세스 개선", "자원관리", "품질관리"]
    }
  ]
};

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers } = location.state || {};

  const getRecommendations = () => {
    if (!answers) return [];
    const firstAnswer = answers[1]; // 첫 번째 질문의 답변을 기준으로 추천
    return careerRecommendations[firstAnswer] || [];
  };

  const recommendations = getRecommendations();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          직업 추천 결과
        </Typography>
        <Grid container spacing={3}>
          {recommendations.map((career, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {career.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {career.description}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    필요 역량:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {career.skills.map((skill, i) => (
                      <Typography
                        key={i}
                        variant="body2"
                        sx={{
                          bgcolor: 'primary.main',
                          color: 'white',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1
                        }}
                      >
                        {skill}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={() => navigate('/career-test')}
          >
            테스트 다시하기
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Results; 