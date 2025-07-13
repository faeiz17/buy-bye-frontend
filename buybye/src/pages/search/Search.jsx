import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Chip,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  CircularProgress,
  Alert,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Avatar,
  Rating,
  Badge,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  useMediaQuery,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Store as StoreIcon,
  ShoppingBag as ShoppingBagIcon,
  Star as StarIcon,
  LocationOn as LocationIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useLocation } from '../../context/LocationContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { customerApi, categoryApi } from '../../services/api';

// Predefined radius options
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

// Sorting options
const sortOptions = [
  { value: 'nearest', label: 'Nearest First' },
  { value: 'farthest', label: 'Farthest First' },
  { value: 'cheapest', label: 'Price: Low to High' },
  { value: 'expensive', label: 'Price: High to Low' },
  { value: 'rating_high', label: 'Highest Rated' },
  { value: 'rating_low', label: 'Lowest Rated' },
];

// Rating filter options
const ratingOptions = [
  { value: null, label: 'All Ratings' },
  { value: 5, label: '5 Stars' },
  { value: 4, label: '4+ Stars' },
  { value: 3, label: '3+ Stars' },
  { value: 2, label: '2+ Stars' },
  { value: 1, label: '1+ Stars' },
];

function Search() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const { location, getLocationAndSearchParams } = useLocation();
  const { isLoggedIn } = useAuth();
  const { addToCart } = useCart();

  // Search state
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [results, setResults] = useState({ vendors: [], products: [] });
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showingRecent, setShowingRecent] = useState(false);
  
  // Filter state
  const [selectedRadius, setSelectedRadius] = useState(5);
  const [sortBy, setSortBy] = useState('nearest');
  const [selectedRating, setSelectedRating] = useState(null);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Load categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getAllCategories();
        setCategories(response.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Load subcategories when category changes
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
        setSelectedSubCategory(null);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setSubCategories([]);
      }
    };

    fetchSubCategories();
  }, [selectedCategory]);

  // Utility: extract price from string or return number
  const extractPrice = (str) => {
    if (typeof str === 'number') return str;
    const m = String(str).match(/\d+/g);
    return m ? parseInt(m.join(''), 10) : 0;
  };

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (vendorLocation) => {
    try {
      if (!location || !vendorLocation || !vendorLocation.coordinates) {
        return 'Unknown distance';
      }

      const vendorCoords = vendorLocation.coordinates;
      const userCoords = [location.longitude, location.latitude];

      const R = 6371; // Radius of the Earth in kilometers
      const lat1Rad = location.latitude * (Math.PI / 180);
      const lat2Rad = vendorCoords[1] * (Math.PI / 180);
      const latDiffRad = (vendorCoords[1] - location.latitude) * (Math.PI / 180);
      const longDiffRad = (vendorCoords[0] - location.longitude) * (Math.PI / 180);

      const a =
        Math.sin(latDiffRad / 2) * Math.sin(latDiffRad / 2) +
        Math.cos(lat1Rad) *
          Math.cos(lat2Rad) *
          Math.sin(longDiffRad / 2) *
          Math.sin(longDiffRad / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      return distance;
    } catch (error) {
      console.error('Error calculating distance:', error);
      return 9999;
    }
  };

  // Format distance for display
  const formatDistance = (distance) => {
    if (typeof distance !== 'number') return 'Unknown';
    
    if (distance < 1) {
      return `${Math.round(distance * 1000)} m`;
    } else {
      return `${distance.toFixed(1)} km`;
    }
  };

  // Search function
  const performSearch = useCallback(async () => {
    if (!location) {
      return;
    }

    if (!searchTerm.trim() && !selectedCategory && !selectedSubCategory) {
      setResults({ vendors: [], products: [] });
      setShowingRecent(true);
      return;
    }

    setLoading(true);
    setShowingRecent(false);

    try {
      const locParams = getLocationAndSearchParams({
        radius: selectedRadius,
        searchTerm: searchTerm.trim(),
        categoryId: selectedCategory,
        subCategoryId: selectedSubCategory,
        sortBy: sortBy,
      });

      const response = await customerApi.searchNearbyVendorsAndProducts(locParams);
      
      let vendorResults = response.data?.vendors || [];
      let productResults = response.data?.products || [];
      
      // Filter by rating if selected
      if (selectedRating !== null) {
        productResults = productResults.filter(product => {
          const avgRating = product.averageRating || product.product?.averageRating || 0;
          return avgRating >= selectedRating;
        });
      }

      // Sort the results
      switch (sortBy) {
        case 'nearest':
          vendorResults = vendorResults.sort((a, b) => 
            calculateDistance(a.location) - calculateDistance(b.location)
          );
          productResults = productResults.sort((a, b) => 
            calculateDistance(a.vendor?.location) - calculateDistance(b.vendor?.location)
          );
          break;
        case 'farthest':
          vendorResults = vendorResults.sort((a, b) => 
            calculateDistance(b.location) - calculateDistance(a.location)
          );
          productResults = productResults.sort((a, b) => 
            calculateDistance(b.vendor?.location) - calculateDistance(a.vendor?.location)
          );
          break;
        case 'cheapest':
          productResults = productResults.sort((a, b) => {
            const priceA = extractPrice(a.product?.price || 0);
            const priceB = extractPrice(b.product?.price || 0);
            return priceA - priceB;
          });
          break;
        case 'expensive':
          productResults = productResults.sort((a, b) => {
            const priceA = extractPrice(a.product?.price || 0);
            const priceB = extractPrice(b.product?.price || 0);
            return priceB - priceA;
          });
          break;
        case 'rating_high':
          productResults = productResults.sort((a, b) => {
            const ratingA = a.averageRating || a.product?.averageRating || 0;
            const ratingB = b.averageRating || b.product?.averageRating || 0;
            return ratingB - ratingA;
          });
          break;
        case 'rating_low':
          productResults = productResults.sort((a, b) => {
            const ratingA = a.averageRating || a.product?.averageRating || 0;
            const ratingB = b.averageRating || b.product?.averageRating || 0;
            return ratingA - ratingB;
          });
          break;
        default:
          break;
      }
      
      setResults({ 
        vendors: vendorResults, 
        products: productResults 
      });

      // Save to recent searches
      if (searchTerm.trim() && !recentSearches.includes(searchTerm.trim())) {
        const newRecentSearches = [
          searchTerm.trim(),
          ...recentSearches.filter((s) => s !== searchTerm.trim()),
        ].slice(0, 5);
        setRecentSearches(newRecentSearches);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }, [location, searchTerm, selectedCategory, selectedSubCategory, selectedRadius, sortBy, selectedRating, getLocationAndSearchParams, recentSearches]);

  // Debounced search effect
  useEffect(() => {
    if (location) {
      const delaySearch = setTimeout(() => {
        performSearch();
      }, 500);
  
      return () => clearTimeout(delaySearch);
    }
  }, [performSearch, location]);

  // Update URL params when search changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedSubCategory) params.set('subcategory', selectedSubCategory);
    setSearchParams(params);
  }, [searchTerm, selectedCategory, selectedSubCategory, setSearchParams]);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  // Handle subcategory selection
  const handleSubCategorySelect = (subCategoryId) => {
    setSelectedSubCategory(selectedSubCategory === subCategoryId ? null : subCategoryId);
  };

  // Handle recent search click
  const handleRecentSearchClick = (term) => {
    setSearchTerm(term);
  };

  // Apply filters and close drawer
  const applyFilters = () => {
    performSearch();
    setShowFilterDrawer(false);
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSelectedRadius(5);
    setSortBy('nearest');
    setSelectedRating(null);
    setShowFilterDrawer(false);
  };

  // Get current filter summary text
  const getFilterSummary = () => {
    let summary = [];
    
    if (selectedRadius !== 5) {
      summary.push(`${selectedRadius}km`);
    }
    
    if (selectedRating !== null) {
      const ratingName = ratingOptions.find(option => option.value === selectedRating)?.label;
      if (ratingName) summary.push(ratingName);
    }
    
    if (sortBy !== 'nearest') {
      const sortName = sortOptions.find(option => option.value === sortBy)?.label;
      if (sortName) summary.push(sortName);
    }
    
    if (summary.length === 0) return 'Filter';
    return summary.join(' • ');
  };

  // Render product card
  const renderProductCard = (product) => {
    const basePrice = extractPrice(product.product?.price || 0);
    let finalPrice = basePrice;
    
    if (product.discountType && product.discountValue) {
      finalPrice = 
        product.discountType === 'percentage'
          ? basePrice * (1 - product.discountValue / 100)
          : Math.max(0, basePrice - product.discountValue);
    }
    
    const discountPercent = 
      basePrice > finalPrice
        ? Math.round(((basePrice - finalPrice) / basePrice) * 100)
        : 0;

    const distanceValue = calculateDistance(product.vendor?.location);
    
    return (
      <Zoom in={true} style={{ transitionDelay: '100ms' }}>
        <Card 
          sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[8],
            }
          }}
          onClick={() => navigate(`/products/${product._id}`)}
        >
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height="200"
              image={product.product?.imageUrl || 'https://via.placeholder.com/300x200'}
              alt={product.product?.title}
              sx={{ objectFit: 'cover' }}
            />
            {discountPercent > 0 && (
              <Chip
                label={`${discountPercent}% OFF`}
                color="error"
                size="small"
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  fontWeight: 'bold',
                }}
              />
            )}
          </Box>
          
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
              {product.product?.title}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {product.vendor?.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Rating 
                value={product.averageRating || product.product?.averageRating || 0} 
                readOnly 
                size="small"
                precision={0.5}
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                ({product.averageRating || product.product?.averageRating || 0})
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                {formatDistance(distanceValue)}
              </Typography>
            </Box>

            <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                  Rs. {finalPrice.toLocaleString()}
                </Typography>
                {basePrice !== finalPrice && (
                  <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                    Rs. {basePrice.toLocaleString()}
                  </Typography>
                )}
              </Box>
              
              <Button
                variant="contained"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                sx={{
                  bgcolor: '#4D216D',
                  '&:hover': { bgcolor: '#3a1855' },
                }}
              >
                Add to Cart
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Zoom>
    );
  };

  // Render vendor card
  const renderVendorCard = (vendor) => {
    const distanceValue = calculateDistance(vendor.location);
    
    return (
      <Fade in={true} style={{ transitionDelay: '200ms' }}>
        <Card 
          sx={{ 
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: theme.shadows[6],
            }
          }}
          onClick={() => navigate(`/shop/${vendor._id}`)}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Avatar
                sx={{ 
                  width: 60, 
                  height: 60,
                  bgcolor: '#4D216D',
                }}
              >
                <StoreIcon />
              </Avatar>
              
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  {vendor.name}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {vendor.location?.formattedAddress}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <StarIcon fontSize="small" color="warning" />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      {vendor.averageRating || 'N/A'}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                      {formatDistance(distanceValue)}
                    </Typography>
                  </Box>
                </Box>

                {vendor.categories && vendor.categories.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {vendor.categories.slice(0, 3).map((category, index) => (
                      <Chip
                        key={index}
                        label={category.name}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    ))}
                    {vendor.categories.length > 3 && (
                      <Chip
                        label={`+${vendor.categories.length - 3}`}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    );
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Search Header */}
      <Paper 
        elevation={0} 
        sx={{ 
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <IconButton onClick={() => navigate(-1)}>
              <CloseIcon />
            </IconButton>
            
            <TextField
              fullWidth
              placeholder="Search for products or vendors..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSearchTerm('')}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                }
              }}
            />
          </Box>

          {/* Categories */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, overflowX: 'auto' }}>
            {categories.map(category => (
              <Chip
                key={category._id}
                label={category.name.replace(/_/g, ' ')}
                onClick={() => handleCategorySelect(category._id)}
                color={selectedCategory === category._id ? 'primary' : 'default'}
                variant={selectedCategory === category._id ? 'filled' : 'outlined'}
                sx={{ whiteSpace: 'nowrap' }}
              />
            ))}
          </Box>

          {/* Filter Bar */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={() => setShowFilterDrawer(true)}
                sx={{ borderRadius: 2 }}
              >
                {getFilterSummary()}
              </Button>
              
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(e, newMode) => newMode && setViewMode(newMode)}
                size="small"
              >
                <ToggleButton value="grid">
                  <ViewModuleIcon />
                </ToggleButton>
                <ToggleButton value="list">
                  <ViewListIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Typography variant="body2" color="text.secondary">
              {results.vendors.length + results.products.length} results
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Results */}
      <Box sx={{ p: 2 }}>
        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
            <CircularProgress size={48} sx={{ mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Searching nearby...
            </Typography>
          </Box>
        ) : showingRecent && recentSearches.length > 0 ? (
          // Recent searches section
          <Box>
            <Typography variant="h6" gutterBottom>
              Recent Searches
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {recentSearches.map((term, index) => (
                <Chip
                  key={index}
                  label={term}
                  onClick={() => handleRecentSearchClick(term)}
                  variant="outlined"
                  clickable
                />
              ))}
            </Box>
          </Box>
        ) : (
          // Search results
          <Box>
            {/* Products Section */}
            {results.products.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Products ({results.products.length})
                </Typography>
                <Grid container spacing={3}>
                  {results.products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                      {renderProductCard(product)}
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Vendors Section */}
            {results.vendors.length > 0 && (
              <Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Vendors ({results.vendors.length})
                </Typography>
                <Grid container spacing={2}>
                  {results.vendors.map((vendor) => (
                    <Grid item xs={12} key={vendor._id}>
                      {renderVendorCard(vendor)}
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Empty State */}
            {!loading && results.vendors.length === 0 && results.products.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <ShoppingBagIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  No results found
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  {searchTerm || selectedCategory || selectedSubCategory
                    ? 'Try different search terms, categories, or expand your search radius.'
                    : 'Enter a search term or select a category to find vendors and products.'}
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Box>

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={showFilterDrawer}
        onClose={() => setShowFilterDrawer(false)}
        PaperProps={{
          sx: { width: isMobile ? '100%' : 400 }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Filters & Sort
            </Typography>
            <IconButton onClick={() => setShowFilterDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {/* Radius Filter */}
            <ListItem>
              <ListItemIcon>
                <LocationIcon />
              </ListItemIcon>
              <ListItemText
                primary="Search Radius"
                secondary={`${selectedRadius} km`}
              />
            </ListItem>
            <Box sx={{ px: 3, pb: 2 }}>
              <Slider
                value={selectedRadius}
                onChange={(e, value) => setSelectedRadius(value)}
                min={1}
                max={50}
                step={1}
                marks={radiusOptions.map(option => ({
                  value: option.value,
                  label: option.label
                }))}
                valueLabelDisplay="auto"
              />
            </Box>

            <Divider />

            {/* Sort Options */}
            <ListItem>
              <ListItemIcon>
                <SortIcon />
              </ListItemIcon>
              <ListItemText primary="Sort By" />
            </ListItem>
            <Box sx={{ px: 3, pb: 2 }}>
              <FormControl fullWidth size="small">
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {sortOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Divider />

            {/* Rating Filter */}
            <ListItem>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary="Minimum Rating" />
            </ListItem>
            <Box sx={{ px: 3, pb: 2 }}>
              <FormControl fullWidth size="small">
                <Select
                  value={selectedRating || ''}
                  onChange={(e) => setSelectedRating(e.target.value || null)}
                >
                  {ratingOptions.map(option => (
                    <MenuItem key={option.value || 'all'} value={option.value || ''}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Divider />

            {/* Subcategories */}
            {subCategories.length > 0 && (
              <>
                <ListItem>
                  <ListItemIcon>
                    <ShoppingBagIcon />
                  </ListItemIcon>
                  <ListItemText primary="Subcategories" />
                </ListItem>
                <Box sx={{ px: 3, pb: 2 }}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {subCategories.map(subCategory => (
                      <Chip
                        key={subCategory._id}
                        label={subCategory.name}
                        onClick={() => handleSubCategorySelect(subCategory._id)}
                        color={selectedSubCategory === subCategory._id ? 'primary' : 'default'}
                        variant={selectedSubCategory === subCategory._id ? 'filled' : 'outlined'}
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>
                <Divider />
              </>
            )}
          </List>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={resetFilters}
            >
              Reset All
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={applyFilters}
              sx={{
                bgcolor: '#4D216D',
                '&:hover': { bgcolor: '#3a1855' },
              }}
            >
              Apply Filters
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Search; 