import SEO from "../components/SEO";
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
      <SEO
        title="Canopux — IT & Web Services"
        description="Canopux is a software development company specializing in AI systems, web development, cloud infrastructure, DevOps, mobile apps and digital product engineering."
      />
      <div className="home-root">
        <div className="page-wrap">
          <Navbar />

          <HeroSection />

          <MarqueeSection />

          <Services />

          <CaseStudy />

          <About />

          <Contact />

          <Footer />
        </div>
      </div>
    </>
  );
}

export default HomePage;