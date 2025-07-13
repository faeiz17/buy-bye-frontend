import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "../../context/LocationContext";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { categoryApi, vendorProductApi } from "../../services/api";
import ROUTES from "../../routes/routes";
import HomeHero from "@/components/home-hero/HomeHero";
import HomeAd from "@/components/home-ad/HomeAd";
import HomeCategories from "@/components/home-categories/HomeCategories";
import HomeFeatured from "@/components/home-featured/HomeFeatured";
import { Alert, Box, Button } from "@mui/material";
import { Email as EmailIcon } from "@mui/icons-material";

function Homepage() {
  const navigate = useNavigate();
  const { location, getLocationAndSearchParams } = useLocation();
  const { isLoggedIn } = useAuth();
  const { addToCart } = useCart();
  
  const [categories, setCategories] = useState([]);
  const [vendorProducts, setVendorProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [showVerificationAlert, setShowVerificationAlert] = useState(false);
  const [verificationUrl, setVerificationUrl] = useState('');



  // Fetch categories + vendor products (optionally by category) - BBBolt pattern
  const fetchData = async (categoryId = null) => {
    if (!location) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const locParams = getLocationAndSearchParams();
      const [catsRes, vpRes] = await Promise.all([
        categoryApi.getAllCategories(),
        categoryId
          ? vendorProductApi.getVendorProductsByCategory(categoryId, locParams)
          : vendorProductApi.getNearbyVendorProducts(locParams),
      ]);

      setCategories(catsRes.data || []);

      // Get all products from the API
      const allProducts = vpRes.data || [];

      // Filter products to only show 1 product per vendor (BBBolt pattern)
      const vendorMap = new Map();
      const filteredProducts = [];

      allProducts.forEach((product) => {
        const vendorId =
          typeof product.vendor === 'string'
            ? product.vendor
            : product.vendor?._id;

        if (vendorId && !vendorMap.has(vendorId)) {
          vendorMap.set(vendorId, true);
          filteredProducts.push(product);
        }
      });

      setVendorProducts(filteredProducts);
      setSelectedCategory(categoryId);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Check for verification URL on mount
  useEffect(() => {
    const storedVerificationUrl = localStorage.getItem('verificationUrl');
    if (storedVerificationUrl) {
      setVerificationUrl(storedVerificationUrl);
      setShowVerificationAlert(true);
      localStorage.removeItem('verificationUrl'); // Clear after showing
    }
  }, []);

  // Fetch data when location changes
  useEffect(() => {
    if (location) {
      fetchData();
    }
  }, [location]);

  // Note: We don't clear data when user logs out since categories and products are public data

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    fetchData(categoryId);
  };

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    fetchData(selectedCategory);
  };

  // Handle add to cart
  const handleAddToCart = async (vendorProduct) => {
    if (!isLoggedIn) {
      // Show login prompt and redirect to login page
      if (window.confirm('Please login to add items to your cart. Would you like to go to the login page?')) {
        navigate(ROUTES.LOGIN);
      }
      return;
    }

    try {
      await addToCart(vendorProduct);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleVerifyEmail = () => {
    if (verificationUrl) {
      window.open(verificationUrl, '_blank');
    }
  };

  const handleDismissVerification = () => {
    setShowVerificationAlert(false);
    setVerificationUrl('');
  };

  return (
    <div>
      {showVerificationAlert && (
        <Box sx={{ p: 2, backgroundColor: 'primary.main' }}>
          <Alert 
            severity="info" 
            icon={<EmailIcon />}
            action={
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  color="inherit" 
                  size="small" 
                  onClick={handleVerifyEmail}
                >
                  Verify Email
                </Button>
                <Button 
                  color="inherit" 
                  size="small" 
                  onClick={handleDismissVerification}
                >
                  Dismiss
                </Button>
              </Box>
            }
          >
            Please verify your email address to activate your account. Check your inbox for the verification link.
          </Alert>
        </Box>
      )}
      
      <HomeHero />
      
      {/* Categories Section */}
      <HomeCategories 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        loading={loading}
        error={error}
      />
      

      
      {/* Featured Products Section */}
      <HomeFeatured 
        products={vendorProducts}
        selectedCategory={selectedCategory}
        onRefresh={handleRefresh}
        onAddToCart={handleAddToCart}
        loading={loading}
        error={error}
        refreshing={refreshing}
      />
      
      <HomeAd />
    </div>
  );
}

export default Homepage;
