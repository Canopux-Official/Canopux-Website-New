import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Services from "../components/Services";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import MarqueeSection from "../components/Marquee";
import CaseStudy from "../components/CaseStudy";

function HomePage() {
  return (
    <>
      <div className="home-root">
        <div className="page-wrap">
          <Navbar />

          <HeroSection />
        
          <MarqueeSection/>

          <Services/>

          <CaseStudy/>

          <About/>

          <Contact/>

          <Footer/>
        </div>
      </div>
    </>
  );
}

export default HomePage;