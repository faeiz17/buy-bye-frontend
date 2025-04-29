import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PaymentForm = ({ paymentInfo, onChange }) => {
  // Handle input formatting for card number
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // Format with spaces every 4 digits
    if (value) {
      value = value.match(/.{1,4}/g).join(' ');
    }
    
    // Update with formatted value
    onChange({
      target: {
        name: 'cardNumber',
        value: value.slice(0, 19) // Limit to 16 digits + 3 spaces
      }
    });
  };

  // Handle expiry date formatting
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // Format with / after first 2 digits
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    
    // Update with formatted value
    onChange({
      target: {
        name: 'expiryDate',
        value: value.slice(0, 5) // Limit to MM/YY format
      }
    });
  };

  // Handle promo code application
  const handleApplyPromo = (e) => {
    e.preventDefault();
    // Add your promo code verification logic here
    console.log('Applying promo code:', paymentInfo.promoCode);
    // Example: show success message
    alert('Promo code applied successfully!');
  };

  return (
    <div style={styles.container}>
      <motion.div 
        style={styles.inputGroup}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label style={styles.label}>Name on card</label>
        <motion.input
          type="text"
          name="name"
          value={paymentInfo.name}
          onChange={onChange}
          placeholder="John Doe"
          style={styles.input}
          whileFocus={{ scale: 1.02 }}
        />
      </motion.div>
      
      <motion.div 
        style={styles.inputGroup}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label style={styles.label}>Card Number</label>
        <motion.div style={styles.cardInputWrapper} whileFocus={{ scale: 1.02 }}>
          <input
            type="text"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            style={styles.input}
            maxLength={19}
          />
          <span style={styles.cardIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="white" strokeWidth="2"/>
              <path d="M3 10H21" stroke="white" strokeWidth="2"/>
              <path d="M7 15H9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M15 15H17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
        </motion.div>
      </motion.div>
      
      <div style={styles.rowInputs}>
        <motion.div 
          style={styles.inputGroup}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label style={styles.label}>Expiry Date</label>
          <motion.input
            type="text"
            name="expiryDate"
            value={paymentInfo.expiryDate}
            onChange={handleExpiryChange}
            placeholder="MM/YY"
            style={styles.input}
            maxLength={5}
            whileFocus={{ scale: 1.02 }}
          />
        </motion.div>
        
        <motion.div 
          style={styles.inputGroup}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label style={styles.label}>CVV</label>
          <motion.input
            type="text"
            name="cvv"
            value={paymentInfo.cvv}
            onChange={onChange}
            placeholder="123"
            style={styles.input}
            maxLength={4}
            whileFocus={{ scale: 1.02 }}
          />
        </motion.div>
      </div>
      
      <motion.div 
        style={styles.inputGroup}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <label style={styles.label}>Promo Code</label>
        <motion.div style={styles.promoInputWrapper} whileFocus={{ scale: 1.02 }}>
          <input
            type="text"
            name="promoCode"
            value={paymentInfo.promoCode}
            onChange={onChange}
            placeholder="Enter promo code"
            style={styles.input}
          />
          <motion.button 
            style={styles.applyButton}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleApplyPromo}
          >
            Apply
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.button
        style={styles.submitButton}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ backgroundColor: '#4e85f4' }}
        whileTap={{ scale: 0.98 }}
      >
        Complete Payment
      </motion.button>
    </div>
  );
};

export default PaymentForm

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '30px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
  },
  label: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  cardInputWrapper: {
    position: 'relative',
  },
  cardIcon: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    opacity: 0.7,
  },
  promoInputWrapper: {
    position: 'relative',
    display: 'flex',
  },
  applyButton: {
    position: 'absolute',
    right: '5px',
    top: '50%',
    transform: 'translateY(-50%)',
    padding: '6px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    borderRadius: '6px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '500',
  },
  rowInputs: {
    display: 'flex',
    gap: '15px',
    width: '100%',
  },
  submitButton: {
    marginTop: '10px',
    padding: '14px',
    backgroundColor: '#3a7af3',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    width: '100%',
  }
};
