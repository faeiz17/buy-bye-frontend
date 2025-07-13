import { useRef, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Slide from "@mui/material/Slide";


// Icons
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import VerifiedIcon from "@mui/icons-material/Verified";

import styles from "./HomeFeatured.module.scss";
import ROUTES from "../../routes/routes";



function HomeFeatured({ 
  products = [], 
  selectedCategory = null, 
  onRefresh = () => {}, 
  onAddToCart = () => {}, 
  loading = false, 
  error = null, 
  refreshing = false 
}) {
  const scrollRef = useRef(null);
  const [favoritedItems, setFavoritedItems] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

    // Extract price from string (e.g., "Rs. 825" -> 825)
  const extractPrice = (ps) => {
    if (!ps) return 0;
    if (typeof ps === 'number') return ps;
    const m = String(ps).match(/[\d,]+/);
    return m ? parseInt(m[0].replace(/,/g, ''), 10) : 0;
  };

  // Transform vendor products to display format
  const transformProducts = (vendorProducts) => {
    return vendorProducts.map((vp) => {
      const price = extractPrice(vp.product.price);
      const discountedPrice = vp.discountType
        ? vp.discountType === 'percentage'
          ? price * (1 - vp.discountValue / 100)
          : Math.max(0, price - vp.discountValue)
        : price;
      
      return {
        id: vp._id,
        name: vp.product.title,
        quantity: vp.product.quantity || '1 unit',
        price: discountedPrice,
        originalPrice: price,
        discount: vp.discountType === 'percentage' ? vp.discountValue : 0,
        store: vp.vendor.name,
        rating: 4.5, // Default rating since API might not have this
        reviewCount: Math.floor(Math.random() * 100) + 20, // Random review count
        image: vp.product.imageUrl,
        vendorProduct: vp // Keep original data for cart functionality
      };
    });
  };

  // Use transformed products
  const displayProducts = transformProducts(products);

  // Intersection observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll(`.${styles["product-card"]}`);
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, [displayProducts]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = isMobile ? -250 : isTablet ? -500 : -750;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = isMobile ? 250 : isTablet ? 500 : 750;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleFavoriteToggle = (e, productId) => {
    e.preventDefault(); // Prevent navigation
    setFavoritedItems(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const handleAddToCart = async (e, product) => {
    e.preventDefault(); // Prevent navigation when clicking add button
    
    try {
      if (product.vendorProduct) {
        await onAddToCart(product.vendorProduct);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={800}>
      <Box className={styles["featured-section"]}>
        <Box className={styles["section-header"]}>
          <Typography variant="h4" className={styles["section-title"]}>
            Featured Products
          </Typography>
          <Typography variant="body1" className={styles["section-subtitle"]}>
            Hand-picked quality items at great prices
          </Typography>
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </Box>

        <Box className={styles["scroll-container"]}>
          <IconButton
            className={`${styles["scroll-button"]} ${styles["left-button"]}`}
            onClick={scrollLeft}
            aria-label="scroll left"
            size={isMobile ? "small" : "medium"}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <Box className={styles["products-container"]} ref={scrollRef}>
            {loading ? (
              // Skeleton loading state
              Array.from(new Array(6)).map((_, index) => (
                <Card key={index} className={styles["product-card-skeleton"]}>
                  <Skeleton variant="rectangular" height={160} />
                  <Box sx={{ p: 2 }}>
                    <Skeleton width="80%" height={24} />
                    <Skeleton width="40%" height={20} />
                    <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                      <Skeleton width="50%" height={24} />
                      <Skeleton width="20%" height={36} />
                    </Box>
                  </Box>
                </Card>
              ))
            ) : displayProducts.length === 0 ? (
              // No data available message
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                minHeight: '300px',
                width: '100%',
                textAlign: 'center',
                padding: '40px 20px'
              }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  📦 No products available
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {selectedCategory 
                    ? `No data available for this category near you.` 
                    : `No products found near your location.`
                  }
                </Typography>
                <Button 
                  variant="outlined" 
                  onClick={onRefresh}
                  sx={{ mt: 2 }}
                >
                  Try Again
                </Button>
              </Box>
            ) : (
              // Actual content
              displayProducts.map((product) => (
                <Link 
                  key={product.id}
                  to={ROUTES.PRODUCT_DETAILS?.replace(":productId", product.id) || `/products/${product.id}`}
                  className={styles["card-link"]}
                >
                  <Card className={styles["product-card"]}>
                    {product.discount > 0 && (
                      <Chip 
                        icon={<LocalOfferIcon />} 
                        label={`${product.discount}% OFF`}
                        className={styles["discount-chip"]}
                      />
                    )}
                    
                    <IconButton 
                      className={styles["favorite-button"]}
                      onClick={(e) => handleFavoriteToggle(e, product.id)}
                      aria-label={favoritedItems[product.id] ? "Remove from favorites" : "Add to favorites"}
                    >
                      {favoritedItems[product.id] ? (
                        <FavoriteIcon className={styles["favorite-icon-active"]} />
                      ) : (
                        <FavoriteBorderIcon className={styles["favorite-icon"]} />
                      )}
                    </IconButton>
                    
                    <div className={styles["image-container"]}>
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name}
                        className={styles["product-image"]}
                      />
                    </div>
                    
                    <CardContent className={styles["card-content"]}>
                      <Box className={styles["store-rating"]}>
                        <Typography className={styles["store-name"]}>
                          {product.store}
                        </Typography>
                        <Box className={styles["rating-container"]}>
                          <Rating 
                            value={product.rating} 
                            precision={0.5} 
                            size="small" 
                            readOnly 
                          />
                          <Typography className={styles["review-count"]}>
                            ({product.reviewCount})
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Typography className={styles["product-name"]}>
                        {product.name}
                        {product.rating >= 4.5 && (
                          <VerifiedIcon className={styles["verified-icon"]} />
                        )}
                      </Typography>

                      <Typography className={styles["product-quantity"]}>
                        {product.quantity}
                      </Typography>

                      <Box className={styles["bottom-row"]}>
                        <Box className={styles["price-container"]}>
                          <Typography className={styles["product-price"]}>
                            PKR {product.price}
                          </Typography>
                          {product.discount > 0 && (
                            <Typography className={styles["original-price"]}>
                              PKR {product.originalPrice}
                            </Typography>
                          )}
                        </Box>
                        
                        <Button 
                          variant="contained" 
                          size="small" 
                          className={styles["add-to-cart"]}
                          onClick={(e) => handleAddToCart(e, product)}
                          startIcon={<AddShoppingCartIcon />}
                        >
                          {isMobile ? "" : "Add"}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </Box>

          <IconButton
            className={`${styles["scroll-button"]} ${styles["right-button"]}`}
            onClick={scrollRight}
            aria-label="scroll right"
            size={isMobile ? "small" : "medium"}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
        
        <Box className={styles["view-all-container"]}>
          <Button 
            variant="outlined" 
            className={styles["view-all-button"]}
            component={Link}
            to="/shop"
          >
            View All Products
          </Button>
        </Box>
      </Box>
    </Slide>
  );
}

HomeFeatured.propTypes = {
  products: PropTypes.array,
  selectedCategory: PropTypes.string,
  onRefresh: PropTypes.func,
  onAddToCart: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.string,
  refreshing: PropTypes.bool,
};

export default HomeFeatured;