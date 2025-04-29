// import React from "react";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import styles from "./HomeCategories.module.scss";
// import { useSelector, useDispatch } from "react-redux";
// import { getProductCategories } from "@/redux/products/productSlice";

// function HomeCategories() {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.products);

//   // Dispatch the getProductCategories action once when the component mounts
//   React.useEffect(() => {
//     dispatch(getProductCategories());
//   }, [dispatch]); // Dependency should be empty or a flag indicating the data fetch

//   if (products.loading) return <div>Loading...</div>; // Show loading if the data is being fetched

//   // Ensure that categories data is available before rendering
//   if (!products.productCategories || products.productCategories.length === 0) {
//     return <div>No categories available</div>;
//   }

//   return (
//     <Box className={styles["categories-section"]}>
//       <Typography variant="h4" className={styles["section-title"]}>
//         Explore Categories
//       </Typography>
//       <Box className={styles["categories-container"]}>
//         {products.productCategories.map((category, index) => (
//           <Card key={index} className={styles["category-card"]}>
//             <CardMedia
//               component="img"
//               sx={{
//                 maxWidth: "100px",
//                 width: "100%",
//                 height: "100%",
//                 margin: "auto",
//               }}
//               height="14"
//               image={category.imageURL}
//               alt={category.category}
//             />
//             <CardContent>
//               <Typography variant="h6" className={styles["category-title"]}>
//                 {category.category}
//               </Typography>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>
//     </Box>
//   );
// }

// export default HomeCategories;


import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "./HomeCategories.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { getProductCategories } from "@/redux/products/productSlice";
import {
  BreakfastDining,
  LocalDrink,
  SetMeal,
  AcUnit,
  Spa,
  RiceBowl,
  BakeryDining,
  CleaningServices,
  Assignment,
  LocalPizza
} from '@mui/icons-material';

function HomeCategories() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const scrollRef = useRef(null);

  // Mock categories if API data isn't available
  const mockCategories = [
    { category: "Breakfast Essentials", icon: <BreakfastDining className={styles["category-icon"]} /> },
    { category: "Dairy Offerings", icon: <LocalDrink className={styles["category-icon"]} /> },
    { category: "Meat and Fish", icon: <SetMeal className={styles["category-icon"]} /> },
    { category: "Frozen Products", icon: <AcUnit className={styles["category-icon"]} /> },
    { category: "Fruits and Vegetables", icon: <Spa className={styles["category-icon"]} /> },
    { category: "Daal, Atta and Rice", icon: <RiceBowl className={styles["category-icon"]} /> },
    { category: "Bakery Items", icon: <BakeryDining className={styles["category-icon"]} /> },
    { category: "Cleaning", icon: <CleaningServices className={styles["category-icon"]} /> },
    { category: "Paper Goods", icon: <Assignment className={styles["category-icon"]} /> },
    { category: "Spices", icon: <LocalPizza className={styles["category-icon"]} /> }
  ];

  React.useEffect(() => {
    dispatch(getProductCategories());
  }, [dispatch]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Use mock data if API data isn't available
  const categories = products.productCategories?.length > 0 
    ? products.productCategories 
    : mockCategories;

  if (products.loading) return <div>Loading...</div>;

  return (
    <Box className={styles["categories-section"]}>
      <Typography variant="h4" className={styles["section-title"]}>
        Explore Categories
      </Typography>
      
      <Box className={styles["scroll-container"]}>
        <IconButton 
          className={`${styles["scroll-button"]} ${styles["left-button"]}`}
          onClick={scrollLeft}
          aria-label="scroll left"
        >
          <ArrowBackIosIcon />
        </IconButton>
        
        <Box 
          className={styles["categories-container"]} 
          ref={scrollRef}
        > 
        {categories.map((category, index) => (
            <Card key={index} className={styles["category-card"]}>
                {category.icon}
                <CardContent>
                  <Typography variant="h6" className={styles["category-title"]}>
                    {category.category}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </Box>
        
        <IconButton 
          className={`${styles["scroll-button"]} ${styles["right-button"]}`}
          onClick={scrollRight}
          aria-label="scroll right"
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default HomeCategories;