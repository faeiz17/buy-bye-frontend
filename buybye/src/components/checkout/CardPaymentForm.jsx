import React from 'react';
import { motion } from 'framer-motion';

const CardPaymentForm = ({ cardInfo, onChange, onSubmit }) => {
  // Format card number with spaces
  const formatCardNumber = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value) {
      value = value.match(/.{1,4}/g).join(' ');
    }
    onChange({
      target: {
        name: 'cardNumber',
        value: value.slice(0, 19) // Limit to 16 digits + 3 spaces
      }
    });
  };

  // Format expiry date with slash
  const formatExpiry = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    onChange({
      target: {
        name: 'expiry',
        value: value.slice(0, 5) // Limit to MM/YY format
      }
    });
  };

  // Format CVC to allow only numbers
  const formatCVC = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    onChange({
      target: {
        name: 'cvc',
        value: value.slice(0, 3)
      }
    });
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      style={styles.container}
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Cardholder Name Field */}
      <motion.div 
        style={styles.inputGroup}
        variants={itemVariants}
      >
        <label style={styles.label}>Cardholder's Name</label>
        <motion.input
          type="text"
          name="name"
          value={cardInfo.name}
          onChange={onChange}
          placeholder="FULL NAME"
          style={styles.input}
          whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px rgba(81, 43, 129, 0.2)' }}
        />
      </motion.div>
      
      {/* Card Number Field */}
      <motion.div 
        style={styles.inputGroup}
        variants={itemVariants}
      >
        <label style={styles.label}>Card Number</label>
        <div style={styles.cardNumberContainer}>
          <div style={styles.cardBrandIcon}>
            <img 
              src="/images/mastercard.png" 
              alt="Card Brand" 
              style={styles.cardIcon}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='24' viewBox='0 0 36 24'%3E%3Crect width='36' height='24' rx='4' fill='%23F26122'/%3E%3Ccircle cx='13' cy='12' r='6' fill='%23EA1D25'/%3E%3Ccircle cx='23' cy='12' r='6' fill='%23F69E1E'/%3E%3Cpath d='M18 7.5C19.3 9.1 20 11.0 20 13.0C20 15.0 19.3 16.9 18 18.5C16.7 16.9 16 15.0 16 13.0C16 11.0 16.7 9.1 18 7.5Z' fill='%23FF5F00'/%3E%3C/svg%3E";
              }}
            />
          </div>
          <motion.input
            type="text"
            name="cardNumber"
            value={cardInfo.cardNumber}
            onChange={formatCardNumber}
            placeholder="1234 5678 9012 3456"
            style={styles.input}
            maxLength={19}
            whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px rgba(81, 43, 129, 0.2)' }}
          />
        </div>
      </motion.div>
      
      {/* Expiry and CVC */}
      <div style={styles.rowInputs}>
        <motion.div 
          style={{...styles.inputGroup, ...styles.halfWidth}}
          variants={itemVariants}
        >
          <label style={styles.label}>Expiry</label>
          <motion.input
            type="text"
            name="expiry"
            value={cardInfo.expiry}
            onChange={formatExpiry}
            placeholder="MM/YY"
            style={styles.input}
            maxLength={5}
            whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px rgba(81, 43, 129, 0.2)' }}
          />
        </motion.div>
        
        <motion.div 
          style={{...styles.inputGroup, ...styles.halfWidth}}
          variants={itemVariants}
        >
          <label style={styles.label}>CVC</label>
          <motion.input
            type="text"
            name="cvc"
            value={cardInfo.cvc}
            onChange={formatCVC}
            placeholder="123"
            style={styles.input}
            maxLength={3}
            whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px rgba(81, 43, 129, 0.2)' }}
          />
        </motion.div>
      </div>
      
      {/* Submit Button */}
      <motion.button
        style={styles.submitButton}
        onClick={onSubmit}
        whileHover={{ scale: 1.02, backgroundColor: '#3c1f62' }}
        whileTap={{ scale: 0.98 }}
        variants={itemVariants}
      >
        Pay and Place Order
      </motion.button>
    </motion.div>
  );
};

const styles = {
  container: {
    marginTop: '24px',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#444',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    transition: 'all 0.2s ease',
  },
  rowInputs: {
    display: 'flex',
    gap: '16px',
  },
  halfWidth: {
    flex: '1',
  },
  cardNumberContainer: {
    position: 'relative',
  },
  cardBrandIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
  },
  cardIcon: {
    width: '36px',
    height: '24px',
  },
  submitButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#512B81',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'all 0.2s ease',
  },
};

export default CardPaymentForm;