import React from 'react';
import styles from "./RationHeroNew.module.scss";

const RationHeroNew = () => {
  return (
    <section className={styles['hero-section']}>
      <h1 className={styles['hero-title']}>Ration Packs</h1>
      <p className={styles['hero-description']}>
        Explore our selection of top-selling ration packs.
      </p>
    </section>
  );
};

export default RationHeroNew;
