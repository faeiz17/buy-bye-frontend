import React from 'react';
import { motion } from 'framer-motion';

const OrderSummary = ({ total }) => {
  // Format currency with Rs prefix
  const formatCurrency = (amount) => {
    return `Rs ${amount}`;
  };

  return (
    <motion.div 
      style={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        style={styles.header}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 style={styles.title}>You're paying,</h2>
        <motion.div 
          style={styles.amount}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 10,
            delay: 0.3
          }}
        >
          {formatCurrency(total)}
        </motion.div>
      </motion.div>
      
      <div style={styles.details}>
        <motion.div 
          style={styles.detailRow}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span style={styles.detailLabel}>Total</span>
          <span style={styles.detailValue}>{formatCurrency(total)}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f8f6fe',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  header: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#444',
    marginBottom: '8px',
  },
  amount: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#512B81',
    letterSpacing: '-0.5px',
  },
  details: {
    borderTop: '1px solid rgba(0,0,0,0.08)',
    paddingTop: '16px',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  detailLabel: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#444',
  },
  detailValue: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#512B81',
  },
};

export default OrderSummary;