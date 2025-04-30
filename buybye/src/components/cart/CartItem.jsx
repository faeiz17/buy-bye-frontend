import React from 'react';
import { motion } from 'framer-motion';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const handleIncrement = () => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  return (
    <motion.div 
      style={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
      transition={{ duration: 0.3 }}
    >
      <div style={styles.productInfo}>
        <motion.div 
          style={styles.imageContainer}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Display potato image as fallback if no image provided */}
          <img 
            src={item.image || 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=150&h=150'} 
            alt={item.name}
            style={styles.productImage}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=150&h=150';
            }}
          />
        </motion.div>
        
        <div style={styles.productDetails}>
          <h3 style={styles.productName}>{item.name}</h3>
          <p style={styles.productBrand}>{item.brand}</p>
        </div>
      </div>
      
      <div style={styles.productActions}>
        <div style={styles.quantityControl}>
          <motion.button 
            style={styles.quantityButton}
            onClick={handleDecrement}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={item.quantity <= 1}
          >
            -
          </motion.button>
          
          <span style={styles.quantity}>{item.quantity}</span>
          
          <motion.button 
            style={styles.quantityButton}
            onClick={handleIncrement}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            +
          </motion.button>
        </div>
        
        <p style={styles.price}>Rs {item.price}</p>
        
        <motion.button 
          style={styles.removeButton}
          onClick={() => onRemove(item.id)}
          whileHover={{ scale: 1.1, color: '#FF3A30' }}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    '&:hover': {
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-2px)',
    },
  },
  productInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  imageContainer: {
    width: '80px',
    height: '80px',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  productDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  productName: {
    fontSize: '1.1rem',
    fontWeight: '600',
    margin: '0 0 5px 0',
    color: '#333',
  },
  productBrand: {
    fontSize: '0.85rem',
    color: '#777',
    margin: 0,
  },
  productActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '25px',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: '#f5f5f5',
    borderRadius: '8px',
    padding: '5px 10px',
  },
  quantityButton: {
    backgroundColor: 'white',
    border: 'none',
    width: '25px',
    height: '25px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '1rem',
    color: '#4D216D',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    padding: 0,
    lineHeight: 1,
    fontWeight: 'bold',
    userSelect: 'none',
    transition: 'all 0.2s ease',
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  quantity: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#333',
    minWidth: '20px',
    textAlign: 'center',
  },
  price: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#4D216D',
    margin: 0,
    minWidth: '80px',
    textAlign: 'right',
  },
  removeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#999',
    display: 'flex',
    padding: '5px',
    borderRadius: '50%',
  },
};

export default CartItem;