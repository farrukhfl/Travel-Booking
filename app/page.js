import BestHotels from "@/Components/best-hotels/BestHotels";
import Hero from "@/Components/hero/Hero";
import PopularLocations from "@/Components/popular-locations/PopularLocations";
import sea from "@/public/assets/sea.jpg" 
import hotel_image from "@/public/assets/hr_10.jpg" 


export default function Home() {
  return (
    <>
      <Hero image={sea} mainHeader="Are you ready for adventure" secondryHeader="Browse through the popular location"/>
      <PopularLocations />
      <Hero image={hotel_image} mainHeader="Get the best offer for your hotel" secondryHeader="Pick your Desired place"/>
      <BestHotels />
    </>
  );
}
