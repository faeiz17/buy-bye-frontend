// import React, { useState } from 'react';
// import styles from './RationTopSelling.module.scss';
// import { Rating } from '@mui/material'; // Import MUI Rating component

// // const RationTopSelling = () => {
// //   const topSellingPacks = [
// //     { id: 1, name: 'Ration Pack 1', image: '/images/ration-cards.jpg', price: 2300, rating: 4.5 },
// //     { id: 2, name: 'Ration Pack 2', image: '/images/ration-cards.jpg', price: 1200, rating: 3.8 },
// //     { id: 3, name: 'Ration Pack 3', image: '/images/ration-cards.jpg', price: 1750, rating: 4.2 },
// //     { id: 4, name: 'Ration Pack 4', image: '/images/ration-cards.jpg', price: 1100, rating: 3.9 },
// //   ];

// //   return (
// //     <section className={styles['top-selling']}>
// //       <h2 className={styles['section-title']}>Top Selling Ration Packs</h2>
// //       <div className={styles['product-grid']}>
// //         {topSellingPacks.map((pack) => (
// //           <div key={pack.id} className={styles['product-card']}>
// //             <img src={pack.image} alt={pack.name} className={styles['product-image']} />
// //             <h3 className={styles['product-name']}>{pack.name}</h3>
// //             <Rating
// //               name={`rating-${pack.id}`}
// //               value={pack.rating}
// //               precision={0.1}
// //               readOnly
// //               size="small"
// //               className={styles['product-rating']} // Custom class for styling
// //             />
// //             <p className={styles['product-price']}>PKR {pack.price}</p>
// //             <button className={styles['add-to-cart']}>Add to Cart</button>
// //           </div>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // };

// // export default RationTopSelling;


// const RationTopSelling = () => {
//   const [sortOption, setSortOption] = useState('default');
  
//   // Added quality field to each ration pack
//   const topSellingPacks = [
//     { id: 1, name: 'Premium Ration Pack', image: '/images/ration-cards.jpg', price: 2300, rating: 4.5, quality: 'High' },
//     { id: 2, name: 'Standard Ration Pack', image: '/images/ration-cards.jpg', price: 1200, rating: 3.8, quality: 'Medium' },
//     { id: 3, name: 'Deluxe Ration Pack', image: '/images/ration-cards.jpg', price: 1750, rating: 4.2, quality: 'High' },
//     { id: 4, name: 'Basic Ration Pack', image: '/images/ration-cards.jpg', price: 1100, rating: 3.9, quality: 'Low' },
//   ];

//   const handleSortChange = (e) => {
//     setSortOption(e.target.value);
//   };

//   // Sort the packs based on quality
//   const sortedPacks = [...topSellingPacks].sort((a, b) => {
//     if (sortOption === 'default') return 0;
    
//     const qualityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
//     return sortOption === 'quality-high' 
//       ? qualityOrder[b.quality] - qualityOrder[a.quality] 
//       : qualityOrder[a.quality] - qualityOrder[b.quality];
//   });

//   return (
//     <section className={styles['top-selling']}>
//       <div className={styles['section-header']}>
//         <h2 className={styles['section-title']}>Top Selling Ration Packs</h2>
//         <div className={styles['sort-container']}>
//           <span className={styles['sort-caption']}>Sort by:</span>
//           <select 
//             value={sortOption} 
//             onChange={handleSortChange}
//             className={styles['sort-dropdown']}
//           >
//             <option value="default">Default</option>
//             <option value="quality-high">Quality: High to Low</option>
//             <option value="quality-low">Quality: Low to High</option>
//           </select>
//         </div>
//       </div>
//       <div className={styles['product-grid']}>
//         {sortedPacks.map((pack) => (
//           <div key={pack.id} className={styles['product-card']}>
//             <img src={pack.image} alt={pack.name} className={styles['product-image']} />
//             <h3 className={styles['product-name']}>{pack.name}</h3>
//             <div className={styles['quality-tag']} data-quality={pack.quality.toLowerCase()}>
//               {pack.quality} Quality
//             </div>
//             <Rating
//               name={`rating-${pack.id}`}
//               value={pack.rating}
//               precision={0.1}
//               readOnly
//               size="small"
//               className={styles['product-rating']}
//             />
//             <p className={styles['product-price']}>PKR {pack.price}</p>
//             <button className={styles['add-to-cart']}>Add to Cart</button>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default RationTopSelling;

import React, { useState } from 'react';
import styles from './RationTopSelling.module.scss';
import { Rating } from '@mui/material';

const RationTopSelling = () => {
  const [sortOption, setSortOption] = useState('default');
  const [selectedQuality, setSelectedQuality] = useState('all');
  
  // Organized ration packs by quality and type
  const rationPacks = {
    High: [
      { id: 1, name: 'Standard Pack', type: 'Standard', quality: 'High', image: '/images/ration-cards.jpg', price: 2500, rating: 4.7, items: 8 },
      { id: 2, name: 'Family Value Pack', type: 'Family Value', quality: 'High', image: '/images/ration-cards.jpg', price: 3500, rating: 4.8, items: 12 },
      { id: 3, name: 'Extreme Pack', type: 'Extreme', quality: 'High', image: '/images/ration-cards.jpg', price: 4500, rating: 4.9, items: 16 },
      { id: 4, name: 'Khandan Value Pack', type: 'Khandan Value', quality: 'High', image: '/images/ration-cards.jpg', price: 5500, rating: 5.0, items: 20 }
    ],
    Medium: [
      { id: 5, name: 'Standard Pack', type: 'Standard', quality: 'Medium', image: '/images/ration-cards.jpg', price: 1800, rating: 3.7, items: 6 },
      { id: 6, name: 'Family Value Pack', type: 'Family Value', quality: 'Medium', image: '/images/ration-cards.jpg', price: 2500, rating: 3.8, items: 10 },
      { id: 7, name: 'Extreme Pack', type: 'Extreme', quality: 'Medium', image: '/images/ration-cards.jpg', price: 3200, rating: 3.9, items: 14 },
      { id: 8, name: 'Khandan Value Pack', type: 'Khandan Value', quality: 'Medium', image: '/images/ration-cards.jpg', price: 4000, rating: 4.0, items: 18 }
    ],
    Low: [
      { id: 9, name: 'Standard Pack', type: 'Standard', quality: 'Low', image: '/images/ration-cards.jpg', price: 1200, rating: 2.7, items: 4 },
      { id: 10, name: 'Family Value Pack', type: 'Family Value', quality: 'Low', image: '/images/ration-cards.jpg', price: 1800, rating: 2.8, items: 8 },
      { id: 11, name: 'Extreme Pack', type: 'Extreme', quality: 'Low', image: '/images/ration-cards.jpg', price: 2400, rating: 2.9, items: 12 },
      { id: 12, name: 'Khandan Value Pack', type: 'Khandan Value', quality: 'Low', image: '/images/ration-cards.jpg', price: 3000, rating: 3.0, items: 16 }
    ]
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleQualityChange = (e) => {
    setSelectedQuality(e.target.value);
  };

  // Flatten all packs or filter by selected quality
  let displayedPacks = selectedQuality === 'all' 
    ? [...rationPacks.High, ...rationPacks.Medium, ...rationPacks.Low]
    : rationPacks[selectedQuality];

  // Sort the packs based on selected option
  displayedPacks = [...displayedPacks].sort((a, b) => {
    if (sortOption === 'default') return 0;
    if (sortOption === 'price-high') return b.price - a.price;
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    
    // Sort by type order
    const typeOrder = { 'Standard': 1, 'Family Value': 2, 'Extreme': 3, 'Khandan Value': 4 };
    return typeOrder[a.type] - typeOrder[b.type];
  });

  return (
    <section className={styles['top-selling']}>
      <div className={styles['section-header']}>
        <h2 className={styles['section-title']}>Top Selling Ration Packs</h2>
        <div className={styles['filter-container']}>
          <div className={styles['filter-group']}>
            <span className={styles['filter-caption']}>Quality:</span>
            <select 
              value={selectedQuality} 
              onChange={handleQualityChange}
              className={styles['filter-dropdown']}
            >
              <option value="all">All Qualities</option>
              <option value="High">High Quality</option>
              <option value="Medium">Medium Quality</option>
              <option value="Low">Low Quality</option>
            </select>
          </div>
          <div className={styles['filter-group']}>
            <span className={styles['filter-caption']}>Sort by:</span>
            <select 
              value={sortOption} 
              onChange={handleSortChange}
              className={styles['filter-dropdown']}
            >
              {/* <option value="default">Default</option> */}
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              {/* <option value="rating">Rating</option>
              <option value="type">Pack Type</option> */}
            </select>
          </div>
        </div>
      </div>
      <div className={styles['product-grid']}>
        {displayedPacks.map((pack) => (
          <div key={pack.id} className={styles['product-card']}>
            <img src={pack.image} alt={pack.name} className={styles['product-image']} />
            <h3 className={styles['product-name']}>{pack.name}</h3>
            <div className={styles['pack-info']}>
              <span className={styles['quality-tag']} data-quality={pack.quality.toLowerCase()}>
                {pack.quality} Quality
              </span>
              <span className={styles['type-tag']} data-type={pack.type.toLowerCase().replace(' ', '-')}>
                {pack.type}
              </span>
            </div>
            <div className={styles['product-details']}>
              <span>Items: {pack.items}</span>
              <Rating
                name={`rating-${pack.id}`}
                value={pack.rating}
                precision={0.1}
                readOnly
                size="small"
                className={styles['product-rating']}
              />
            </div>
            <p className={styles['product-price']}>PKR {pack.price.toLocaleString()}</p>
            <button className={styles['add-to-cart']}>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RationTopSelling;