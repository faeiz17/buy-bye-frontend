import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Zoom from "@mui/material/Zoom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Icons
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import EastIcon from "@mui/icons-material/East";

import styles from "./HomeHero.module.scss";

const HomeHero = () => {
  const [loaded, setLoaded] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  // Hero content options - can be rotated for variety
  const heroContent = {
    title: "Your One-Stop Grocery Solution",
    subtitle: "Create custom ration packs with all your household essentials delivered to your doorstep",
    cta: "Shop Now"
  };

  return (
    <Box className={styles["hero-section"]}>
      <div className={styles["bg-overlay"]}></div>
      
      <Container maxWidth="lg" className={styles["hero-container"]}>
        <Box className={styles["hero-content"]}>
          <Fade in={loaded} timeout={1000}>
            <Typography
              variant={isMobile ? "h4" : "h3"}
              component="h1"
              className={styles["hero-heading"]}
            >
              {heroContent.title}
            </Typography>
          </Fade>
          
          <Fade in={loaded} timeout={1500}>
            <Typography variant="body1" className={styles["hero-subheading"]}>
              {heroContent.subtitle}
            </Typography>
          </Fade>
          
          <Box className={styles["cta-container"]}>
            <Zoom in={loaded} timeout={1800}>
              <Button
                variant="contained"
                color="secondary"
                className={styles["hero-btn"]}
                startIcon={<ShoppingBasketIcon />}
                endIcon={<EastIcon />}
                disableElevation
              >
                {heroContent.cta}
              </Button>
            </Zoom>
            

          </Box>
        </Box>
        
        <Fade in={loaded} timeout={1200}>
          <Box className={styles["hero-image"]}>
            <div className={styles["image-container"]}>
              {/* Decorative elements that will overlay the main image */}
              <div className={styles["floating-element"]} style={{ top: '10%', right: '15%' }}>
                <div className={styles["circle-badge"]}>
                  <span>50%</span>
                  <span>OFF</span>
                </div>
              </div>
              <div className={styles["floating-element"]} style={{ bottom: '20%', left: '10%' }}>
                <div className={styles["pill-badge"]}>Fresh Groceries</div>
              </div>
            </div>
          </Box>
        </Fade>
      </Container>
      
      {/* Wave separator */}
      <div className={styles["wave-separator"]}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
          <path 
            fill="#fcfcfc"
            fillOpacity="1"
            d="M0,64L60,53.3C120,43,240,21,360,21.3C480,21,600,43,720,53.3C840,64,960,64,1080,56C1200,48,1320,32,1380,24L1440,16L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
          ></path>
        </svg>
      </div>
    </Box>
  );
};

export default HomeHero;