import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Fade,
  Zoom,
  Slide,
  Grow,
} from '@mui/material';
import { CheckCircle, Error, Email } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import ROUTES from '../../routes/routes';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');
  const [fadeIn, setFadeIn] = useState(false);
  const [slideUp, setSlideUp] = useState(false);

  useEffect(() => {
    setFadeIn(true);
    setTimeout(() => setSlideUp(true), 300);
  }, []);

  useEffect(() => {
    const verifyEmailToken = async () => {
      if (!token) {
        setStatus('error');
        setMessage('No verification token provided');
        return;
      }

      try {
        await verifyEmail(token);
        setStatus('success');
        setMessage('Email verified successfully! Your account is now active.');
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Email verification failed. Please try again.');
      }
    };

    verifyEmailToken();
  }, [token, verifyEmail]);

  const handleGoHome = () => {
    navigate(ROUTES.HOMEPAGE);
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Zoom in={slideUp} timeout={500}>
              <CircularProgress size={60} sx={{ mb: 2 }} />
            </Zoom>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Verifying your email...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please wait while we verify your email address.
            </Typography>
          </Box>
        );

      case 'success':
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Zoom in={slideUp} timeout={500}>
              <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
            </Zoom>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Email Verified!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {message}
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleGoHome}
              sx={{ mr: 2 }}
            >
              Go to Home
            </Button>
          </Box>
        );

      case 'error':
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Zoom in={slideUp} timeout={500}>
              <Error sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
            </Zoom>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Verification Failed
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {message}
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleGoToLogin}
              sx={{ mr: 2 }}
            >
              Go to Login
            </Button>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        py: 4,
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 2px, transparent 2px)',
          backgroundSize: '50px 50px',
        }}
      />

      <Container maxWidth="sm">
        <Fade in={fadeIn} timeout={800}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            {/* Logo */}
            <Zoom in={slideUp} timeout={1000}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  mb: 2,
                }}
              >
                <Email sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>
            </Zoom>

            {/* App Name */}
            <Slide direction="up" in={slideUp} timeout={500}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: 'white',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                  mb: 1,
                }}
              >
                Email Verification
              </Typography>
            </Slide>
          </Box>
        </Fade>

        {/* Verification Content */}
        <Zoom in={slideUp} timeout={800}>
          <Paper
            elevation={24}
            sx={{
              p: 4,
              borderRadius: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            {renderContent()}
          </Paper>
        </Zoom>
      </Container>
    </Box>
  );
};

export default VerifyEmail; 