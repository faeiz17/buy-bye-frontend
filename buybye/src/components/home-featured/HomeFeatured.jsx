import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Rating,
} from "@mui/material";
import styles from "./HomeFeatured.module.scss"; // Import SCSS as an object

const products = [
  {
    name: "Potatoes",
    price: "Rs 160/kg",
    rating: 4.5,
    image: "/images/card1.jpg",
  },
  {
    name: "Adens Mozarella Cheese",
    price: "Rs 340/pack",
    rating: 4.8,
    image: "/images/card1.jpg",
  },
  {
    name: "Sugar - Loose Bag",
    price: "Rs 125/kg",
    rating: 4.3,
    image: "/images/card1.jpg",
  },
  {
    name: "Tapal Danedar Tea",
    price: "Rs 270/pack",
    rating: 5,
    image: "/images/card1.jpg",
  },
];

const HomeFeatured = () => {
  return (
    <Box className={styles["featured-products"]}>
      <Typography variant="h4" className={styles["section-title"]}>
        Featured Products
      </Typography>
      <Box className={styles["products-container"]}>
        {products.map((product, index) => (
          <Card key={index} className={styles["product-card"]}>
            <CardMedia
              component="img"
              height="160"
              image={product.image}
              alt={product.name}
            />
            <CardContent className={styles["card-content"]}>
              <Typography variant="h6" className={styles["product-title"]}>
                {product.name}
              </Typography>
              <Typography variant="body1" className={styles["product-price"]}>
                {product.price}
              </Typography>
              <Rating
                value={product.rating}
                readOnly
                className={styles["product-rating"]}
              />
              <Button
                variant="contained"
                size="small"
                className={styles["product-btn"]}
              >
                Buy Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default HomeFeatured;

// import React from "react";
// import { Box, Card, CardContent, CardMedia, Typography, Button, Rating } from "@mui/material";
// import "./HomeFeatured.module.scss";

// const products = [
//   {
//     name: "Potatoes",
//     price: "Rs 160/kg",
//     rating: 4.5,
//     image: "potato.png",
//   },
//   {
//     name: "Adens Mozarella Cheese",
//     price: "Rs 340/pack",
//     rating: 4.8,
//     image: "cheese.png",
//   },
//   {
//     name: "Sugar - Loose Bag",
//     price: "Rs 125/kg",
//     rating: 4.3,
//     image: "sugar.png",
//   },
//   {
//     name: "Tapal Danedar Tea",
//     price: "Rs 270/pack",
//     rating: 5,
//     image: "tea.png",
//   },
// ];

// const HomeFeatured = () => {
//   return (
//     <Box className="featured-products">
//       <Typography variant="h4" className="section-title">
//         Featured Products
//       </Typography>
//       <Box className="products-container">
//         {products.map((product, index) => (
//           <Card key={index} className="product-card">
//             <CardMedia
//               component="img"
//               height="160"
//               image={product.image}
//               alt={product.name}
//             />
//             <CardContent>
//               <Typography variant="h6" className="product-title">
//                 {product.name}
//               </Typography>
//               <Typography variant="body1" className="product-price">
//                 {product.price}
//               </Typography>
//               <Rating value={product.rating} readOnly />
//               <Button variant="contained" size="small" className="product-btn">
//                 Buy Now
//               </Button>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default HomeFeatured;
