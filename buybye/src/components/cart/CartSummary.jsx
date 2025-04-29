import React from 'react';
import { motion } from 'framer-motion';

const CartSummary = ({ summary, onCheckout }) => {
  const { subtotal, taxes, discount, total } = summary;
  
  return (
    <div style={styles.container}>
      <div style={styles.summaryItems}>
        <motion.div 
          style={styles.summaryItem}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span style={styles.summaryLabel}>Subtotal</span>
          <span style={styles.summaryValue}>Rs {subtotal}</span>
        </motion.div>
        
        <motion.div 
          style={styles.summaryItem}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span style={styles.summaryLabel}>Taxes</span>
          <span style={styles.summaryValue}>Rs {taxes}</span>
        </motion.div>
        
        <motion.div 
          style={styles.summaryItem}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span style={styles.summaryLabel}>Discount</span>
          <span style={styles.summaryValue}>Rs {discount}</span>
        </motion.div>
        
        <motion.div 
          style={{...styles.summaryItem, ...styles.totalItem}}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <span style={styles.totalLabel}>Total (Tax Incl.)</span>
          <span style={styles.totalValue}>Rs {total}</span>
        </motion.div>
      </div>
      
      <motion.button 
        style={styles.checkoutButton}
        whileHover={{ scale: 1.03, backgroundColor: '#3a1855' }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 400, damping: 15 }}
        onClick={onCheckout}
      >
        <span>Checkout</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '30px',
  },
  summaryItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '30px',
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.95rem',
  },
  summaryLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  summaryValue: {
    fontWeight: '500',
    color: 'white',
  },
  totalItem: {
    marginTop: '10px',
    paddingTop: '15px',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
  },
  totalLabel: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'white',
  },
  totalValue: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'white',
  },
  checkoutButton: {
    width: '100%',
    padding: '14px 20px',
    backgroundColor: '#4D216D',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    position: 'relative',
  },
};

export default CartSummary;