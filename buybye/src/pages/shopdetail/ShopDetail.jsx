// ShopDetail.jsx - Updated to match BBBolt's vendor-details functionality
import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Chip, 
  IconButton, 
  Button,
  useTheme,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  alpha,
  Snackbar,
  Alert,
  Drawer,
  List,
  ListItem,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Rating,
  Paper
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useLocation } from '../../context/LocationContext';
import { vendorApi, categoryApi, vendorProductApi } from '../../services/api';
import ROUTES from '../../routes/routes';

// Icons
import {
  FilterList as FilterIcon,
  Sort as SortIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  ShoppingCart as CartIcon,
  Clear as ClearIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  Check as CheckIcon,
  Store as StoreIcon,
  ArrowBack as ArrowBackIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Tag as TagIcon,
} from '@mui/icons-material';

// Animation components
const MotionCard = motion(Card);

// Sort options
const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'cheapest', label: 'Price: Low to High' },
  { value: 'expensive', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
];

const ShopDetail = () => {
  const { shopId } = useParams();
  
  // State management
  const [vendor, setVendor] = useState(null);
  const [vendorProducts, setVendorProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [sortBy, setSortBy] = useState('popular');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  
  // Hooks
  const theme = useTheme();
  const { getLocationParams } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { addToCart } = useCart();

  // Fetch vendor details and products
  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        setLoading(true);
        
        // Get vendor details
        const vendorResponse = await vendorApi.getVendorById(shopId);
        setVendor(vendorResponse.data);
        
        // Get categories for filtering
        const categoriesResponse = await categoryApi.getAllCategories();
        setCategories(categoriesResponse.data || []);
        
        // Get vendor products
        await fetchVendorProducts();
      } catch (error) {
        console.error('Error fetching vendor details:', error);
        setError('Failed to load vendor details');
      } finally {
        setLoading(false);
      }
    };

    if (shopId) {
      fetchVendorDetails();
    }
  }, [shopId]);
  
  // Fetch subcategories when category changes
  useEffect(() => {
    const fetchSubCategories = async () => {
      if (!selectedCategory) {
        setSubCategories([]);
        setSelectedSubCategory(null);
        return;
      }
      
      try {
        const response = await categoryApi.getSubCategoriesByCategory(selectedCategory);
        setSubCategories(response.data || []);
        setSelectedSubCategory(null); // Reset subcategory when category changes
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setSubCategories([]);
      }
    };

    fetchSubCategories();
  }, [selectedCategory]);
  
  // Refetch products when filters change
  useEffect(() => {
    if (vendor) {
      fetchVendorProducts();
    }
  }, [selectedCategory, selectedSubCategory, sortBy]);
  
  // Fetch vendor products with filters
  const fetchVendorProducts = async () => {
    try {
      const locParams = getLocationParams ? getLocationParams() : {};
      
      // Prepare params for API call
      const params = {
        ...locParams,
        vendorId: shopId,
      };
      
      // Add category filter if selected
      if (selectedCategory) {
        params.categoryId = selectedCategory;
      }
      
      // Add subcategory filter if selected
      if (selectedSubCategory) {
        params.subCategoryId = selectedSubCategory;
      }
      
      // Add sort parameter
      params.sortBy = sortBy;
      
      console.log('Fetching vendor products with params:', params);
      
      // Fetch vendor products
      const response = await vendorProductApi.getVendorProductsByFilters(params);
      
      console.log('Vendor products response:', response.data);
      
      if (response.data) {
        setVendorProducts(response.data);
      } else {
        setVendorProducts([]);
      }
    } catch (error) {
      console.error('Error fetching vendor products:', error);
      setVendorProducts([]);
    }
  };
  
  const handleRefresh = () => {
    fetchVendorProducts();
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSortBy('popular');
    setShowFilterDrawer(false);
  };
  
  // Utility: extract price from string or return number
  const extractPrice = (str) => {
    if (typeof str === 'number') return str;
    const m = String(str).match(/\d+/g);
    return m ? parseInt(m.join(''), 10) : 0;
  };

  // Handle add to cart
  const handleAddToCart = async (product) => {
    if (!isLoggedIn) {
      setSnackbar({
        open: true,
        message: 'Please login to add items to cart',
        severity: 'warning'
      });
      return;
    }

    try {
      await addToCart(product);
      setSnackbar({
        open: true,
        message: 'Item added to cart successfully!',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Failed to add item to cart',
        severity: 'error'
      });
    }
  };

  // Render product card
  const renderProductCard = (product, index) => {
    // Parse base price and calculate discounted price
    const basePrice = extractPrice(product.product?.price || 0);
    let finalPrice = basePrice;
    
    // Apply discount if available
    if (product.discountType && product.discountValue) {
      finalPrice = 
        product.discountType === 'percentage'
          ? basePrice * (1 - product.discountValue / 100)
          : Math.max(0, basePrice - product.discountValue);
    }
    
    // Calculate discount percentage for display
    const discountPercent = 
      basePrice > finalPrice
        ? Math.round(((basePrice - finalPrice) / basePrice) * 100)
        : 0;

    return (
      <MotionCard
        key={product._id}
        initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
            sx={{
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows[8],
          },
          transition: 'all 0.3s ease',
          height: '100%',
              display: 'flex',
          flexDirection: 'column',
        }}
        onClick={() => navigate(ROUTES.PRODUCT_DETAILS.replace(':productId', product._id))}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
                    component="img"
            height="200"
            image={product.product?.imageUrl || '/images/product-placeholder.jpg'}
            alt={product.product?.title || 'Product'}
            sx={{ objectFit: 'cover' }}
          />
          
          {/* Discount badge */}
          {discountPercent > 0 && (
                    <Box 
                      sx={{
                        position: 'absolute',
                top: 8,
                left: 8,
                backgroundColor: '#FF3366',
                        color: 'white',
                borderRadius: 1,
                px: 1,
                py: 0.5,
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              {discountPercent}% OFF
                    </Box>
                  )}

          {/* Add to cart button */}
          <IconButton
                    sx={{ 
              position: 'absolute',
              bottom: 8,
              right: 8,
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product);
            }}
          >
            <CartIcon />
          </IconButton>
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography 
            variant="h6" 
            component="h3" 
            sx={{ 
              fontWeight: 600, 
              mb: 1,
              fontSize: '1rem',
              lineHeight: 1.3,
            }}
          >
            {product.product?.title || 'Product'}
                    </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <TagIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
            <Typography variant="caption" color="text.secondary">
              {product.product?.category?.name?.replace(/_/g, ' ') || 'Category'}
                    </Typography>
                </Box>
                
          <Box sx={{ mt: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              <Typography 
                variant="h6" 
                  sx={{ 
                  fontWeight: 700, 
                  color: theme.palette.primary.main 
                }}
              >
                Rs. {finalPrice.toLocaleString()}
              </Typography>
              {basePrice > finalPrice && (
                <Typography 
                  variant="body2" 
                    sx={{ 
                    textDecoration: 'line-through',
                    color: 'text.secondary'
                  }}
                >
                  Rs. {basePrice.toLocaleString()}
                </Typography>
              )}
              </Box>
            </Box>
        </CardContent>
      </MotionCard>
    );
  };

  // Render loading state
  if (loading) {
    return (
            <Box 
              sx={{ 
                display: 'flex',
          flexDirection: 'column',
                alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress size={48} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading vendor details...
        </Typography>
            </Box>
    );
  }

  // Render error state
  if (error) {
    return (
            <Box 
              sx={{ 
                display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          p: 3,
        }}
      >
        <Typography variant="h6" color="error" gutterBottom>
          {error}
                  </Typography>
                      <Button 
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
        >
          Retry
                      </Button>
                    </Box>
    );
  }
  
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box
      sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          py: 2,
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton
              onClick={() => navigate(-1)}
              sx={{ color: 'white' }}
            >
              <ArrowBackIcon />
        </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {vendor?.name || 'Vendor Details'}
            </Typography>
          </Box>
        </Container>
        </Box>
        
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* Vendor Info Card */}
        <Paper
          sx={{ 
            p: 3,
            mb: 3,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.light, 0.05)} 100%)`,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              sx={{ 
                width: 64,
                height: 64,
                bgcolor: theme.palette.primary.main,
                mr: 2,
              }}
            >
              <StoreIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                {vendor?.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Rating value={4.8} readOnly size="small" />
                <Typography variant="body2" color="text.secondary">
                  (120 reviews)
            </Typography>
              </Box>
            </Box>
          </Box>
          
          {vendor?.location && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {vendor.location.formattedAddress}
      </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            {vendor?.phone && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <PhoneIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
                <Typography variant="body2">{vendor.phone}</Typography>
              </Box>
            )}
            {vendor?.email && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <EmailIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
                <Typography variant="body2">{vendor.email}</Typography>
              </Box>
            )}
            {vendor?.workingHours && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TimeIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
                <Typography variant="body2">{vendor.workingHours}</Typography>
              </Box>
            )}
            </Box>

          {vendor?.description && (
            <Typography variant="body2" color="text.secondary">
              {vendor.description}
              </Typography>
          )}
        </Paper>

        {/* Category Filters */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Products
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={() => setShowFilterDrawer(true)}
              >
                Filters
              </Button>
              <Button
                size="small"
                variant="outlined"
                startIcon={<SortIcon />}
                onClick={() => setShowFilterDrawer(true)}
              >
                {sortOptions.find(opt => opt.value === sortBy)?.label || 'Sort'}
              </Button>
              </Box>
                </Box>

          {/* Category Pills */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {categories.map((category) => (
              <Chip
                key={category._id}
                label={category.name.replace(/_/g, ' ')}
                variant={selectedCategory === category._id ? 'filled' : 'outlined'}
                color={selectedCategory === category._id ? 'primary' : 'default'}
                onClick={() => setSelectedCategory(
                  selectedCategory === category._id ? null : category._id
                )}
                sx={{ mb: 1 }}
              />
            ))}
              </Box>
            </Box>

        {/* Products Count */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {vendorProducts.length} {vendorProducts.length === 1 ? 'product' : 'products'} available
        </Typography>

        {/* Products Grid */}
        {vendorProducts.length === 0 ? (
          <Box
          sx={{
          display: 'flex',
              flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
              py: 8,
              px: 2,
            }}
          >
            <StoreIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No products available
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              This vendor doesn&apos;t have any products matching your filters.
            </Typography>
        </Box>
        ) : (
          <Grid container spacing={3}>
            {vendorProducts.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                {renderProductCard(product, index)}
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={showFilterDrawer}
        onClose={() => setShowFilterDrawer(false)}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 400 } }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Filters & Sort</Typography>
            <IconButton onClick={() => setShowFilterDrawer(false)}>
              <CloseIcon />
            </IconButton>
        </Box>
        
          <List>
            {/* Category Filter */}
            <ListItem>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  label="Category"
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name.replace(/_/g, ' ')}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>

            {/* Subcategory Filter */}
            {subCategories.length > 0 && (
              <ListItem>
                <FormControl fullWidth>
                  <InputLabel>Subcategory</InputLabel>
                  <Select
                    value={selectedSubCategory || ''}
                    onChange={(e) => setSelectedSubCategory(e.target.value || null)}
                    label="Subcategory"
                  >
                    <MenuItem value="">All Subcategories</MenuItem>
                    {subCategories.map((subCategory) => (
                      <MenuItem key={subCategory._id} value={subCategory._id}>
                        {subCategory.name.replace(/_/g, ' ')}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </ListItem>
            )}

            {/* Sort Options */}
            <ListItem>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="Sort By"
                >
                  {sortOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
          </List>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
      <Button 
              fullWidth
        variant="outlined" 
              onClick={resetFilters}
              startIcon={<ClearIcon />}
            >
              Reset
      </Button>
      <Button
              fullWidth
        variant="contained"
              onClick={() => setShowFilterDrawer(false)}
              startIcon={<CheckIcon />}
            >
              Apply
      </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ShopDetail;