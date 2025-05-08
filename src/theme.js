import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF69B4', // 핫 핑크
      light: '#FFB6C1', // 라이트 핑크
      dark: '#C71585', // 딥 핑크
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFC0CB', // 핑크
      light: '#FFE4E1', // 미스트 로즈
      dark: '#DB7093', // 페일 바이올렛 레드
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFF0F5', // 라벤더 블러쉬
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
    h1: {
      fontWeight: 600,
      color: '#C71585',
    },
    h2: {
      fontWeight: 600,
      color: '#C71585',
    },
    h3: {
      fontWeight: 600,
      color: '#C71585',
    },
    h4: {
      fontWeight: 600,
      color: '#C71585',
    },
    h5: {
      fontWeight: 600,
      color: '#C71585',
    },
    h6: {
      fontWeight: 600,
      color: '#C71585',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          boxShadow: '0 4px 8px rgba(255, 105, 180, 0.2)',
          '&:hover': {
            boxShadow: '0 6px 12px rgba(255, 105, 180, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 8px rgba(255, 105, 180, 0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme; 