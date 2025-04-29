import React from 'react';
import { motion } from 'framer-motion';

const CartHeader = ({ itemCount }) => {
  return (
    <motion.div 
      style={styles.header}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.button 
        style={styles.backButton}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 12L6 8L10 4" stroke="#4D216D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={styles.backText}>Continue Shopping</span>
      </motion.button>
      
      {itemCount > 0 && (
        <motion.div 
          style={styles.cartBadge}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 500,
            damping: 15
          }}
        >
          {itemCount}
        </motion.div>
      )}
    </motion.div>
  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '15px',
    borderBottom: '1px solid #eee',
    position: 'relative',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    color: '#4D216D',
    fontWeight: '500',
    fontSize: '0.9rem',
    textDecoration: 'none',
    outline: 'none',
    '&:hover': {
      backgroundColor: 'rgba(77, 33, 109, 0.1)',
    }
  },
  backText: {
    marginLeft: '8px',
  },
  cartBadge: {
    position: 'absolute',
    right: '0',
    top: '0',
    backgroundColor: '#4D216D',
    color: 'white',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    boxShadow: '0 2px 5px rgba(77, 33, 109, 0.3)',
  },
};

export default CartHeader;