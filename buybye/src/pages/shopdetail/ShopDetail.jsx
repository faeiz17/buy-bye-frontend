// ShopDetail.jsx
import { useState, useEffect, useMemo, useCallback, Suspense, lazy } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Chip, 
  Rating, 
  Tabs, 
  Tab, 
  IconButton, 
  InputBase, 
  Button,
  Divider,
  Badge,
  Skeleton,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Avatar,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  alpha
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';

// Icons
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StarIcon from '@mui/icons-material/Star';
import FilterListIcon from '@mui/icons-material/FilterList';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import VerifiedIcon from '@mui/icons-material/Verified';

// Animating components with framer-motion
const MotionBox = motion(Box);
const MotionGrid = motion(Grid);
const MotionContainer = motion(Container);
const MotionTypography = motion(Typography);
const MotionCard = motion(Card);

/**
 * ShopDetail Component
 * Enhanced with modern UI elements and improved performance
 */
const ShopDetail = () => {
  // State management
  const [isLoaded, setIsLoaded] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  
  // Hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const { shopId } = useParams();
  const navigate = useNavigate();

  // Sample data - in a real app this would come from an API
  const shopData = {
    id: 1,
    name: 'Jalal Sons - Model Town Branch',
    rating: 4.8,
    reviewCount: 245,
    address: 'Model Town, Main Boulevard, Lahore',
    banner: '/images/jsonshero.webp',
    logo: '/images/jalalsons.jpeg',
    description: 'A premium grocery store offering high-quality fresh produce, imported goods, and everyday essentials.',
    deliveryTime: '15-30 min',
    distance: '0.5 km',
    verified: true
  };

  const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Beverages'];

  const products = [
    {
      id: 1,
      name: 'Organic Apples',
      price: 3.99,
      unit: 'kg',
      category: 'Fruits',
      rating: 4.5,
      image: '/images/jalalsons.jpeg',
      discount: 10,
      isNew: true
    },
    {
      id: 2,
      name: 'Fresh Milk',
      price: 2.49,
      unit: 'liter',
      category: 'Dairy',
      rating: 4.7,
      image: '/images/jalalsons.jpeg'
    },
    {
      id: 3,
      name: 'Whole Wheat Bread',
      price: 1.99,
      unit: 'loaf',
      category: 'Bakery',
      rating: 4.3,
      image: '/images/jalalsons.jpeg',
      isNew: true
    },
    {
      id: 4,
      name: 'Bell Peppers',
      price: 2.99,
      unit: 'kg',
      category: 'Vegetables',
      rating: 4.1,
      image: '/images/jalalsons.jpeg',
      discount: 15
    },
    {
      id: 5,
      name: 'Orange Juice',
      price: 3.49,
      unit: 'bottle',
      category: 'Beverages',
      rating: 4.6,
      image: '/images/jalalsons.jpeg'
    },
    {
      id: 6,
      name: 'Fresh Bananas',
      price: 1.79,
      unit: 'bunch',
      category: 'Fruits',
      rating: 4.4,
      image: '/images/jalalsons.jpeg'
    },
    {
      id: 7,
      name: 'Organic Yogurt',
      price: 2.99,
      unit: 'pack',
      category: 'Dairy',
      rating: 4.8,
      image: '/images/jalalsons.jpeg',
      isNew: true
    },
    {
      id: 8,
      name: 'Fresh Tomatoes',
      price: 2.49,
      unit: 'kg', 
      category: 'Vegetables',
      rating: 4.2, 
      image: '/images/jalalsons.jpeg'
    }
  ];

  // Memoized filtered products for better performance
  const filteredProducts = useMemo(() => {
    let filtered = selectedCategory === 'All' 
      ? products 
      : products.filter(product => product.category === selectedCategory);
    
    // Apply search filter if there's a query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [selectedCategory, products, searchQuery]);

  // Side effects
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Event handlers (memoized for better performance)
  const handleTabChange = useCallback((event, newValue) => {
    setTabValue(newValue);
  }, []);

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleAddToCart = useCallback((product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const pageTransition = {
    in: {
      opacity: 1,
      y: 0
    },
    out: {
      opacity: 0,
      y: 20
    }
  };

  return (
    <AnimatePresence mode="wait">
      <MotionBox
        key="shop-detail-page"
        initial="out"
        animate="in"
        exit="out"
        variants={pageTransition}
        sx={{ 
          width: '100%', 
          bgcolor: 'rgba(250, 250, 252, 1)',
          minHeight: '100vh'
        }}
      >
        {/* Hero Section with Shop Banner */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          sx={{
            height: { xs: '220px', md: '260px' },
            width: '100%',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Back button */}
          <IconButton 
            onClick={handleGoBack}
            sx={{
              position: 'absolute',
              top: 20,
              left: 20,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              zIndex: 10,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
                transform: 'scale(1.05)'
              }
            }}
          >
            <ArrowBackIosNewRoundedIcon fontSize="small" />
          </IconButton>
          
          {/* Cart button with count */}
          <IconButton 
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              zIndex: 10,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
                transform: 'scale(1.05)'
              }
            }}
          >
            <Badge badgeContent={cartItems.reduce((sum, item) => sum + item.quantity, 0)} color="secondary">
              <ShoppingCartIcon fontSize="small" />
            </Badge>
          </IconButton>
          
          {/* Gradient overlay */}
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(77, 33, 109, 0.1) 0%, rgba(77, 33, 109, 0.8) 100%)',
            zIndex: 1
          }} />
          
          {/* Banner image with skeleton loading */}
          {!isLoaded ? (
            <Skeleton 
              variant="rectangular" 
              width="100%" 
              height="100%" 
              animation="wave" 
              sx={{ position: 'absolute' }} 
            />
          ) : (
            <MotionBox
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              component="img"
              src={shopData.banner}
              alt={shopData.name}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          )}
        </MotionBox>
        
        {/* Shop info section with glass morphism */}
        <Container maxWidth="lg">
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            sx={{
              mt: -5,
              mb: 4,
              position: 'relative',
              zIndex: 10,
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              p: { xs: 2, md: 3 },
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              gap: 3
            }}
          >
            {/* Shop logo */}
            <MotionBox
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              sx={{
                width: { xs: '80px', md: '100px' },
                height: { xs: '80px', md: '100px' },
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
                border: '3px solid white',
                position: 'relative'
              }}
            >
              {!isLoaded ? (
                <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
              ) : (
                <>
                  <Box
                    component="img"
                    src={shopData.logo}
                    alt={shopData.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  {shopData.verified && (
                    <Box 
                      sx={{
                        position: 'absolute',
                        bottom: -8,
                        right: -8,
                        bgcolor: '#4D216D',
                        color: 'white',
                        borderRadius: '50%',
                        width: 24,
                        height: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      }}
                    >
                      <VerifiedIcon sx={{ fontSize: 16 }} />
                    </Box>
                  )}
                </>
              )}
            </MotionBox>
            
            {/* Shop details */}
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <Box>
                  <MotionTypography
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    variant="h5"
                    sx={{ 
                      fontWeight: 700, 
                      color: '#1E1E2F', 
                      mb: 1,
                      fontSize: { xs: '1.25rem', md: '1.5rem' } 
                    }}
                  >
                    {shopData.name}
                  </MotionTypography>
                  
                  <MotionBox
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                  >
                    <LocationOnIcon sx={{ fontSize: '1rem', color: '#4D216D', mr: 0.5 }} />
                    <Typography variant="body2" sx={{ color: '#555', fontSize: '0.9rem' }}>
                      {shopData.address}
                    </Typography>
                  </MotionBox>
                  
                  <MotionBox
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <Rating 
                      value={shopData.rating} 
                      readOnly 
                      precision={0.1}
                      size="small" 
                      emptyIcon={<StarIcon style={{ opacity: 0.55, color: '#bdbdbd' }} fontSize="inherit" />}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                      {shopData.rating}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      ({shopData.reviewCount} reviews)
                    </Typography>
                  </MotionBox>
                </Box>
                
                <MotionBox
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  sx={{ 
                    display: 'flex', 
                    gap: 1.5, 
                    mt: { xs: 2, md: 0 },
                    flexWrap: 'wrap'
                  }}
                >
                  <Chip 
                    icon={<LocalShippingOutlinedIcon fontSize="small" />} 
                    label={shopData.deliveryTime} 
                    sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      color: theme.palette.primary.main,
                      fontWeight: 500,
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.12),
                      }
                    }} 
                  />
                  <Chip 
                    icon={<LocationOnIcon fontSize="small" />} 
                    label={shopData.distance} 
                    sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      color: theme.palette.primary.main,
                      fontWeight: 500,
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.12),
                      }
                    }} 
                  />
                </MotionBox>
              </Box>
            </Box>
          </MotionBox>
          
          {/* Search and Filter Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            sx={{ 
              mb: 4,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              gap: 2
            }}
          >
            {/* Search bar with glass morphism */}
            <Box 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(8px)',
                borderRadius: '12px',
                px: 2,
                py: 1,
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                width: { xs: '100%', md: '350px' },
                border: '1px solid rgba(231, 231, 231, 0.8)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                },
                '&:focus-within': {
                  boxShadow: `0 0 0 2px Rs {alpha(theme.palette.primary.main, 0.25)}`,
                  borderColor: theme.palette.primary.main
                }
              }}
            >
              <SearchRoundedIcon sx={{ color: '#999', mr: 1 }} />
              <InputBase
                placeholder="Search products..."
                sx={{ flexGrow: 1 }}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Box>
            
            {/* Filter button (mobile) */}
            {isMobile && (
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                sx={{
                  borderRadius: '12px',
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  color: theme.palette.primary.main,
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.05)
                  }
                }}
              >
                Filter
              </Button>
            )}
            
            {/* Category chips - scrollable on mobile */}
            <Box 
              sx={{ 
                display: 'flex',
                gap: 1,
                overflowX: 'auto',
                pb: 0.5,
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                  display: { xs: 'none', md: 'block' },
                  height: '4px'
                },
                '&::-webkit-scrollbar-track': {
                  bgcolor: 'rgba(0,0,0,0.05)'
                },
                '&::-webkit-scrollbar-thumb': {
                  bgcolor: alpha(theme.palette.primary.main, 0.3),
                  borderRadius: '10px'
                }
              }}
            >
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => setSelectedCategory(category)}
                  sx={{
                    px: 1,
                    fontWeight: 500,
                    bgcolor: selectedCategory === category 
                      ? theme.palette.primary.main 
                      : 'rgba(255, 255, 255, 0.8)',
                    color: selectedCategory === category ? 'white' : '#555',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    border: '1px solid',
                    borderColor: selectedCategory === category 
                      ? theme.palette.primary.main 
                      : 'rgba(231, 231, 231, 0.8)',
                    backdropFilter: 'blur(8px)',
                    '&:hover': {
                      bgcolor: selectedCategory === category 
                        ? theme.palette.primary.dark 
                        : alpha(theme.palette.primary.main, 0.1)
                    },
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </Box>
          </MotionBox>
          
          {/* Tabs with pill style */}
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            sx={{ 
              mb: 3,
              '.MuiTabs-flexContainer': {
                gap: 2
              },
              '.MuiTabs-indicator': {
                display: 'none'
              },
              '.MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                minWidth: '100px',
                color: '#777',
                borderRadius: '50px',
                px: 3,
                '&.Mui-selected': {
                  color: 'white',
                  bgcolor: theme.palette.primary.main
                },
                transition: 'all 0.3s ease'
              }
            }}
          >
            <Tab label="Products" />
            <Tab label="About" />
            <Tab label="Reviews" />
          </Tabs>
          
          {/* Tab content with Suspense for lazy loading */}
          <Suspense fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress color="primary" />
            </Box>
          }>
            {tabValue === 0 && (
              <>
                {/* Products count */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {filteredProducts.length} products found
                  </Typography>
                  
                  {!isMobile && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ color: '#666' }}>Sort by:</Typography>
                      <Button 
                        size="small"
                        sx={{ 
                          textTransform: 'none',
                          fontWeight: 600,
                          color: theme.palette.primary.main
                        }}
                        endIcon={<FilterListIcon fontSize="small" />}
                      >
                        Price: Low to High
                      </Button>
                    </Box>
                  )}
                </Box>
                
                {/* Products Grid with AnimatePresence for smooth transitions */}
                <AnimatePresence>
                  {filteredProducts.length === 0 ? (
                    <MotionBox
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      sx={{ 
                        textAlign: 'center', 
                        py: 6, 
                        px: 2,
                        bgcolor: 'white',
                        borderRadius: '16px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                      }}
                    >
                      <Typography variant="h6" sx={{ color: '#666', mb: 2 }}>No products found</Typography>
                      <Typography variant="body2" sx={{ color: '#888' }}>
                        Try changing your search query or category filter
                      </Typography>
                    </MotionBox>
                  ) : (
                    <MotionGrid 
                      container 
                      spacing={3}
                      variants={containerVariants}
                      initial="hidden"
                      animate={isLoaded ? "visible" : "hidden"}
                      sx={{ mb: 6 }}
                    >
                      {filteredProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                          <ProductCard 
                            product={product} 
                            variants={itemVariants} 
                            setHoveredProduct={setHoveredProduct}
                            hoveredProduct={hoveredProduct}
                            onAddToCart={handleAddToCart}
                            theme={theme}
                          />
                        </Grid>
                      ))}
                    </MotionGrid>
                  )}
                </AnimatePresence>
              </>
            )}
            
            {tabValue === 1 && <AboutTab shopData={shopData} />}
            {tabValue === 2 && <ReviewsTab shopData={shopData} />}
          </Suspense>
        </Container>
      </MotionBox>
    </AnimatePresence>
  );
};

/**
 * Enhanced Product Card Component
 * Using Material-UI Card with Framer Motion for animations
 */
const ProductCard = ({ product, variants, setHoveredProduct, hoveredProduct, onAddToCart, theme }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };
  
  return (
    <MotionCard
      variants={variants}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setHoveredProduct(product.id)}
      onHoverEnd={() => setHoveredProduct(null)}
      sx={{
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: hoveredProduct === product.id 
          ? '0 12px 28px rgba(0,0,0,0.1)' 
          : '0 6px 20px rgba(0,0,0,0.06)',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
    >
      {/* Product image */}
      <Box sx={{ position: 'relative', pt: '100%' }}>
        <CardMedia
          component="img"
          image={product.image || '/images/product-placeholder.jpg'}
          alt={product.name}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease-in-out',
            transform: hoveredProduct === product.id ? 'scale(1.08)' : 'scale(1)'
          }}
        />
        
        {/* Favorite button */}
        <IconButton
          onClick={handleFavoriteClick}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            bgcolor: 'rgba(255,255,255,0.9)',
            width: 36,
            height: 36,
            backdropFilter: 'blur(4px)',
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: 'white',
              transform: 'scale(1.1)'
            }
          }}
        >
          {isFavorite ? (
            <FavoriteIcon sx={{ color: '#FF3366', fontSize: '1.2rem' }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: '#555', fontSize: '1.2rem' }} />
          )}
        </IconButton>
        
        {/* Badges for new or discount */}
        <Box sx={{ position: 'absolute', top: 10, left: 10, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {product.isNew && (
            <Box sx={{
              bgcolor: '#1EB980',
              color: 'white',
              fontSize: '0.7rem',
              fontWeight: 600,
              py: 0.5,
              px: 1.5,
              borderRadius: '50px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}>
              NEW
            </Box>
          )}
          
          {product.discount && (
            <Box sx={{
              bgcolor: '#FF3366',
              color: 'white',
              fontSize: '0.7rem',
              fontWeight: 600,
              py: 0.5,
              px: 1.5,
              borderRadius: '50px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              {product.discount}% OFF
            </Box>
          )}
        </Box>
      </Box>
      
      {/* Product details */}
      <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 0.5, display: 'flex', alignItems: 'center' }}>
          <Chip 
            label={product.category} 
            size="small"
            sx={{ 
              height: 20, 
              fontSize: '0.65rem', 
              bgcolor: alpha(theme.palette.primary.main, 0.08),
              color: theme.palette.primary.main,
              fontWeight: 500
            }} 
          />
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
            <StarIcon sx={{ color: '#FFB100', fontSize: '0.8rem', mr: 0.3 }} />
            <Typography variant="caption" sx={{ fontWeight: 600, color: '#555' }}>
              {product.rating}
            </Typography>
          </Box>
        </Box>
        
        <Typography 
          variant="subtitle1"
          sx={{ 
            fontWeight: 600, 
            mt: 0.5,
            fontSize: '0.95rem',
            lineHeight: 1.3,
            mb: 1,
            color: '#1E1E2F'
          }}
        >
          {product.name}
        </Typography>
        
        <CardActions sx={{ mt: 'auto', p: 0, pt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 700, 
                color: theme.palette.primary.main,
                display: 'flex',
                alignItems: 'baseline'
              }}
            >
              Rs {product.price}
              <Typography component="span" variant="caption" sx={{ ml: 0.5, color: '#777', fontWeight: 400 }}>
                / {product.unit}
              </Typography>
            </Typography>
          </Box>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconButton
              onClick={handleAddToCart}
              sx={{
                bgcolor: theme.palette.primary.main,
                color: 'white',
                width: 36,
                height: 36,
                '&:hover': {
                  bgcolor: theme.palette.primary.dark
                },
                transition: 'all 0.2s ease'
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: '1.1rem' }} />
            </IconButton>
          </motion.div>
        </CardActions>
      </CardContent>
      
      {/* Quick view on hover */}
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: hoveredProduct === product.id ? 1 : 0,
          y: hoveredProduct === product.id ? 0 : 10
        }}
        transition={{ duration: 0.2 }}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: alpha(theme.palette.primary.main, 0.9),
          backdropFilter: 'blur(4px)',
          color: 'white',
          py: 1.2,
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '0.85rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1
        }}
      >
        <InfoOutlinedIcon sx={{ fontSize: '1rem' }} />
        Quick View
      </MotionBox>
    </MotionCard>
  );
};

/**
 * About Tab Component
 * @param {Object} props - Component props
 * @param {Object} props.shopData - Shop information
 */
const AboutTab = ({ shopData }) => {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      sx={{ 
        bgcolor: 'white', 
        p: { xs: 2, md: 3 }, 
        borderRadius: '16px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        mb: 6
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1E1E2F' }}>
        About {shopData.name}
      </Typography>
      <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.7 }}>
        {shopData.description}
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
            <AccessTimeIcon sx={{ color: '#666', mr: 2, mt: 0.3 }} />
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#1E1E2F' }}>
                Store Hours
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#555', mr: 4 }}>Monday - Friday</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>8:00 AM - 10:00 PM</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#555', mr: 4 }}>Saturday</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>9:00 AM - 11:00 PM</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: '#555', mr: 4 }}>Sunday</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>10:00 AM - 8:00 PM</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <CallIcon sx={{ color: '#666', mr: 2, mt: 0.3 }} />
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#1E1E2F' }}>
                Contact Information
              </Typography>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#555' }}>Phone</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>+92 300 1234567</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 2 }}>
                <EmailIcon sx={{ color: '#666', mr: 2, fontSize: '1.2rem' }} />
                <Box>
                  <Typography variant="body2" sx={{ color: '#555' }}>Email</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>contact@jalalsons.com</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      
      {/* Map Preview */}
      <Box sx={{ mt: 4, borderRadius: '12px', overflow: 'hidden', height: '250px', position: 'relative' }}>
        <Box
          component="img"
          src="/images/map-placeholder.jpg"
          alt="Store location map"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(0,0,0,0.1)',
          backdropFilter: 'blur(2px)'
        }}>
          <Button 
            variant="contained" 
            color="primary"
            sx={{ 
              borderRadius: '50px',
              px: 3,
              py: 1,
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            View on Map
          </Button>
        </Box>
      </Box>
    </MotionBox>
  );
};

/**
 * Reviews Tab Component
 * @param {Object} props - Component props
 * @param {Object} props.shopData - Shop information
 */
const ReviewsTab = ({ shopData }) => {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      sx={{ 
        bgcolor: 'white', 
        p: { xs: 2, md: 3 }, 
        borderRadius: '16px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        mb: 6
      }}
    >
      {/* Reviews summary */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
        <Box sx={{ textAlign: 'center', minWidth: '160px' }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#1E1E2F' }}>
            {shopData.rating}
          </Typography>
          <Rating 
            value={shopData.rating} 
            readOnly 
            precision={0.1}
            size="medium"
            sx={{ mt: 1 }}
          />
          <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
            Based on {shopData.reviewCount} reviews
          </Typography>
        </Box>
        
        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
        <Divider sx={{ display: { xs: 'block', md: 'none' } }} />
        
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Rating Breakdown
          </Typography>
          {[5, 4, 3, 2, 1].map((star) => (
            <Box key={star} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" sx={{ minWidth: '30px' }}>
                {star}
              </Typography>
              <StarIcon sx={{ color: '#FFB100', fontSize: '0.9rem', mx: 0.5 }} />
              <Box sx={{ flexGrow: 1, bgcolor: '#f0f0f0', height: 8, borderRadius: 4, position: 'relative', overflow: 'hidden', mx: 1 }}>
                <Box sx={{ 
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  bgcolor: star >= 4 ? '#1EB980' : star >= 3 ? '#FFB100' : '#FF3366',
                  width: `Rs {star === 5 ? 65 : star === 4 ? 20 : star === 3 ? 10 : star === 2 ? 3 : 2}%`,
                  borderRadius: 4
                }} />
              </Box>
              <Typography variant="body2" sx={{ minWidth: '40px', color: '#666' }}>
                {star === 5 ? '65%' : star === 4 ? '20%' : star === 3 ? '10%' : star === 2 ? '3%' : '2%'}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600, color: '#1E1E2F' }}>
        Customer Reviews
      </Typography>
      
      {[1, 2, 3].map((review) => (
        <MotionBox 
          key={review}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: review * 0.1 }}
          sx={{ 
            mb: 3, 
            pb: 3, 
            borderBottom: review < 3 ? '1px solid #eee' : 'none',
            '&:hover': {
              bgcolor: 'rgba(0,0,0,0.01)'
            }
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: review === 1 ? '#4D216D' : review === 2 ? '#1EB980' : '#FFB100',
                  fontWeight: 600,
                  mr: 1.5
                }}
              >
                {`URs {review}`}
              </Avatar>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>User {review}</Typography>
                <Typography variant="caption" sx={{ color: '#777' }}>2 days ago</Typography>
              </Box>
            </Box>
            <Rating value={5 - (review - 1) * 0.5} readOnly size="small" />
          </Box>
          <Typography variant="body2" sx={{ mt: 1.5, color: '#555', lineHeight: 1.6, pl: 7 }}>
            {review === 1 && "Great store with excellent product quality! The staff is friendly and the store is always clean and well-organized. Highly recommend their fresh produce."}
            {review === 2 && "Good selection of products, but sometimes the prices are a bit high compared to other stores. The quality is consistently good though."}
            {review === 3 && "Love shopping here. They have many imported items that I can't find elsewhere. The bakery section is amazing!"}
          </Typography>
        </MotionBox>
      ))}
      
      <Button 
        variant="outlined" 
        sx={{ 
          mt: 2,
          color: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
          borderRadius: '50px',
          px: 3,
          textTransform: 'none',
          fontWeight: 600,
          '&:hover': {
            borderColor: theme.palette.primary.main,
            bgcolor: alpha(theme.palette.primary.main, 0.05)
          }
        }}
      >
        Load More Reviews
      </Button>
      
      {/* Add review button */}
      <Button
        variant="contained"
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          borderRadius: '50px',
          px: 3,
          py: 1.2,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          zIndex: 100
        }}
      >
        Write a Review
      </Button>
    </MotionBox>
  );
};

export default ShopDetail;