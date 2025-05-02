import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Slide from "@mui/material/Slide";
import Fade from "@mui/material/Fade";

// Icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import styles from "./HomeAd.module.scss";

// Pakistani relevant ad images - would be served from your CDN in production
const slides = [
  {
    id: 1,
    image: "https://img.freepik.com/free-photo/flat-lay-pakistani-meal-arrangement_23-2148825110.jpg?size=626&ext=jpg",
    title: "Ramadan Special Offers",
    subtitle: "Get prepared for the holy month with our exclusive deals",
    cta: "Shop Now",
    position: "left" // text position
  },
  {
    id: 2,
    image: "https://img.freepik.com/free-photo/assortment-spices-wooden-spoons_23-2148349729.jpg?size=626&ext=jpg",
    title: "Premium Spices Collection",
    subtitle: "Authentic Pakistani flavors for your kitchen",
    cta: "Explore",
    position: "right"
  },
  {
    id: 3,
    image: "https://img.freepik.com/free-photo/assortment-milky-products-wooden-table_114579-89555.jpg?size=626&ext=jpg",
    title: "Fresh Dairy Products",
    subtitle: "Farm fresh dairy delivered to your doorstep",
    cta: "View Deals",
    position: "left"
  }
];

function HomeAd() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState("left");
  const [isPaused, setIsPaused] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const intervalRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  
  // Set loaded state after initial render
  useEffect(() => {
    setLoaded(true);
  }, []);

  // Slideshow auto-play
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        goToNext();
      }, 5000); // 5 seconds
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentSlide, isPaused]);

  const goToNext = () => {
    setSlideDirection("left");
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPrev = () => {
    setSlideDirection("right");
    setCurrentSlide((prevSlide) => 
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const goToSlide = (index) => {
    setSlideDirection(index > currentSlide ? "left" : "right");
    setCurrentSlide(index);
  };
  
  const handleMouseEnter = () => {
    setIsPaused(true);
  };
  
  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <Fade in={loaded} timeout={1000}>
      <Box 
        className={styles["home-ad-container"]}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Typography variant="h4" className={styles["section-title"]}>
          Special Offers
        </Typography>
        
        <div className={styles["carousel-wrapper"]}>
          {/* Left navigation arrow */}
          <IconButton 
            className={`${styles["carousel-arrow"]} ${styles["arrow-left"]}`}
            onClick={goToPrev}
            aria-label="Previous slide"
          >
            <ChevronLeftIcon />
          </IconButton>
          
          {/* Carousel slides */}
          <div className={styles["carousel"]}>
            {slides.map((slide, index) => (
              <Slide
                key={slide.id}
                direction={slideDirection === "left" ? "right" : "left"}
                in={index === currentSlide}
                mountOnEnter
                unmountOnExit
                timeout={500}
              >
                <div className={styles["carousel-slide"]}>
                  <div 
                    className={styles["slide-image"]}
                    style={{ backgroundImage: `url(${slide.image})` }}
                  >
                    <div className={styles["slide-overlay"]}></div>
                  </div>
                  
                  <div className={`${styles["slide-content"]} ${styles[`position-${slide.position}`]}`}>
                    <LocalOfferIcon className={styles["offer-icon"]} />
                    <Typography variant="h5" className={styles["slide-title"]}>
                      {slide.title}
                    </Typography>
                    <Typography variant="body1" className={styles["slide-subtitle"]}>
                      {slide.subtitle}
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="warning"
                      className={styles["slide-cta"]}
                      disableElevation
                    >
                      {slide.cta}
                    </Button>
                  </div>
                </div>
              </Slide>
            ))}
          </div>
          
          {/* Right navigation arrow */}
          <IconButton 
            className={`${styles["carousel-arrow"]} ${styles["arrow-right"]}`}
            onClick={goToNext}
            aria-label="Next slide"
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
        
        {/* Indicator dots */}
        <div className={styles["carousel-indicators"]}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles["indicator"]} ${
                index === currentSlide ? styles["active"] : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Box>
    </Fade>
  );
}

export default HomeAd;