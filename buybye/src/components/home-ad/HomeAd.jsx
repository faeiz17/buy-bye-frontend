// import React, { useEffect, useState } from "react";
// import styles from "./HomeAd.module.scss";

// const images = [
//   "/images/ad1.jpg",
//   "/images/ad2.jpg",
//   "/images/ad3.jpg",
// ];

// function HomeAd() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000); // 3 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className={styles["home-ad-container"]}>
//       <div className={styles["carousel"]}>
//         <img 
//           src={images[currentIndex]} 
//           alt={`Ad ${currentIndex + 1}`} 
//           className={styles["carousel-image"]}
//         />
//       </div>
//     </div>
//   );
// }

// export default HomeAd;

import React, { useEffect, useState } from "react";
import styles from "./HomeAd.module.scss";

const images = [
  "/images/ad1.jpg",
  "/images/ad2.jpg",
  "/images/ad3.jpg",
];

function HomeAd() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles["home-ad-container"]}>
      <div className={styles["carousel"]}>
        {/* Left Arrow */}
        <div 
          className={styles["carousel-arrow-left"]} 
          onClick={goToPrev}
        >
          &#10094;
        </div>
        
        {/* Main Image - Removed onClick handler */}
        <img 
          src={images[currentIndex]} 
          alt={`Ad ${currentIndex + 1}`} 
          className={styles["carousel-image"]}
        />
        
        {/* Right Arrow */}
        <div 
          className={styles["carousel-arrow-right"]} 
          onClick={goToNext}
        >
          &#10095;
        </div>
        
        {/* Indicators */}
        <div className={styles["carousel-indicators"]}>
          {images.map((_, index) => (
            <div
              key={index}
              className={`${styles["indicator"]} ${
                index === currentIndex ? styles["active"] : ""
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeAd;
