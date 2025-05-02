import { Box, Container, Typography, Stack, useTheme, Chip, Button, Rating, IconButton } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import StarIcon from '@mui/icons-material/Star';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import DirectionsIcon from '@mui/icons-material/Directions';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '@/routes/routes';

// Animating components with framer-motion
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionStack = motion(Stack);
const MotionChip = motion(Chip);
const MotionButton = motion(Button);

const Products = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    // Simulate loading delay for animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const stores = [
    {
      id: 1,
      name: 'Jalal Sons - Model Town Branch',
      distance: '0.5 kms away',
      time: '15 - 20 mins',
      quality: 'High',
      rating: 4.8,
      ratingCount: 856,
      featured: true,
      promos: ['10% Off First Order', 'Free Delivery'],
      image: 'https://images.unsplash.com/photo-1604719312566-8912e9c8a213?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      name: 'Al-Fatah - Model Town Branch',
      distance: '0.7 kms away',
      time: '10 - 17 mins',
      quality: 'High',
      rating: 4.6,
      ratingCount: 721,
      featured: false,
      promos: ['Free Delivery on Orders Above 2000 PKR'],
      image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 3,
      name: 'Carrefour - DHA Phase 5',
      distance: '1.2 kms away',
      time: '20 - 30 mins',
      quality: 'Medium',
      rating: 4.2,
      ratingCount: 512,
      featured: false,
      promos: ['Buy 1 Get 1 on Selected Items'],
      image: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <Box sx={{ 
      width: '100%', 
      bgcolor: 'rgba(250, 250, 252, 1)',
      minHeight: '100vh',
      pb: 8
    }}>
      <Header isLoaded={isLoaded} />
      
      {/* Glass morphism container */}
      <Container maxWidth="md" sx={{ 
        py: 3, 
        mt: { xs: -3, md: -5 }, 
        position: 'relative',
        zIndex: 10
      }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          sx={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            boxShadow: '0 10px 40px rgba(31, 38, 135, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            p: { xs: 2, sm: 3 },
            pt: { xs: 3, sm: 4 }
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
            <MotionTypography 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              variant="h6" 
              sx={{
                fontWeight: 600,
                fontSize: { xs: '1.1rem', sm: '1.2rem' },
                color: '#2D2D3F',
                display: 'flex',
                alignItems: 'center',
                '&::before': {
                  content: '""',
                  display: 'block',
                  width: '4px',
                  height: '24px',
                  background: 'linear-gradient(180deg, #4D216D 0%, #7B3EB1 100%)',
                  marginRight: 2,
                  borderRadius: '4px'
                }
              }}
            >
              Trending stores near you
            </MotionTypography>
            
            <MotionChip
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              icon={<LocalMallOutlinedIcon />}
              label={`${stores.length} Stores`}
              variant="outlined"
              sx={{
                borderColor: 'rgba(77, 33, 109, 0.3)',
                color: '#4D216D',
                fontWeight: 500,
                display: { xs: 'none', sm: 'flex' }
              }}
            />
          </Stack>
          
          <MotionStack
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            spacing={3}
          >
            {stores.map((store, index) => (
              <StoreCard 
                key={store.id} 
                store={store} 
                index={index} 
                onStoreClick={() => navigate(ROUTES.SHOP_DETAILS.replace(':shopId', store.id.toString()))}
              />
            ))}
          </MotionStack>
          
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            sx={{ 
              mt: 4, 
              display: 'flex', 
              justifyContent: 'center'
            }}
          >
            <Button
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderColor: 'rgba(77, 33, 109, 0.5)',
                color: '#4D216D',
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#4D216D',
                  backgroundColor: 'rgba(77, 33, 109, 0.05)'
                }
              }}
            >
              View All Stores
            </Button>
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
};

const Header = ({ isLoaded }) => {
  return (
    <MotionBox 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      sx={{
        width: '100%',
        color: '#FFFFFF',
        overflow: 'hidden',
        height: { xs: '240px', sm: '280px', md: '320px' },
        position: 'relative'
      }}
    >
      {/* Gradient overlay */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(180deg, rgba(77, 33, 109, 0.3) 0%, rgba(77, 33, 109, 0.85) 100%)',
        zIndex: 1
      }} />
      
      {/* Image */}
      <MotionBox
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        component="img"
        src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        alt="Grocery Store"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      
      {/* Content */}
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        width: '90%',
        zIndex: 2
      }}>
        {/* Heading */}
        <MotionTypography 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          variant="h2" 
          align="center"
          sx={{
            fontWeight: 800,
            letterSpacing: { xs: 1, sm: 2 },
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            color: '#FFFFFF',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            textTransform: 'uppercase',
          }}
        >
          GROCERY STORE
        </MotionTypography>
        
        <MotionTypography 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          variant="subtitle1" 
          align="center"
          sx={{
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.9)',
            mt: 1,
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}
        >
          Discover the best grocery stores near your location
        </MotionTypography>
      </Box>
      
      {/* Decorative elements */}
      <MotionBox
        initial={{ width: '0%' }}
        animate={{ width: '40%' }}
        transition={{ delay: 0.7, duration: 0.8 }}
        sx={{
          position: 'absolute',
          height: '2px',
          background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%)',
          bottom: '35%',
          left: '10%',
          zIndex: 2,
          display: { xs: 'none', sm: 'block' }
        }}
      />
      <MotionBox
        initial={{ width: '0%' }}
        animate={{ width: '40%' }}
        transition={{ delay: 0.7, duration: 0.8 }}
        sx={{
          position: 'absolute',
          height: '2px',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)',
          bottom: '35%',
          right: '10%',
          zIndex: 2,
          display: { xs: 'none', sm: 'block' }
        }}
      />
    </MotionBox>
  );
};

const StoreCard = ({ store, index, onStoreClick }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.1
      }
    },
    hover: { 
      y: -5,
      boxShadow: '0 12px 30px rgba(77, 33, 109, 0.15)',
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <MotionBox
      variants={cardVariants}
      whileHover="hover"
      onClick={onStoreClick}
      sx={{
        display: 'flex',
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid rgba(232, 232, 232, 0.8)',
        backgroundColor: '#ffffff',
        position: 'relative',
        boxShadow: '0 6px 20px rgba(0,0,0,0.07)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        flexDirection: { xs: 'column', sm: 'row' }
      }}
    >
      {/* Featured tag */}
      {store.featured && (
        <MotionChip
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
          icon={<VerifiedUserIcon sx={{ fontSize: '0.9rem !important' }} />}
          label="Featured"
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            backgroundColor: 'rgba(77, 33, 109, 0.9)',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.7rem',
            zIndex: 2,
            borderRadius: '12px',
            px: 1,
            py: 0.5,
            '& .MuiChip-icon': {
              color: 'white'
            }
          }}
        />
      )}
      
      <Box sx={{
        display: 'flex',
        width: '100%',
        p: { xs: 2, sm: 2.5 },
        flexDirection: { xs: 'column', sm: 'row' }
      }}>
        {/* Store image with subtle animation */}
        <MotionBox 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          sx={{
            width: { xs: '100%', sm: '110px' },
            height: { xs: '150px', sm: '110px' },
            borderRadius: 3,
            overflow: 'hidden',
            mr: { xs: 0, sm: 3 },
            mb: { xs: 2, sm: 0 },
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            position: 'relative'
          }}
        >
          <Box
            component="img"
            src={store.image}
            alt={store.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
        </MotionBox>
        
        <Box sx={{ flexGrow: 1, pt: { xs: 0, sm: 0.5 } }}>
          <Stack 
            direction="row" 
            alignItems="flex-start" 
            justifyContent="space-between"
            spacing={1}
          >
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 700, 
                mb: 1.5, 
                fontSize: { xs: '1.1rem', sm: '1.15rem' },
                color: '#1E1E2F',
                lineHeight: 1.3
              }}
            >
              {store.name}
            </Typography>
            
            <DirectionsButton />
          </Stack>
          
          {/* Rating display */}
          <Stack 
            direction="row" 
            alignItems="center" 
            spacing={0.5} 
            sx={{ mb: 1.5 }}
          >
            <Rating 
              value={store.rating} 
              precision={0.1} 
              readOnly 
              size="small"
              icon={<StarIcon fontSize="inherit" sx={{ color: '#FFB100' }} />}
              emptyIcon={<StarIcon fontSize="inherit" sx={{ color: '#E0E0E0' }} />}
            />
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#555', 
                ml: 0.5, 
                fontWeight: 600, 
                fontSize: '0.85rem' 
              }}
            >
              {store.rating}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#777', 
                fontSize: '0.8rem',
                ml: 0.5
              }}
            >
              ({store.ratingCount})
            </Typography>
          </Stack>
          
          {/* Promo chips */}
          <Stack 
            direction="row" 
            spacing={1} 
            flexWrap="wrap"
            sx={{ mb: 1.5 }}
          >
            {store.promos.map((promo, i) => (
              <Chip
                key={i}
                label={promo}
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 214, 0, 0.15)',
                  border: '1px solid rgba(255, 214, 0, 0.3)',
                  color: '#9D6F00',
                  fontWeight: 500,
                  fontSize: '0.7rem',
                  mb: 0.5
                }}
              />
            ))}
          </Stack>
          
          <Stack spacing={1.2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <LocationOnOutlinedIcon sx={{ color: '#4D216D', fontSize: '1rem' }} />
              <Typography variant="body2" sx={{ color: '#555', fontSize: '0.9rem' }}>
                {store.distance}
              </Typography>
            </Stack>
            
            <Stack direction="row" alignItems="center" spacing={1}>
              <AccessTimeOutlinedIcon sx={{ color: '#4D216D', fontSize: '1rem' }} />
              <Typography variant="body2" sx={{ color: '#555', fontSize: '0.9rem' }}>
                {store.time}
              </Typography>
            </Stack>
            
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 0.5 }}>

           
            </Stack>
          </Stack>
        </Box>
      </Box>
      
      {/* Accent line with gradient */}
      <Box 
        sx={{
          width: { xs: '100%', sm: '6px' },
          height: { xs: '6px', sm: 'auto' },
          position: 'absolute',
          right: { xs: 0, sm: 0 },
          bottom: { xs: 0, sm: 'auto' },
          top: { xs: 'auto', sm: 0 },
          left: { xs: 0, sm: 'auto' },
          background: 'linear-gradient(to right, #4D216D, #7B3EB1)',
          borderTopRightRadius: { xs: 0, sm: 12 },
          borderBottomRightRadius: { xs: 0, sm: 12 },
          borderBottomLeftRadius: { xs: 12, sm: 0 },
          borderBottomRightRadius: { xs: 12, sm: 0 }
        }}
      />
    </MotionBox>
  );
};

const DirectionsButton = () => {
  return (
    <IconButton
      size="small"
      sx={{
        color: '#4D216D',
        bgcolor: 'rgba(77, 33, 109, 0.08)',
        width: 32,
        height: 32,
        '&:hover': {
          bgcolor: 'rgba(77, 33, 109, 0.15)',
        }
      }}
    >
      <DirectionsIcon fontSize="small" />
    </IconButton>
  );
};

const QualityBadge = ({ quality }) => {
  const getColor = () => {
    switch(quality.toLowerCase()) {
      case 'high':
        return {
          bg: 'linear-gradient(135deg, #4D216D 0%, #7B3EB1 100%)',
          shadow: 'rgba(77, 33, 109, 0.2)'
        };
      case 'medium':
        return {
          bg: 'linear-gradient(135deg, #FF9800 0%, #FFC107 100%)',
          shadow: 'rgba(255, 152, 0, 0.2)'
        };
      case 'low':
        return {
          bg: 'linear-gradient(135deg, #F44336 0%, #FF5722 100%)',
          shadow: 'rgba(244, 67, 54, 0.2)'
        };
      default:
        return {
          bg: 'linear-gradient(135deg, #4D216D 0%, #7B3EB1 100%)',
          shadow: 'rgba(77, 33, 109, 0.2)'
        };
    }
  };
  
  const colors = getColor();
  
 
};

export default Products;