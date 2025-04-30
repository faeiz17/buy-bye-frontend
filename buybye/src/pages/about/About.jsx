import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Stats Card Component
const StatsCard = () => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (count < 30000) {
        setCount(prev => Math.min(prev + 1000, 30000));
      } else {
        clearInterval(interval);
      }
    }, 50);
    
    return () => clearInterval(interval);
  }, [count]);
  
  const avatars = [
    { id: 1, color: '#8A2BE2' },
    { id: 2, color: '#FF6347' },
    { id: 3, color: '#4682B4' },
    { id: 4, color: '#32CD32' },
    { id: 5, color: '#FFA500' },
    { id: 6, color: '#9370DB' },
    { id: 7, color: '#FF69B4' },
    { id: 8, color: '#20B2AA' },
    { id: 9, color: '#FF4500' },
    { id: 10, color: '#4169E1' },
    { id: 11, color: '#8B008B' },
    { id: 12, color: '#2E8B57' },
  ];
  
  return (
    <motion.div 
      style={styles.statsCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={styles.statsHeader}>
        <div>
          <motion.h3 
            style={styles.statsNumber}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {count.toLocaleString()}+
          </motion.h3>
          <p style={styles.statsDescription}>
            Sales in March 2025 with 5-star ratings and happy clients.
          </p>
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>
      
      <motion.div 
        style={styles.avatarGrid}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {avatars.map((avatar) => (
          <motion.div 
            key={avatar.id}
            style={{
              ...styles.avatar,
              backgroundColor: avatar.color,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: 0.3 + (avatar.id * 0.05),
              type: "spring",
              stiffness: 200,
              damping: 10
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

// Ratings Card Component
const RatingsCard = () => {
  return (
    <motion.div 
      style={styles.ratingsCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <p style={styles.ratingTitle}>Best ratings</p>
      <div style={styles.emojiContainer}>
        <motion.span 
          style={styles.emoji}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          🔥
        </motion.span>
        <motion.span 
          style={styles.emoji}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          😍
        </motion.span>
        <motion.span 
          style={styles.emoji}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
        >
          😋
        </motion.span>
        <motion.span 
          style={styles.emoji}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, type: "spring" }}
        >
          😊
        </motion.span>
        <motion.span 
          style={styles.emoji}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          😀
        </motion.span>
      </div>
    </motion.div>
  );
};

// Food Images Component
const FoodImages = () => {
  return (
    <div style={styles.foodImagesContainer}>
      <motion.div 
        style={styles.spicesImage}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div style={styles.spicesOverlay}></div>
      </motion.div>
      
      <motion.div 
        style={styles.tomatoesImage}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div style={styles.tomatoOverlay}></div>
      </motion.div>
    </div>
  );
};

// About Content Component
const AboutContent = () => {
  return (
    <motion.div 
      style={styles.aboutContent}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.span 
        style={styles.aboutSubheading}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        A BIT
      </motion.span>
      
      <motion.h2 
        style={styles.aboutHeading}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        ABOUT US
      </motion.h2>
      
      <motion.p 
        style={styles.aboutText}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        From they fine john he give of rich he. They age and draw
        mrs like. Improving end distrusts may instantly was
        household applauded incommode. Why kept very ever
        home mrs. Considered sympathize ten uncommonly
        occasional assistance sufficient not.
      </motion.p>
      
      <motion.button 
        style={styles.exploreButton}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        EXPLORE MORE
      </motion.button>
    </motion.div>
  );
};

// Main About Component
const About = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.leftSection}>
          <FoodImages />
          <RatingsCard />
        </div>
        
        <div style={styles.rightSection}>
            <StatsCard/>
          <AboutContent />
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  content: {
    display: 'flex',
    width: '100%',
    maxWidth: '1200px',
    gap: '20px',
    position: 'relative',
  },
  leftSection: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  rightSection: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  spicesImage: {
    width: '100%',
    height: '300px',
    backgroundColor: '#fff',
    borderRadius: '15px',
    overflow: 'hidden',
    position: 'relative',
    backgroundImage: `url('https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
  },
  tomatoesImage: {
    width: '100%',
    height: '300px',
    backgroundColor: '#fff',
    borderRadius: '15px',
    overflow: 'hidden',
    position: 'relative',
    backgroundImage: `url('https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
  },
  spicesOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.1) 100%)',
  },
  tomatoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.1) 100%)',
  },
  ratingsCard: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  ratingTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#333',
    margin: '0',
  },
  emojiContainer: {
    display: 'flex',
    gap: '10px',
    marginTop: '5px',
  },
  emoji: {
    fontSize: '1.8rem',
    display: 'inline-block',
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  statsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statsNumber: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#333',
    margin: '0',
    marginBottom: '5px',
  },
  statsDescription: {
    fontSize: '0.9rem',
    color: '#666',
    margin: '0',
    lineHeight: '1.4',
  },
  avatarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '10px',
  },
  avatar: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    backgroundColor: '#e0e0e0',
  },
  aboutContent: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    padding: '40px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  aboutSubheading: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#666',
    letterSpacing: '2px',
    marginBottom: '8px',
  },
  aboutHeading: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#111',
    margin: '0',
    marginBottom: '20px',
  },
  aboutText: {
    fontSize: '1rem',
    color: '#555',
    lineHeight: '1.7',
    marginBottom: '30px',
  },
  exploreButton: {
    backgroundColor: '#6a26cd',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 25px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    letterSpacing: '1px',
    alignSelf: 'flex-start',
    boxShadow: '0 4px 15px rgba(106, 38, 205, 0.3)',
    transition: 'all 0.3s ease',
  },
  foodImagesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  // Media query handling would need to be done differently in React
};

export default About;