// ShopDetail.jsx
import { useState, useEffect } from 'react';
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
  useTheme,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate, useParams } from 'react-router-dom';

// Animating components with framer-motion
const MotionBox = motion(Box);
const MotionGrid = motion(Grid);
const MotionContainer = motion(Container);
const MotionTypography = motion(Typography);

const ShopDetail = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { shopId } = useParams();
  const navigate = useNavigate();

  // Sample data - in a real app this would come from an API
  const shopData = {
    id: 1,
    name: 'Jalal Sons - Model Town Branch',
    rating: 4.8,
    address: 'Model Town, Main Boulevard, Lahore',
    banner: '/images/jsonshero.webp', // Replace with actual image
    logo: '/images/jalalsons.jpeg',
    description: 'A premium grocery store offering high-quality fresh produce, imported goods, and everyday essentials.',
    deliveryTime: '15-30 min',
    distance: '0.5 km'
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

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Box sx={{ 
      width: '100%', 
      bgcolor: 'rgba(250, 250, 252, 1)',
      minHeight: '100vh'
    }}>
      {/* Hero Section with Shop Banner */}
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        sx={{
          height: '240px',
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
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)'
            }
          }}
        >
          <ArrowBackIosNewRoundedIcon fontSize="small" />
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
        
        {/* Banner image */}
        <MotionBox
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          as="img"
          src={shopData.banner || "/images/jsonshero.webp"}
          alt={shopData.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
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
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            p: 3,
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
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
              border: '3px solid white'
            }}
          >
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
                  sx={{ fontWeight: 700, color: '#1E1E2F', mb: 1 }}
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
                    bgcolor: 'rgba(77, 33, 109, 0.08)', 
                    color: '#4D216D',
                    fontWeight: 500
                  }} 
                />
                <Chip 
                  icon={<LocationOnIcon fontSize="small" />} 
                  label={shopData.distance} 
                  sx={{ 
                    bgcolor: 'rgba(77, 33, 109, 0.08)', 
                    color: '#4D216D',
                    fontWeight: 500
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
          {/* Search bar */}
          <Box 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              bgcolor: 'white',
              borderRadius: 3,
              px: 2,
              py: 1,
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              width: { xs: '100%', md: '350px' }
            }}
          >
            <SearchRoundedIcon sx={{ color: '#999', mr: 1 }} />
            <InputBase
              placeholder="Search products..."
              sx={{ flexGrow: 1 }}
            />
          </Box>
          
          {/* Category chips */}
          <Box 
            sx={{ 
              display: 'flex',
              gap: 1,
              overflowX: 'auto',
              pb: 0.5,
              '::-webkit-scrollbar': {
                height: '4px'
              },
              '::-webkit-scrollbar-track': {
                bgcolor: 'rgba(0,0,0,0.05)'
              },
              '::-webkit-scrollbar-thumb': {
                bgcolor: 'rgba(77, 33, 109, 0.3)',
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
                  bgcolor: selectedCategory === category ? '#4D216D' : 'white',
                  color: selectedCategory === category ? 'white' : '#555',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  '&:hover': {
                    bgcolor: selectedCategory === category ? '#4D216D' : 'rgba(77, 33, 109, 0.1)'
                  },
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </Box>
        </MotionBox>
        
        {/* Products Grid */}
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{ 
            mb: 3,
            '.MuiTabs-indicator': {
              backgroundColor: '#4D216D',
              height: 3,
              borderRadius: '3px'
            },
            '.MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              minWidth: '100px',
              color: '#777',
              '&.Mui-selected': {
                color: '#4D216D'
              }
            }
          }}
        >
          <Tab label="Products" />
          <Tab label="About" />
          <Tab label="Reviews" />
        </Tabs>
        
        {tabValue === 0 && (
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
                />
              </Grid>
            ))}
          </MotionGrid>
        )}
        
        {tabValue === 1 && (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            sx={{ 
              bgcolor: 'white', 
              p: 3, 
              borderRadius: 3,
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
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#1E1E2F' }}>
                  Store Hours
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ color: '#555' }}>Monday - Friday</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>8:00 AM - 10:00 PM</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ color: '#555' }}>Saturday</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>9:00 AM - 11:00 PM</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#555' }}>Sunday</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>10:00 AM - 8:00 PM</Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#1E1E2F' }}>
                  Contact Information
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ color: '#555' }}>Phone</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>+92 300 1234567</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: '#555' }}>Email</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>contact@jalalsons.com</Typography>
                </Box>
              </Grid>
            </Grid>
          </MotionBox>
        )}
        
        {tabValue === 2 && (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            sx={{ 
              bgcolor: 'white', 
              p: 3, 
              borderRadius: 3,
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              mb: 6
            }}
          >
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#1E1E2F' }}>
              Customer Reviews
            </Typography>
            
            {[1, 2, 3].map((review) => (
              <Box key={review} sx={{ mb: 3, pb: 3, borderBottom: review < 3 ? '1px solid #eee' : 'none' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: '#f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 1.5,
                        fontWeight: 600,
                        color: '#4D216D'
                      }}
                    >
                      {`U${review}`}
                    </Box>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>User {review}</Typography>
                      <Typography variant="caption" sx={{ color: '#777' }}>2 days ago</Typography>
                    </Box>
                  </Box>
                  <Rating value={5 - (review - 1) * 0.5} readOnly size="small" />
                </Box>
                <Typography variant="body2" sx={{ mt: 1.5, color: '#555', lineHeight: 1.6 }}>
                  {review === 1 && "Great store with excellent product quality! The staff is friendly and the store is always clean and well-organized. Highly recommend their fresh produce."}
                  {review === 2 && "Good selection of products, but sometimes the prices are a bit high compared to other stores. The quality is consistently good though."}
                  {review === 3 && "Love shopping here. They have many imported items that I can't find elsewhere. The bakery section is amazing!"}
                </Typography>
              </Box>
            ))}
            
            <Button 
              variant="outlined" 
              sx={{ 
                mt: 2,
                color: '#4D216D',
                borderColor: '#4D216D',
                '&:hover': {
                  borderColor: '#4D216D',
                  bgcolor: 'rgba(77, 33, 109, 0.05)'
                }
              }}
            >
              Load More Reviews
            </Button>
          </MotionBox>
        )}
      </Container>
    </Box>
  );
};

// Product Card Component
const ProductCard = ({ product, variants, setHoveredProduct, hoveredProduct }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  return (
    <MotionBox
      variants={variants}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setHoveredProduct(product.id)}
      onHoverEnd={() => setHoveredProduct(null)}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        position: 'relative',
        bgcolor: 'white',
        boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Product image with favorite button */}
      <Box sx={{ position: 'relative', pt: '100%' }}>
        <Box
          component="img"
          src={product.image || '/images/product-placeholder.jpg'}
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
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            bgcolor: 'rgba(255,255,255,0.9)',
            width: 36,
            height: 36,
            '&:hover': {
              bgcolor: 'white'
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
              px: 1,
              borderRadius: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
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
              px: 1,
              borderRadius: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              {product.discount}% OFF
            </Box>
          )}
        </Box>
      </Box>
      
      {/* Product details */}
      <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 0.5, display: 'flex', alignItems: 'center' }}>
          <Chip 
            label={product.category} 
            size="small"
            sx={{ 
              height: 20, 
              fontSize: '0.65rem', 
              bgcolor: 'rgba(77, 33, 109, 0.08)', 
              color: '#4D216D',
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
        
        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 700, 
                color: '#4D216D',
                display: 'flex',
                alignItems: 'baseline'
              }}
            >
              ${product.price}
              <Typography component="span" variant="caption" sx={{ ml: 0.5, color: '#777', fontWeight: 400 }}>
                / {product.unit}
              </Typography>
            </Typography>
          </Box>
          
          <MotionBox
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconButton
              sx={{
                bgcolor: '#4D216D',
                color: 'white',
                width: 36,
                height: 36,
                '&:hover': {
                  bgcolor: '#632688'
                },
                transition: 'all 0.2s ease'
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: '1.1rem' }} />
            </IconButton>
          </MotionBox>
        </Box>
      </Box>
      
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
          bgcolor: 'rgba(77, 33, 109, 0.9)',
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
    </MotionBox>
  );
};

export default ShopDetail;