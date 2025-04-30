import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/checkout/BackButton';
import PaymentOptions from '@/components/checkout/PaymentOptions';
import CardPaymentForm from '@/components/checkout/CardPaymentForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import { Store } from '@mui/x-data-grid/utils/Store';
import StoreInfo from '@/components/checkout/StoreInfo';

const Checkout = () => {
  const navigate = useNavigate();
  
  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'pickup'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Card payment form data
  const [cardInfo, setCardInfo] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  // Order summary data (passed from cart)
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 520,
    taxes: 0,
    discount: 0,
    total: 520
  });

  // Store information
  const [storeInfo, setStoreInfo] = useState({
    name: 'Jalal Sons Model Town',
    distance: '2.1 km',
    location: { lat: 31.4698, lng: 74.3230 }
  });

  // Handle card info changes
  const handleCardInfoChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({ ...cardInfo, [name]: value });
  };

  // Toggle payment method
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  // Handle place order button click
  const handlePlaceOrder = () => {
    console.log('Processing order with:', { paymentMethod, cardInfo });
    // Show success message or redirect to confirmation page
    alert('Order placed successfully!');
    // navigate('/order-confirmation');
  };

  // Handle back to cart
  const handleBackToCart = () => {
    navigate('/cart');
  };

  // Page animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1 
      } 
    },
    exit: { opacity: 0 }
  };

  return (
    <motion.div 
      className="checkout-container"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={styles.container}
    >
      <BackButton onClick={handleBackToCart} />
      
      <div style={styles.content}>
        <div style={styles.paymentSection}>
          <motion.h1 
            style={styles.title}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Let's Make Payment
          </motion.h1>
          
          <motion.p
            style={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            You can either pay by your banking card, or Pay via cash on picking up the order.
          </motion.p>
          
          <PaymentOptions
            selectedMethod={paymentMethod}
            onSelectMethod={handlePaymentMethodChange}
          />
          
          {paymentMethod === 'card' && (
            <CardPaymentForm
              cardInfo={cardInfo}
              onChange={handleCardInfoChange}
              onSubmit={handlePlaceOrder}
            />
          )}
        </div>
        
        <motion.div 
          style={styles.summarySection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <OrderSummary
            total={orderSummary.total} 
          />
          <StoreInfo store={storeInfo} />
        </motion.div>
      </div>
    </motion.div>
  );
};

const styles = {
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    gap: '40px',
    marginTop: '20px',
    flexWrap: 'wrap',
  },
  paymentSection: {
    flex: '1 1 550px',
    minWidth: '320px',
  },
  summarySection: {
    flex: '1 1 300px',
    maxWidth: '400px',
    minWidth: '280px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '24px',
  }
};

export default Checkout;