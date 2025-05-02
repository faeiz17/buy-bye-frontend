import React, { useRef, useEffect, useState } from "react";
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

// Pakistani products with images from web (these would be URLs in your actual app)
const PRODUCTS = [
  {
    id: 1,
    name: "Tapal Danedar Tea",
    quantity: "950g",
    price: 1150,
    originalPrice: 1300,
    discount: 12,
    store: "Naheed Supermarket",
    rating: 4.7,
    reviewCount: 128,
    image: "https://img.freepik.com/free-photo/tea-dried-herbs-fresh-herbs-wooden-spoon-table_1150-30513.jpg?size=626&ext=jpg"
  },
  {
    id: 2,
    name: "National Biryani Masala",
    quantity: "100g",
    price: 250,
    originalPrice: 250,
    discount: 0,
    store: "Imtiaz Supermarket",
    rating: 4.5,
    reviewCount: 85,
    image: "https://img.freepik.com/free-photo/top-view-spices-arrangement_23-2148657684.jpg?size=626&ext=jpg"
  },
  {
    id: 3,
    name: "Nestle Milkpak UHT Milk",
    quantity: "1L",
    price: 320,
    originalPrice: 350,
    discount: 9,
    store: "Carrefour",
    rating: 4.2,
    reviewCount: 56,
    image: "https://img.freepik.com/free-photo/plain-milk-glass-bottle_114579-35541.jpg?size=626&ext=jpg"
  },
  {
    id: 4,
    name: "Shangrila Ketchup",
    quantity: "800g",
    price: 490,
    originalPrice: 550,
    discount: 11,
    store: "Al-Fatah",
    rating: 4.0,
    reviewCount: 42,
    image: "https://img.freepik.com/free-photo/flat-lay-tomato-sauce-arrangement_23-2148748527.jpg?size=626&ext=jpg"
  },
  {
    id: 5,
    name: "Bake Parlor Spaghetti",
    quantity: "400g",
    price: 220,
    originalPrice: 240,
    discount: 8,
    store: "Metro Cash & Carry",
    rating: 4.3,
    reviewCount: 37,
    image: "https://img.freepik.com/free-photo/raw-spaghetti-pasta_144627-24214.jpg?size=626&ext=jpg"
  },
  {
    id: 6,
    name: "K&N's Frozen Chicken",
    quantity: "1kg",
    price: 850,
    originalPrice: 950,
    discount: 11,
    store: "Hyperstar",
    rating: 4.8,
    reviewCount: 92,
    image: "https://img.freepik.com/free-photo/fresh-raw-chicken-meat-cutting-board_1150-27774.jpg?size=626&ext=jpg"
  },
  {
    id: 7,
    name: "Rafhan Custard Powder",
    quantity: "300g",
    price: 280,
    originalPrice: 300,
    discount: 7,
    store: "Naheed Supermarket",
    rating: 4.4,
    reviewCount: 63,
    image: "https://img.freepik.com/free-photo/yogurt-pudding-dessert-sweet-delicious_1150-35374.jpg?size=626&ext=jpg"
  },
  {
    id: 8,
    name: "Olpers Milk",
    quantity: "1.5L",
    price: 410,
    originalPrice: 430,
    discount: 5,
    store: "Imtiaz Supermarket",
    rating: 4.6,
    reviewCount: 74,
    image: "https://img.freepik.com/free-photo/set-milk-bottles-table_1150-17929.jpg?size=626&ext=jpg"
  }
];

function HomeFeatured() {
  const scrollRef = useRef(null);
  const [favoritedItems, setFavoritedItems] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Simulate loading 
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Intersection observer for animation
  useEffect(() => {
    if (!isLoading) {
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
    }
  }, [isLoading]);

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

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation when clicking add button
    // Add to cart logic would go here
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
            {isLoading ? (
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
            ) : (
              // Actual content
              PRODUCTS.map((product, index) => (
                <Link 
                  key={product.id}
                  to={ROUTES.PRODUCT_DETAILS?.replace(":productId", product.id) || `/product/${product.id}`}
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
                          onClick={handleAddToCart}
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

export default HomeFeatured;