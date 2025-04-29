import React from 'react';
import { motion } from 'framer-motion';

const BackButton = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      style={styles.button}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 16 16" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={styles.icon}
      >
        <path 
          d="M10 12L6 8L10 4" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      Back to Cart
    </motion.button>
  );
};

const styles = {
  button: {
    display: 'flex',
    alignItems: 'center',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#444',
    fontSize: '14px',
    fontWeight: '500',
    padding: '6px 0',
    marginBottom: '15px',
  },
  icon: {
    marginRight: '6px',
  }
};

export default BackButton;