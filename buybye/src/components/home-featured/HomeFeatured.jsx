// import React from "react";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// // import Rating from "@mui/material/Rating";
// import styles from "./HomeFeatured.module.scss"; // Import SCSS as an object
// import { useDispatch, useSelector } from "react-redux";
// import { getFeaturedProducts } from "@/redux/products/productSlice";

// const HomeFeatured = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.products.featureProducts);
//   React.useEffect(() => {
//     dispatch(getFeaturedProducts());
//   }, [dispatch]);

//   return (
//     <Box className={styles["featured-products"]}>
//       <Typography variant="h4" className={styles["section-title"]}>
//         Featured Products
//       </Typography>
//       <Box className={styles["products-container"]}>
//       {products.map((product, index) => (
//   <Card key={index} className={styles["product-card"]}>
//     <CardMedia
//       component="img"
//       image={product.imageURL}
//       alt={product.name}
//       className={styles["product-image"]}
//     />
//     <CardContent className={styles["card-content"]}>
//       <Typography variant="h6" className={styles["product-title"]}>
//         {product.name}
//       </Typography>
//       <Typography variant="body1" className={styles["product-price"]}>
//         Rs. {product.basePrice}
//       </Typography>

//       {/* Quality Tag */}
//       <Typography
//         className={`${styles["quality-tag"]} ${styles[product.qualityScore >= 4 ? "high" : product.qualityScore >= 2 ? "medium" : "low"]}`}
//       >
//         {product.qualityScore >= 4 ? "High Quality" : product.qualityScore >= 2 ? "Medium Quality" : "Low Quality"}
//       </Typography>

//       {/* Add to Cart Button */}
//       <Button
//         variant="contained"
//         size="small"
//         className={styles["product-btn"]}
//       >
//         Add to Cart
//       </Button>
//     </CardContent>
//   </Card>
// ))}

//       </Box>
//     </Box>
//   );
// };

// export default HomeFeatured;

//------------------------------------------------------------------------------------------------------
// import React, { useRef } from "react";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import styles from "./HomeFeatured.module.scss";

// function HomeFeatured() {
//   const scrollRef = useRef(null);

//   const scrollLeft = () => {
//     scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
//   };

//   const scrollRight = () => {
//     scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
//   };

//   const dummyProducts = Array.from({ length: 10 }, (_, index) => ({
//     name: `Product ${index + 1}`,
//     quantity: "1 kg",
//     price: 2500 + index * 500,
//     store: "at Jalal Sons",
//     image: "/images/tapal.png",
//   }));

//   return (
//     <Box className={styles["featured-section"]}>
//       <Typography variant="h4" className={styles["section-title"]}>
//         Featured Products
//       </Typography>

//       <Box className={styles["scroll-container"]}>
//         <IconButton
//           className={`${styles["scroll-button"]} ${styles["left-button"]}`}
//           onClick={scrollLeft}
//         >
//           <ArrowBackIosIcon />
//         </IconButton>

//         <Box className={styles["products-container"]} ref={scrollRef}>
//           {dummyProducts.map((product, index) => (
//             <Card key={index} className={styles["product-card"]}>
//               <CardMedia
//                 component="img"
//                 image={product.image}
//                 alt={product.name}
//                 className={styles["product-image"]}
//               />
//               <CardContent className={styles["card-content"]}>
//                 <Typography className={styles["product-name"]}>
//                   {product.name}
//                 </Typography>

//                 <Typography className={styles["product-quantity"]}>
//                   {product.quantity}
//                 </Typography>

//                 <Box className={styles["bottom-row"]}>
//                   <Box className={styles["left-info"]}>
//                     <Typography className={styles["store-name"]}>
//                       {product.store}
//                     </Typography>
//                     <Typography className={styles["product-price"]}>
//                       PKR {product.price}
//                     </Typography>
//                   </Box>

//                   <Button variant="contained" size="small" className={styles["add-to-cart"]}>
//                     Add
//                   </Button>
//                 </Box>
//               </CardContent>
//             </Card>
//           ))}
//         </Box>

//         <IconButton
//           className={`${styles["scroll-button"]} ${styles["right-button"]}`}
//           onClick={scrollRight}
//         >
//           <ArrowForwardIosIcon />
//         </IconButton>
//       </Box>
//     </Box>
//   );
// }

// export default HomeFeatured;

import React, { useRef } from "react";
import { Link } from "react-router-dom"; // Just added this line
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "./HomeFeatured.module.scss";
import PRODUCTS from "../../services/products/products";
import ROUTES from "../../routes/routes"; 

function HomeFeatured() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  // const dummyProducts = Array.from({ length: 10 }, (_, index) => ({
  //   name: `Product ${index + 1}`,
  //   quantity: "1 kg",
  //   price: 2500 + index * 500,
  //   store: "at Jalal Sons",
  //   image: "/images/tapal.png",
  // }));

  return (
    <Box className={styles["featured-section"]}>
      <Typography variant="h4" className={styles["section-title"]}>
        Featured Products
      </Typography>

      <Box className={styles["scroll-container"]}>
        <IconButton
          className={`${styles["scroll-button"]} ${styles["left-button"]}`}
          onClick={scrollLeft}
        >
          <ArrowBackIosIcon />
        </IconButton>

        <Box className={styles["products-container"]} ref={scrollRef}>
          {PRODUCTS.map((product) => (
            <Link 
              key={product.id}
              to={ROUTES.PRODUCT_DETAILS.replace(":productId", product.id)}
              // to={`/product/${index + 1}`} // <-- Assuming a route like /product/1
              className={styles["card-link"]} // Add this style below
            >
              <Card className={styles["product-card"]}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  className={styles["product-image"]}
                />
                <CardContent className={styles["card-content"]}>
                  <Typography className={styles["product-name"]}>
                    {product.name}
                  </Typography>

                  <Typography className={styles["product-quantity"]}>
                    {product.quantity}
                  </Typography>

                  <Box className={styles["bottom-row"]}>
                    <Box className={styles["left-info"]}>
                      <Typography className={styles["store-name"]}>
                        {product.store}
                      </Typography>
                      <Typography className={styles["product-price"]}>
                        PKR {product.price}
                      </Typography>
                    </Box>

                    <Button 
                      variant="contained" 
                      size="small" 
                      className={styles["add-to-cart"]}
                      onClick={(e) => e.preventDefault()} // Prevent navigation if "Add" clicked
                    >
                      Add
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Box>

        <IconButton
          className={`${styles["scroll-button"]} ${styles["right-button"]}`}
          onClick={scrollRight}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

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
