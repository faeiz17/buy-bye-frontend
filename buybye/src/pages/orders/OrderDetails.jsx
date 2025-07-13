import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Chip, 
  CircularProgress,
  Alert,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@mui/material';
import { 
  ShoppingBag, 
  LocalShipping, 
  CheckCircle, 
  Cancel,
  ArrowBack,
  Store,
  LocationOn,
  Phone,
  Payment
} from '@mui/icons-material';
import { useOrder } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';

function OrderDetails() {
  // Order details component
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrderById, isLoading, error } = useOrder();
  const { isLoggedIn } = useAuth();

  const [order, setOrder] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchOrder = async (retryAttempt = 0) => {
      if (!isLoggedIn || !orderId) return;
      
      setLoadingOrder(true);
      setFetchError(null);
      setRetryCount(retryAttempt);
      
      try {
        const orderData = await getOrderById(orderId);
        setOrder(orderData);
        setRetryCount(0); // Reset retry count on success
        setLoadingOrder(false); // Set loading to false on success
      } catch (err) {
        console.error('OrderDetails: Error fetching order:', err);
        if (err.code === 'ECONNABORTED' && retryAttempt < 2) {
          // Retry on timeout, max 2 retries
          setTimeout(() => fetchOrder(retryAttempt + 1), 2000); // Retry after 2 seconds
        } else {
          setFetchError('Failed to load order details. Please try again.');
          setLoadingOrder(false);
        }
      }
    };

    fetchOrder();
  }, [orderId, isLoggedIn]); // Removed retryCount from dependencies to prevent infinite loop

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'confirmed':
      case 'processing':
        return 'info';
      case 'shipped':
      case 'out_for_delivery':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return <ShoppingBag />;
      case 'confirmed':
      case 'processing':
        return <ShoppingBag />;
      case 'shipped':
      case 'out_for_delivery':
        return <LocalShipping />;
      case 'delivered':
        return <CheckCircle />;
      case 'cancelled':
        return <Cancel />;
      default:
        return <ShoppingBag />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Helper function to safely extract text from potentially complex objects
  const extractText = (value, fallback = 'Not available') => {
    if (!value) return fallback;
    if (typeof value === 'string') return value;
    if (typeof value === 'object') {
      // Handle address objects
      if (value.formattedAddress) return value.formattedAddress;
      if (value.name) return value.name;
      if (value.address) return value.address;
      // Fallback to string representation
      return JSON.stringify(value);
    }
    return String(value);
  };

  if (!isLoggedIn) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Please login to view order details</Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/login')}
          sx={{ bgcolor: '#4D216D', '&:hover': { bgcolor: '#3a1855' } }}
        >
          Login
        </Button>
      </Box>
    );
  }



  if (loadingOrder || isLoading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
        {retryCount > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Retrying... (Attempt {retryCount + 1}/3)
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Loading order details...
        </Typography>
      </Box>
    );
  }

  if (fetchError || error || !order) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {fetchError || error || 'Order not found'}
        </Alert>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            onClick={() => {
              setRetryCount(0);
              setFetchError(null);
              setLoadingOrder(true);
            }}
            sx={{ bgcolor: '#4D216D', '&:hover': { bgcolor: '#3a1855' } }}
          >
            Retry
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/orders')}
            sx={{ borderColor: '#4D216D', color: '#4D216D', '&:hover': { borderColor: '#3a1855', color: '#3a1855' } }}
          >
            Back to Orders
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Button 
          onClick={() => navigate('/orders')} 
          startIcon={<ArrowBack />}
          sx={{ mr: 2 }}
        >
          Back to Orders
        </Button>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Order Details
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Order Summary */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                    Order #{order.orderNumber || order.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Placed on {formatDate(order.createdAt)}
                  </Typography>
                </Box>
                <Chip
                  icon={getStatusIcon(order.status)}
                  label={order.status}
                  color={getStatusColor(order.status)}
                  size="large"
                />
              </Box>

              {/* Store Information */}
              {order.items && order.items.length > 0 && order.items[0].vendor && (
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Store sx={{ mr: 1, color: '#4D216D' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {order.items[0].vendor.name}
                    </Typography>
                  </Box>
                  {order.items[0].vendor.location && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOn sx={{ mr: 1, color: 'text.secondary', fontSize: 16 }} />
                      <Typography variant="body2" color="text.secondary">
                        {extractText(order.items[0].vendor.location, 'Location not available')}
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}

              {/* Order Items */}
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Order Items
              </Typography>
              <List>
                {order.items?.map((item, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar 
                        src={item.product?.imageUrl} 
                        alt={item.product?.title}
                        sx={{ width: 56, height: 56, mr: 2 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {item.product?.title}
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600, color: '#4D216D' }}>
                            Rs. {item.totalPrice?.toFixed(2)}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Quantity: {item.quantity}
                          </Typography>
                          {item.discountType && item.discountValue > 0 && (
                            <Typography variant="body2" color="success.main">
                              {item.discountType === 'percentage' ? `${item.discountValue}% OFF` : `Rs. ${item.discountValue} OFF`}
                            </Typography>
                          )}
                          {item.price !== item.totalPrice && (
                            <Typography variant="body2" color="text.secondary">
                              Original: Rs. {item.price?.toFixed(2)}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Status History */}
          {order.statusHistory && order.statusHistory.length > 0 && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Order Timeline
                </Typography>
                <List>
                  {order.statusHistory.map((status, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: getStatusColor(status.status) === 'success' ? '#4caf50' : 
                                         getStatusColor(status.status) === 'error' ? '#f44336' : 
                                         getStatusColor(status.status) === 'warning' ? '#ff9800' : '#2196f3' }}>
                          {getStatusIcon(status.status)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body1" sx={{ fontWeight: 500, textTransform: 'capitalize' }}>
                            {status.status}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {formatDate(status.timestamp)}
                            </Typography>
                            {status.note && (
                              <Typography variant="body2" color="text.secondary">
                                {status.note}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Order Summary Sidebar */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Order Summary
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Subtotal</Typography>
                  <Typography variant="body2">Rs. {order.subtotal?.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Delivery Fee</Typography>
                  <Typography variant="body2">Rs. {order.deliveryFee?.toFixed(2)}</Typography>
                </Box>
                {order.orderDiscount > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="success.main">Discount</Typography>
                    <Typography variant="body2" color="success.main">-Rs. {order.orderDiscount?.toFixed(2)}</Typography>
                  </Box>
                )}
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Total</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#4D216D' }}>
                    Rs. {order.total?.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Delivery Information
              </Typography>
              
              {order.deliveryAddress && (
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOn sx={{ mr: 1, color: '#4D216D' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Delivery Address
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {extractText(order.deliveryAddress, 'Address not available')}
                  </Typography>
                </Box>
              )}

              {order.contactPhone && (
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Phone sx={{ mr: 1, color: '#4D216D' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Contact Phone
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {order.contactPhone}
                  </Typography>
                </Box>
              )}

              {order.paymentMethod && (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Payment sx={{ mr: 1, color: '#4D216D' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Payment Method
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {order.paymentMethod === 'cash_on_delivery' ? 'Cash on Delivery' : order.paymentMethod}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Customer Information */}
          {order.customer && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Customer Information
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Name: {order.customer.name}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Email: {order.customer.email}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Phone: {order.customer.phone}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Order Notes */}
          {order.customerNotes && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Order Notes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {order.customerNotes}
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* Estimated Delivery */}
          {order.estimatedDelivery && (
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Estimated Delivery
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(order.estimatedDelivery)}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default OrderDetails; 