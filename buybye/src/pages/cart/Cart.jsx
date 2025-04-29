import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CartHeader from '@/components/cart/CartHeader';
import CartItem from '@/components/cart/CartItem';
import PaymentForm from '@/components/cart/PaymentForm';
import CartSummary from '@/components/cart/CartSummary';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  // Static data for cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Potatoes',
      brand: 'Jalal Sons',
      price: 180,
      quantity: 1,
      image: '/images/potatoes.png', // Replace with your actual image path
    },
    {
      id: 2,
      name: 'Adam\'s Mozerella Cheese',
      brand: 'Jalal Sons',
      price: 340,
      quantity: 1,
      image: '/images/cheese.png', // Replace with your actual image path
    }
  ]);

  // Order summary data
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 520,
    taxes: 0,
    discount: 0,
    total: 520
  });

  // Payment form data
  const [paymentInfo, setPaymentInfo] = useState({
    name: '',
    cardNumber: '',
    promoCode: ''
  });

  // Handle item quantity change
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedItems);
    updateOrderSummary(updatedItems);
  };

  // Handle item removal
  const handleRemoveItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    updateOrderSummary(updatedItems);
  };

  // Update order summary based on cart items
  const updateOrderSummary = (items) => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    setOrderSummary({
      subtotal,
      taxes: 0,
      discount: 0,
      total: subtotal
    });
  };

  // Handle payment info changes
  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handleCheckout = () => {
    console.log('Processing checkout with:', { cartItems, orderSummary, paymentInfo });
    
    // Store cart data in session/local storage to access in checkout page
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    sessionStorage.setItem('orderSummary', JSON.stringify(orderSummary));
    
    // Navigate to checkout page
    navigate('/checkout');
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

  return (
    <div style={styles.container}>
      <CartHeader itemCount={cartItems.length} />
      
      <div style={styles.content}>
        <motion.div 
          style={styles.cartSection}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            style={styles.cartHeader}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 style={styles.cartTitle}>Shopping cart</h2>
            <p style={styles.cartSubtitle}>You have {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
          </motion.div>
          
          <motion.div style={styles.cartItems}>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div 
          style={styles.summarySection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 style={styles.summaryTitle}>Total Bill</h2>
          
          {/* <PaymentForm
            paymentInfo={paymentInfo} 
            onChange={handlePaymentInfoChange} 
          /> */}
          
          <CartSummary
            summary={orderSummary} 
            onCheckout={handleCheckout} 
          />
        </motion.div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Inter', sans-serif",
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    gap: '40px',
    flex: 1,
    paddingTop: '30px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
  },
  cartSection: {
    flex: '1.5',
    display: 'flex',
    flexDirection: 'column',
  },
  summarySection: {
    flex: '1',
    backgroundColor: 'rgba(77, 33, 109, 0.1)',
    borderRadius: '15px',
    padding: '30px',
    backgroundImage: 'linear-gradient(to bottom right, rgba(77, 33, 109, 0.8), rgba(77, 33, 109, 0.6))',
    backgroundSize: 'cover',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 10px 20px rgba(77, 33, 109, 0.2)',
    backdropFilter: 'blur(10px)',
  },
  cartHeader: {
    marginBottom: '20px',
    borderBottom: '1px solid #eee',
    paddingBottom: '15px',
  },
  cartTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    margin: '0 0 5px 0',
    color: '#333',
  },
  cartSubtitle: {
    fontSize: '0.9rem',
    color: '#777',
    margin: 0,
  },
  cartItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  summaryTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginTop: 0,
    marginBottom: '20px',
    color: 'white',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
};

export default Cart;