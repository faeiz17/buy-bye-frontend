import { useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Fade from "@mui/material/Fade";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Icons
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  BreakfastDining,
  LocalDrink,
  Restaurant,
  AcUnit,
  Spa,
  RiceBowl,
  BakeryDining,
  CleaningServices,
  LocalOffer,
  Kitchen
} from '@mui/icons-material';

import styles from "./HomeCategories.module.scss";
import PropTypes from 'prop-types';

function HomeCategories({ 
  categories = [], 
  selectedCategory = null, 
  onCategorySelect = () => {}, 
  loading = false, 
  error = null 
}) {
  // Get category icon based on name (similar to BBBolt)
  const getCategoryIcon = (categoryName) => {
    if (!categoryName) return <BreakfastDining className={styles["category-icon"]} />;
    
    switch (categoryName.toLowerCase()) {
      case 'cooking_essentials':
        return <Kitchen className={styles["category-icon"]} />;
      case 'baby':
        return <AcUnit className={styles["category-icon"]} />;
      case 'bakery':
        return <BakeryDining className={styles["category-icon"]} />;
      case 'beverages':
        return <LocalDrink className={styles["category-icon"]} />;
      case 'dairy':
        return <LocalDrink className={styles["category-icon"]} />;
      case 'fresh_food':
        return <Spa className={styles["category-icon"]} />;
      case 'groceries':
        return <Restaurant className={styles["category-icon"]} />;
      case 'health_and_beauty':
        return <CleaningServices className={styles["category-icon"]} />;
      case 'household':
        return <CleaningServices className={styles["category-icon"]} />;
      default:
        return <BreakfastDining className={styles["category-icon"]} />;
    }
  };
  const scrollRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  // Observer for scroll animation
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

    const cards = document.querySelectorAll(`.${styles["category-card"]}`);
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  // Mock categories with Pakistani context
  const mockCategories = [
    { 
      category: "Breakfast Items", 
      icon: <BreakfastDining className={styles["category-icon"]} />,
      description: "Cereals, Jams & Paratha"
    },
    { 
      category: "Dairy & Drinks", 
      icon: <LocalDrink className={styles["category-icon"]} />,
      description: "Milk, Lassi & Rooh Afza"
    },
    { 
      category: "Meat & Poultry", 
      icon: <Restaurant className={styles["category-icon"]} />,
      description: "Fresh Halal Selections"
    },
    { 
      category: "Frozen Foods", 
      icon: <AcUnit className={styles["category-icon"]} />,
      description: "Samosas & Kebabs"
    },
    { 
      category: "Fresh Produce", 
      icon: <Spa className={styles["category-icon"]} />,
      description: "Fruits & Vegetables"
    },
    { 
      category: "Atta & Rice", 
      icon: <RiceBowl className={styles["category-icon"]} />,
      description: "Chakki Atta & Basmati"
    },
    { 
      category: "Bakery Items", 
      icon: <BakeryDining className={styles["category-icon"]} />,
      description: "Fresh Naan & Cakes"
    },
    { 
      category: "Home Care", 
      icon: <CleaningServices className={styles["category-icon"]} />,
      description: "Cleaning & Laundry"
    },
    { 
      category: "Deals & Offers", 
      icon: <LocalOffer className={styles["category-icon"]} />,
      description: "Special Promotions"
    },
    { 
      category: "Masalas", 
      icon: <Kitchen className={styles["category-icon"]} />,
      description: "Spices & Seasonings"
    }
  ];



  const scrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = isMobile ? -200 : -400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = isMobile ? 200 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Use mock data if API data isn't available
  const displayCategories = categories.length > 0 
    ? categories 
    : mockCategories;

  if (loading) {
    return (
      <Box className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <Typography variant="body1">Loading categories...</Typography>
      </Box>
    );
  }

  return (
    <Fade in={true} timeout={800}>
      <Box className={styles["categories-section"]}>
        <Box className={styles["section-header"]}>
          <Typography variant="h4" className={styles["section-title"]} align="center">
            Explore Categories
          </Typography>
          <Typography variant="body1" className={styles["section-subtitle"]}>
            Find what you need from our wide selection
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
          
          <Box 
            className={styles["categories-container"]} 
            ref={scrollRef}
          > 
          {displayCategories.map((category, index) => (
              <Card 
                key={category._id || index} 
                className={`${styles["category-card"]} ${selectedCategory === category._id ? styles["category-selected"] : ""}`}
                elevation={0}
                onClick={() => onCategorySelect(category._id)}
                sx={{ cursor: 'pointer' }}
              >
                  <div className={styles["icon-container"]}>
                    {category.icon || getCategoryIcon(category.name)}
                  </div>
                  <CardContent className={styles["card-content"]}>
                    <Typography variant="h6" className={styles["category-title"]}>
                      {category.name ? category.name.replace(/_/g, ' ') : category.category}
                    </Typography>
                    <Typography variant="body2" className={styles["category-description"]}>
                      {category.description || 'Explore products'}
                    </Typography>
                  </CardContent>
              </Card>
            ))}
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
      </Box>
    </Fade>
  );
}

HomeCategories.propTypes = {
  categories: PropTypes.array,
  selectedCategory: PropTypes.string,
  onCategorySelect: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default HomeCategories;