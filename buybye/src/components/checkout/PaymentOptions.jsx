import React from 'react';
import { motion } from 'framer-motion';

const PaymentOptions = ({ selectedMethod, onSelectMethod }) => {
  return (
    <div style={styles.container}>
      <motion.button
        style={{
          ...styles.option,
          backgroundColor: selectedMethod === 'pickup' ? '#512B81' : '#f6f6f6',
          color: selectedMethod === 'pickup' ? '#fff' : '#444',
        }}
        onClick={() => onSelectMethod('pickup')}
        whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Pay on Pickup
      </motion.button>

      <div style={styles.orDivider}>
        <div style={styles.line}></div>
        <motion.span 
          style={styles.orText}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          OR
        </motion.span>
        <div style={styles.line}></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        style={styles.paymentSection}
      >
        <motion.button
          style={{
            ...styles.cardOption,
            border: selectedMethod === 'card' ? '2px solid #512B81' : '1px solid #ddd',
          }}
          onClick={() => onSelectMethod('card')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div style={styles.radioCircle}>
            {selectedMethod === 'card' && <div style={styles.radioInner}></div>}
          </div>
          <span style={styles.cardText}>Card Payment</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: '24px',
  },
  option: {
    width: '100%',
    padding: '14px 20px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'center',
  },
  orDivider: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
  },
  line: {
    flex: 1,
    height: '1px',
    backgroundColor: '#e0e0e0',
  },
  orText: {
    padding: '0 12px',
    color: '#888',
    fontSize: '14px',
  },
  paymentSection: {
    marginTop: '20px',
  },
  cardOption: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginBottom: '16px',
  },
  radioCircle: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    border: '2px solid #512B81',
    marginRight: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#512B81',
  },
  cardText: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#333',
  },
};

export default PaymentOptions;