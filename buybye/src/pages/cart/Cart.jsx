import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CartHeader from '@/components/cart/CartHeader';
import CartItem from '@/components/cart/CartItem';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useOrder } from '../../context/OrderContext';
import { useLocation } from '../../context/LocationContext';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import { Store, LocationOn, AccessTime, ShoppingCart } from '@mui/icons-material';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, isLoading, error } = useCart();
  const { isLoggedIn, user } = useAuth();
  const { createDirectOrder } = useOrder();
  const { location } = useLocation();

  const [groupedItems, setGroupedItems] = useState({});
  const [processingVendor, setProcessingVendor] = useState(null);
  const [orderError, setOrderError] = useState(null);

  // Group cart items by vendor
  useEffect(() => {
    const grouped = {};
    
    cartItems.forEach(item => {
      const vendorId = item.vendor?.id || 'unknown';
      const vendorName = item.vendor?.name || 'Unknown Vendor';
      
      if (!grouped[vendorId]) {
        grouped[vendorId] = {
          vendorId,
          vendorName,
          items: [],
          subtotal: 0,
          distance: item.vendor?.distance || 'Unknown distance',
          deliveryTime: getEstimatedDelivery(item.vendor?.distance || 'Unknown distance')
        };
      }
      
      grouped[vendorId].items.push(item);
      grouped[vendorId].subtotal += (item.finalPrice || item.price) * item.quantity;
    });
    
    setGroupedItems(grouped);
  }, [cartItems]);

  // Calculate estimated delivery time
  const getEstimatedDelivery = (distance) => {
    if (!distance || distance === 'Unknown distance') return '25-35 min';
    
    const km = parseFloat(distance.replace(/[^\d.]/g, ''));
    if (km < 0.7) return '15-20 min';
    if (km < 1) return '20-25 min';
    return '25-35 min';
  };

  // Handle item quantity change
  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      await updateQuantity(id, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // Handle item removal
  const handleRemoveItem = async (id) => {
    try {
      await removeFromCart(id);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // Handle direct order for a specific vendor
  const handleDirectOrder = async (vendorId) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (!location) {
      setOrderError('Please set your delivery location before placing an order.');
      return;
    }

    const vendorData = groupedItems[vendorId];
    if (!vendorData || vendorData.items.length === 0) return;

    setProcessingVendor(vendorId);
    setOrderError(null);

    try {
      // Format delivery address
      const deliveryAddress = {
        coordinates: [location.longitude, location.latitude],
        formattedAddress: location.address || 'Current Location',
        type: 'Point',
      };

      // Calculate item totals with discounts
      const items = vendorData.items.map((item) => {
        const discountedPrice = item.finalPrice || item.price;
        
        return {
          vendorProductId: item.id,
          quantity: item.quantity,
          price: discountedPrice,
          originalPrice: item.originalPrice || item.price,
          discountType: item.discountType,
          discountValue: item.discountValue,
          totalPrice: discountedPrice * item.quantity,
        };
      });

      // Calculate totals
      const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
      const deliveryFee = 40; // Fixed delivery fee
      const total = subtotal + deliveryFee;

      // Prepare order data
      const orderData = {
        items,
        deliveryAddress,
        contactPhone: user?.phone || '0000000000',
        paymentMethod: 'cash_on_delivery',
        customerNotes: 'Order placed from cart screen',
        subtotal,
        deliveryFee,
        total,
      };

      // Create direct order
      const orderResponse = await createDirectOrder(orderData);

      if (orderResponse) {
        // Remove ordered items from cart
        for (const item of vendorData.items) {
          await removeFromCart(item.id);
        }

        // Show success message and navigate to order details
        alert(`Order from ${vendorData.vendorName} placed successfully!`);
        navigate(`/orders/${orderResponse.id || orderResponse._id}`);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      setOrderError(error.response?.data?.message || 'Failed to create order. Please try again.');
    } finally {
      setProcessingVendor(null);
    }
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

  if (isLoading) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading cart...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      </Box>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <ShoppingCart sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" sx={{ mb: 1 }}>Your cart is empty</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Add some products to get started
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/')}
          sx={{ bgcolor: '#4D216D', '&:hover': { bgcolor: '#3a1855' } }}
        >
          Continue Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <CartHeader itemCount={cartItems.length} />
      
      {orderError && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setOrderError(null)}>
          {orderError}
        </Alert>
      )}

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {Object.values(groupedItems).map((vendorGroup) => (
          <motion.div
            key={vendorGroup.vendorId}
            variants={containerVariants}
            style={{ marginBottom: 32 }}
          >
            <Box sx={{ 
              bgcolor: 'white', 
              borderRadius: 2, 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}>
              {/* Vendor Header */}
              <Box sx={{ 
                p: 3, 
                borderBottom: '1px solid #f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Store sx={{ color: '#4D216D', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {vendorGroup.vendorName}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {vendorGroup.distance}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTime sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        Est. {vendorGroup.deliveryTime}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Cart Items */}
              <Box sx={{ p: 3 }}>
                {vendorGroup.items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </Box>

              {/* Vendor Footer */}
              <Box sx={{ 
                p: 3, 
                bgcolor: '#f8f9fa',
                borderTop: '1px solid #f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">Subtotal</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Rs. {vendorGroup.subtotal.toLocaleString()}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  onClick={() => handleDirectOrder(vendorGroup.vendorId)}
                  disabled={processingVendor === vendorGroup.vendorId}
                  sx={{ 
                    bgcolor: '#4D216D', 
                    '&:hover': { bgcolor: '#3a1855' },
                    px: 4,
                    py: 1.5
                  }}
                >
                  {processingVendor === vendorGroup.vendorId ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    'Order Now'
                  )}
                </Button>
              </Box>
            </Box>
          </motion.div>
        ))}
      </motion.div>
    </Box>
  );
};

export default Cart;