import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Chip, 
  Alert, 
  CircularProgress,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import { 
  Store, 
  LocationOn, 
  AccessTime, 
  LocalShipping, 
  Security, 
  Star,
  ArrowBack,
  ShoppingCart,
  Favorite,
  Share
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { vendorProductApi, vendorApi } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from '../../context/LocationContext';
import { useOrder } from '../../context/OrderContext';

function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, getCartCount } = useCart();
  const { isLoggedIn, user } = useAuth();
  const { location } = useLocation();
  const { createDirectOrder } = useOrder();

  const [product, setProduct] = useState(null);
  const [vendorProduct, setVendorProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [ordering, setOrdering] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const cartCount = getCartCount();

  // Calculate distance between user and vendor
  const calculateDistance = (vendorLocation) => {
    if (!location || !vendorLocation) return 'Unknown distance';
    
    try {
      const vendorCoords = vendorLocation.coordinates || vendorLocation;
      const userCoords = [location.longitude, location.latitude];
      
      if (!vendorCoords || !userCoords) return 'Unknown distance';
      
      const [vLon, vLat] = Array.isArray(vendorCoords) ? vendorCoords : [vendorCoords.lng, vendorCoords.lat];
      const [uLon, uLat] = userCoords;
      
      const R = 6371; // Earth's radius in km
      const dLat = (vLat - uLat) * (Math.PI / 180);
      const dLon = (vLon - uLon) * (Math.PI / 180);
      const a = Math.sin(dLat / 2) ** 2 + Math.cos((uLat * Math.PI) / 180) * Math.cos((vLat * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const dist = R * c;
      
      return dist < 1 ? `${Math.round(dist * 1000)} m` : `${dist.toFixed(1)} km`;
    } catch {
      return 'Unknown distance';
    }
  };

  // Get estimated delivery time
  const getEstimatedDelivery = (distance) => {
    if (!distance || distance === 'Unknown distance') return '25-35 min';
    
    const km = parseFloat(distance.replace(/[^\d.]/g, ''));
    if (km < 0.7) return '15-20 min';
    if (km < 1) return '20-25 min';
    return '25-35 min';
  };

  // Parse price from string or number
  const parsePrice = (price) => {
    if (!price) return 0;
    if (typeof price === 'number') return price;
    const match = String(price).match(/[\d,]+/);
    return match ? parseInt(match[0].replace(/,/g, ''), 10) : 0;
  };

  // Fetch product details
  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: vendorProductData } = await vendorProductApi.getVendorProductById(productId);
      
      // Store the original vendorProduct data for cart operations
      setVendorProduct(vendorProductData);
      
      // Fetch vendor details
      let vendor = null;
      const vendorId = typeof vendorProductData.vendor === 'string' ? vendorProductData.vendor : vendorProductData.vendor?._id;
      
      if (vendorId) {
        try {
          const { data } = await vendorApi.getVendorById(vendorId);
          vendor = data;
        } catch (err) {
          console.error('Error fetching vendor details:', err);
        }
      }

      // Calculate prices and discounts
      const basePrice = parsePrice(vendorProductData.product?.price);
      let finalPrice = basePrice;
      
      if (vendorProductData.discountType && vendorProductData.discountValue) {
        if (vendorProductData.discountType === 'percentage') {
          finalPrice = basePrice * (1 - vendorProductData.discountValue / 100);
        } else if (vendorProductData.discountType === 'amount') {
          finalPrice = Math.max(0, basePrice - vendorProductData.discountValue);
        }
      }

      const distance = calculateDistance(vendor?.location);
      
      setProduct({
        id: vendorProductData._id,
        name: vendorProductData.product?.title || 'Unknown Product',
        description: vendorProductData.product?.description || 'Premium quality product with excellent features.',
        price: finalPrice,
        originalPrice: basePrice,
        image: vendorProductData.product?.imageUrl,
        inStock: vendorProductData.inStock !== false,
        category: vendorProductData.product?.category?.name,
        subCategory: vendorProductData.product?.subCategory?.name,
        vendor: {
          id: vendorId,
          name: vendor?.name || 'Unknown Store',
          location: vendor?.location?.formattedAddress || 'Location not available',
          distance,
          rating: 4.8, // Mock rating
        },
        discountType: vendorProductData.discountType,
        discountValue: vendorProductData.discountValue,
      });
      
      // Vendor details are now included in the product object
    } catch (err) {
      console.error('Error fetching product details:', err);
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (!vendorProduct) {
      setError('Product data not available');
      return;
    }

    setAddingToCart(true);
    try {
      await addToCart(vendorProduct);
      // Show success feedback
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError('Failed to add item to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  // Handle direct order
  const handleDirectOrder = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (!location) {
      setError('Please set your delivery location before placing an order.');
      return;
    }

    setOrdering(true);
    setError(null);

    try {
      // Format delivery address
      const deliveryAddress = {
        coordinates: [location.longitude, location.latitude],
        formattedAddress: location.address || 'Current Location',
        type: 'Point',
      };

      // Prepare order data
      const orderData = {
        items: [{
          vendorProductId: product.id,
          quantity: quantity,
          price: product.price,
          originalPrice: product.originalPrice,
          discountType: product.discountType,
          discountValue: product.discountValue,
          totalPrice: product.price * quantity,
        }],
        deliveryAddress,
        contactPhone: user?.phone || '0000000000',
        paymentMethod: 'cash_on_delivery',
        customerNotes: 'Direct order from product page',
        subtotal: product.price * quantity,
        deliveryFee: 40,
        total: (product.price * quantity) + 40,
      };

      const orderResponse = await createDirectOrder(orderData);

      if (orderResponse) {
        alert(`Order placed successfully!`);
        navigate(`/orders/${orderResponse.id || orderResponse._id}`);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      setError(error.response?.data?.message || 'Failed to create order. Please try again.');
    } finally {
      setOrdering(false);
    }
  };

  // Handle quantity change
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  // Toggle favorite
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: `Check out this product: ${product?.name}`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Load product details on mount
  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error || 'Product not found'}</Alert>
        <Button variant="contained" onClick={() => navigate('/')}>
          Go Back
        </Button>
      </Box>
    );
  }

  const discountPercent = product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" sx={{ flex: 1, fontWeight: 600 }}>
          {product.name}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={handleShare}>
            <Share />
          </IconButton>
          <IconButton onClick={toggleFavorite}>
            <Favorite color={isFavorite ? 'error' : 'inherit'} />
          </IconButton>
          <IconButton onClick={() => navigate('/cart')}>
            <ShoppingCart />
            {cartCount > 0 && (
              <Chip 
                label={cartCount} 
                size="small" 
                sx={{ 
                  position: 'absolute', 
                  top: -8, 
                  right: -8,
                  bgcolor: '#4D216D',
                  color: 'white',
                  fontSize: '0.7rem',
                  height: 20
                }} 
              />
            )}
          </IconButton>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card sx={{ position: 'relative', overflow: 'hidden' }}>
              <Box sx={{ position: 'relative' }}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{ 
                    width: '100%', 
                    height: 400, 
                    objectFit: 'cover' 
                  }}
                />
                {discountPercent > 0 && (
                  <Chip
                    label={`${discountPercent}% OFF`}
                    color="error"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      fontWeight: 'bold'
                    }}
                  />
                )}
                {!product.inStock && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      bgcolor: 'rgba(0,0,0,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant="h6" color="white" sx={{ fontWeight: 'bold' }}>
                      Out of Stock
                    </Typography>
                  </Box>
                )}
              </Box>
            </Card>
          </motion.div>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Product Name & Price */}
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#4D216D' }}>
                Rs {product.price.toFixed(2)}
              </Typography>
              {product.originalPrice > product.price && (
                <Typography 
                  variant="h6" 
                  sx={{ 
                    textDecoration: 'line-through', 
                    color: 'text.secondary' 
                  }}
                >
                  Rs {product.originalPrice.toFixed(2)}
                </Typography>
              )}
            </Box>

            {/* Vendor Card */}
            <Card sx={{ mb: 3, bgcolor: '#f8f9fa' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Store sx={{ color: '#4D216D', mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {product.vendor.name}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {product.vendor.distance}
                    </Typography>
                  </Box>
                                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTime sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        Est. {getEstimatedDelivery(product.vendor.distance)}
                      </Typography>
                    </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Star sx={{ fontSize: 16, color: '#FFB800', mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {product.vendor.rating}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Quantity Selector */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Quantity</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </IconButton>
                <Typography variant="h6" sx={{ minWidth: 40, textAlign: 'center' }}>
                  {quantity}
                </Typography>
                <IconButton onClick={() => handleQuantityChange(quantity + 1)}>
                  +
                </IconButton>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                variant="outlined"
                onClick={handleAddToCart}
                disabled={addingToCart || !product.inStock}
                sx={{ 
                  flex: 1,
                  borderColor: '#4D216D',
                  color: '#4D216D',
                  '&:hover': { borderColor: '#3a1855' }
                }}
              >
                {addingToCart ? <CircularProgress size={20} /> : 'Add to Cart'}
              </Button>
              <Button
                variant="contained"
                onClick={handleDirectOrder}
                disabled={ordering || !product.inStock}
                sx={{ 
                  flex: 1,
                  bgcolor: '#4D216D',
                  '&:hover': { bgcolor: '#3a1855' }
                }}
              >
                {ordering ? <CircularProgress size={20} color="inherit" /> : 'Order Now'}
              </Button>
            </Box>

            {/* Delivery Info Cards */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f8f9fa' }}>
                  <LocalShipping sx={{ color: '#4D216D', mb: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Fast Delivery</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Est. {getEstimatedDelivery(product.vendor.distance)}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f8f9fa' }}>
                  <Security sx={{ color: '#4D216D', mb: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Quality Guarantee</Typography>
                  <Typography variant="caption" color="text.secondary">
                    100% authentic
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f8f9fa' }}>
                  <AccessTime sx={{ color: '#4D216D', mb: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Easy Returns</Typography>
                  <Typography variant="caption" color="text.secondary">
                    7-day policy
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </motion.div>
        </Grid>
      </Grid>

      {/* Tabs Section */}
      <Box sx={{ mt: 6 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="Description" />
          <Tab label="Reviews" />
          <Tab label="Compare Prices" />
        </Tabs>

        <Box sx={{ mt: 3 }}>
          {activeTab === 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Product Description</Typography>
                <Typography variant="body1" color="text.secondary">
                  {product.description}
                </Typography>
                {product.category && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Category: {product.category}
                      {product.subCategory && ` > ${product.subCategory}`}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          )}
          
          {activeTab === 1 && (
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Reviews</Typography>
                <Typography variant="body1" color="text.secondary">
                  Reviews functionality will be implemented here.
                </Typography>
              </CardContent>
            </Card>
          )}
          
          {activeTab === 2 && (
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Price Comparison</Typography>
                <Typography variant="body1" color="text.secondary">
                  Price comparison functionality will be implemented here.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ProductDetails;
  
