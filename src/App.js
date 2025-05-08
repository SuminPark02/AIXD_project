import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import JobRecommendations from './pages/JobRecommendations';
import Explainability from './pages/Explainability';
import { ProfileProvider } from './contexts/ProfileContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProfileProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recommendations" element={<JobRecommendations />} />
            <Route path="/explainability" element={<Explainability />} />
          </Routes>
        </Router>
      </ProfileProvider>
    </ThemeProvider>
  );
}

export default App;
