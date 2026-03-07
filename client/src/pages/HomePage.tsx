import Navbar from "../components/navbar";
import HeroSection from "../components/heroSection";
import Services from "../components/Services";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import MarqueeSection from "../components/Marquee";

function HomePage() {
  return (
    <>
      <div className="home-root">
        <div className="page-wrap">
          <Navbar />

          <HeroSection />
        
          <MarqueeSection/>

          <Services/>

          <About/>

          <Contact/>

          <Footer/>
        </div>
      </div>
    </>
  );
}

export default HomePage;