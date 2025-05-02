import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Import theme from the correct path
import { theme } from '../../pages/theme';

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
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
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
          style={{...styles.inputWrapper, ...(errors.firstName ? styles.inputError : {})}}
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
          {errors.firstName && (
            <div style={styles.errorText}>{errors.firstName}</div>
          )}
        </motion.div>
        
        <motion.div 
          style={{...styles.inputWrapper, ...(errors.lastName ? styles.inputError : {})}}
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
          {errors.lastName && (
            <div style={styles.errorText}>{errors.lastName}</div>
          )}
        </motion.div>
      </div>
      
      <motion.div 
        style={{...styles.inputWrapper, ...(errors.email ? styles.inputError : {})}}
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
        {errors.email && (
          <div style={styles.errorText}>{errors.email}</div>
        )}
      </motion.div>
      
      <motion.div 
        style={{...styles.inputWrapper, ...(errors.phone ? styles.inputError : {})}}
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
        {errors.phone && (
          <div style={styles.errorText}>{errors.phone}</div>
        )}
      </motion.div>
      
      <motion.div 
        style={{...styles.inputWrapper}}
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
        disabled={formSubmitted}
      >
        {formSubmitted ? (
          <div style={styles.successMessage}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>Message Sent!</span>
          </div>
        ) : (
          'Send Message'
        )}
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

        <motion.div 
          style={styles.contactItem}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div style={styles.iconWrapper}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <span style={styles.contactText}>123 Main Street, Lahore, Pakistan</span>
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
    background: `linear-gradient(135deg, ${theme.colors.primary.main} 0%, ${theme.colors.primary.dark} 100%)`,
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  contactCard: {
    display: 'flex',
    width: '100%',
    maxWidth: '1000px',
    background: theme.colors.background.default,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    boxShadow: theme.shadows.xl,
    position: 'relative',
  },
  leftSection: {
    flex: '1',
    minHeight: '600px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.paper,
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
    background: `linear-gradient(135deg, ${hexToRgba(theme.colors.primary.main, 0.3)} 0%, ${hexToRgba(theme.colors.primary.dark, 0.6)} 100%)`,
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
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    marginBottom: '30px',
    color: theme.colors.text.primary,
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
    fontSize: theme.typography.body1.fontSize,
    border: `1px solid ${theme.colors.text.hint}`,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.background.paper,
    transition: 'all 0.3s ease',
    outline: 'none',
  },
  inputError: {
    borderColor: theme.colors.error,
    boxShadow: `0 0 0 1px ${theme.colors.error}`,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: '0.75rem',
    marginTop: '4px',
    position: 'absolute',
  },
  textarea: {
    width: '100%',
    padding: '12px 15px',
    fontSize: theme.typography.body1.fontSize,
    border: `1px solid ${theme.colors.text.hint}`,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.background.paper,
    resize: 'vertical',
    minHeight: '120px',
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  button: {
    padding: '14px 30px',
    fontSize: theme.typography.button.fontSize,
    fontWeight: theme.typography.button.fontWeight,
    color: theme.colors.primary.contrastText,
    backgroundColor: theme.colors.primary.main,
    border: 'none',
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '10px',
    boxShadow: theme.shadows.md,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  contactInfo: {
    marginTop: '30px',
  },
  contactTitle: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    marginBottom: '10px',
    color: theme.colors.text.primary,
  },
  contactSubtitle: {
    fontSize: theme.typography.body1.fontSize,
    color: theme.colors.text.secondary,
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
    backgroundColor: hexToRgba(theme.colors.primary.main, 0.1),
    borderRadius: '50%',
    color: theme.colors.primary.main,
  },
  contactText: {
    fontSize: theme.typography.body2.fontSize,
    color: theme.colors.text.secondary,
  },
};

// Helper function to convert hex to rgba
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default ContactUs;