import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  useTheme,
  Chip,
  Button,
  Rating,
  IconButton,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardMedia,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Slider,
  Badge,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Star as StarIcon,
  LocalShipping as DeliveryIcon,
  ShoppingCart as CartIcon,
  Clear as ClearIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  Check as CheckIcon,
  Store as StoreIcon,
  Category as CategoryIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLocation } from '../../context/LocationContext';
import { customerApi, categoryApi } from '../../services/api';
import ROUTES from '../../routes/routes';

// Animation components
const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionTypography = motion(Typography);
const MotionChip = motion(Chip);

const Shop = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { location, getLocationParams } = useLocation();

  // State management
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRadius, setSelectedRadius] = useState(5);
  const [sortBy, setSortBy] = useState('nearest');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRating, setSelectedRating] = useState(null);

  // UI states
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [showSortDialog, setShowSortDialog] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

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

  // Sort options
  const sortOptions = [
    { value: 'nearest', label: 'Nearest First' },
    { value: 'farthest', label: 'Farthest First' },
    { value: 'nameAsc', label: 'Name A-Z' },
    { value: 'nameDesc', label: 'Name Z-A' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'deliveryTime', label: 'Fastest Delivery' },
  ];

  // Rating options
  const ratingOptions = [
    { value: null, label: 'All Ratings' },
    { value: 5, label: '5 Stars' },
    { value: 4, label: '4+ Stars' },
    { value: 3, label: '3+ Stars' },
    { value: 2, label: '2+ Stars' },
    { value: 1, label: '1+ Stars' },
  ];

  // Calculate distance between coordinates
  const calculateDistance = useCallback((vendorLocation) => {
    if (!location || !vendorLocation) return 9999;

    try {
      const userLat = location.latitude;
      const userLon = location.longitude;
      const vendorCoordinates = vendorLocation.coordinates;

      if (!userLat || !userLon || !vendorCoordinates || !Array.isArray(vendorCoordinates)) {
        return 9999;
      }

      const [vendorLon, vendorLat] = vendorCoordinates;

      if (typeof vendorLat !== 'number' || typeof vendorLon !== 'number') {
        return 9999;
      }

      const R = 6371; // Earth's radius in km
      const dLat = (vendorLat - userLat) * Math.PI / 180;
      const dLon = (vendorLon - userLon) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(userLat * Math.PI / 180) * Math.cos(vendorLat * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c;

      return distance;
    } catch (error) {
      console.error('Error calculating distance:', error);
      return 9999;
    }
  }, [location]);

  // Format distance for display
  const formatDistance = useCallback((distance) => {
    if (distance < 1) {
      return `${(distance * 1000).toFixed(0)}m`;
    } else {
      return `${distance.toFixed(1)}km`;
    }
  }, []);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await categoryApi.getAllCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  // Fetch vendors
  const fetchVendors = useCallback(async (radius = selectedRadius) => {
    // Note: Vendors are public data, no login required

    try {
      setLoading(true);
      setError(null);

      const params = getLocationParams();
      params.radius = radius;

      const response = await customerApi.searchNearbyVendorsAndProducts(params);
      let vendorData = response.data?.vendors || [];

      // Calculate distances and add to vendor data
      vendorData = vendorData.map(vendor => ({
        ...vendor,
        distance: calculateDistance(vendor.location),
        distanceText: formatDistance(calculateDistance(vendor.location))
      }));

      // Sort by distance by default
      vendorData.sort((a, b) => a.distance - b.distance);

      setVendors(vendorData);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      setError(error.response?.data?.message || 'Failed to load vendors');
    } finally {
      setLoading(false);
    }
  }, [getLocationParams, calculateDistance, formatDistance, selectedRadius]);

  // Apply filters and sorting
  const applyFilters = useCallback(() => {
    let filtered = [...vendors];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((vendor) =>
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.location?.formattedAddress?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.categories?.some(cat => 
          cat.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter((vendor) =>
        vendor.categories?.some(cat => cat._id === selectedCategory)
      );
    }

    // Apply rating filter
    if (selectedRating) {
      filtered = filtered.filter((vendor) => {
        const rating = vendor.rating || vendor.averageRating || 0;
        return rating >= selectedRating;
      });
    }

    // Apply radius filter
    if (selectedRadius && vendors[0]?.distance !== undefined) {
      filtered = filtered.filter((vendor) => 
        (vendor.distance || 0) <= selectedRadius
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'nearest':
          return (a.distance || 0) - (b.distance || 0);
        case 'farthest':
          return (b.distance || 0) - (a.distance || 0);
        case 'nameAsc':
          return a.name.localeCompare(b.name);
        case 'nameDesc':
          return b.name.localeCompare(a.name);
        case 'rating':
          return (b.rating || b.averageRating || 0) - (a.rating || a.averageRating || 0);
        case 'deliveryTime':
          return (a.deliveryTime || 30) - (b.deliveryTime || 30);
        default:
          return 0;
      }
    });

    setFilteredVendors(filtered);
  }, [vendors, searchQuery, selectedCategory, selectedRating, selectedRadius, sortBy]);

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedRadius(5);
    setSortBy('nearest');
    setSelectedCategory('');
    setSelectedRating(null);
  };

  // Get filter summary
  const getFilterSummary = () => {
    const activeFilters = [];
    
    if (searchQuery.trim()) {
      activeFilters.push(`Search: "${searchQuery}"`);
    }
    
    if (selectedCategory) {
      const category = categories.find(cat => cat._id === selectedCategory);
      if (category) {
        activeFilters.push(`Category: ${category.name}`);
      }
    }
    
    if (selectedRating) {
      activeFilters.push(`${selectedRating}+ Stars`);
    }
    
    if (selectedRadius !== 5) {
      activeFilters.push(`${selectedRadius}km radius`);
    }

    if (sortBy !== 'nearest') {
      const sortOption = sortOptions.find(opt => opt.value === sortBy);
      if (sortOption) {
        activeFilters.push(`Sort: ${sortOption.label}`);
      }
    }
    
    return activeFilters.length > 0 ? activeFilters.join(', ') : 'No filters applied';
  };

  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchVendors();
    } catch (error) {
      console.error('Error refreshing:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Initialize
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Render vendor card
  const renderVendorCard = (vendor, index) => {
    const getVendorImage = () => {
      if (vendor.image) return vendor.image;
      if (vendor.profileImage) return vendor.profileImage;
      if (vendor.imageUrl) return vendor.imageUrl;
      return '/images/no-shops.png';
    };

    const getLocationText = () => {
      if (vendor.location?.formattedAddress) {
        return vendor.location.formattedAddress;
      }
      if (vendor.location?.address) {
        return vendor.location.address;
      }
      if (vendor.address) {
        return vendor.address;
      }
      return 'Location unavailable';
    };

    const getDeliveryTime = () => {
      if (vendor.deliveryTime) return vendor.deliveryTime;
      if (vendor.estimatedDeliveryTime) return vendor.estimatedDeliveryTime;
      return '30-45 min';
    };

    const getRating = () => {
      if (vendor.rating) return vendor.rating;
      if (vendor.averageRating) return vendor.averageRating;
      return 4.0;
    };

    const getTags = () => {
      if (vendor.tags && Array.isArray(vendor.tags)) return vendor.tags;
      if (vendor.categories && Array.isArray(vendor.categories)) {
        return vendor.categories.map(cat => cat.name || cat).filter(Boolean);
      }
      return ['General'];
    };

    const getDeliveryFee = () => {
      if (vendor.deliveryFee !== undefined) return vendor.deliveryFee;
      if (vendor.deliveryCharges !== undefined) return vendor.deliveryCharges;
      return 40;
    };

    const getMinOrder = () => {
      if (vendor.minOrder !== undefined) return vendor.minOrder;
      if (vendor.minimumOrder !== undefined) return vendor.minimumOrder;
      return 200;
    };

    return (
      <MotionCard
        key={vendor._id}
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
        }}
        onClick={() => navigate(ROUTES.SHOP_DETAILS.replace(':shopId', vendor._id))}
      >
        <CardMedia
          component="img"
          height="140"
          image={getVendorImage()}
          alt={vendor.name}
          sx={{ position: 'relative' }}
        />
        
        {/* Rating badge */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 1,
            px: 1,
            py: 0.5,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <StarIcon sx={{ fontSize: 16, color: '#FFD700' }} />
          <Typography variant="caption" fontWeight="600">
            {getRating().toFixed(1)}
          </Typography>
        </Box>

        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, flex: 1, mr: 1 }}>
              {vendor.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <TimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {getDeliveryTime()}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocationIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
              {getLocationText()}
            </Typography>
            {vendor.distanceText && (
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                • {vendor.distanceText}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {getTags().slice(0, 3).map((tag, tagIndex) => (
              <Chip
                key={tagIndex}
                label={tag}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.7rem' }}
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Delivery: Rs {getDeliveryFee()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Min: Rs {getMinOrder()}
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="small"
              startIcon={<StoreIcon />}
              onClick={(e) => {
                e.stopPropagation();
                navigate(ROUTES.SHOP_DETAILS.replace(':shopId', vendor._id));
              }}
            >
              View Store
            </Button>
          </Box>
        </CardContent>
      </MotionCard>
    );
  };

  // Render empty state
  const renderEmptyState = () => (
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
        No vendors found
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
        Try adjusting your search filters or location
      </Typography>
      {error && (
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
        >
          Retry
        </Button>
      )}
    </Box>
  );

  // Render loading state
  if (loading && vendors.length === 0) {
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
          Finding vendors near you...
        </Typography>
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
          py: 4,
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Shop
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            Find the best vendors near you
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* Search and Filter Bar */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search vendors, categories, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setSearchQuery('')}
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Radius</InputLabel>
                <Select
                  value={selectedRadius}
                  onChange={(e) => setSelectedRadius(e.target.value)}
                  label="Radius"
                >
                  {radiusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} md={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<SortIcon />}
                onClick={() => setShowSortDialog(true)}
                size="small"
              >
                {sortOptions.find(opt => opt.value === sortBy)?.label || 'Sort'}
              </Button>
            </Grid>

            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={() => setShowFilterDrawer(true)}
                size="small"
              >
                Filters
              </Button>
            </Grid>
          </Grid>

          {/* Filter Summary */}
          {getFilterSummary() !== 'No filters applied' && (
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {getFilterSummary()}
              </Typography>
              <Button
                size="small"
                onClick={resetFilters}
                startIcon={<ClearIcon />}
              >
                Clear
              </Button>
            </Box>
          )}
        </Box>

        {/* Results Count */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''} found
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="small"
              variant={viewMode === 'list' ? 'contained' : 'outlined'}
              onClick={() => setViewMode('list')}
            >
              List
            </Button>
            <Button
              size="small"
              variant={viewMode === 'grid' ? 'contained' : 'outlined'}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </Button>
          </Box>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Vendors List/Grid */}
        {filteredVendors.length === 0 ? (
          renderEmptyState()
        ) : (
          <Grid container spacing={3}>
            {filteredVendors.map((vendor, index) => (
              <Grid item xs={12} md={viewMode === 'grid' ? 6 : 12} key={vendor._id}>
                {renderVendorCard(vendor, index)}
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
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={() => setShowFilterDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Stack spacing={3}>
            {/* Category Filter */}
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Rating Filter */}
            <FormControl fullWidth>
              <InputLabel>Minimum Rating</InputLabel>
              <Select
                value={selectedRating || ''}
                onChange={(e) => setSelectedRating(e.target.value || null)}
                label="Minimum Rating"
              >
                {ratingOptions.map((option) => (
                  <MenuItem key={option.value || 'all'} value={option.value || ''}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Radius Filter */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Radius: {selectedRadius}km
              </Typography>
              <Slider
                value={selectedRadius}
                onChange={(e, value) => setSelectedRadius(value)}
                min={1}
                max={50}
                marks={[
                  { value: 1, label: '1km' },
                  { value: 25, label: '25km' },
                  { value: 50, label: '50km' },
                ]}
                valueLabelDisplay="auto"
              />
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2 }}>
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
          </Stack>
        </Box>
      </Drawer>

      {/* Sort Dialog */}
      <Dialog
        open={showSortDialog}
        onClose={() => setShowSortDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Sort By</DialogTitle>
        <DialogContent>
          <List>
            {sortOptions.map((option) => (
              <ListItem
                key={option.value}
                button
                onClick={() => {
                  setSortBy(option.value);
                  setShowSortDialog(false);
                }}
              >
                <ListItemText primary={option.label} />
                {sortBy === option.value && <CheckIcon color="primary" />}
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSortDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Refresh FAB */}
      <Fab
        color="primary"
        aria-label="refresh"
        onClick={handleRefresh}
        disabled={refreshing}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
        {refreshing ? <CircularProgress size={24} color="inherit" /> : <RefreshIcon />}
      </Fab>
    </Box>
  );
};

export default Shop;