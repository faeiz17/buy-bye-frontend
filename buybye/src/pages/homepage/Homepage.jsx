import HomeCategories from "@/components/home-categories/HomeCategories";
import HomeFeatured from "@/components/home-featured/HomeFeatured";
import HomeHero from "@/components/home-hero/HomeHero";

function Homepage() {
  return (
    <div>
      <HomeHero />
      <HomeCategories />
      <HomeFeatured />
    </div>
  );
}

export default Homepage;
