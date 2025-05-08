import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  Psychology as PsychologyIcon,
  EmojiObjects as EmojiObjectsIcon,
} from '@mui/icons-material';

function Explainability() {
  const explanations = [
    {
      title: "기술 스택 매칭",
      description: "귀하의 보유 기술과 요구되는 기술을 분석하여 최적의 매칭을 찾았습니다.",
      details: [
        "React, TypeScript 경험이 요구사항과 높은 일치도를 보입니다.",
        "Next.js 프레임워크 사용 경험이 우대사항과 일치합니다.",
        "프론트엔드 개발 경험이 3년 이상으로 요구사항을 충족합니다."
      ]
    },
    {
      title: "경력 적합성",
      description: "귀하의 경력과 직무 요구사항을 비교 분석했습니다.",
      details: [
        "시니어 레벨의 프로젝트 리딩 경험이 있습니다.",
        "대규모 프로젝트 경험이 요구사항과 일치합니다.",
        "팀 리더십 경험이 우대사항과 일치합니다."
      ]
    },
    {
      title: "성장 가능성",
      description: "귀하의 관심사와 회사의 발전 방향이 일치합니다.",
      details: [
        "클라우드 기술에 대한 관심이 회사의 기술 스택과 일치합니다.",
        "마이크로서비스 아키텍처 경험이 향후 프로젝트에 도움이 될 것입니다.",
        "성능 최적화 경험이 회사의 기술적 과제 해결에 기여할 수 있습니다."
      ]
    },
    {
      title: "문화 적합성",
      description: "귀하의 가치관과 회사의 문화가 잘 맞습니다.",
      details: [
        "협업 중심의 업무 스타일이 회사 문화와 일치합니다.",
        "지속적인 학습과 성장에 대한 열정이 있습니다.",
        "혁신적인 문제 해결 능력이 회사의 가치와 일치합니다."
      ]
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      py: 8
    }}>
      <Container maxWidth="lg">
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
            mb: 6
          }}
        >
          추천 이유 설명
        </Typography>

        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary" 
          paragraph
          sx={{ mb: 6 }}
        >
          AI가 분석한 맞춤형 직업 추천의 상세한 이유를 확인해보세요
        </Typography>

        <Grid container spacing={4}>
          {explanations.map((explanation, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  {index === 0 && <PsychologyIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />}
                  {index === 1 && <TrendingUpIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />}
                  {index === 2 && <EmojiObjectsIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />}
                  {index === 3 && <CheckCircleIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />}
                  <Typography variant="h5" component="h2">
                    {explanation.title}
                  </Typography>
                </Box>

                <Typography color="text.secondary" paragraph>
                  {explanation.description}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <List>
                  {explanation.details.map((detail, detailIndex) => (
                    <ListItem key={detailIndex} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={detail} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            이 추천은 귀하의 프로필과 수백 개의 채용 공고를 분석하여 도출된 결과입니다.
            <br />
            더 자세한 분석이나 다른 직무에 대한 추천이 필요하시다면 프로필을 업데이트해보세요.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Explainability; 