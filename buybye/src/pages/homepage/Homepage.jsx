import HomeCategories from "@/components/home-categories/HomeCategories";
import HomeFeatured from "@/components/home-featured/HomeFeatured";
import HomeHero from "@/components/home-hero/HomeHero";
import HomeAd from "@/components/home-ad/HomeAd";

function Homepage() {
  return (
    <div>
      <HomeHero />
      <HomeCategories />
      <HomeFeatured />
      
      <HomeAd />
    </div>
  );
}

export default Homepage;
