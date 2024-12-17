import React from "react";
import CustomizedRation from "../../components/ration-customized/CustomizedRation";
import styles from "./RationPack.module.scss";
import RationHeroNew from "../../components/ration-hero-new/RationHeroNew";
import RationTopSelling from "../../components/ration-top-selling/RationTopSelling";

const RationPackNew = () => {
  return (
    <>
      <div className={styles.container}>
        <RationHeroNew />
        <RationTopSelling />
        <CustomizedRation />
      </div>
    </>
  );
};

export default RationPackNew;
