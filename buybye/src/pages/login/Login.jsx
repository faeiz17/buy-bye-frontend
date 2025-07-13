import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  Paper,
  Avatar,
  CircularProgress,
  Fade,
  Slide,
  Zoom,
  Grow,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  ArrowBack as ArrowBackIcon,
  ShoppingCart as CartIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ROUTES from '../../routes/routes';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error, isLoggedIn } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  // Animation states
  const [fadeIn, setFadeIn] = useState(false);
  const [slideUp, setSlideUp] = useState(false);
  const [logoRotate, setLogoRotate] = useState(false);

  // Refs for inputs
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  useEffect(() => {
    // If user is authenticated, redirect to homepage
    if (isLoggedIn) {
      navigate(ROUTES.HOMEPAGE);
      return;
    }

    // Start animations
    const timer1 = setTimeout(() => setFadeIn(true), 100);
    const timer2 = setTimeout(() => setSlideUp(true), 300);
    const timer3 = setTimeout(() => setLogoRotate(true), 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isLoggedIn, navigate]);

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Invalid email format';
    }
    return '';
  };

  // Password validation
  const validatePassword = (password) => {
    if (!password.trim()) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  };

  // Handle input change with validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, email: value }));
    setFormErrors(prev => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, password: value }));
    setFormErrors(prev => ({ ...prev, password: validatePassword(value) }));
  };

  // Shake animation for errors
  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  // Success animation
  const handleSuccess = () => {
    setLoginSuccess(true);
    setTimeout(() => {
      navigate(ROUTES.HOMEPAGE);
    }, 1500);
  };

  // Handle login process
  const handleLogin = async () => {
    // Validate all inputs
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setFormErrors({
      email: emailError,
      password: passwordError,
    });

    // Return if there are validation errors
    if (emailError || passwordError) {
      triggerShake();
      return;
    }

    try {
      await login(formData);
      handleSuccess();
    } catch (err) {
      console.error('Login failed:', err);
      triggerShake();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            <Zoom in={logoRotate} timeout={1000}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  mb: 2,
                  animation: logoRotate ? 'rotate 15s linear infinite' : 'none',
                  '@keyframes rotate': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                }}
              >
                <CartIcon sx={{ fontSize: 50, color: 'primary.main' }} />
              </Box>
            </Zoom>

            {/* App Name */}
            <Slide direction="up" in={slideUp} timeout={500}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: 'white',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                  mb: 1,
                }}
              >
                Buy Bye
              </Typography>
            </Slide>
          </Box>
        </Fade>

        {/* Login Form */}
        <Grow in={slideUp} timeout={800}>
          <Paper
            elevation={24}
            sx={{
              p: 4,
              borderRadius: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              transform: shake ? 'translateX(10px)' : 'translateX(0)',
              transition: 'transform 0.1s ease-in-out',
            }}
          >
            {/* Back to Home Button */}
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(ROUTES.HOMEPAGE)}
              sx={{
                mb: 2,
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
              variant="text"
            >
              Back to Home
            </Button>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                textAlign: 'center',
                mb: 1,
                color: 'text.primary',
              }}
            >
              Welcome Back
            </Typography>

            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                mb: 4,
                color: 'text.secondary',
              }}
            >
              Login to your account to continue shopping
          </Typography>

            {/* Error Alert */}
          {error && (
              <Alert
                severity="error"
                icon={<ErrorIcon />}
                sx={{ mb: 3, borderRadius: 2 }}
              >
              {error}
            </Alert>
          )}

            {/* Email Input */}
            <Box sx={{ mb: 3 }}>
            <TextField
                ref={emailInputRef}
                fullWidth
                label="Email Address"
              type="email"
                value={formData.email}
                onChange={handleEmailChange}
                onKeyPress={handleKeyPress}
                error={!!formErrors.email}
                helperText={formErrors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon
                        color={formErrors.email ? 'error' : 'primary'}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: formData.email && !formErrors.email && (
                    <InputAdornment position="end">
                      <CheckCircleIcon color="success" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Box>

            {/* Password Input */}
            <Box sx={{ mb: 3 }}>
            <TextField
                ref={passwordInputRef}
                fullWidth
              label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
                error={!!formErrors.password}
                helperText={formErrors.password}
              InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon
                        color={formErrors.password ? 'error' : 'primary'}
                      />
                    </InputAdornment>
                  ),
                endAdornment: (
                  <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        sx={{ color: 'primary.main' }}
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Box>

            {/* Forgot Password */}
            <Box sx={{ textAlign: 'right', mb: 3 }}>
            <Button 
              variant="text" 
              color="primary" 
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.04)',
                  },
                }}
              onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}
            >
              Forgot Password?
            </Button>
            </Box>

            {/* Login Button */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleLogin}
              disabled={loading || loginSuccess}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                },
                '&:disabled': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : loginSuccess ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon />
                  Login Successful!
                </Box>
              ) : (
                'Login'
              )}
            </Button>

            {/* Register Link */}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
            <Button
                  variant="text"
              color="primary"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    p: 0,
                    minWidth: 'auto',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      textDecoration: 'underline',
                    },
                  }}
                  onClick={() => navigate('/signup')}
                >
                  Register
            </Button>
              </Typography>
          </Box>
          </Paper>
        </Grow>
      </Container>
        </Box>
  );
};

export default Login;