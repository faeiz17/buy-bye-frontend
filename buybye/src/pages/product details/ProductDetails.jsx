// import { useParams } from "react-router-dom";
// import ProductInfo from "@/components/product-info/ProductInfo";

// function ProductDetails() {
//   const { productId } = useParams();

//   return (
//     <div>
//       <h1>Product Details for Product ID: {productId}</h1>
//       <ProductInfo product={productId} />
//       {/* Now you can fetch product by ID or show info based on ID */}
//     </div>
//   );
// }

// export default ProductDetails;

import { useParams } from "react-router-dom";
import ProductInfo from "@/components/product-info/ProductInfo";
import PRODUCTS from "@/services/products/products"; // <-- import the products

function ProductDetails() {
  const { productId } = useParams();
  const product = PRODUCTS.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div>
      {/* No need to show ID anymore */}
      {/* <h1>Product Details for Product ID: {productId}</h1> */}
      <ProductInfo product={product} />
    </div>
  );
}

export default ProductDetails;


// function Homepage() {
//     return (
//       <div>
//         <HomeHero />
//         <HomeCategories />
//         <HomeFeatured />
//       </div>
//     );
//   }
  
