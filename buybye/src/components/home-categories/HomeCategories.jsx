import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import styles from "./HomeCategories.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { getProductCategories } from "@/redux/products/productSlice";

function HomeCategories() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  // Dispatch the getProductCategories action once when the component mounts
  React.useEffect(() => {
    dispatch(getProductCategories());
  }, [dispatch]); // Dependency should be empty or a flag indicating the data fetch

  if (products.loading) return <div>Loading...</div>; // Show loading if the data is being fetched

  // Ensure that categories data is available before rendering
  if (!products.productCategories || products.productCategories.length === 0) {
    return <div>No categories available</div>;
  }

  return (
    <Box className={styles["categories-section"]}>
      <Typography variant="h4" className={styles["section-title"]}>
        Explore Categories
      </Typography>
      <Box className={styles["categories-container"]}>
        {products.productCategories.map((category, index) => (
          <Card key={index} className={styles["category-card"]}>
            <CardMedia
              component="img"
              sx={{
                maxWidth: "100px",
                width: "100%",
                height: "100%",
                margin: "auto",
              }}
              height="14"
              image={category.imageURL}
              alt={category.category}
            />
            <CardContent>
              <Typography variant="h6" className={styles["category-title"]}>
                {category.category}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default HomeCategories;
