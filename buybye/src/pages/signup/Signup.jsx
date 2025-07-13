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
  CircularProgress,
  Fade,
  Slide,
  Zoom,
  Grow,
  Grid,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  ArrowBack as ArrowBackIcon,
  ShoppingCart as CartIcon,
  MyLocation as MyLocationIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ROUTES from '../../routes/routes';

const Signup = () => {
  const navigate = useNavigate();
  const { register, loading, error, isLoggedIn } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
  });
  const [location, setLocation] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
  });
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  // Animation states
  const [fadeIn, setFadeIn] = useState(false);
  const [slideUp, setSlideUp] = useState(false);
  const [logoRotate, setLogoRotate] = useState(false);

  // Refs for inputs
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const addressInputRef = useRef(null);

  // Auto-detect location on component mount
  useEffect(() => {
    detectCurrentLocation();
  }, []);

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

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) {
      return 'Full name is required';
    }
    if (name.trim().length < 3) {
      return 'Name should be at least 3 characters';
    }
    return '';
  };

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

  const validatePhone = (phone) => {
    // Pakistani phone number regex (allows +92 or 0 prefix)
    const pakPhoneRegex = /^(\+92|0)[0-9]{10}$/;
    if (!phone.trim()) {
      return 'Phone number is required';
    }
    if (!pakPhoneRegex.test(phone)) {
      return 'Invalid Pakistani phone format (e.g., +923001234567 or 03001234567)';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (!password.trim()) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    // Check for complexity (optional)
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    if (!hasUpperCase || !hasNumber) {
      return 'Password must contain at least one uppercase letter and one number';
    }
    return '';
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (!confirmPassword.trim()) {
      return 'Please confirm your password';
    }
    if (confirmPassword !== formData.password) {
      return 'Passwords do not match';
    }
    return '';
  };

  const validateAddress = (address) => {
    if (!address.trim() || !location) {
      return 'Address and location are required';
    }
    if (address.trim().length < 10) {
      return 'Please provide a complete address';
    }
    return '';
  };

  // Handle input change with validation
  const handleNameChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, name: value }));
    setFormErrors(prev => ({ ...prev, name: validateName(value) }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, email: value }));
    setFormErrors(prev => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, phone: value }));
    setFormErrors(prev => ({ ...prev, phone: validatePhone(value) }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, password: value }));
    setFormErrors(prev => ({ 
      ...prev, 
      password: validatePassword(value),
      confirmPassword: formData.confirmPassword ? validateConfirmPassword(formData.confirmPassword) : ''
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, confirmPassword: value }));
    setFormErrors(prev => ({ ...prev, confirmPassword: validateConfirmPassword(value) }));
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, address: value }));
    setFormErrors(prev => ({ ...prev, address: validateAddress(value) }));
  };

  // Remove role change handler since we don't need role selection

  // Detect current location
  const detectCurrentLocation = async () => {
    setIsDetectingLocation(true);
    try {
      if (navigator.geolocation) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000,
          });
        });

        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        
        // Use reverse geocoding to get address
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        
        if (data.results && data.results[0]) {
          const formattedAddress = data.results[0].formatted_address;
          setFormData(prev => ({ ...prev, address: formattedAddress }));
          setFormErrors(prev => ({ ...prev, address: validateAddress(formattedAddress) }));
        }
      } else {
        setFormErrors(prev => ({ ...prev, address: 'Geolocation is not supported by this browser' }));
      }
    } catch (error) {
      console.error('Error getting location:', error);
      setFormErrors(prev => ({ ...prev, address: 'Could not detect location automatically' }));
    } finally {
      setIsDetectingLocation(false);
    }
  };

  // Shake animation for errors
  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  // Success animation
  const handleSuccess = (verificationUrl) => {
    setRegisterSuccess(true);
    // Store verification URL for display
    if (verificationUrl) {
      localStorage.setItem('verificationUrl', verificationUrl);
    }
    setTimeout(() => {
      navigate(ROUTES.HOMEPAGE);
    }, 3000);
  };

  // Handle register process
  const handleRegister = async () => {
    // Validate all inputs
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword);
    const addressError = validateAddress(formData.address);

    setFormErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
      address: addressError,
    });

    // Return if there are validation errors
    if (nameError || emailError || phoneError || passwordError || confirmPasswordError || addressError) {
      triggerShake();
      return;
    }

    try {
      // Prepare payload matching BBBolt structure
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        latitude: location?.latitude,
        longitude: location?.longitude,
      };

      const response = await register(userData);
      handleSuccess(response.verificationUrl);
    } catch (err) {
      console.error('Registration failed:', err);
      triggerShake();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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

      <Container maxWidth="md">
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

        {/* Register Form */}
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
              Create Account
            </Typography>

            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                mb: 4,
                color: 'text.secondary',
              }}
            >
              Join us to start shopping with the best deals
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

            <Grid container spacing={3}>
              {/* Name Input */}
              <Grid item xs={12} sm={6}>
            <TextField
                  ref={nameInputRef}
                  fullWidth
              label="Full Name"
                  value={formData.name}
                  onChange={handleNameChange}
                  onKeyPress={handleKeyPress}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon
                          color={formErrors.name ? 'error' : 'primary'}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: formData.name && !formErrors.name && (
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
              </Grid>

              {/* Email Input */}
              <Grid item xs={12} sm={6}>
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
              </Grid>

              {/* Phone Input */}
              <Grid item xs={12} sm={6}>
            <TextField
                  ref={phoneInputRef}
              fullWidth
                  label="Phone Number"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  onKeyPress={handleKeyPress}
                  error={!!formErrors.phone}
                  helperText={formErrors.phone}
                  placeholder="+923001234567 or 03001234567"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon
                          color={formErrors.phone ? 'error' : 'primary'}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: formData.phone && !formErrors.phone && (
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
              </Grid>



              {/* Password Input */}
              <Grid item xs={12} sm={6}>
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
              </Grid>

              {/* Confirm Password Input */}
              <Grid item xs={12} sm={6}>
            <TextField
                  ref={confirmPasswordInputRef}
              fullWidth
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  onKeyPress={handleKeyPress}
                  error={!!formErrors.confirmPassword}
                  helperText={formErrors.confirmPassword}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon
                          color={formErrors.confirmPassword ? 'error' : 'primary'}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={toggleConfirmPasswordVisibility}
                          edge="end"
                          sx={{ color: 'primary.main' }}
                        >
                          {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
              </Grid>

              {/* Address Input */}
              <Grid item xs={12}>
            <TextField
                  ref={addressInputRef}
              fullWidth
                  label="Address"
                  multiline
                  rows={3}
                  value={formData.address}
                  onChange={handleAddressChange}
                  onKeyPress={handleKeyPress}
                  error={!!formErrors.address}
                  helperText={formErrors.address}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationIcon
                          color={formErrors.address ? 'error' : 'primary'}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={detectCurrentLocation}
                          disabled={isDetectingLocation}
                          sx={{ color: 'primary.main' }}
                        >
                          {isDetectingLocation ? (
                            <CircularProgress size={20} />
                          ) : (
                            <MyLocationIcon />
                          )}
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
              </Grid>
            </Grid>

            {/* Register Button */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleRegister}
              disabled={loading || registerSuccess}
              sx={{
                py: 1.5,
                mt: 3,
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
              ) : registerSuccess ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon />
                  Registration Successful!
                </Box>
              ) : (
                'Create Account'
              )}
            </Button>

            {/* Login Link */}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
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
                  onClick={() => navigate('/login')}
                >
                  Login
            </Button>
          </Typography>
          </Box>
          </Paper>
        </Grow>
      </Container>
        </Box>
  );
};

export default Signup;
