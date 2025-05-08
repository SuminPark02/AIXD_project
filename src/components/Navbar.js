import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Work as WorkIcon, Person as PersonIcon, Home as HomeIcon, Lightbulb as LightbulbIcon } from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: <HomeIcon /> },
    { path: '/profile', label: 'Profile', icon: <PersonIcon /> },
    { path: '/recommendations', label: 'Jobs', icon: <WorkIcon /> },
    { path: '/explainability', label: 'Explain', icon: <LightbulbIcon /> }
  ];

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'linear-gradient(45deg, #1a237e 30%, #311b92 90%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        borderBottom: '2px solid #4a148c'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #fff 30%, #e3f2fd 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            <WorkIcon sx={{ fontSize: 28 }} />
            AI Job Matcher
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                onClick={() => navigate(item.path)}
                startIcon={item.icon}
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1rem',
                  textTransform: 'none',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  background: location.pathname === item.path 
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'transparent',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.3)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 