import React, { useState } from 'react';
import { Container, Typography, Box, RadioGroup, FormControlLabel, Radio, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    id: 1,
    question: "어떤 활동을 할 때 가장 즐거움을 느끼시나요?",
    options: [
      "다른 사람들과 대화하고 협력하는 것",
      "혼자서 창의적인 작업을 하는 것",
      "문제를 분석하고 해결하는 것",
      "체계적으로 일을 관리하는 것"
    ]
  },
  {
    id: 2,
    question: "어떤 환경에서 일하는 것을 선호하시나요?",
    options: [
      "사람들과 자주 만나고 소통하는 환경",
      "조용하고 집중할 수 있는 환경",
      "도전적이고 새로운 문제를 해결하는 환경",
      "안정적이고 예측 가능한 환경"
    ]
  },
  {
    id: 3,
    question: "어떤 기술을 더 발전시키고 싶으신가요?",
    options: [
      "의사소통과 리더십",
      "창의력과 예술적 감각",
      "분석력과 문제해결능력",
      "조직력과 관리능력"
    ]
  }
];

function CareerTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleAnswer = (answer) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]: answer
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 모든 질문이 끝나면 결과 페이지로 이동
      navigate('/results', { state: { answers } });
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          직업 적성 테스트
        </Typography>
        <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            {questions[currentQuestion].question}
          </Typography>
          <RadioGroup
            value={answers[questions[currentQuestion].id] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
          >
            {questions[currentQuestion].options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!answers[questions[currentQuestion].id]}
            >
              {currentQuestion < questions.length - 1 ? '다음' : '결과 보기'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default CareerTest; 