import React,  { useState } from 'react';
import { motion } from 'framer-motion';

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
      setFormSubmitted(false);
    }, 3000);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={styles.form}
    >
      <div style={styles.inputRow}>
        <motion.div 
          style={styles.inputWrapper}
          whileFocus={{ scale: 1.02 }}
        >
          <input
            type="text"
            name="firstName"
            placeholder="First Name*"
            value={formData.firstName}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </motion.div>
        <motion.div 
          style={styles.inputWrapper}
          whileFocus={{ scale: 1.02 }}
        >
          <input
            type="text"
            name="lastName"
            placeholder="Last Name*"
            value={formData.lastName}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </motion.div>
      </div>
      
      <motion.div 
        style={styles.inputWrapper}
        whileFocus={{ scale: 1.02 }}
      >
        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </motion.div>
      
      <motion.div 
        style={styles.inputWrapper}
        whileFocus={{ scale: 1.02 }}
      >
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number*"
          value={formData.phone}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </motion.div>
      
      <motion.div 
        style={styles.inputWrapper}
        whileFocus={{ scale: 1.02 }}
      >
        <textarea
          name="message"
          placeholder="Your message..."
          value={formData.message}
          onChange={handleChange}
          rows={5}
          style={styles.textarea}
        />
      </motion.div>
      
      <motion.button
        type="submit"
        style={styles.button}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {formSubmitted ? 'Message Sent!' : 'Send Message'}
      </motion.button>
    </motion.form>
  );
};

// Contact Info Component
const ContactInfo = () => {
  return (
    <motion.div 
      style={styles.contactInfo}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.h3 
        style={styles.contactTitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Let's talk with us
      </motion.h3>
      
      <motion.p 
        style={styles.contactSubtitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Questions, comments, or suggestions? Simply fill in the form and we'll be in touch shortly.
      </motion.p>
      
      <div style={styles.contactDetails}>
        <motion.div 
          style={styles.contactItem}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div style={styles.iconWrapper}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          <span style={styles.contactText}>+1 234 678 9101</span>
        </motion.div>
        
        <motion.div 
          style={styles.contactItem}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div style={styles.iconWrapper}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <span style={styles.contactText}>Contact@buybye.com</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main Contact Component
const ContactUs = () => {
  return (
    <div style={styles.container}>
      <div style={styles.contactCard}>
        <div style={styles.leftSection}>
          <motion.div 
            style={styles.imageWrapper}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div style={styles.imagePlaceholder}>
              <div style={styles.imageMask}></div>
              <div style={styles.imageOverlay}></div>
            </div>
          </motion.div>
        </div>
        
        <div style={styles.rightSection}>
          <motion.h2 
            style={styles.heading}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contact Us
          </motion.h2>
          
          <ContactForm />
          <ContactInfo />
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
    background: 'linear-gradient(135deg, #8a2be2 0%, #4b0082 100%)',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  contactCard: {
    display: 'flex',
    width: '100%',
    maxWidth: '1000px',
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    position: 'relative',
  },
  leftSection: {
    flex: '1',
    minHeight: '600px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e9e8f8',
    position: 'relative',
    backgroundImage: `url('https://images.unsplash.com/photo-1534536281715-e28d76689b4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  imageMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.3) 0%, rgba(75, 0, 130, 0.6) 100%)',
    mixBlendMode: 'multiply',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
  },
  rightSection: {
    flex: '1.2',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '30px',
    color: '#333',
    textAlign: 'left',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '30px',
  },
  inputRow: {
    display: 'flex',
    gap: '15px',
    width: '100%',
  },
  inputWrapper: {
    flex: '1',
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '1rem',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    transition: 'all 0.3s ease',
    outline: 'none',
    '&:focus': {
      borderColor: '#8a2be2',
      boxShadow: '0 0 0 2px rgba(138, 43, 226, 0.2)',
    },
  },
  textarea: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '1rem',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    resize: 'vertical',
    minHeight: '120px',
    outline: 'none',
    transition: 'all 0.3s ease',
    '&:focus': {
      borderColor: '#8a2be2',
      boxShadow: '0 0 0 2px rgba(138, 43, 226, 0.2)',
    },
  },
  button: {
    padding: '14px 30px',
    fontSize: '1rem',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#8a2be2',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '10px',
    boxShadow: '0 4px 15px rgba(138, 43, 226, 0.2)',
    '&:hover': {
      backgroundColor: '#7823c7',
    },
  },
  contactInfo: {
    marginTop: '30px',
  },
  contactTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#333',
  },
  contactSubtitle: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '20px',
    lineHeight: '1.5',
  },
  contactDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
    borderRadius: '50%',
    color: '#8a2be2',
  },
  contactText: {
    fontSize: '0.95rem',
    color: '#555',
  },
};

export default ContactUs;