import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          구직 추천 시스템
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            홈
          </Button>
          <Button color="inherit" component={RouterLink} to="/profile">
            프로필 작성
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 