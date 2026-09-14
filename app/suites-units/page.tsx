import FeaturedLocationsDraft from "@/components/draft/FeaturedLocationsDraft";
import FeaturedLocations from "@/components/home/featured-locations/FeaturedLocations";
import FeaturedMedia from "@/components/suites-units/FeaturedMedia";
import HeroSection from "@/components/suites-units/HeroSection";
import { getFeaturedLocations } from "@/lib/wp-featured-locations";

export default async function SuitesUnitsPage() {
  const districts = await getFeaturedLocations();

  return (
    <>
      <HeroSection />
      {/* <FeaturedLocations /> */}
      <FeaturedLocationsDraft districts={districts} />
    </>
  );
}
