import React from 'react';
import styles from './RationTopSelling.module.scss';
import { Rating } from '@mui/material'; // Import MUI Rating component

const RationTopSelling = () => {
  const topSellingPacks = [
    { id: 1, name: 'Ration Pack 1', image: '/images/card1.jpg', price: 2300, rating: 4.5 },
    { id: 2, name: 'Ration Pack 2', image: '/images/card1.jpg', price: 1200, rating: 3.8 },
    { id: 3, name: 'Ration Pack 3', image: '/images/card1.jpg', price: 1750, rating: 4.2 },
    { id: 4, name: 'Ration Pack 4', image: '/images/card1.jpg', price: 1100, rating: 3.9 },
  ];

  return (
    <section className={styles['top-selling']}>
      <h2 className={styles['section-title']}>Top Selling Ration Packs</h2>
      <div className={styles['product-grid']}>
        {topSellingPacks.map((pack) => (
          <div key={pack.id} className={styles['product-card']}>
            <img src={pack.image} alt={pack.name} className={styles['product-image']} />
            <h3 className={styles['product-name']}>{pack.name}</h3>
            <Rating
              name={`rating-${pack.id}`}
              value={pack.rating}
              precision={0.1}
              readOnly
              size="small"
              className={styles['product-rating']} // Custom class for styling
            />
            <p className={styles['product-price']}>PKR {pack.price}</p>
            <button className={styles['add-to-cart']}>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RationTopSelling;
