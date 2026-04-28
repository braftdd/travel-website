import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DestinationsSection from "@/components/DestinationsSection";
import FeaturedStays from "@/components/FeaturedStays";
import WhyOrbis from "@/components/WhyOrbis";
import DealsBanner from "@/components/DealsBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <DestinationsSection />
      <FeaturedStays />
      <WhyOrbis />
      <DealsBanner />
      <Footer />
    </main>
  );
}
