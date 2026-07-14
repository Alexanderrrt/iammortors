import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import BrandStrip from "./components/BrandStrip";
import Gallery from "./components/Gallery";
import Promos from "./components/Promos";
import LoyaltyCard from "./components/LoyaltyCard";
import OwnersRide from "./components/OwnersRide";
import Location from "./components/Location";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import PromoPopups from "./components/PromoPopups";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <AboutUs />
        <Services />
        <BrandStrip />
        <OwnersRide />
        <Promos />
        <LoyaltyCard />
        <Gallery />
        <Reviews />
        <Location />
      </main>
      <Footer />
      <PromoPopups />
    </>
  );
}
