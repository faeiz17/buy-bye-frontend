import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  IconButton,
  useTheme,
  CircularProgress,
  Alert,
  Paper,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Avatar,
  Badge,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLocation } from '../../context/LocationContext';
import { useAuth } from '../../context/AuthContext';
import { categoryApi } from '../../services/api';
import ROUTES from '../../routes/routes';

// Icons
import {
  ArrowBack as ArrowBackIcon,
  LocationOn as LocationIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  ShoppingCart as CartIcon,
  Clear as ClearIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  Check as CheckIcon,
  Store as StoreIcon,
  Category as CategoryIcon,
  TrendingUp as TrendingIcon,
  Package as PackageIcon,
  Tag as TagIcon,
  Delete as DeleteIcon,
  ChevronDown as ChevronDownIcon,
  ArrowUpDown as ArrowUpDownIcon,
} from '@mui/icons-material';

// Animation components
const MotionCard = motion(Card);
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

// Sort options
const sortOptions = [
  { value: 'nearest', label: 'Nearest First' },
  { value: 'farthest', label: 'Farthest First' },
  { value: 'cheapest', label: 'Price: Low to High' },
  { value: 'expensive', label: 'Price: High to Low' },
];

// Radius options
const radiusOptions = [
  { value: 1, label: '1 km' },
  { value: 3, label: '3 km' },
  { value: 5, label: '5 km' },
  { value: 10, label: '10 km' },
  { value: 15, label: '15 km' },
  { value: 20, label: '20 km' },
  { value: 25, label: '25 km' },
  { value: 50, label: '50 km' },
];

const RationPacks = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { location, getCurrentLocation } = useLocation();
  const { isLoggedIn } = useAuth();

  // State management
  const [step, setStep] = useState('categories'); // 'categories', 'subcategories', 'products'
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Filter states
  const [selectedRadius, setSelectedRadius] = useState(5);
  const [sortBy, setSortBy] = useState('nearest');
  const [showRadiusOptions, setShowRadiusOptions] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);

  // Load categories and get location when component mounts
  useEffect(() => {
    fetchCategories();
    getCurrentLocation();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await categoryApi.getAllCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    setLoading(true);
    try {
      const response = await categoryApi.getSubCategoriesByCategory(categoryId);
      setSubcategories(response.data || []);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async (subcategoryId) => {
    setLoading(true);
    try {
      const response = await categoryApi.getProductsBySubCategory(subcategoryId);
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    fetchSubcategories(category._id);
    setStep('subcategories');
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    fetchProducts(subcategory._id);
    setStep('products');
  };

  const toggleProductSelection = (product) => {
    const isSelected = selectedProducts.some(p => p._id === product._id);
    
    if (isSelected) {
      setSelectedProducts(selectedProducts.filter(p => p._id !== product._id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleGoBack = () => {
    if (step === 'subcategories') {
      setStep('categories');
      setSelectedCategory(null);
    } else if (step === 'products') {
      setStep('subcategories');
      setSelectedSubcategory(null);
    }
  };

  const handleCreateCustomPack = () => {
    if (selectedProducts.length === 0) {
      alert('Please select at least one product for your ration pack');
      return;
    }

    const productTitles = selectedProducts.map(product => product.title);
    
    navigate(ROUTES.RATION_PACK_DETAILS, {
      state: { 
        selectedItems: productTitles,
        productIds: selectedProducts.map(p => p._id),
        radius: selectedRadius,
        sortBy: sortBy
      },
    });
  };

  const removeProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p._id !== productId));
  };

  // Render filters header
  const renderFiltersHeader = () => (
    <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Search Filters
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<FilterIcon />}
            onClick={() => setShowRadiusOptions(!showRadiusOptions)}
          >
            {radiusOptions.find(opt => opt.value === selectedRadius)?.label || 'Radius'}
          </Button>
          <Button
            size="small"
            variant="outlined"
            startIcon={<SortIcon />}
            onClick={() => setShowSortOptions(!showSortOptions)}
          >
            {sortOptions.find(opt => opt.value === sortBy)?.label || 'Sort'}
          </Button>
        </Box>
      </Box>

      <AnimatePresence>
        {showRadiusOptions && (
          <MotionBox
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            sx={{ mb: 2 }}
          >
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Search Radius
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {radiusOptions.map((option) => (
                <Chip
                  key={option.value}
                  label={option.label}
                  variant={selectedRadius === option.value ? 'filled' : 'outlined'}
                  color={selectedRadius === option.value ? 'primary' : 'default'}
                  onClick={() => setSelectedRadius(option.value)}
                  sx={{ mb: 1 }}
                />
              ))}
            </Box>
          </MotionBox>
        )}

        {showSortOptions && (
          <MotionBox
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Sort By
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {sortOptions.map((option) => (
                <Chip
                  key={option.value}
                  label={option.label}
                  variant={sortBy === option.value ? 'filled' : 'outlined'}
                  color={sortBy === option.value ? 'primary' : 'default'}
                  onClick={() => setSortBy(option.value)}
                  sx={{ mb: 1 }}
                />
              ))}
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>
    </Paper>
  );

  // Render selected products list
  const renderSelectedProductsList = () => (
    <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <PackageIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Your Ration Pack
        </Typography>
        <Badge badgeContent={selectedProducts.length} color="primary" sx={{ ml: 1 }} />
      </Box>
      
      {selectedProducts.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
          No products selected yet. Choose products from the categories below.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {selectedProducts.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 60, height: 60, borderRadius: 1, mr: 2 }}
                  image={item.imageUrl || '/images/product-placeholder.jpg'}
                  alt={item.title}
                />
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography variant="body2" noWrap>
                    {item.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Rs {item.price}
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  onClick={() => removeProduct(item._id)}
                  sx={{ color: 'error.main' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  );

  // Render categories
  const renderCategories = () => (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <PackageIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Select a Category
        </Typography>
      </Box>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category._id}>
              <MotionCard
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                sx={{ cursor: 'pointer', height: '100%' }}
                onClick={() => handleCategorySelect(category)}
              >
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: 'primary.main',
                    }}
                  >
                    <CategoryIcon />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {category.name.replace(/_/g, ' ')}
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  );

  // Render subcategories
  const renderSubcategories = () => (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handleGoBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <PackageIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {selectedCategory?.name.replace(/_/g, ' ')}: Select Subcategory
        </Typography>
      </Box>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {subcategories.map((subcategory) => (
            <Grid item xs={12} sm={6} md={4} key={subcategory._id}>
              <MotionCard
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                sx={{ cursor: 'pointer', height: '100%' }}
                onClick={() => handleSubcategorySelect(subcategory)}
              >
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: 'secondary.main',
                    }}
                  >
                    <TagIcon />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {subcategory.name.replace(/_/g, ' ')}
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  );

  // Render products
  const renderProducts = () => (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handleGoBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <PackageIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {selectedSubcategory?.name.replace(/_/g, ' ')}: Select Products
        </Typography>
      </Box>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => {
            const isSelected = selectedProducts.some(p => p._id === product._id);
            return (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <MotionCard
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  sx={{
                    cursor: 'pointer',
                    height: '100%',
                    border: isSelected ? 2 : 1,
                    borderColor: isSelected ? 'primary.main' : 'divider',
                  }}
                  onClick={() => toggleProductSelection(product)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.imageUrl || '/images/product-placeholder.jpg'}
                    alt={product.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {product.title}
                    </Typography>
                    <Typography variant="body1" color="primary" sx={{ fontWeight: 600 }}>
                      Rs {product.price}
                    </Typography>
                    {isSelected && (
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                        <CheckIcon color="primary" />
                      </Box>
                    )}
                  </CardContent>
                </MotionCard>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Paper>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          py: 4,
          px: 3,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PackageIcon sx={{ fontSize: 32, mr: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Ration Packs
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationIcon sx={{ mr: 1 }} />
            <Typography variant="body1">
              {location ? 'Using your current location' : 'Location not available'}
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Progress Stepper */}
        <Box sx={{ mb: 4 }}>
          <Stepper activeStep={step === 'categories' ? 0 : step === 'subcategories' ? 1 : 2}>
            <Step>
              <StepLabel>Categories</StepLabel>
            </Step>
            <Step>
              <StepLabel>Subcategories</StepLabel>
            </Step>
            <Step>
              <StepLabel>Products</StepLabel>
            </Step>
          </Stepper>
        </Box>

        {renderFiltersHeader()}
        {renderSelectedProductsList()}

        {/* Main Content */}
        <Box sx={{ mb: 4 }}>
          {step === 'categories' && renderCategories()}
          {step === 'subcategories' && renderSubcategories()}
          {step === 'products' && renderProducts()}
        </Box>

        {/* Create Pack Button */}
        {selectedProducts.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleCreateCustomPack}
              startIcon={<PackageIcon />}
              sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
            >
              Create Custom Pack ({selectedProducts.length} items)
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default RationPacks;