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
  Divider,
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Snackbar,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { customerApi } from '../../services/api';

// Icons
import {
  ArrowBack as ArrowBackIcon,
  ShoppingCart as CartIcon,
  Warning as WarningIcon,
  Check as CheckIcon,
  ExpandMore as ChevronDownIcon,
  UnfoldMore as ArrowUpDownIcon,
  LocationOn as LocationIcon,
  Store as StoreIcon,
  Inventory as PackageIcon,
  Tag as TagIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
} from '@mui/icons-material';

// Animation components
const MotionCard = motion(Card);
const MotionBox = motion(Box);

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

const RationPackDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();

  // Get data from navigation state
  const { selectedItems, productIds, radius: initialRadius, sortBy: initialSortBy } = location.state || {};

  // State management
  const [loading, setLoading] = useState(false);
  const [vendorRationPacks, setVendorRationPacks] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showRadiusOptions, setShowRadiusOptions] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [radius, setRadius] = useState(parseInt(initialRadius) || 5);
  const [sortBy, setSortBy] = useState(initialSortBy || 'nearest');
  const [selectedItemsArray, setSelectedItemsArray] = useState(selectedItems || []);
  const [productIdsArray, setProductIdsArray] = useState(productIds || []);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  // Update state when location state changes
  useEffect(() => {
    if (location.state) {
      setSelectedItemsArray(location.state.selectedItems || []);
      setProductIdsArray(location.state.productIds || []);
      setRadius(parseInt(location.state.radius) || 5);
      setSortBy(location.state.sortBy || 'nearest');
      setSelectedVendor(null); // Clear vendor selection since items changed
    }
  }, [location.state]);

  useEffect(() => {
    if (selectedItemsArray.length > 0) {
      fetchRationPacks();
    }
  }, [radius, sortBy, selectedItemsArray]);

  const fetchRationPacks = async () => {
    setLoading(true);
    try {
      // Call the API to fetch ration packs from nearby vendors with radius and sort
      const response = await customerApi.createRationPack({
        products: selectedItemsArray,
        radius: radius,
        sortBy: sortBy
      });
      
      let packs = response.data.rationPacks;
      
      // Sort the ration packs based on selected sort option
      if (sortBy === 'nearest') {
        // Already sorted by the API
      } else if (sortBy === 'farthest') {
        // Reverse the order since the API returns nearest first
        packs = packs.reverse();
      } else if (sortBy === 'cheapest') {
        packs.sort((a, b) => a.totalDiscountedPrice - b.totalDiscountedPrice);
      } else if (sortBy === 'expensive') {
        packs.sort((a, b) => b.totalDiscountedPrice - a.totalDiscountedPrice);
      }
      
      // Use the backend's availability data directly - it's already correct
      // The backend provides isAvailable flags and proper item matching
      packs = packs.map(pack => {
        // Ensure all requested items are present in the response
        const packWithCompleteItems = {...pack};
        const vendorItemTitles = pack.items.map(item => item.title);
        
        // Add any missing requested items as unavailable
        const missingItems = selectedItemsArray.filter(requestedItem => 
          !vendorItemTitles.some(vendorItem => 
            vendorItem.toLowerCase() === requestedItem.toLowerCase()
          )
        );
        
        if (missingItems.length > 0) {
          const missingItemsData = missingItems.map(item => ({
            title: item,
            isAvailable: false,
            originalPrice: 0,
            discountedPrice: 0,
            imageUrl: 'https://via.placeholder.com/60?text=N/A',
            productId: null,
            vendorProductId: null,
            discountType: null,
            discountValue: null
          }));
          
          packWithCompleteItems.items = [...pack.items, ...missingItemsData];
        }
        
        return packWithCompleteItems;
      });
      
      setVendorRationPacks(packs);
      
      // Select the first vendor by default (based on the sort order)
      if (packs.length > 0) {
        setSelectedVendor(packs[0]);
      } else {
        setSelectedVendor(null);
      }
    } catch (error) {
      console.error('Error fetching ration packs:', error);
      setSnackbar({
        open: true,
        message: 'Failed to fetch ration pack details',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectVendor = (vendorPack) => {
    setSelectedVendor(vendorPack);
  };

  // Render informational page for non-logged-in users
  const renderInfoPage = () => (
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
            <IconButton 
              onClick={() => navigate('/ration-packs')} 
              sx={{ color: 'white', mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <PackageIcon sx={{ fontSize: 32, mr: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Ration Pack Details
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            View and compare ration pack options from nearby vendors
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Login Prompt */}
        <Paper sx={{ p: 4, mb: 4, borderRadius: 2, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: 'primary.main' }}>
              <PackageIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              Login to View Ration Pack Details
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Sign in to see detailed ration pack options, compare prices, and add items to your cart
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/login')}
              startIcon={<CartIcon />}
              sx={{ px: 4, py: 1.5 }}
            >
              Login to Continue
            </Button>
          </Box>
        </Paper>

        {/* What You'll See */}
        <Paper sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            What You'll See After Login
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                <Avatar sx={{ mr: 2, bgcolor: 'primary.main', width: 40, height: 40 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>1</Typography>
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Vendor Comparison
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    See all nearby vendors that carry your selected items. Compare prices, 
                    availability, and delivery options across different stores.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                <Avatar sx={{ mr: 2, bgcolor: 'primary.main', width: 40, height: 40 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>2</Typography>
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Item Availability
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Check which items are in stock and which are unavailable at each vendor. 
                    Get real-time inventory updates and pricing information.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                <Avatar sx={{ mr: 2, bgcolor: 'primary.main', width: 40, height: 40 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>3</Typography>
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Price Breakdown
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    View detailed pricing for each item including original prices, 
                    discounts, and final prices. See total pack costs and savings.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                <Avatar sx={{ mr: 2, bgcolor: 'primary.main', width: 40, height: 40 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>4</Typography>
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    One-Click Cart
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Select your preferred vendor and add all available items to your cart 
                    with a single click. Complete your order seamlessly.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Features */}
        <Paper sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Advanced Features Available
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'secondary.main', width: 60, height: 60 }}>
                  <FilterIcon />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Smart Filtering
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Filter vendors by distance, price range, and availability to find the best options
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'secondary.main', width: 60, height: 60 }}>
                  <SortIcon />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Multiple Sort Options
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sort by nearest, farthest, cheapest, or most expensive to find your ideal vendor
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'secondary.main', width: 60, height: 60 }}>
                  <CheckIcon />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Real-Time Updates
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get live availability and pricing updates as you browse vendor options
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'secondary.main', width: 60, height: 60 }}>
                  <StoreIcon />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Vendor Details
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View vendor ratings, distance, delivery options, and contact information
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'secondary.main', width: 60, height: 60 }}>
                  <TagIcon />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Discount Tracking
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  See all available discounts and special offers from each vendor
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'secondary.main', width: 60, height: 60 }}>
                  <CartIcon />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Bulk Cart Addition
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add multiple items to your cart at once from your selected vendor
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );

  const handleAddToCart = async () => {
    if (!selectedVendor || !isLoggedIn) {
      setSnackbar({
        open: true,
        message: isLoggedIn ? 'Please select a vendor' : 'Please login to add items to cart',
        severity: 'warning'
      });
      return;
    }
    
    setLoading(true);
    try {
      // Only include items that are explicitly marked as available and have valid IDs
      const availableItems = selectedVendor.items.filter(item => 
        item.isAvailable === true && 
        item.vendorProductId && 
        item.productId
      );

      if (availableItems.length === 0) {
        setSnackbar({
          open: true,
          message: 'There are no available items to add to cart from this vendor.',
          severity: 'warning'
        });
        setLoading(false);
        return;
      }

      for (const item of availableItems) {
        const vendorProductData = {
          _id: item.vendorProductId,
          discountType: item.discountType,
          discountValue: item.discountValue,
          product: {
            _id: item.productId,
            title: item.title,
            imageUrl: item.imageUrl,
            price: item.originalPrice
          },
          vendor: selectedVendor.vendor
        };

        // Add to cart with discount information preserved
        await addToCart(vendorProductData);
      }
      
      setSnackbar({
        open: true,
        message: `${availableItems.length} items added to cart successfully!`,
        severity: 'success'
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      setSnackbar({
        open: true,
        message: 'Failed to add items to cart',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const removeUnavailableItem = (itemTitle) => {
    setSelectedItemsArray(prev => prev.filter(item => item !== itemTitle));
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
            {radiusOptions.find(opt => opt.value === radius)?.label || 'Radius'}
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
                  variant={radius === option.value ? 'filled' : 'outlined'}
                  color={radius === option.value ? 'primary' : 'default'}
                  onClick={() => setRadius(option.value)}
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

  // Render ration pack items
  const renderRationPackItems = () => (
    <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <PackageIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Your Ration Pack
        </Typography>
        <Badge badgeContent={selectedItemsArray.length} color="primary" sx={{ ml: 1 }} />
      </Box>
      
      <List>
        {selectedItemsArray.map((item, index) => (
          <ListItem key={index} sx={{ px: 0 }}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <TagIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );

  // Render vendor details
  const renderVendorDetails = () => {
    if (!selectedVendor) return null;
    
    // Check if there are any unavailable items
    const unavailableItems = selectedVendor.items.filter(item => item.isAvailable === false);
    const availableItems = selectedVendor.items.filter(item => item.isAvailable !== false);
    
    return (
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <StoreIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Pack Details from {selectedVendor.vendor.name}
          </Typography>
        </Box>
        
        {/* Available Items */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CheckIcon sx={{ mr: 1, color: 'success.main' }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Available Items
            </Typography>
            <Badge badgeContent={availableItems.length} color="success" sx={{ ml: 1 }} />
          </Box>
          
          <Grid container spacing={2}>
            {availableItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
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
                      Rs {item.originalPrice}
                    </Typography>
                    {item.discountedPrice < item.originalPrice && (
                      <Typography variant="caption" color="success.main" sx={{ display: 'block' }}>
                        Rs {item.discountedPrice} (Discounted)
                      </Typography>
                    )}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Unavailable Items */}
        {unavailableItems.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <WarningIcon sx={{ mr: 1, color: 'warning.main' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Unavailable Items
              </Typography>
              <Badge badgeContent={unavailableItems.length} color="warning" sx={{ ml: 1 }} />
            </Box>
            
            <Grid container spacing={2}>
              {unavailableItems.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ display: 'flex', alignItems: 'center', p: 2, opacity: 0.6 }}>
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
                      <Typography variant="caption" color="error">
                        Not Available
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => removeUnavailableItem(item.title)}
                      sx={{ color: 'error.main' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Warning Box */}
        {unavailableItems.length > 0 && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {unavailableItems.length} item(s) not available from this vendor. 
            Only available items will be added to your cart.
          </Alert>
        )}

        {/* Total Price */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Total Price:
          </Typography>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
            Rs {selectedVendor.totalDiscountedPrice}
          </Typography>
        </Box>

        {/* Add to Cart Button */}
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleAddToCart}
          disabled={loading || availableItems.length === 0}
          startIcon={<CartIcon />}
        >
          {loading ? 'Adding to Cart...' : `Add ${availableItems.length} Items to Cart`}
        </Button>
      </Paper>
    );
  };

  // Render vendor options
  const renderVendorOptions = () => (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <StoreIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Vendor Options ({vendorRationPacks.length})
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {vendorRationPacks.map((vendorPack, index) => {
          // Check if this vendor pack is the selected one
          const isSelected = selectedVendor && selectedVendor === vendorPack;
          const availableItems = vendorPack.items.filter(item => item.isAvailable !== false);
          
          return (
            <Grid item xs={12} md={6} key={vendorPack._id}>
              <MotionCard
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                sx={{
                  cursor: 'pointer',
                  border: isSelected ? 2 : 1,
                  borderColor: isSelected ? 'primary.main' : 'divider',
                  height: '100%',
                }}
                onClick={() => handleSelectVendor(vendorPack)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                      <StoreIcon />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {vendorPack.vendor.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {availableItems.length} of {selectedItemsArray.length} items available
                      </Typography>
                    </Box>
                    {isSelected && <CheckIcon color="primary" />}
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Total Price:
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                      Rs {vendorPack.totalDiscountedPrice}
                    </Typography>
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );

  // Show info page for non-logged-in users
  if (!isLoggedIn) {
    return renderInfoPage();
  }

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
            <IconButton 
              onClick={() => navigate(-1)} 
              sx={{ color: 'white', mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <PackageIcon sx={{ fontSize: 32, mr: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Custom Ration Pack
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {!loading && renderFiltersHeader()}

        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
            <CircularProgress size={60} sx={{ mb: 3 }} />
            <Typography variant="h6" color="text.secondary" textAlign="center">
              Finding the best deals from nearby vendors...
            </Typography>
          </Box>
        ) : (
          <>
            {renderRationPackItems()}
            {renderVendorOptions()}
            {selectedVendor && renderVendorDetails()}
          </>
        )}
      </Container>

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

export default RationPackDetails; 