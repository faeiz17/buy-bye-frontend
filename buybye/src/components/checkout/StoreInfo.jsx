import React from 'react';
import { motion } from 'framer-motion';

const StoreInfo = ({ store }) => {
  return (
    <motion.div 
      style={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div style={styles.infoSection}>
        <motion.div 
          style={styles.infoRow}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span style={styles.infoLabel}>Store:</span>
          <span style={styles.infoValue}>{store.name}</span>
        </motion.div>
        
        <motion.div 
          style={styles.infoRow}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span style={styles.infoLabel}>Distance:</span>
          <span style={styles.infoValue}>{store.distance}</span>
        </motion.div>
      </div>
      
      <motion.div 
        style={styles.mapContainer}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        <MapPlaceholder location={store.location} storeName={store.name} />
      </motion.div>
    </motion.div>
  );
};

// Placeholder for the map component
// In a real application, you would integrate with a map API like Google Maps
const MapPlaceholder = ({ location, storeName }) => {
  return (
    <div style={styles.map}>
      <div style={styles.mapOverlay}>
        <div style={styles.mapPin}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#E53935"/>
          </svg>
        </div>
        <div style={styles.locationLabel}>{storeName}</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f8f6fe',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  infoSection: {
    marginBottom: '16px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  infoLabel: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#444',
  },
  infoValue: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#512B81',
  },
  mapContainer: {
    borderRadius: '8px',
    overflow: 'hidden',
    height: '140px',
    marginTop: '12px',
  },
  map: {
    width: '100%',
    height: '100%',
    backgroundColor: '#6c757d',
    backgroundImage: "url('https://dummyimage.com/600x400/6c757d/ffffff&text=Map')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  mapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPin: {
    marginBottom: '4px',
  },
  locationLabel: {
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    textShadow: '0 1px 2px rgba(0,0,0,0.8)',
  }
};

export default StoreInfo;