import React from "react";
import styles from "./ProductInfo.module.scss";

function ProductInfo({ product }) {
  if (!product) return null;

  return (
    <div className={styles["product-info"]}>
      <div className={styles["left-side"]}>
        <img src={product.image} alt={product.name} className={styles["product-image"]} />
      </div>

      <div className={styles["right-side"]}>
        <h2 className={styles["product-name"]}>{product.name}</h2>
        <p className={styles["product-weight"]}>{product.quantity}</p>

        <div className={styles["quality-section"]}>
          <span className={styles["label"]}>Quality:</span>
          <span className={styles["quality-badge"]}>High</span>
        </div>

        <p className={styles["stock-info"]}>
          In-Stock: <span className={styles["store-name"]}>{product.store}</span>
        </p>

        <div className={styles["price-section"]}>
          <span className={styles["price-current"]}>Rs. {product.price}</span>
          {product.oldPrice && (
            <>
              <span className={styles["price-old"]}>Rs. {product.oldPrice}</span>
              <span className={styles["discount-badge"]}>10% OFF</span>
            </>
          )}
        </div>

        <button className={styles["add-to-cart-button"]}>
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductInfo;
