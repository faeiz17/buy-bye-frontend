import React from "react";
import { Box, Button, Typography } from "@mui/material";
import styles from "./HomeHero.module.scss"; // Import the styles as an object

const HomeHero = () => {
  return (
    <Box className={styles["hero-section"]}>
      {" "}
      {/* Access class from the imported styles */}
      <Box className={styles["hero-content"]}>
        <Typography
          variant="h3"
          component="h1"
          className={styles["hero-heading"]}
        >
          Make your own Home Pack!
        </Typography>
        <Typography variant="body1" className={styles["hero-subheading"]}>
          Create a custom home pack suitable to your needs.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={styles["hero-btn"]}
        >
          Shop Now
        </Button>
      </Box>
      <Box className={styles["hero-image"]}></Box>
    </Box>
  );
};

export default HomeHero;

// import React from "react";
// import { Box, Button, Typography } from "@mui/material";
// import "./HomeHero.module.scss";

// const HomeHero = () => {
//   return (
//     <Box className="hero-section">
//       <Box className="hero-content">
//         <Typography variant="h3" component="h1" className="hero-heading">
//           Make your own Home Pack!
//         </Typography>
//         <Typography variant="body1" className="hero-subheading">
//           Create a custom home pack suitable to your needs.
//         </Typography>
//         <Button variant="contained" color="primary" className="hero-btn">
//           Shop Now
//         </Button>
//       </Box>
//       <Box className="hero-image"></Box>
//     </Box>
//   );
// };

// export default HomeHero;
