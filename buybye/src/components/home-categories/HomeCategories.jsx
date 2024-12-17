import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import styles from "./HomeCategories.module.scss";

const categories = [
  { name: "Breakfast Essentials", image: "/images/card1.jpg" },
  { name: "Dairy Offerings", image: "/images/card1.jpg" },
  { name: "Meat and Fish", image: "/images/card1.jpg" },
  { name: "Frozen Products", image: "/images/card1.jpg" },
  { name: "Fruits and Vegetables", image: "/images/card1.jpg" },
  { name: "Daal, Atta and Rice", image: "/images/card1.jpg" },
];

function HomeCategories() {
  return (
    <Box className={styles["categories-section"]}>
      <Typography variant="h4" className={styles["section-title"]}>
        Explore Categories
      </Typography>
      <Box className={styles["categories-container"]}>
        {/* Duplicate categories for seamless scrolling */}
        {[...categories, ...categories].map((category, index) => (
          <Card key={index} className={styles["category-card"]}>
            <CardMedia
              component="img"
              height="140"
              image={category.image}
              alt={category.name}
            />
            <CardContent>
              <Typography variant="h6" className={styles["category-title"]}>
                {category.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default HomeCategories;

// import React from "react";
// import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
// import styles from "./HomeCategories.module.scss"; // Import SCSS as an object

// const categories = [
//   { name: "Breakfast Essentials", image: "/images/card1.jpg" },
//   { name: "Dairy Offerings", image: "/images/card1.jpg" },
//   { name: "Meat and Fish", image: "/images/card1.jpg" },
//   { name: "Frozen Products", image: "/images/card1.jpg" },
//   { name: "Fruits and Vegetables", image: "/images/card1.jpg" },
//   { name: "Daal, Atta and Rice", image: "/images/card1.jpg" },
// ];

// const HomeCategories= () => {
//   return (
//     <Box className={styles["categories-section"]}>
//       <Typography variant="h4" className={styles["section-title"]}>
//         Explore Categories
//       </Typography>
//       <Box className={styles["categories-container"]}>
//         {categories.map((category, index) => (
//           <Card key={index} className={styles["category-card"]}>
//             <CardMedia
//               component="img"
//               height="140"
//               image={category.image}
//               alt={category.name}
//             />
//             <CardContent>
//               <Typography variant="h6" className={styles["category-title"]}>
//                 {category.name}
//               </Typography>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default HomeCategories;
